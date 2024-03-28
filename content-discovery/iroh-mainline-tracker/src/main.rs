pub mod args;

use std::{
    net::{Ipv4Addr, SocketAddr, SocketAddrV4},
    sync::{
        atomic::{AtomicBool, Ordering},
        Arc,
    },
    time::{Duration, Instant},
};

use anyhow::Context;
use clap::Parser;
use iroh_mainline_content_discovery::protocol::ALPN;
use iroh_mainline_tracker::{
    io::{
        self, load_from_file, setup_logging, tracker_home, tracker_path, CONFIG_DEBUG_FILE,
        CONFIG_DEFAULTS_FILE, CONFIG_FILE, SERVER_KEY_FILE,
    },
    options::Options,
    tracker::Tracker,
};
use iroh_net::{
    magic_endpoint::{get_alpn, get_remote_node_id},
    MagicEndpoint, NodeId,
};
use iroh_pkarr_node_discovery::PkarrNodeDiscovery;
use tokio::io::AsyncWriteExt;

use crate::args::Args;

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
        if addr.relay_url().is_some() {
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
    let mainline_discovery = if publish {
        PkarrNodeDiscovery::builder().secret_key(&key).build()
    } else {
        PkarrNodeDiscovery::default()
    };
    iroh_net::MagicEndpoint::builder()
        .secret_key(key)
        .discovery(Box::new(mainline_discovery))
        .alpns(vec![ALPN.to_vec()])
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
fn write_debug() -> anyhow::Result<()> {
    let default_path = tracker_path(CONFIG_DEBUG_FILE)?;
    io::save_to_file(Options::debug(), &default_path)?;
    Ok(())
}

/// Write default options to a sample config file.
fn write_defaults() -> anyhow::Result<()> {
    let default_path = tracker_path(CONFIG_DEFAULTS_FILE)?;
    io::save_to_file(Options::default(), &default_path)?;
    Ok(())
}

async fn server(args: Args) -> anyhow::Result<()> {
    set_verbose(!args.quiet);
    let home = tracker_home()?;
    tokio::fs::create_dir_all(&home).await?;
    let config_path = tracker_path(CONFIG_FILE)?;
    write_defaults()?;
    write_debug()?;
    let mut options = load_from_file::<Options>(&config_path)?;
    options.make_paths_relative(&home);
    tracing::info!("using options: {:#?}", options);
    // override options with args
    if let Some(quinn_port) = args.quinn_port {
        options.quinn_port = quinn_port;
    }
    if let Some(magic_port) = args.magic_port {
        options.magic_port = magic_port;
    }
    if let Some(udp_port) = args.udp_port {
        options.udp_port = udp_port;
    }
    log!("tracker starting using {}", home.display());
    let key_path = tracker_path(SERVER_KEY_FILE)?;
    let key = load_secret_key(key_path).await?;
    let server_config = configure_server(&key)?;
    let udp_bind_addr = SocketAddr::V4(SocketAddrV4::new(Ipv4Addr::UNSPECIFIED, options.udp_port));
    let udp_socket = tokio::net::UdpSocket::bind(udp_bind_addr).await?;
    let quinn_bind_addr =
        SocketAddr::V4(SocketAddrV4::new(Ipv4Addr::UNSPECIFIED, options.quinn_port));
    let quinn_endpoint = quinn::Endpoint::server(server_config, quinn_bind_addr)?;
    // set the quinn port to the actual port we bound to so the DHT will announce it correctly
    options.quinn_port = quinn_endpoint.local_addr()?.port();
    let magic_endpoint = create_endpoint(key.clone(), options.magic_port, true).await?;
    let db = Tracker::new(options, magic_endpoint.clone())?;
    await_derp_region(&magic_endpoint).await?;
    let addr = magic_endpoint.my_addr().await?;
    log!("listening on {:?}", addr);
    log!("tracker addr: {}\n", addr.node_id);
    log!("usage:");
    log!("tracker announce --tracker {} <tickets>", addr.node_id);
    log!(
        "tracker query --tracker {} <hash> or <ticket>",
        addr.node_id
    );
    let db2 = db.clone();
    let db3 = db.clone();
    let db4 = db.clone();
    let magic_accept_task = tokio::spawn(db.magic_accept_loop(magic_endpoint));
    let quinn_accept_task = tokio::spawn(db2.quinn_accept_loop(quinn_endpoint));
    let udp_accept_task = tokio::spawn(db4.udp_accept_loop(udp_socket));
    let gc_task = tokio::spawn(db3.gc_loop());
    tokio::select! {
        _ = tokio::signal::ctrl_c() => {
            tracing::info!("shutting down");
        }
        res = magic_accept_task => {
            tracing::error!("magic accept task exited");
            res??;
        }
        res = quinn_accept_task => {
            tracing::error!("quinn accept task exited");
            res??;
        }
        res = udp_accept_task => {
            tracing::error!("udp accept task exited");
            res??;
        }
        res = gc_task => {
            tracing::error!("gc task exited");
            res??;
        }
    }
    Ok(())
}

#[tokio::main(flavor = "multi_thread")]
async fn main() -> anyhow::Result<()> {
    setup_logging();
    let args = Args::parse();
    server(args).await
}

/// Returns default server configuration along with its certificate.
#[allow(clippy::field_reassign_with_default)] // https://github.com/rust-lang/rust-clippy/issues/6527
fn configure_server(secret_key: &iroh_net::key::SecretKey) -> anyhow::Result<quinn::ServerConfig> {
    make_server_config(secret_key, 8, 1024, vec![ALPN.to_vec()])
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
