use anyhow::{Context, Result};
use clap::{Parser, ValueEnum};
use iroh_net::{ticket::NodeTicket, MagicEndpoint};
use moq_transport::{cache::broadcast, setup::Role};
use tokio::{io::AsyncRead, task::JoinSet};
use tracing::{debug, warn};

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
    Pub(PubOpts),
    Sub(SubOpts),
    Relay,
}

#[derive(Debug, Parser)]
struct PubOpts {
    /// Relays to publish to (must be iroh: cast URLs)
    relays: Vec<CastUrl>,

    /// Input
    #[clap(short, long, default_value_t = PubInput::Camera)]
    #[arg(value_enum)]
    input: PubInput,

    /// Accept direct connections (default: false)
    #[clap(short, long)]
    accept: bool,
}

#[derive(ValueEnum, Clone, Debug)]
enum PubInput {
    /// Camera and default audio
    Camera,
    /// mp4 via stdin
    Stdin,
}

#[derive(Debug, Parser)]
struct SubOpts {
    target: CastUrl,
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    tracing_subscriber::fmt::init();
    let cli = Cli::parse();

    match cli.command {
        Command::Pub(opts) => {
            match opts.input {
                PubInput::Stdin => {
                    let input = tokio::io::stdin();
                    publish(input, opts.relays, opts.accept).await?;
                }
                PubInput::Camera => {
                    // ensure_ffmpeg_installed().await?;
                    // start capturing input
                    let input = ffmpeg::publish()?;
                    publish(input, opts.relays, opts.accept).await?;
                }
            }
        }
        Command::Sub(opts) => {
            // ensure_ffmpeg_installed().await?;
            subscribe(opts.target).await?;
        }
        Command::Relay => relay::run().await?,
    }
    Ok(())
}

async fn publish(
    input: impl AsyncRead + Unpin + Send + 'static,
    targets: Vec<CastUrl>,
    accept: bool,
) -> anyhow::Result<()> {
    let mut tasks = JoinSet::new();

    // start media task
    let (publisher, subscriber) = broadcast::new("");
    let mut media = moq_pub::media::Media::new(input, publisher).await?;
    tasks.spawn(async move { media.run().await });

    // bind magic endpoint
    let endpoint = bind_magic_endpoint().await?;

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
        let url = CastUrl::new(NodeTicket::new(my_addr)?, "dev".to_string());
        println!("Accepting direct subscribe requests on URL:\n{url}");
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

async fn subscribe(target: CastUrl) -> Result<()> {
    let out = ffmpeg::subscribe()?;
    let (publisher, subscriber) = broadcast::new("");
    let mut media = moq_sub::media::Media::new(subscriber, out).await?;
    let endpoint = bind_magic_endpoint().await?;

    let conn = endpoint
        .connect(target.node_addr().clone(), webtransport_quinn::ALPN)
        .await?;
    let session = webtransport_quinn::connect_with(conn, &target.to_fake_https_url()).await?;
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
    iroh_net::MagicEndpoint::builder()
        .alpns(vec![webtransport_quinn::ALPN.to_vec()])
        .bind(0)
        .await
}
