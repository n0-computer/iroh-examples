use std::net::SocketAddr;
use std::str::FromStr;
use std::sync::OnceLock;

use bytes::Bytes;
use http_body_util::{combinators::BoxBody, BodyExt, Empty, Full};
use hyper::client::conn::http1::Builder;
use hyper::server::conn::http1;
use hyper::service::service_fn;
use hyper::upgrade::Upgraded;
use hyper::{Method, Request, Response};

use hyper_util::rt::TokioIo;
use iroh_net::{MagicEndpoint, NodeAddr, AddrInfo};
use tokio::net::{TcpListener, TcpStream};

mod quinn_endpoint;

// To try this example:
// 1. cargo run --example http_proxy
// 2. config http_proxy in command line
//    $ export http_proxy=http://127.0.0.1:8100
//    $ export https_proxy=http://127.0.0.1:8100
// 3. send requests
//    $ curl -i https://www.some_domain.com/
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {

    let endpoint = MagicEndpoint::builder().bind(0).await?;
    ENDPOINT.set(endpoint).unwrap();

    let addr = SocketAddr::from(([127, 0, 0, 1], 8100));

    let listener = TcpListener::bind(addr).await?;
    println!("Listening on http://{}", addr);

    loop {
        let (stream, _) = listener.accept().await?;
        let io = TokioIo::new(stream);

        tokio::task::spawn(async move {
            if let Err(err) = http1::Builder::new()
                .preserve_header_case(true)
                .title_case_headers(true)
                .serve_connection(io, service_fn(proxy))
                .with_upgrades()
                .await
            {
                println!("Failed to serve connection: {:?}", err);
            }
        });
    }
}

const DUMBPIPE: &'static [u8] = b"DUMBPIPEV0";

fn error(code: http::StatusCode, text: &'static str, ) -> Response<BoxBody<Bytes, hyper::Error>> {
    let mut resp: Response<BoxBody<Bytes, hyper::Error>> = Response::new(full(text));
    *resp.status_mut() = code;
    resp
}

static ENDPOINT: OnceLock<MagicEndpoint> = OnceLock::new();
fn endpoint() -> &'static MagicEndpoint {
    ENDPOINT.get().unwrap()
}

async fn proxy(
    req: Request<hyper::body::Incoming>,
) -> anyhow::Result<Response<BoxBody<Bytes, hyper::Error>>> {
    println!("req: {:?}", req);

    if Method::CONNECT == req.method() {
        // Received an HTTP request like:
        // ```
        // CONNECT www.domain.com:443 HTTP/1.1
        // Host: www.domain.com:443
        // Proxy-Connection: Keep-Alive
        // ```
        //
        // When HTTP method is CONNECT we should return an empty body
        // then we can eventually upgrade the connection and talk a new protocol.
        //
        // Note: only after client received an empty body with STATUS_OK can the
        // connection be upgraded, so we can't return a response inside
        // `on_upgrade` future.
        if let Some(addr) = host_addr(req.uri()) {
            tokio::task::spawn(async move {
                match hyper::upgrade::on(req).await {
                    Ok(upgraded) => {
                        if let Err(e) = tunnel(upgraded, addr).await {
                            eprintln!("server io error: {}", e);
                        };
                    }
                    Err(e) => eprintln!("upgrade error: {}", e),
                }
            });

            Ok(Response::new(empty()))
        } else {
            return Ok(error(http::StatusCode::BAD_REQUEST, "CONNECT must be to a socket address"));
        }
    } else {
        let Some((_, hostname)) = req.headers().iter().find(|(name, _value)| name.as_str() == "host") else {
            return Ok(error(http::StatusCode::BAD_REQUEST, "missing host header"));
        };
        let Ok(hostname) = hostname.to_str() else {
            return Ok(error(http::StatusCode::BAD_REQUEST, "invalid host header"));
        };
        let parts = hostname.split(".").collect::<Vec<_>>();
        if parts.len() != 2 {
            return Ok(error(http::StatusCode::BAD_REQUEST, "invalid host header"));
        }
        let Ok(node_id) = iroh_net::NodeId::from_str(parts[0]) else {
            return Ok(error(http::StatusCode::BAD_REQUEST, "invalid host header. subdomain must be a valid node id"));
        };
        let node_addr = NodeAddr {
            node_id,
            info: AddrInfo {
                derp_region: Some(2),
                direct_addresses: Default::default(),
            },
        };
        println!("connecting to node: {:?}", node_addr);
        let conn = endpoint().connect(node_addr, DUMBPIPE).await?;
        println!("opening bi stream");
        let (mut send, recv) = conn.open_bi().await?;
        println!("got bidi stream");
        send.write_all(b"hello").await?;
        let stream = quinn_endpoint::QuinnEndpoint { send, recv };
        let io = TokioIo::new(stream);

        let (mut sender, conn) = Builder::new()
            .preserve_header_case(true)
            .title_case_headers(true)
            .handshake(io)
            .await?;
        tokio::task::spawn(async move {
            if let Err(err) = conn.await {
                println!("Connection failed: {:?}", err);
            }
        });

        let resp = sender.send_request(req).await?;
        Ok(resp.map(|b| b.boxed()))
    }
}

fn host_addr(uri: &http::Uri) -> Option<String> {
    uri.authority().and_then(|auth| Some(auth.to_string()))
}

fn empty() -> BoxBody<Bytes, hyper::Error> {
    Empty::<Bytes>::new()
        .map_err(|never| match never {})
        .boxed()
}

fn full<T: Into<Bytes>>(chunk: T) -> BoxBody<Bytes, hyper::Error> {
    Full::new(chunk.into())
        .map_err(|never| match never {})
        .boxed()
}

// Create a TCP connection to host:port, build a tunnel between the connection and
// the upgraded connection
async fn tunnel(upgraded: Upgraded, addr: String) -> std::io::Result<()> {
    // Connect to remote server
    let mut server = TcpStream::connect(addr).await?;
    let mut upgraded = TokioIo::new(upgraded);

    // Proxying data
    let (from_client, from_server) =
        tokio::io::copy_bidirectional(&mut upgraded, &mut server).await?;

    // Print message when done
    println!(
        "client wrote {} bytes and received {} bytes",
        from_client, from_server
    );

    Ok(())
}
