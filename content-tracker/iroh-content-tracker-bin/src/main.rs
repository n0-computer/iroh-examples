mod args;
mod discovery;
mod io;
mod iroh_bytes_util;
mod options;
mod tracker;

use args::{AnnounceArgs, Args, Commands, QueryArgs, ServerArgs};
use clap::Parser;
use io::{
    load_from_file, setup_logging, tracker_home, tracker_path, CONFIG_DEFAULTS_FILE, CONFIG_FILE,
    SERVER_KEY_FILE,
};
use iroh::{
    net::{
        magic_endpoint::{get_alpn, get_remote_node_id},
        MagicEndpoint, NodeId,
    },
    util::fs::load_secret_key,
};
use iroh_content_tracker::{
    Announce, AnnounceKind, Query, QueryFlags, QueryResponse, Request, Response,
    REQUEST_SIZE_LIMIT, TRACKER_ALPN,
};
use options::Options;
use std::{
    collections::BTreeSet,
    sync::atomic::{AtomicBool, Ordering},
    time::{Duration, Instant},
};
use tokio_util::task::LocalPoolHandle;

use crate::tracker::Tracker;

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
        if addr.derp_region().is_some() {
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
) -> anyhow::Result<MagicEndpoint> {
    // let pkarr_relay_discovery = discovery::PkarrRelayDiscovery::new(key.clone(), PKARR_RELAY_URL.parse().unwrap());
    let region_discover = discovery::HardcodedRegionDiscovery::new(2);
    iroh::net::MagicEndpoint::builder()
        .secret_key(key)
        .discovery(Box::new(region_discover))
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

pub async fn server(args: ServerArgs) -> anyhow::Result<()> {
    set_verbose(!args.quiet);
    let rt = tokio::runtime::Handle::current();
    let tpc = LocalPoolHandle::new(2);
    let rt = iroh::bytes::util::runtime::Handle::new(rt, tpc);
    let home = tracker_home()?;
    log!("tracker starting using {}", home.display());
    let key_path = tracker_path(SERVER_KEY_FILE)?;
    let key = load_secret_key(key_path).await?;
    let endpoint = create_endpoint(key, args.port).await?;
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
    let _task = rt
        .local_pool()
        .spawn_pinned(move || db2.probe_loop(endpoint2));
    let _task = rt
        .local_pool()
        .spawn_pinned(move || db3.dht_announce_loop(args.port));
    while let Some(connecting) = endpoint.accept().await {
        tracing::info!("got connecting");
        let db = db.clone();
        tokio::spawn(async move {
            let Ok((remote_node_id, alpn, conn)) = accept_conn(connecting).await else {
                tracing::error!("error accepting connection");
                return;
            };
            // if we were supporting multiple protocols, we'd need to check the ALPN here.
            tracing::info!("got connection from {} {}", remote_node_id, alpn);
            if let Err(cause) = db.handle_connection(conn).await {
                tracing::error!("error handling connection: {}", cause);
            }
        });
    }
    Ok(())
}

pub async fn announce_request(
    endpoint: &MagicEndpoint,
    tracker: NodeId,
    request: Announce,
) -> anyhow::Result<()> {
    let connection = endpoint.connect_by_node_id(&tracker, TRACKER_ALPN).await?;
    let (mut send, mut recv) = connection.open_bi().await?;
    let request = Request::Announce(request);
    let request = postcard::to_stdvec(&request)?;
    send.write_all(&request).await?;
    send.finish().await?;
    let _response = recv.read_to_end(REQUEST_SIZE_LIMIT).await?;
    Ok(())
}

pub async fn query_request(
    endpoint: &MagicEndpoint,
    tracker: NodeId,
    request: Query,
) -> anyhow::Result<QueryResponse> {
    let connection = endpoint.connect_by_node_id(&tracker, TRACKER_ALPN).await?;
    let (mut send, mut recv) = connection.open_bi().await?;
    let request = Request::Query(request);
    let request = postcard::to_stdvec(&request)?;
    send.write_all(&request).await?;
    send.finish().await?;
    let response = recv.read_to_end(REQUEST_SIZE_LIMIT).await?;
    let response = postcard::from_bytes::<Response>(&response)?;
    match response {
        Response::QueryResponse(response) => Ok(response),
    }
}

pub async fn announce(args: AnnounceArgs) -> anyhow::Result<()> {
    set_verbose(true);
    // todo: uncomment once the connection problems are fixed
    // for now, a random node id is more reliable.
    // let key = load_secret_key(tracker_path(CLIENT_KEY)?).await?;
    let key = iroh::net::key::SecretKey::generate();
    let endpoint = create_endpoint(key, 11112).await?;
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
    announce_request(&endpoint, args.tracker, announce).await
}

pub async fn query(args: QueryArgs) -> anyhow::Result<()> {
    set_verbose(true);
    // todo: uncomment once the connection problems are fixed
    // for now, a random node id is more reliable.
    // let key = load_secret_key(tracker_path(CLIENT_KEY)?).await?;
    let key = iroh::net::key::SecretKey::generate();
    let endpoint = create_endpoint(key, args.port.unwrap_or_default()).await?;
    let request = Query {
        content: args.content.hash_and_format(),
        flags: QueryFlags {
            complete: !args.partial,
            verified: args.verified,
        },
    };
    let response = query_request(&endpoint, args.tracker, request).await?;
    log!("content {}", response.content);
    for peer in response.hosts {
        log!("- peer {}", peer);
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
