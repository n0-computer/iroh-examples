use std::str::FromStr;

use anyhow::{anyhow, Context, Result};
use clap::{Parser, ValueEnum};
use iroh_net::{key::SecretKey, MagicEndpoint};
use moq_transport::{cache::broadcast, setup::Role};
use tokio::{
    io::{AsyncRead, AsyncWrite},
    sync::oneshot,
    task::JoinSet,
};
use tracing::{debug, info, warn};

mod ffmpeg;
mod relay;
mod ticket;

use ticket::CastUrl;

#[derive(Debug, Parser)]
struct Cli {
    #[clap(short, long)]
    secret_key: Option<String>,

    #[clap(subcommand)]
    command: Command,
}

#[derive(Debug, Parser)]
enum Command {
    /// Publish a video stream
    Pub(PubOpts),
    /// Subscribe and play a video stream
    Sub(SubOpts),
    /// Run a relay
    Relay,
    /// Local pipethrough through direct pipe
    PipeLoop(LoopOpts),
    /// Local pipethrough through iroh-net
    NetworkLoop(LoopOpts),
}

#[derive(Debug, Parser)]
struct PubOpts {
    /// Relays to publish to (must be cast tickets)
    relays: Vec<CastUrl>,

    /// Input
    #[clap(value_enum, short, long, default_value_t = PubInput::Camera)]
    input: PubInput,

    /// Do not accept direct connections and only publish to relays
    #[clap(short, long)]
    no_accept: bool,
}

#[derive(ValueEnum, Clone, Debug)]
enum PubInput {
    /// Camera and default audio
    Camera,
    /// Desktop and default audio
    Desktop,
    /// Receive a video file from stdin
    Stdin,
}

impl PubInput {
    pub fn create(&self) -> Result<Box<dyn AsyncRead + Send + Unpin + 'static>> {
        Ok(match self {
            PubInput::Camera => Box::new(ffmpeg::capture_camera()?),
            PubInput::Desktop => Box::new(ffmpeg::capture_desktop()?),
            PubInput::Stdin => Box::new(ffmpeg::capture_stdin()?),
        })
    }
}

#[derive(ValueEnum, Clone, Debug)]
enum SubOutput {
    /// Render with ffplay
    Ffplay,
    /// Render with mpv
    Mpv,
    /// Pipe mp4 to stdout
    Stdout,
}

impl SubOutput {
    pub fn create(&self) -> Result<Box<dyn AsyncWrite + Send + Unpin + 'static>> {
        Ok(match self {
            SubOutput::Ffplay => Box::new(ffmpeg::out_ffplay()?),
            SubOutput::Mpv => Box::new(ffmpeg::out_mpv()?),
            SubOutput::Stdout => Box::new(tokio::io::stdout()),
        })
    }
}

#[derive(Debug, Parser)]
struct SubOpts {
    /// Iroh URL to video stream
    url: CastUrl,
    #[clap(value_enum, short, long, default_value_t = SubOutput::Ffplay)]
    output: SubOutput,
}

#[derive(Debug, Parser)]
struct LoopOpts {
    /// Input
    #[clap(value_enum, short, long, default_value_t = PubInput::Camera)]
    input: PubInput,
    /// Output
    #[clap(value_enum, short, long, default_value_t = SubOutput::Ffplay)]
    output: SubOutput,
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    tracing_subscriber::fmt()
        .with_writer(std::io::stderr)
        .init();
    let cli = Cli::parse();

    match cli.command {
        Command::Pub(opts) => {
            let PubOpts {
                relays,
                input,
                no_accept,
            } = opts;
            let input = input.create()?;
            let endpoint = bind_magic_endpoint().await?;
            publish(endpoint, input, relays, !no_accept, None).await?;
        }
        Command::Sub(opts) => {
            let SubOpts { url, output } = opts;
            let output = output.create()?;
            let endpoint = bind_magic_endpoint().await?;

            subscribe(endpoint, output, url).await?;
        }
        Command::Relay => {
            let endpoint = bind_magic_endpoint().await?;
            relay::run(endpoint).await?
        }
        Command::PipeLoop(opts) => {
            let LoopOpts { input, output } = opts;
            let mut input = input.create()?;
            let mut output = output.create()?;
            tokio::io::copy(&mut input, &mut output).await?;
        }
        Command::NetworkLoop(opts) => {
            let LoopOpts { input, output } = opts;
            let input = input.create()?;
            let output = output.create()?;
            let (on_url_send, on_url_recv) = oneshot::channel();

            let pub_ep = iroh_net::MagicEndpoint::builder()
                .alpns(vec![webtransport_quinn::ALPN.to_vec()])
                .bind(0)
                .await?;
            let sub_ep = iroh_net::MagicEndpoint::builder()
                .alpns(vec![webtransport_quinn::ALPN.to_vec()])
                .bind(0)
                .await?;

            let pub_task = tokio::task::spawn(async move {
                publish(pub_ep, input, vec![], true, Some(on_url_send)).await
            });

            let url = on_url_recv.await?;
            info!("starting subscribe task");
            let sub_task = tokio::task::spawn(async move { subscribe(sub_ep, output, url).await });

            sub_task.await??;
            pub_task.await??;
        }
    }
    Ok(())
}

async fn publish(
    endpoint: MagicEndpoint,
    input: impl AsyncRead + Unpin + Send + 'static,
    targets: Vec<CastUrl>,
    accept: bool,
    on_url: Option<oneshot::Sender<CastUrl>>,
) -> anyhow::Result<()> {
    let mut tasks = JoinSet::new();

    // start media task
    let (publisher, subscriber) = broadcast::new("");
    let mut media = moq_pub::media::Media::new(input, publisher).await?;
    tasks.spawn(async move { media.run().await });

    // open session for each publish target
    for target in targets {
        let endpoint = endpoint.clone();
        let subscriber = subscriber.clone();
        tasks.spawn(async move {
            let conn = endpoint
                .connect(target.node_addr().clone(), webtransport_quinn::ALPN)
                .await?;
            let session =
                webtransport_quinn::connect_with(conn, &target.to_fake_https_url()).await?;
            let session = moq_transport::session::Client::publisher(session, subscriber)
                .await
                .context("failed to create MoQ Transport session")?;
            session.run().await.context("session error")?;
            Ok(())
        });
    }

    if accept {
        let endpoint = endpoint.clone();
        let subscriber = subscriber.clone();
        let my_addr = endpoint.my_addr().await?;
        // todo: name is ignored for now
        let url = CastUrl::new(my_addr, "dev".to_string())?;
        println!("Accepting direct subscribe requests on URL:\n{url}");
        if let Some(on_url) = on_url {
            on_url
                .send(url.clone())
                .map_err(|_| anyhow!("cast url receiver dropped"))?;
        }
        tasks.spawn(async move {
            while let Some(conn) = endpoint.accept().await {
                let subscriber = subscriber.clone();
                tokio::task::spawn(async move {
                    if let Err(err) = publish_accept(conn, subscriber).await {
                        warn!("session failed: {err:?}");
                    }
                });
            }
            Ok(())
        });
    }

    while let Some(res) = tasks.join_next().await {
        println!("task finished: {res:?}");
    }

    Ok(())
}

async fn publish_accept(conn: quinn::Connecting, subscriber: broadcast::Subscriber) -> Result<()> {
    let conn = conn.await?;
    let id = conn.stable_id();
    // Wait for the CONNECT request.
    let request = webtransport_quinn::accept(conn)
        .await
        .context("failed to receive WebTransport request")?;
    // Strip any leading and trailing slashes to get the broadcast name.
    let path = request.url().path().trim_matches('/').to_string();
    debug!(id, %path, "received WebTransport CONNECT");
    // Accept the CONNECT request.
    let session = request
        .ok()
        .await
        .context("failed to respond to WebTransport request")?;

    // Perform the MoQ handshake.
    let request = moq_transport::session::Server::accept(session)
        .await
        .context("failed to accept handshake")?;

    let role = request.role();
    debug!(id, ?role, "received MoQ SETUP");

    let Role::Subscriber = role else {
            debug!(id, "abort: only subscriber role is supported (requested {role:?})");
            request.reject(300);
            return Ok(());
    };
    debug!(id, "accepting subscriber request");
    let session = request.publisher(subscriber).await?;
    session.run().await?;

    debug!("closing connection: id={}", id);
    Ok(())
}

async fn subscribe<W: AsyncWrite + Unpin + Send + 'static>(
    endpoint: MagicEndpoint,
    output: W,
    url: CastUrl,
) -> Result<()> {
    let (publisher, subscriber) = broadcast::new("");
    let mut media = moq_sub::media::Media::new(subscriber, output).await?;

    let conn = endpoint
        .connect(url.node_addr().clone(), webtransport_quinn::ALPN)
        .await?;
    let session = webtransport_quinn::connect_with(conn, &url.to_fake_https_url()).await?;
    debug!("WebTransport session established");

    let session = moq_transport::session::Client::subscriber(session, publisher)
        .await
        .context("failed to create MoQ Transport session")?;
    debug!("MoQ transport session established");

    tokio::select! {
        res = session.run() => res.context("session error")?,
        res = media.run() => res.context("media error")?,
    }

    Ok(())
}

async fn bind_magic_endpoint() -> Result<MagicEndpoint> {
    let port: u16 = match std::env::var("IROH_BIND_PORT") {
        Ok(s) => s
            .parse()
            .context("Port number from IROH_BIND_PORT is invalid")?,
        _ => 0,
    };
    let secret_key = match std::env::var("IROH_NODE_SECRET") {
        Ok(s) => SecretKey::from_str(&s)
            .context("Secret key from IROH_NODE_SECRET environment variable is invalid")?,
        Err(_) => {
            let key = SecretKey::generate();
            println!(
                "Generated a new secret key. To reuse the identity, set this environment variable:"
            );
            println!("IROH_NODE_SECRET={key}");
            key
        }
    };
    iroh_net::MagicEndpoint::builder()
        .secret_key(secret_key)
        .alpns(vec![webtransport_quinn::ALPN.to_vec()])
        .bind(port)
        .await
}
