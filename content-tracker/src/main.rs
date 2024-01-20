pub mod args;
pub mod io;
pub mod iroh_bytes_util;
pub mod options;
pub mod protocol;
pub mod tracker;

use std::{
    collections::BTreeSet,
    net::{Ipv4Addr, SocketAddr, SocketAddrV4},
    str::FromStr,
    sync::{
        atomic::{AtomicBool, Ordering},
        Arc,
    },
    time::{Duration, Instant},
};

use clap::Parser;
use io::CONFIG_DEFAULTS_FILE;
use iroh::net::{
    magic_endpoint::{get_alpn, get_remote_node_id},
    MagicEndpoint,
};
use iroh::util::fs::load_secret_key;
use iroh_pkarr_node_discovery::PkarrNodeDiscovery;
use pkarr::PkarrClient;
use tokio_util::task::LocalPoolHandle;

use crate::{
    args::{AnnounceArgs, Args, Commands, QueryArgs, ServerArgs},
    io::{load_from_file, setup_logging, tracker_home, tracker_path, CONFIG_FILE, SERVER_KEY_FILE},
    options::Options,
    protocol::{
        Announce, AnnounceKind, Query, QueryFlags, Request, Response, REQUEST_SIZE_LIMIT,
        TRACKER_ALPN,
    },
    tracker::Tracker,
};

pub type NodeId = iroh::net::key::PublicKey;

#[derive(Debug, Clone, PartialEq, Eq, Hash, PartialOrd, Ord)]
pub enum TrackerId {
    NodeId(NodeId),
    Addr(SocketAddr),
}

impl std::fmt::Display for TrackerId {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            TrackerId::NodeId(node_id) => write!(f, "{}", node_id),
            TrackerId::Addr(addr) => write!(f, "{}", addr),
        }
    }
}

impl FromStr for TrackerId {
    type Err = anyhow::Error;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        if let Ok(node_id) = s.parse() {
            return Ok(TrackerId::NodeId(node_id));
        }
        if let Ok(addr) = s.parse() {
            return Ok(TrackerId::Addr(addr));
        }
        anyhow::bail!("invalid tracker id")
    }
}

static VERBOSE: AtomicBool = AtomicBool::new(false);

fn set_verbose(verbose: bool) {
    VERBOSE.store(verbose, Ordering::Relaxed);
}

pub fn verbose() -> bool {
    VERBOSE.load(Ordering::Relaxed)
}

#[macro_export]
macro_rules! log {
    ($($arg:tt)*) => {
        if $crate::verbose() {
            println!($($arg)*);
        }
    };
}

/// Wait until the endpoint has figured out it's own DERP region.
async fn await_derp_region(endpoint: &MagicEndpoint) -> anyhow::Result<()> {
    let t0 = Instant::now();
    loop {
        let addr = endpoint.my_addr().await?;
        if addr.derp_url().is_some() {
            break;
        }
        if t0.elapsed() > Duration::from_secs(10) {
            anyhow::bail!("timeout waiting for DERP region");
        }
        tokio::time::sleep(Duration::from_millis(50)).await;
    }
    Ok(())
}

async fn create_endpoint(
    key: iroh::net::key::SecretKey,
    port: u16,
    publish: bool,
) -> anyhow::Result<MagicEndpoint> {
    let pkarr = PkarrClient::new();
    let discovery_key = if publish { Some(&key) } else { None };
    let mainline_discovery = PkarrNodeDiscovery::new(pkarr, discovery_key);
    iroh::net::MagicEndpoint::builder()
        .secret_key(key)
        .discovery(Box::new(mainline_discovery))
        .alpns(vec![TRACKER_ALPN.to_vec()])
        .bind(port)
        .await
}

/// Accept an incoming connection and extract the client-provided [`NodeId`] and ALPN protocol.
pub async fn accept_conn(
    mut conn: quinn::Connecting,
) -> anyhow::Result<(NodeId, String, quinn::Connection)> {
    let alpn = get_alpn(&mut conn).await?;
    let conn = conn.await?;
    let peer_id = get_remote_node_id(&conn)?;
    Ok((peer_id, alpn, conn))
}

/// Write default options to a sample config file.
fn write_defaults() -> anyhow::Result<()> {
    let default_path = tracker_path(CONFIG_DEFAULTS_FILE)?;
    crate::io::save_to_file(Options::default(), &default_path)?;
    Ok(())
}

async fn server(args: ServerArgs) -> anyhow::Result<()> {
    set_verbose(!args.quiet);
    let tpc = LocalPoolHandle::new(2);
    let home = tracker_home()?;
    log!("tracker starting using {}", home.display());
    let key_path = tracker_path(SERVER_KEY_FILE)?;
    let key = load_secret_key(key_path).await?;
    let endpoint = create_endpoint(key.clone(), args.magic_port, true).await?;
    let config_path = tracker_path(CONFIG_FILE)?;
    write_defaults()?;
    let mut options = load_from_file::<Options>(&config_path)?;
    options.make_paths_relative(&home);
    let db = Tracker::new(options)?;
    await_derp_region(&endpoint).await?;
    let addr = endpoint.my_addr().await?;
    log!("listening on {:?}", addr);
    log!("tracker addr: {}\n", addr.node_id);
    log!("usage:");
    log!("tracker announce --tracker {} <tickets>", addr.node_id);
    log!(
        "tracker query --tracker {} <hash> or <ticket>",
        addr.node_id
    );
    log!();
    let db2 = db.clone();
    let db3 = db.clone();
    let endpoint2 = endpoint.clone();
    let _probe_task = tpc.spawn_pinned(move || db2.probe_loop(endpoint2));
    let magic_accept_task = tokio::spawn(db.magic_accept_loop(endpoint));
    let server_config = configure_server(&key)?;
    let bind_addr = SocketAddr::V4(SocketAddrV4::new(Ipv4Addr::UNSPECIFIED, args.quinn_port));
    let quinn_endpoint = quinn::Endpoint::server(server_config, bind_addr)?;
    let quinn_accept_task = tokio::spawn(db3.quinn_accept_loop(quinn_endpoint));
    magic_accept_task.await??;
    quinn_accept_task.await??;
    Ok(())
}

async fn announce(args: AnnounceArgs) -> anyhow::Result<()> {
    set_verbose(true);
    // todo: uncomment once the connection problems are fixed
    // for now, a random node id is more reliable.
    // let key = load_secret_key(tracker_path(CLIENT_KEY)?).await?;
    let key = iroh::net::key::SecretKey::generate();
    let endpoint = create_endpoint(key, 11112, false).await?;
    log!("announce {:?}", args);
    log!("trying to connect to {:?}", args.tracker);
    let connection = endpoint
        .connect_by_node_id(&args.tracker, TRACKER_ALPN)
        .await?;
    log!("connected to {:?}", connection.remote_address());
    let (mut send, mut recv) = connection.open_bi().await?;
    log!("opened bi stream");
    let kind = if args.partial {
        AnnounceKind::Partial
    } else {
        AnnounceKind::Complete
    };
    let host = if let Some(host) = args.host {
        host
    } else {
        let hosts = args
            .content
            .iter()
            .filter_map(|x| x.host())
            .collect::<BTreeSet<_>>();
        if hosts.len() != 1 {
            anyhow::bail!(
                "content for all tickets must be from the same host, unless a host is specified"
            );
        }
        *hosts.iter().next().unwrap()
    };
    let content = args.content.iter().map(|x| x.hash_and_format()).collect();
    let announce = Announce {
        host,
        kind,
        content,
    };
    let request = Request::Announce(announce);
    let request = postcard::to_stdvec(&request)?;
    log!("sending announce");
    send.write_all(&request).await?;
    send.finish().await?;
    let _response = recv.read_to_end(REQUEST_SIZE_LIMIT).await?;
    Ok(())
}

async fn query(args: QueryArgs) -> anyhow::Result<()> {
    set_verbose(true);
    match args.tracker {
        TrackerId::Addr(tracker) => query_quinn(args, tracker).await,
        TrackerId::NodeId(tracker) => query_magic(args, tracker).await,
    }
}

async fn query_magic(args: QueryArgs, tracker: NodeId) -> anyhow::Result<()> {
    // todo: uncomment once the connection problems are fixed
    // for now, a random node id is more reliable.
    // let key = load_secret_key(tracker_path(CLIENT_KEY)?).await?;
    let key = iroh::net::key::SecretKey::generate();
    let endpoint = create_endpoint(key, args.port.unwrap_or_default(), false).await?;
    let query = Query {
        content: args.content.hash_and_format(),
        flags: QueryFlags {
            complete: !args.partial,
            verified: args.verified,
        },
    };
    log!("trying to connect to tracker at {:?}", tracker);
    let connection = endpoint.connect_by_node_id(&tracker, TRACKER_ALPN).await?;
    log!("connected to {:?}", connection.remote_address());
    let (mut send, mut recv) = connection.open_bi().await?;
    log!("opened bi stream");
    let request = Request::Query(query);
    let request = postcard::to_stdvec(&request)?;
    log!("sending query");
    send.write_all(&request).await?;
    send.finish().await?;
    let response = recv.read_to_end(REQUEST_SIZE_LIMIT).await?;
    let response = postcard::from_bytes::<Response>(&response)?;
    match response {
        Response::QueryResponse(response) => {
            log!("content {}", response.content);
            for peer in response.hosts {
                log!("- peer {}", peer);
            }
        }
    }
    Ok(())
}

async fn query_quinn(args: QueryArgs, tracker: SocketAddr) -> anyhow::Result<()> {
    // todo: uncomment once the connection problems are fixed
    // for now, a random node id is more reliable.
    // let key = load_secret_key(tracker_path(CLIENT_KEY)?).await?;
    let bind_addr = SocketAddr::V4(SocketAddrV4::new(Ipv4Addr::UNSPECIFIED, 0));
    let endpoint = create_quinn_client(bind_addr, vec![TRACKER_ALPN.to_vec()], false)?;
    let query = Query {
        content: args.content.hash_and_format(),
        flags: QueryFlags {
            complete: !args.partial,
            verified: args.verified,
        },
    };
    log!("trying to connect to tracker at {:?}", tracker);
    let connection = endpoint.connect(tracker, "localhost")?.await?;
    log!("connected to {:?}", connection.remote_address());
    let (mut send, mut recv) = connection.open_bi().await?;
    log!("opened bi stream");
    let request = Request::Query(query);
    let request = postcard::to_stdvec(&request)?;
    log!("sending query");
    send.write_all(&request).await?;
    send.finish().await?;
    let response = recv.read_to_end(REQUEST_SIZE_LIMIT).await?;
    let response = postcard::from_bytes::<Response>(&response)?;
    match response {
        Response::QueryResponse(response) => {
            log!("content {}", response.content);
            for peer in response.hosts {
                log!("- peer {}", peer);
            }
        }
    }
    Ok(())
}

#[tokio::main(flavor = "multi_thread")]
async fn main() -> anyhow::Result<()> {
    setup_logging();
    let args = Args::parse();
    match args.command {
        Commands::Server(args) => server(args).await,
        Commands::Announce(args) => announce(args).await,
        Commands::Query(args) => query(args).await,
    }
}

/// Returns default server configuration along with its certificate.
#[allow(clippy::field_reassign_with_default)] // https://github.com/rust-lang/rust-clippy/issues/6527
fn configure_server(secret_key: &iroh::net::key::SecretKey) -> anyhow::Result<quinn::ServerConfig> {
    make_server_config(secret_key, 8, 1024, vec![TRACKER_ALPN.to_vec()])
}

fn create_quinn_client(
    bind_addr: SocketAddr,
    alpn_protocols: Vec<Vec<u8>>,
    keylog: bool,
) -> anyhow::Result<quinn::Endpoint> {
    let secret_key = iroh::net::key::SecretKey::generate();
    let tls_client_config =
        iroh::net::tls::make_client_config(&secret_key, None, alpn_protocols, keylog)?;
    let mut client_config = quinn::ClientConfig::new(Arc::new(tls_client_config));
    let mut endpoint = quinn::Endpoint::client(bind_addr)?;
    let mut transport_config = quinn::TransportConfig::default();
    transport_config.keep_alive_interval(Some(Duration::from_secs(1)));
    client_config.transport_config(Arc::new(transport_config));
    endpoint.set_default_client_config(client_config);
    Ok(endpoint)
}

/// Create a [`quinn::ServerConfig`] with the given secret key and limits.
pub fn make_server_config(
    secret_key: &iroh::net::key::SecretKey,
    max_streams: u64,
    max_connections: u32,
    alpn_protocols: Vec<Vec<u8>>,
) -> anyhow::Result<quinn::ServerConfig> {
    let tls_server_config = iroh::net::tls::make_server_config(secret_key, alpn_protocols, false)?;
    let mut server_config = quinn::ServerConfig::with_crypto(Arc::new(tls_server_config));
    let mut transport_config = quinn::TransportConfig::default();
    transport_config
        .max_concurrent_bidi_streams(max_streams.try_into()?)
        .max_concurrent_uni_streams(0u32.into());

    server_config
        .transport_config(Arc::new(transport_config))
        .concurrent_connections(max_connections);
    Ok(server_config)
}
