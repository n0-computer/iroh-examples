use genawaiter::sync::Gen;
use std::{
    collections::{BTreeSet, HashSet},
    net::{Ipv4Addr, SocketAddr, SocketAddrV4},
    sync::Arc,
    time::Duration,
};

use futures::{future::BoxFuture, FutureExt, Stream, StreamExt};
use iroh_bytes::HashAndFormat;
use iroh_net::{MagicEndpoint, NodeId};
use iroh_pkarr_node_discovery::PkarrNodeDiscovery;
use mainline::common::{GetPeerResponse, StoreQueryMetdata};
use pkarr::PkarrClient;

use crate::protocol::{
    Announce, Query, QueryResponse, Request, Response, ALPN, REQUEST_SIZE_LIMIT,
};

/// Announce to a tracker.
///
/// You can only announce content you yourself claim to have, to avoid spamming other nodes.
///
/// `endpoint` is the magic endpoint to use for announcing.
/// `tracker` is the node id of the tracker to announce to. It must understand the [TRACKER_ALPN] protocol.
/// `content` is the content to announce.
/// `kind` is the kind of the announcement. We can claim to have the complete data or only some of it.
pub async fn announce(connection: quinn::Connection, args: Announce) -> anyhow::Result<()> {
    let (mut send, mut recv) = connection.open_bi().await?;
    tracing::debug!("opened bi stream");
    let request = Request::Announce(args);
    let request = postcard::to_stdvec(&request)?;
    tracing::debug!("sending announce");
    send.write_all(&request).await?;
    send.finish().await?;
    let _response = recv.read_to_end(REQUEST_SIZE_LIMIT).await?;
    Ok(())
}

/// The mapping from an iroh [HashAndFormat] to a bittorrent infohash, aka [mainline::Id].
///
/// Since an infohash is just 20 bytes, this can not be a bidirectional mapping.
pub fn to_infohash(haf: HashAndFormat) -> mainline::Id {
    let mut data = [0u8; 20];
    data.copy_from_slice(&haf.hash.as_bytes()[..20]);
    mainline::Id::from_bytes(data).unwrap()
}

fn unique_tracker_addrs(
    mut response: mainline::common::Response<GetPeerResponse>,
) -> impl Stream<Item = SocketAddr> {
    Gen::new(|co| async move {
        let mut found = HashSet::new();
        while let Some(response) = response.next_async().await {
            println!("got get_peers response: {:?}", response);
            let tracker = response.peer;
            if !found.insert(tracker) {
                continue;
            }
            co.yield_(tracker).await;
        }
    })
}

async fn query_socket_one(
    endpoint: impl QuinnConnectionProvider<SocketAddr>,
    addr: SocketAddr,
    args: Query,
) -> anyhow::Result<Vec<NodeId>> {
    let connection = endpoint.connect(addr).await?;
    let result = query(connection, args).await?;
    Ok(result.hosts)
}

async fn query_magic_one(
    endpoint: MagicEndpoint,
    node_id: &NodeId,
    args: Query,
) -> anyhow::Result<Vec<NodeId>> {
    let connection = endpoint.connect_by_node_id(node_id, ALPN).await?;
    let result = query(connection, args).await?;
    Ok(result.hosts)
}

/// A connection provider that can be used to connect to a tracker.
///
/// This can either be a [`quinn::Endpoint`] where connections are created on demand,
/// or some sort of connection pool.
pub trait QuinnConnectionProvider<Addr>: Clone {
    fn connect(&self, addr: Addr) -> BoxFuture<anyhow::Result<quinn::Connection>>;
}

impl QuinnConnectionProvider<SocketAddr> for quinn::Endpoint {
    fn connect(&self, addr: SocketAddr) -> BoxFuture<anyhow::Result<quinn::Connection>> {
        async move { Ok(self.connect(addr, "localhost")?.await?) }.boxed()
    }
}

/// Query multiple trackers in parallel and merge the results.
pub fn query_trackers(
    endpoint: MagicEndpoint,
    trackers: impl IntoIterator<Item = NodeId>,
    args: Query,
    query_parallelism: usize,
) -> impl Stream<Item = anyhow::Result<NodeId>> {
    futures::stream::iter(trackers)
        .map(move |tracker| {
            let endpoint = endpoint.clone();
            async move {
                let hosts = match query_magic_one(endpoint, &tracker, args).await {
                    Ok(hosts) => hosts.into_iter().map(anyhow::Ok).collect(),
                    Err(cause) => vec![Err(cause)],
                };
                futures::stream::iter(hosts)
            }
        })
        .buffer_unordered(query_parallelism)
        .flatten()
}

/// Query the mainline DHT for trackers for the given content, then query each tracker for peers.
pub fn query_dht(
    endpoint: impl QuinnConnectionProvider<SocketAddr>,
    dht: mainline::dht::Dht,
    args: Query,
    query_parallelism: usize,
) -> impl Stream<Item = anyhow::Result<NodeId>> {
    let dht = dht.as_async();
    let info_hash = to_infohash(args.content);
    let response: mainline::common::Response<GetPeerResponse> = dht.get_peers(info_hash);
    let unique_tracker_addrs = unique_tracker_addrs(response);
    unique_tracker_addrs
        .map(move |addr| {
            let endpoint = endpoint.clone();
            async move {
                let hosts = match query_socket_one(endpoint, addr, args).await {
                    Ok(hosts) => hosts.into_iter().map(anyhow::Ok).collect(),
                    Err(cause) => vec![Err(cause)],
                };
                futures::stream::iter(hosts)
            }
        })
        .buffer_unordered(query_parallelism)
        .flatten()
}

/// Announce to the mainline DHT in parallel.
///
/// Note that this should only be called from a publicly reachable node, where port is the port
/// on which the tracker protocol is reachable.
pub fn announce_dht(
    dht: mainline::dht::Dht,
    content: BTreeSet<HashAndFormat>,
    port: u16,
    announce_parallelism: usize,
) -> impl Stream<Item = (HashAndFormat, mainline::Result<StoreQueryMetdata>)> {
    let dht = dht.as_async();
    futures::stream::iter(content)
        .map(move |content| {
            let dht = dht.clone();
            async move {
                let info_hash = to_infohash(content);
                let res = dht.announce_peer(info_hash, Some(port)).await;
                (content, res)
            }
        })
        .buffer_unordered(announce_parallelism)
}

/// Assume an existing connection to a tracker and query it for peers for some content.
pub async fn query(connection: quinn::Connection, args: Query) -> anyhow::Result<QueryResponse> {
    tracing::info!("connected to {:?}", connection.remote_address());
    let (mut send, mut recv) = connection.open_bi().await?;
    tracing::info!("opened bi stream");
    let request = Request::Query(args);
    let request = postcard::to_stdvec(&request)?;
    tracing::info!("sending query");
    send.write_all(&request).await?;
    send.finish().await?;
    let response = recv.read_to_end(REQUEST_SIZE_LIMIT).await?;
    let response = postcard::from_bytes::<Response>(&response)?;
    Ok(match response {
        Response::QueryResponse(response) => response,
    })
}

/// Create a quinn client endpoint.
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
        .alpns(vec![ALPN.to_vec()])
        .bind(port)
        .await
}

/// A tracker id for queries - either a node id or an address.
#[derive(Debug, Clone, PartialEq, Eq, Hash, PartialOrd, Ord)]
pub enum TrackerId {
    NodeId(NodeId),
    Addr(std::net::SocketAddr),
}

impl std::fmt::Display for TrackerId {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            TrackerId::NodeId(node_id) => write!(f, "{}", node_id),
            TrackerId::Addr(addr) => write!(f, "{}", addr),
        }
    }
}

impl std::str::FromStr for TrackerId {
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

/// Connect to a tracker using the [crate::protocol::ALPN] protocol, using either
/// a node id or an address.
///
/// Note that this is less efficient than using an existing endpoint when doing multiple requests.
/// It is provided as a convenience function for short lived utilities.
pub async fn connect(tracker: &TrackerId, local_port: u16) -> anyhow::Result<quinn::Connection> {
    match tracker {
        TrackerId::Addr(tracker) => connect_socket(*tracker, local_port).await,
        TrackerId::NodeId(tracker) => connect_magic(&tracker, local_port).await,
    }
}

/// Create a magic endpoint and connect to a tracker using the [crate::protocol::ALPN] protocol.
async fn connect_magic(tracker: &NodeId, local_port: u16) -> anyhow::Result<quinn::Connection> {
    // todo: uncomment once the connection problems are fixed
    // for now, a random node id is more reliable.
    // let key = load_secret_key(tracker_path(CLIENT_KEY)?).await?;
    let key = iroh_net::key::SecretKey::generate();
    let endpoint = create_endpoint(key, local_port, false).await?;
    tracing::info!("trying to connect to tracker at {:?}", tracker);
    let connection = endpoint.connect_by_node_id(tracker, ALPN).await?;
    Ok(connection)
}

/// Create a quinn endpoint and connect to a tracker using the [crate::protocol::ALPN] protocol.
async fn connect_socket(tracker: SocketAddr, local_port: u16) -> anyhow::Result<quinn::Connection> {
    let bind_addr = SocketAddr::V4(SocketAddrV4::new(Ipv4Addr::UNSPECIFIED, local_port));
    let endpoint = create_quinn_client(bind_addr, vec![ALPN.to_vec()], false)?;
    tracing::info!("trying to connect to tracker at {:?}", tracker);
    let connection = endpoint.connect(tracker, "localhost")?.await?;
    Ok(connection)
}
