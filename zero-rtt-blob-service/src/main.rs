//! A tiny content-addressed blob service over an iroh QUIC connection.
//!
//! Companion to the address-validation-tokens blog post — demonstrates how
//! `NEW_TOKEN` tokens, 0-RTT data, and the server's 3x anti-amplification
//! budget interact.
//!
//! Protocol on each bi-stream:
//!   PUT  (0x00) || data_bytes (<= 10 KiB)  -> blake3(data) (32 bytes)
//!   GET  (0x01) || hash_32_bytes           -> data_bytes  (or empty)
//!
//! Storage: in-memory `HashMap`. Wiped on server restart.

use std::{
    env,
    str::FromStr,
    sync::Arc,
    time::{Duration, Instant},
};

use blake3::Hash;
use bytes::Bytes;
use clap::{Parser, Subcommand};
use data_encoding::HEXLOWER;
use iroh::{
    EndpointAddr, RelayMode, SecretKey, TransportAddr,
    endpoint::{
        Connection, Endpoint, Incoming, PathId, QuicTransportConfig, RecvStream, SendStream,
        ServerConfig, ValidationTokenConfig, ZeroRttStatus, presets,
    },
};
use iroh_tickets::endpoint::EndpointTicket;
use n0_error::{Result, StdResultExt};
use noq_proto::{BloomTokenLog, NoneTokenLog};
use papaya::HashMap;
use tokio::io::{AsyncReadExt, AsyncWriteExt};
use tracing::{info, trace};

const ALPN: &[u8] = b"zero-rtt-blob-service/v1";
const MAX_BLOB: usize = 10 * 1024;
const TAG_PUT: u8 = 0x00;
const TAG_GET: u8 = 0x01;
const TOKENS_PER_VALIDATION: u32 = 2;
const TOKEN_LIFETIME: Duration = Duration::from_secs(14 * 24 * 60 * 60); // 2 weeks

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

#[derive(Parser)]
#[command(name = "zero-rtt-blob-service")]
struct Args {
    #[command(subcommand)]
    mode: Mode,
}

#[derive(Subcommand)]
enum Mode {
    /// Run a server that stores blobs in memory.
    Server(ServerArgs),
    /// Run a client that uploads or downloads a blob.
    Client(ClientArgs),
}

#[derive(Parser)]
struct ServerArgs {
    /// Disable issuance of NEW_TOKEN validation tokens.
    #[clap(long)]
    no_tokens: bool,
}

#[derive(Parser)]
struct ClientArgs {
    #[command(subcommand)]
    op: ClientOp,
}

#[derive(Subcommand)]
enum ClientOp {
    /// Upload up to 10 KiB of data from stdin, then re-GET it for the remaining
    /// rounds. Prints the BLAKE3 hash.
    Put {
        #[command(flatten)]
        common: CommonArgs,
    },
    /// Download the blob with the given hex-encoded BLAKE3 hash to stdout.
    Get {
        #[command(flatten)]
        common: CommonArgs,
        /// Hex-encoded BLAKE3 hash to download.
        hash: String,
    },
}

/// Arguments shared by every client operation, flattened into each subcommand so
/// the ticket and flags come *after* `put`/`get` (e.g. `client put <ticket> -n 10`).
#[derive(clap::Args)]
struct CommonArgs {
    /// Ticket of the server to connect to. Must contain at least one IP address —
    /// relay-only tickets are refused because 0-RTT via a relay isn't interesting here.
    ticket: String,

    /// Number of requests to run: round 0 (cold full handshake) plus the 0-RTT rounds.
    #[clap(short = 'n', long = "rounds", default_value = "2")]
    n: u32,
}

// ---------------------------------------------------------------------------
// Server
// ---------------------------------------------------------------------------

async fn run_server(args: ServerArgs) -> Result<()> {
    // Leave relays and address discovery (QAD) enabled on the server: that's how it
    // learns its own public address (including behind 1:1 NAT) so the ticket carries
    // a reachable direct address. It doesn't affect the measurement — the ticket is
    // built from IP addresses only (see `wait_for_ip_addr`), and the client runs with
    // relays disabled, so the client always dials the server directly.
    let endpoint = Endpoint::builder(presets::N0)
        .alpns(vec![ALPN.to_vec()])
        .transport_config(server_transport_config("zero-rtt-blob-service-server"))
        .secret_key(get_or_generate_secret_key()?)
        .bind()
        .await?;
    let ip_addr = wait_for_ip_addr(&endpoint).await?;
    eprintln!(
        "direct addresses: {:?}",
        ip_addr.ip_addrs().copied().collect::<Vec<_>>()
    );
    println!("ticket: {}", EndpointTicket::from(ip_addr));

    let server_config = Arc::new(make_server_config(&endpoint, !args.no_tokens));
    let store: Arc<HashMap<Hash, Bytes>> = Arc::new(HashMap::new());

    let accept = async move {
        while let Some(incoming) = endpoint.accept().await {
            let store = store.clone();
            let cfg = server_config.clone();
            tokio::spawn(async move {
                if let Err(e) = serve_connection(incoming, cfg, store).await {
                    trace!("connection ended: {e:?}");
                }
            });
        }
    };
    tokio::select! {
        _ = accept => info!("accept finished"),
        _ = tokio::signal::ctrl_c() => info!("Ctrl-C received"),
    }
    Ok(())
}

async fn wait_for_ip_addr(endpoint: &Endpoint) -> Result<EndpointAddr> {
    let deadline = Instant::now() + Duration::from_secs(10);
    loop {
        let addr = endpoint.addr();
        let ip_addr = EndpointAddr::from_parts(
            addr.id,
            addr.ip_addrs().copied().map(TransportAddr::Ip),
        );
        if !ip_addr.is_empty() {
            return Ok(ip_addr);
        }
        if Instant::now() >= deadline {
            n0_error::bail_any!("timed out waiting for local IP addresses");
        }
        tokio::time::sleep(Duration::from_millis(200)).await;
    }
}

/// Build the server config.
///
/// With `tokens` enabled, the server issues `NEW_TOKEN` address-validation tokens
/// and validates the ones clients present (via [`BloomTokenLog`]), which lifts the
/// 3x anti-amplification limit on 0-RTT connections so large 0.5-RTT responses
/// flow immediately.
///
/// With `tokens` disabled (`--no-tokens`) the server neither issues (`sent` = 0)
/// nor validates ([`NoneTokenLog`] ignores any token a client presents), so every
/// 0-RTT connection's address stays unvalidated until the handshake completes and
/// a large 0.5-RTT response stalls on the 3x budget. Note that the default config
/// (`ValidationTokenConfig::default()`, used by `Incoming::accept`) issues and
/// validates by default, so we must set this explicitly rather than rely on it.
fn make_server_config(endpoint: &Endpoint, tokens: bool) -> ServerConfig {
    let mut validation_token = ValidationTokenConfig::default();
    if tokens {
        validation_token
            .log(Arc::new(BloomTokenLog::default()))
            .sent(TOKENS_PER_VALIDATION)
            .lifetime(TOKEN_LIFETIME);
    } else {
        validation_token.log(Arc::new(NoneTokenLog)).sent(0);
    }
    endpoint
        .create_server_config_builder(vec![ALPN.to_vec()])
        .set_validation_token_config(validation_token)
        .build()
}

async fn serve_connection(
    incoming: Incoming,
    server_config: Arc<ServerConfig>,
    store: Arc<HashMap<Hash, Bytes>>,
) -> Result<()> {
    let accepting = incoming.accept_with(server_config).anyerr()?;
    let conn = accepting.into_0rtt();
    while let Ok((send, recv)) = conn.accept_bi().await {
        let store = store.clone();
        tokio::spawn(async move {
            if let Err(e) = handle_request(send, recv, &store).await {
                trace!("request error: {e:?}");
            }
        });
    }
    conn.closed().await;
    Ok(())
}

async fn handle_request(
    mut send: SendStream,
    mut recv: RecvStream,
    store: &HashMap<Hash, Bytes>,
) -> Result<()> {
    let req = recv.read_to_end(1 + MAX_BLOB).await.anyerr()?;
    let Some((&tag, body)) = req.split_first() else {
        return Ok(());
    };
    match tag {
        TAG_PUT => {
            let hash = blake3::hash(body);
            store.pin().insert(hash, Bytes::copy_from_slice(body));
            send.write_all(hash.as_bytes()).await.anyerr()?;
        }
        TAG_GET => {
            let Ok(bytes): std::result::Result<[u8; 32], _> = body.try_into() else {
                return Ok(());
            };
            let data = store.pin().get(&Hash::from_bytes(bytes)).cloned();
            if let Some(data) = data {
                send.write_all(&data).await.anyerr()?;
            }
        }
        _ => {}
    }
    send.finish().anyerr()
}

// ---------------------------------------------------------------------------
// Client
// ---------------------------------------------------------------------------

async fn run_client(args: ClientArgs) -> Result<()> {
    let (ticket, n) = match &args.op {
        ClientOp::Put { common } | ClientOp::Get { common, .. } => (&common.ticket, common.n),
    };
    let ticket = EndpointTicket::from_str(ticket).std_context("invalid ticket")?;
    let remote: EndpointAddr = ticket.into();
    if remote.ip_addrs().next().is_none() {
        n0_error::bail_any!("ticket has no IP addresses — this demo requires direct IP paths");
    }
    eprintln!(
        "dialing direct addresses: {:?}",
        remote.ip_addrs().copied().collect::<Vec<_>>()
    );

    let endpoint = client_endpoint().await?;

    match &args.op {
        ClientOp::Put { .. } => {
            let t0 = Instant::now();
            let request = build_put_request().await?;
            let hash_bytes = do_round(&endpoint, remote.clone(), request).await?;
            print_hash(&hash_bytes)?;
            eprintln!("put: {} us", t0.elapsed().as_micros());

            if n > 1 {
                let Ok(bytes): std::result::Result<[u8; 32], _> = hash_bytes.as_slice().try_into() else {
                    n0_error::bail_any!("expected 32-byte hash, got {} bytes", hash_bytes.len());
                };
                let hash = Hash::from_bytes(bytes);
                let request = build_get_request(&hash);
                for round in 1..n {
                    let t0 = Instant::now();
                    let resp = do_round(&endpoint, remote.clone(), request.clone()).await?;
                    // Don't dump the (potentially large) blob — just echo its hash so
                    // the round-trip is verifiable without flooding stdout.
                    println!("{}", blake3::hash(&resp).to_hex());
                    eprintln!("get {round}: {} us", t0.elapsed().as_micros());
                }
            }
        }
        ClientOp::Get { hash, .. } => {
            let request = build_get_request(&parse_hash(hash)?);
            for round in 0..n {
                let t0 = Instant::now();
                let resp = do_round(&endpoint, remote.clone(), request.clone()).await?;
                tokio::io::stdout().write_all(&resp).await.anyerr()?;
                eprintln!("get {round}: {} us", t0.elapsed().as_micros());
            }
        }
    }
    endpoint.close().await;
    Ok(())
}

async fn client_endpoint() -> Result<Endpoint> {
    let ep = Endpoint::builder(presets::N0)
        .transport_config(qlog_transport_config("zero-rtt-blob-service-client"))
        .relay_mode(RelayMode::Disabled)
        .clear_address_lookup()
        .bind()
        .await?;
    Ok(ep)
}

fn qlog_transport_config(prefix: &str) -> QuicTransportConfig {
    QuicTransportConfig::builder()
        .qlog_from_env(prefix)
        .build()
}

/// Server transport config: qlog plus a deliberately huge initial congestion
/// window.
///
/// QUIC's pacer spreads roughly one congestion window over one RTT, and its
/// per-burst capacity is `window * 2ms / RTT`. At a ~250 ms RTT the default
/// ~14 KiB window dribbles a multi-packet response out one packet every ~20 ms,
/// which buries the 0-RTT / token win under congestion-control pacing. Our
/// responses are bounded at `MAX_BLOB` (16 KiB), so we set a window large enough
/// (`16 KiB * RTT / 2ms` ≈ 2 MiB; we use a round 8 MiB for margin) that the pacer
/// bursts the whole response in a single flight. Only ever 16 KiB actually flies.
///
/// This is a DEMO setting on a known-good path. A real server facing arbitrary
/// clients must not do this — see the anti-amplification and congestion-fairness
/// caveats. It does not affect the token A/B: an unvalidated (no-token) connection
/// is still capped at the 3x amplification budget regardless of the window.
fn server_transport_config(prefix: &str) -> QuicTransportConfig {
    let mut congestion = noq_proto::congestion::NewRenoConfig::default();
    congestion.initial_window(8 * 1024 * 1024);
    QuicTransportConfig::builder()
        .qlog_from_env(prefix)
        .congestion_controller_factory(Arc::new(congestion))
        .build()
}

async fn do_round(endpoint: &Endpoint, remote: EndpointAddr, request: Bytes) -> Result<Vec<u8>> {
    let connecting = endpoint
        .connect_with_opts(remote, ALPN, Default::default())
        .await?;
    let (conn, resp) = match connecting.into_0rtt() {
        Ok(zrtt) => {
            let (send, mut recv) = zrtt.open_bi().await.anyerr()?;
            // Queue the request as 0-RTT early data *before* driving the handshake
            // to completion. The earlier version spawned this write and raced it
            // against `handshake_completed()` — the handshake almost always won, so
            // the bytes were flushed only once 1-RTT keys existed and went out in a
            // 1-RTT packet. The server still reports "0-RTT accepted" (resumption
            // was accepted), but no early data ever actually rides on the wire.
            // Writing inline and awaiting it guarantees the bytes are buffered as
            // 0-RTT data first. This matches iroh's own 0-RTT test.
            write_request(send, request.clone()).await?;
            let recv_t0 = Instant::now();
            match zrtt.handshake_completed().await? {
                ZeroRttStatus::Accepted(conn) => {
                    println!("0-RTT accepted");
                    (conn, read_response(&mut recv, recv_t0).await?)
                }
                ZeroRttStatus::Rejected(conn) => {
                    println!("0-RTT rejected; retrying on a fresh stream");
                    let resp = roundtrip(&conn, &request).await?;
                    (conn, resp)
                }
            }
        }
        Err(connecting) => {
            println!("0-RTT not possible from our side");
            let conn = connecting.await.anyerr()?;
            let resp = roundtrip(&conn, &request).await?;
            (conn, resp)
        }
    };
    // Don't close the connection right away. Right after the handshake the server
    // sends a couple of `NewSessionTicket` messages, and those resumption tickets
    // are exactly what makes the *next* connection eligible for 0-RTT. The ticket
    // typically arrives in the same flight as the response, so closing here would
    // race the connection driver and tear things down before the ticket is stored
    // in the session cache — leaving every subsequent round stuck at 1-RTT.
    //
    // Instead, hand the connection off to a background task that lingers for a
    // couple of RTTs so the driver can ingest the ticket, then closes cleanly. The
    // request itself has already completed, so this doesn't add to the round's
    // latency.
    let linger = conn
        .rtt(PathId::ZERO)
        .map(|rtt| rtt * 2)
        .unwrap_or_else(|| Duration::from_millis(100));
    tokio::spawn(async move {
        tokio::time::sleep(linger).await;
        conn.close(0u8.into(), b"");
    });
    Ok(resp)
}

async fn roundtrip(conn: &Connection, request: &[u8]) -> Result<Vec<u8>> {
    let (mut send, mut recv) = conn.open_bi().await.anyerr()?;
    send.write_all(request).await.anyerr()?;
    send.finish().anyerr()?;
    let recv_t0 = Instant::now();
    read_response(&mut recv, recv_t0).await
}

/// Read a response to its end, logging each chunk's arrival time relative to `t0`
/// (when the request was sent). A stall in the response stream — e.g. the
/// anti-amplification stall when no validation token is presented — shows up as a
/// gap between consecutive lines, while smooth pacing shows up as evenly spaced
/// lines a few ms apart.
async fn read_response(recv: &mut RecvStream, t0: Instant) -> Result<Vec<u8>> {
    let mut data = Vec::new();
    let mut buf = [0u8; 4096];
    while let Some(n) = recv.read(&mut buf).await.anyerr()? {
        data.extend_from_slice(&buf[..n]);
        eprintln!(
            "  recv +{:>6} us | +{:>5} B | {:>6} B total",
            t0.elapsed().as_micros(),
            n,
            data.len()
        );
        if data.len() > MAX_BLOB {
            n0_error::bail_any!("response exceeds {MAX_BLOB} bytes");
        }
    }
    Ok(data)
}

async fn write_request(mut send: SendStream, request: Bytes) -> Result<()> {
    send.write_all(&request).await.anyerr()?;
    send.finish().anyerr()
}

async fn build_put_request() -> Result<Bytes> {
    let mut buf = vec![TAG_PUT];
    tokio::io::stdin().read_to_end(&mut buf).await.anyerr()?;
    if buf.len() - 1 > MAX_BLOB {
        n0_error::bail_any!("blob exceeds {MAX_BLOB} bytes");
    }
    Ok(buf.into())
}

fn build_get_request(hash: &Hash) -> Bytes {
    let mut buf = vec![TAG_GET];
    buf.extend_from_slice(hash.as_bytes());
    buf.into()
}

fn print_hash(resp: &[u8]) -> Result<()> {
    let Ok(bytes): std::result::Result<[u8; 32], _> = resp.try_into() else {
        n0_error::bail_any!("expected 32-byte hash, got {} bytes", resp.len());
    };
    println!("{}", Hash::from_bytes(bytes).to_hex());
    Ok(())
}

fn parse_hash(s: &str) -> Result<Hash> {
    let bytes = HEXLOWER
        .decode(s.as_bytes())
        .std_context("invalid hex")?;
    let array: [u8; 32] = bytes
        .as_slice()
        .try_into()
        .std_context("hash must be 32 bytes")?;
    Ok(Hash::from_bytes(array))
}

// ---------------------------------------------------------------------------
// Misc
// ---------------------------------------------------------------------------

fn get_or_generate_secret_key() -> Result<SecretKey> {
    if let Ok(secret) = env::var("IROH_SECRET") {
        SecretKey::from_str(&secret).std_context("Invalid IROH_SECRET")
    } else {
        let key = SecretKey::generate();
        eprintln!(
            "Generated new secret key: {}",
            HEXLOWER.encode(&key.to_bytes())
        );
        eprintln!("Set IROH_SECRET to reuse this key.");
        Ok(key)
    }
}

#[tokio::main]
async fn main() -> Result<()> {
    tracing_subscriber::fmt::init();
    match Args::parse().mode {
        Mode::Server(args) => run_server(args).await,
        Mode::Client(args) => run_client(args).await,
    }
}
