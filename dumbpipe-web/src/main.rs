use std::str::FromStr;
use std::sync::OnceLock;

use anyhow::Context;
use bytes::Bytes;
use clap::Parser;
use http_body_util::{combinators::BoxBody, BodyExt, Full};
use hyper::client::conn::http1::Builder;
use hyper::server::conn::http1;
use hyper::service::service_fn;
use hyper::{Request, Response};

use hyper_util::rt::TokioIo;
use iroh_net::key::SecretKey;
use iroh_net::{AddrInfo, MagicEndpoint, NodeAddr};
use tokio::net::TcpListener;

#[derive(Parser, Debug)]
pub struct Args {
    /// The addresses to listen on for incoming tcp connections.
    ///
    /// To listen on all network interfaces, use 0.0.0.0:12345
    #[clap(long, default_value = "0.0.0.0:8080")]
    pub addr: String,

    /// The port to use for the magicsocket. Random by default.
    #[clap(long, default_value_t = 0)]
    pub magic_port: u16,
}

/// Get the secret key or generate a new one.
///
/// Print the secret key to stderr if it was generated, so the user can save it.
fn get_or_create_secret() -> anyhow::Result<SecretKey> {
    match std::env::var("IROH_SECRET") {
        Ok(secret) => SecretKey::from_str(&secret).context("invalid secret"),
        Err(_) => {
            let key = SecretKey::generate();
            eprintln!("using secret key {}", key);
            Ok(key)
        }
    }
}

mod quinn_endpoint;

/// global magic endpoint
static ENDPOINT: OnceLock<MagicEndpoint> = OnceLock::new();
fn endpoint() -> &'static MagicEndpoint {
    ENDPOINT.get().unwrap()
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    tracing_subscriber::fmt::init();
    let args = Args::parse();
    let secret_key = get_or_create_secret()?;
    // Create a magic endpoint and set it as a global
    //
    // Done explicitly here because creation is async
    let endpoint = MagicEndpoint::builder()
        .secret_key(secret_key)
        .bind(args.magic_port)
        .await?;
    ENDPOINT.set(endpoint).expect("endpoint already set");

    // Create a tokio TCP listener for hyper
    let listener = TcpListener::bind(args.addr).await?;
    let local_addr = listener.local_addr()?;
    eprintln!("Listening on http://{}", local_addr);
    tracing::info!("Listening on http://{}", local_addr);

    loop {
        let (stream, remote_addr) = match listener.accept().await {
            Ok(x) => x,
            Err(err) => {
                tracing::warn!("failed to accept connection: {:?}", err);
                continue;
            }
        };
        tracing::info!("accepted connection from {remote_addr}");
        tokio::task::spawn(async move {
            if let Err(err) = http1::Builder::new()
                .preserve_header_case(true)
                .title_case_headers(true)
                .serve_connection(TokioIo::new(stream), service_fn(proxy))
                .with_upgrades()
                .await
            {
                tracing::warn!("Failed to serve connection: {:?}", err);
            }
        });
    }
}

fn bad_request(text: &'static str) -> anyhow::Result<Response<BoxBody<Bytes, hyper::Error>>> {
    let mut resp: Response<BoxBody<Bytes, hyper::Error>> = Response::new(full(text));
    *resp.status_mut() = http::StatusCode::BAD_REQUEST;
    Ok(resp)
}

fn parse_subdomain(subdomain: &str) -> anyhow::Result<NodeAddr> {
    // first try to parse as a node id
    if let Ok(node_id) = iroh_net::NodeId::from_str(subdomain) {
        return Ok(NodeAddr {
            node_id,
            info: AddrInfo {
                derp_url: Some("https://euw1-1.derp.iroh.network".parse().unwrap()),
                direct_addresses: Default::default(),
            },
        });
    }
    // then try to parse as a node ticket
    if let Ok(ticket) = dumbpipe::NodeTicket::from_str(subdomain) {
        return Ok(ticket.node_addr().clone());
    }
    Err(anyhow::anyhow!("invalid subdomain"))
}

async fn proxy(
    req: Request<hyper::body::Incoming>,
) -> anyhow::Result<Response<BoxBody<Bytes, hyper::Error>>> {
    let (_, hostname) = req
        .headers()
        .iter()
        .find(|(name, _value)| name.as_str() == "host")
        .context("missing host header")
        .context(http::StatusCode::BAD_REQUEST)?;
    let Ok(hostname) = hostname.to_str() else {
        return bad_request("invalid host header - not ascii");
    };
    let parts = hostname.split('.').collect::<Vec<_>>();
    if parts.len() < 2 {
        return bad_request("invalid host header - missing subdomain");
    }
    let Ok(node_addr) = parse_subdomain(parts[0]) else {
        return bad_request("invalid host header - subdomain is neither a node id nor a ticket");
    };
    tracing::info!("connecting to node: {:?}", node_addr);
    let conn = endpoint().connect(node_addr, dumbpipe::ALPN).await?;
    tracing::info!("opening bi stream");
    let (mut send, recv) = conn.open_bi().await?;
    tracing::info!("sending handshake");
    send.write_all(&dumbpipe::HANDSHAKE).await?;
    let stream = quinn_endpoint::QuinnEndpoint { send, recv };
    let io = TokioIo::new(stream);

    let (mut sender, conn) = Builder::new()
        .preserve_header_case(true)
        .title_case_headers(true)
        .handshake(io)
        .await?;
    tokio::task::spawn(async move {
        if let Err(err) = conn.await {
            tracing::warn!("Connection failed: {:?}", err);
        }
    });

    let resp = sender.send_request(req).await?;
    Ok(resp.map(|b| b.boxed()))
}

fn full<T: Into<Bytes>>(chunk: T) -> BoxBody<Bytes, hyper::Error> {
    Full::new(chunk.into())
        .map_err(|never| match never {})
        .boxed()
}
