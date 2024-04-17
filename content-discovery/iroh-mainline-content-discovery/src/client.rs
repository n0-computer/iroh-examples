use genawaiter::sync::Gen;
use std::{
    collections::{BTreeMap, BTreeSet, HashSet},
    net::{Ipv4Addr, SocketAddr, SocketAddrV4},
    pin::Pin,
    sync::Arc,
    task::{Context, Poll},
    time::Duration,
};

use futures::{
    channel::oneshot,
    future::{self, BoxFuture},
    stream::FusedStream,
    FutureExt, Stream, StreamExt,
};
use iroh_bytes::HashAndFormat;
use iroh_net::{MagicEndpoint, NodeId};
use iroh_pkarr_node_discovery::PkarrNodeDiscovery;

use crate::protocol::{
    AnnounceKind, Query, QueryResponse, Request, Response, SignedAnnounce, ALPN, REQUEST_SIZE_LIMIT,
};

/// Announce to a tracker.
///
/// You can only announce content you yourself claim to have, to avoid spamming other nodes.
///
/// `endpoint` is the magic endpoint to use for announcing.
/// `tracker` is the node id of the tracker to announce to. It must understand the [TRACKER_ALPN] protocol.
/// `content` is the content to announce.
/// `kind` is the kind of the announcement. We can claim to have the complete data or only some of it.
pub async fn announce(
    connection: quinn::Connection,
    signed_announce: SignedAnnounce,
) -> anyhow::Result<()> {
    let (mut send, mut recv) = connection.open_bi().await?;
    tracing::debug!("opened bi stream");
    let request = Request::Announce(signed_announce);
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
    mut response: mainline::Response<mainline::GetPeerResponse>,
) -> impl Stream<Item = SocketAddr> {
    Gen::new(|co| async move {
        let mut found = HashSet::new();
        while let Some(response) = response.next_async().await {
            tracing::info!("got get_peers response: {:?}", response);
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
) -> anyhow::Result<Vec<SignedAnnounce>> {
    let connection = endpoint.connect(addr).await?;
    let result = query(connection, args).await?;
    Ok(result.hosts)
}

async fn query_magic_one(
    endpoint: MagicEndpoint,
    node_id: &NodeId,
    args: Query,
) -> anyhow::Result<Vec<SignedAnnounce>> {
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
) -> impl Stream<Item = anyhow::Result<SignedAnnounce>> {
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
) -> impl Stream<Item = anyhow::Result<SignedAnnounce>> {
    let dht = dht.as_async();
    let info_hash = to_infohash(args.content);
    let response: mainline::Response<mainline::GetPeerResponse> = dht.get_peers(info_hash);
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
) -> impl Stream<Item = (HashAndFormat, mainline::Result<mainline::StoreQueryMetdata>)> {
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
pub fn create_quinn_client(
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
    let mainline_discovery = if publish {
        PkarrNodeDiscovery::builder().secret_key(key.clone()).build()?
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

/// A tracker id for queries - either a node id or an address.
#[derive(Debug, Clone, PartialEq, Eq, Hash, PartialOrd, Ord)]
pub enum TrackerId {
    Iroh(NodeId),
    Quinn(std::net::SocketAddr),
    Udp(std::net::SocketAddr),
}

impl std::fmt::Display for TrackerId {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            TrackerId::Iroh(node_id) => write!(f, "{}", node_id),
            TrackerId::Quinn(addr) => write!(f, "quic:{}", addr),
            TrackerId::Udp(addr) => write!(f, "udp:{}", addr),
        }
    }
}

impl std::str::FromStr for TrackerId {
    type Err = anyhow::Error;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        if let Ok(node_id) = s.parse() {
            return Ok(TrackerId::Iroh(node_id));
        }
        if let Ok(addr) = s.parse() {
            return Ok(TrackerId::Quinn(addr));
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
        TrackerId::Quinn(tracker) => connect_socket(*tracker, local_port).await,
        TrackerId::Iroh(tracker) => connect_magic(tracker, local_port).await,
        TrackerId::Udp(_) => anyhow::bail!("can not connect to udp tracker"),
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

const MAX_MSG_SIZE: usize = 1200;

pub struct MergeUntilFirstEnds<S1, S2> {
    stream1: S1,
    stream2: S2,
}

impl<S1, S2> MergeUntilFirstEnds<S1, S2>
where
    S1: Stream + Unpin,
    S2: Stream<Item = S1::Item> + Unpin,
{
    pub fn new(stream1: S1, stream2: S2) -> Self {
        Self { stream1, stream2 }
    }
}

impl<S1, S2> Stream for MergeUntilFirstEnds<S1, S2>
where
    S1: Stream + Unpin,
    S2: Stream<Item = S1::Item> + Unpin,
{
    type Item = S1::Item;

    fn poll_next(mut self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Option<Self::Item>> {
        let poll1 = Pin::new(&mut self.stream1).poll_next(cx);
        let poll2 = Pin::new(&mut self.stream2).poll_next(cx);

        match (poll1, poll2) {
            (Poll::Ready(None), _) | (_, Poll::Ready(None)) => Poll::Ready(None),
            (Poll::Ready(Some(item)), _) | (_, Poll::Ready(Some(item))) => Poll::Ready(Some(item)),
            (Poll::Pending, Poll::Pending) => Poll::Pending,
        }
    }
}

impl<S1, S2> FusedStream for MergeUntilFirstEnds<S1, S2>
where
    S1: Stream + FusedStream + Unpin,
    S2: Stream<Item = S1::Item> + FusedStream + Unpin,
{
    fn is_terminated(&self) -> bool {
        self.stream1.is_terminated() && self.stream2.is_terminated()
    }
}

#[derive(Debug, Clone)]
pub struct UdpDiscovery {
    tx: flume::Sender<UdpActorMessage>,
}

impl UdpDiscovery {
    /// Create a new UDP discovery service.
    pub async fn new(socket: SocketAddr) -> anyhow::Result<Self> {
        let (tx, rx) = flume::unbounded();
        let socket = tokio::net::UdpSocket::bind(socket).await?;
        let _task = tokio::spawn(
            UdpActor {
                socket,
                rx,
                trackers: BTreeSet::new(),
                listeners: BTreeMap::new(),
                announces: BTreeMap::new(),
            }
            .run(),
        );
        Ok(Self { tx })
    }

    /// Query the mainline DHT for trackers for the given content, then query each tracker for peers.
    pub async fn query_dht(
        &self,
        dht: mainline::dht::Dht,
        args: Query,
    ) -> anyhow::Result<impl Stream<Item = SignedAnnounce>> {
        let results = self.query(args).await?.into_stream().boxed();
        let dht = dht.as_async();
        let this = self.clone();
        let find_new_trackers = async move {
            // delay before querying the DHT
            tokio::time::sleep(Duration::from_millis(50)).await;
            let info_hash = to_infohash(args.content);
            let mut addrs = dht.get_peers(info_hash);
            while let Some(addr) = addrs.next_async().await {
                this.add_tracker(addr.peer).await.ok();
            }
            future::pending::<SignedAnnounce>().await
        }
        .into_stream()
        .boxed();
        Ok(MergeUntilFirstEnds::new(results, find_new_trackers))
    }

    /// Manually add a tracker to the list of trackers to query.
    pub async fn add_tracker(&self, tracker: SocketAddr) -> anyhow::Result<()> {
        Ok(self
            .tx
            .send_async(UdpActorMessage::AddTracker { tracker })
            .await?)
    }

    /// Manually remove a tracker from the list of trackers to query.
    pub async fn remove_tracker(&self, tracker: SocketAddr) -> anyhow::Result<()> {
        Ok(self
            .tx
            .send_async(UdpActorMessage::RemoveTracker { tracker })
            .await?)
    }

    pub async fn query(&self, query: Query) -> anyhow::Result<flume::Receiver<SignedAnnounce>> {
        let (tx, rx) = oneshot::channel();
        self.tx
            .send_async(UdpActorMessage::Query { query, tx })
            .await?;
        Ok(rx.await?)
    }

    pub async fn announce_once(&self, announce: SignedAnnounce) -> anyhow::Result<()> {
        let (tx, rx) = oneshot::channel();
        self.tx
            .send_async(UdpActorMessage::AnnounceOnce { announce, tx })
            .await?;
        rx.await?;
        Ok(())
    }

    pub async fn announce(&self, announce: SignedAnnounce) -> anyhow::Result<()> {
        let this = self.clone();
        let task = tokio::spawn(async move {
            loop {
                tokio::time::sleep(Duration::from_secs(10)).await;
                this.announce_once(announce).await.ok();
                tokio::time::sleep(Duration::from_secs(110)).await;
            }
        })
        .into();
        self.tx
            .send_async(UdpActorMessage::StoreAnnounceTask { announce, task })
            .await?;
        Ok(())
    }
}

struct UdpActor {
    socket: tokio::net::UdpSocket,
    rx: flume::Receiver<UdpActorMessage>,
    trackers: BTreeSet<SocketAddr>,
    listeners: BTreeMap<Query, Vec<flume::Sender<SignedAnnounce>>>,
    announces: BTreeMap<(HashAndFormat, AnnounceKind), AbortingJoinHandle<()>>,
}

struct AbortingJoinHandle<T> {
    handle: tokio::task::JoinHandle<T>,
}

impl<T> From<tokio::task::JoinHandle<T>> for AbortingJoinHandle<T> {
    fn from(handle: tokio::task::JoinHandle<T>) -> Self {
        Self { handle }
    }
}

impl<T> Drop for AbortingJoinHandle<T> {
    fn drop(&mut self) {
        self.handle.abort();
    }
}

#[derive(derive_more::Debug)]
enum UdpActorMessage {
    Query {
        query: Query,
        tx: oneshot::Sender<flume::Receiver<SignedAnnounce>>,
    },
    AddTracker {
        tracker: SocketAddr,
    },
    RemoveTracker {
        tracker: SocketAddr,
    },
    StoreAnnounceTask {
        announce: SignedAnnounce,
        #[debug(skip)]
        task: AbortingJoinHandle<()>,
    },
    AnnounceOnce {
        announce: SignedAnnounce,
        tx: oneshot::Sender<()>,
    },
}

impl UdpActor {
    async fn run(mut self) {
        let mut buf = [0u8; MAX_MSG_SIZE];
        loop {
            tokio::select! {
                msg = self.rx.recv_async() => {
                    tracing::trace!("got msg {:?}", msg);
                    match msg {
                        Ok(UdpActorMessage::Query { query, tx  }) => {
                            let (announce_tx, announce_rx) = flume::bounded(1024);
                            self.listeners.entry(query).or_default().push(announce_tx);
                            let msg = Request::Query(query);
                            let msg = postcard::to_slice(&msg, &mut buf).unwrap();
                            for tracker in &self.trackers {
                                tracing::info!("sending query to {}, {} bytes", tracker, msg.len());
                                self.socket.send_to(msg, tracker).await.ok();
                            }
                            tx.send(announce_rx).ok();
                        }
                        Ok(UdpActorMessage::AddTracker { tracker }) => {
                            if self.trackers.insert(tracker) {
                                for query in self.listeners.keys() {
                                    let msg = Request::Query(*query);
                                    let msg = postcard::to_slice(&msg, &mut buf).unwrap();
                                    self.socket.send_to(msg, tracker).await.ok();
                                }
                            }
                        }
                        Ok(UdpActorMessage::RemoveTracker { tracker }) => {
                            self.trackers.remove(&tracker);
                        }
                        Ok(UdpActorMessage::StoreAnnounceTask { announce, task }) => {
                            let key = (announce.announce.content, announce.announce.kind);
                            self.announces.insert(key, task);
                        }
                        Ok(UdpActorMessage::AnnounceOnce { announce, tx }) => {
                            let msg = postcard::to_slice(&Request::Announce(announce), &mut buf).unwrap();
                            for tracker in &self.trackers {
                                self.socket.send_to(msg, tracker).await.ok();
                            }
                            tx.send(()).ok();
                        }
                        Err(flume::RecvError::Disconnected) => break,
                    }
                },
                res = self.socket.recv_from(&mut buf) => {
                    let (size, addr) = match res {
                        Ok((size, addr)) => (size, addr),
                        Err(cause) => {
                            tracing::warn!("error receiving from socket: {:?}", cause);
                            continue;
                        },
                    };
                    if !self.trackers.contains(&addr) {
                        tracing::debug!("unexpected announce from {:?}", addr);
                        continue;
                    }
                    let msg = postcard::from_bytes::<Response>(&buf[..size]);
                    #[allow(clippy::single_match)]
                    match msg {
                        Ok(Response::QueryResponse(response)) => {
                            for sa in response.hosts {
                                if let Err(cause) = sa.verify() {
                                    tracing::warn!("invalid announce from {:?}: {}", addr, cause);
                                    continue;
                                }
                                let mut queries_to_remove = Vec::new();
                                for (query, senders) in self.listeners.iter_mut() {
                                    if sa.announce.content == query.content {
                                        if sa.announce.kind == AnnounceKind::Partial && query.flags.complete {
                                            // We only want complete announces, so we skip partial ones.
                                            continue;
                                        }
                                        let mut to_remove = Vec::new();
                                        for (i, sender) in senders.iter().enumerate() {
                                            if sender.send_async(sa).await.is_err() {
                                                to_remove.push(i);
                                            }
                                        }
                                        for i in to_remove.into_iter().rev() {
                                            senders.remove(i);
                                        }
                                    }
                                    if senders.is_empty() {
                                        queries_to_remove.push(*query);
                                    }
                                }
                                for query in queries_to_remove {
                                    self.listeners.remove(&query);
                                }
                            }
                        }
                        _ => {}
                    }
                }
            }
        }
    }
}
