pub mod args;

use std::{
    collections::BTreeSet,
    net::{Ipv4Addr, SocketAddr, SocketAddrV4},
    sync::{
        atomic::{AtomicBool, Ordering},
        Arc,
    },
    time::{Duration, Instant},
};

use anyhow::Context;
use clap::Parser;
use iroh_mainline_content_discovery::TrackerId;
use iroh_mainline_content_discovery::{
    io::{
        self, load_from_file, setup_logging, tracker_home, tracker_path, CONFIG_DEFAULTS_FILE,
        CONFIG_FILE, SERVER_KEY_FILE,
    },
    options::Options,
    protocol::{
        Announce, AnnounceKind, Query, QueryFlags, Request, Response, REQUEST_SIZE_LIMIT,
        TRACKER_ALPN,
    },
    tracker::Tracker,
};
use iroh_net::{
    magic_endpoint::{get_alpn, get_remote_node_id},
    MagicEndpoint, NodeId,
};
use iroh_pkarr_node_discovery::PkarrNodeDiscovery;
use pkarr::PkarrClient;
use tokio::io::AsyncWriteExt;
use tokio_util::task::LocalPoolHandle;

use crate::args::{AnnounceArgs, Args, Commands, QueryArgs, ServerArgs};

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
    key: iroh_net::key::SecretKey,
    port: u16,
    publish: bool,
) -> anyhow::Result<MagicEndpoint> {
    let pkarr = PkarrClient::new();
    let discovery_key = if publish { Some(&key) } else { None };
    let mainline_discovery = PkarrNodeDiscovery::new(pkarr, discovery_key);
    iroh_net::MagicEndpoint::builder()
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
    io::save_to_file(Options::default(), &default_path)?;
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
    // todo: uncomment once the connection problems are fixed
    // for now, a random node id is more reliable.
    // let key = load_secret_key(tracker_path(CLIENT_KEY)?).await?;
    let key = iroh_net::key::SecretKey::generate();
    let content = args.content.iter().map(|x| x.hash_and_format()).collect();
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
    println!("announcing to {}", args.tracker);
    println!("host {} has", host);
    for content in &content {
        println!("    {}", content);
    }
    let endpoint = create_endpoint(key, 11112, false).await?;
    let connection = endpoint
        .connect_by_node_id(&args.tracker, TRACKER_ALPN)
        .await?;
    println!("connected to {:?}", connection.remote_address());
    let kind = if args.partial {
        AnnounceKind::Partial
    } else {
        AnnounceKind::Complete
    };
    let announce = Announce {
        host,
        kind,
        content,
    };
    iroh_mainline_content_discovery::announce(connection, announce).await?;
    println!("done");
    Ok(())
}

async fn query(args: QueryArgs) -> anyhow::Result<()> {
    let connection = connect(&args.tracker).await?;
    let q = Query {
        content: args.content.hash_and_format(),
        flags: QueryFlags {
            complete: !args.partial,
            verified: args.verified,
        },
    };
    let res = iroh_mainline_content_discovery::query(connection, q).await?;
    println!(
        "querying tracker {} for content {}",
        args.tracker, args.content
    );
    for peer in res.hosts {
        println!("{}", peer);
    }
    Ok(())
}

async fn connect(tracker: &TrackerId) -> anyhow::Result<quinn::Connection> {
    match tracker {
        TrackerId::Addr(tracker) => connect_socket(*tracker).await,
        TrackerId::NodeId(tracker) => connect_magic(tracker.clone()).await,
    }
}

async fn connect_magic(tracker: NodeId) -> anyhow::Result<quinn::Connection> {
    // todo: uncomment once the connection problems are fixed
    // for now, a random node id is more reliable.
    // let key = load_secret_key(tracker_path(CLIENT_KEY)?).await?;
    let key = iroh_net::key::SecretKey::generate();
    let endpoint = create_endpoint(key, 0, false).await?;
    tracing::info!("trying to connect to tracker at {:?}", tracker);
    let connection = endpoint.connect_by_node_id(&tracker, TRACKER_ALPN).await?;
    Ok(connection)
}

async fn connect_socket(tracker: SocketAddr) -> anyhow::Result<quinn::Connection> {
    let bind_addr = SocketAddr::V4(SocketAddrV4::new(Ipv4Addr::UNSPECIFIED, 0));
    let endpoint = create_quinn_client(bind_addr, vec![TRACKER_ALPN.to_vec()], false)?;
    tracing::info!("trying to connect to tracker at {:?}", tracker);
    let connection = endpoint.connect(tracker, "localhost")?.await?;
    Ok(connection)
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
fn configure_server(secret_key: &iroh_net::key::SecretKey) -> anyhow::Result<quinn::ServerConfig> {
    make_server_config(secret_key, 8, 1024, vec![TRACKER_ALPN.to_vec()])
}

fn create_quinn_client(
    bind_addr: SocketAddr,
    alpn_protocols: Vec<Vec<u8>>,
    keylog: bool,
) -> anyhow::Result<quinn::Endpoint> {
    let secret_key = iroh_net::key::SecretKey::generate();
    let tls_client_config =
        iroh_net::tls::make_client_config(&secret_key, None, alpn_protocols, keylog)?;
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
    secret_key: &iroh_net::key::SecretKey,
    max_streams: u64,
    max_connections: u32,
    alpn_protocols: Vec<Vec<u8>>,
) -> anyhow::Result<quinn::ServerConfig> {
    let tls_server_config = iroh_net::tls::make_server_config(secret_key, alpn_protocols, false)?;
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

/// Loads a [`SecretKey`] from the provided file.
pub async fn load_secret_key(
    key_path: std::path::PathBuf,
) -> anyhow::Result<iroh_net::key::SecretKey> {
    if key_path.exists() {
        let keystr = tokio::fs::read(key_path).await?;
        let secret_key =
            iroh_net::key::SecretKey::try_from_openssh(keystr).context("invalid keyfile")?;
        Ok(secret_key)
    } else {
        let secret_key = iroh_net::key::SecretKey::generate();
        let ser_key = secret_key.to_openssh()?;

        // Try to canoncialize if possible
        let key_path = key_path.canonicalize().unwrap_or(key_path);
        let key_path_parent = key_path.parent().ok_or_else(|| {
            anyhow::anyhow!("no parent directory found for '{}'", key_path.display())
        })?;
        tokio::fs::create_dir_all(&key_path_parent).await?;

        // write to tempfile
        let (file, temp_file_path) = tempfile::NamedTempFile::new_in(key_path_parent)
            .context("unable to create tempfile")?
            .into_parts();
        let mut file = tokio::fs::File::from_std(file);
        file.write_all(ser_key.as_bytes())
            .await
            .context("unable to write keyfile")?;
        file.flush().await?;
        drop(file);

        // move file
        tokio::fs::rename(temp_file_path, key_path)
            .await
            .context("failed to rename keyfile")?;

        Ok(secret_key)
    }
}
