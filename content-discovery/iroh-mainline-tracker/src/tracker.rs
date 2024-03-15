//! The tracker server
use std::{
    collections::{BTreeMap, BTreeSet},
    sync::{Arc, RwLock},
    time::Instant,
};

use bao_tree::{ByteNum, ChunkNum};
use iroh_bytes::{
    get::{fsm::EndBlobNext, Stats},
    hashseq::HashSeq,
    protocol::GetRequest,
    BlobFormat, Hash, HashAndFormat,
};
use iroh_mainline_content_discovery::{
    protocol::{
        AbsoluteTime, Announce, AnnounceKind, Query, QueryResponse, Request, Response,
        SignedAnnounce, REQUEST_SIZE_LIMIT,
    },
    to_infohash,
};
use iroh_net::{
    magic_endpoint::{get_alpn, get_remote_node_id},
    MagicEndpoint, NodeId,
};
use rand::Rng;
use redb::{ReadableTable, RedbValue};
use serde::{Deserialize, Serialize};
use serde_big_array::BigArray;

mod tables;
mod util;

use crate::{
    io::{log_connection_attempt, log_probe_attempt},
    iroh_bytes_util::{
        chunk_probe, get_hash_seq_and_sizes, random_hash_seq_ranges, unverified_size, verified_size,
    },
    options::Options,
    task_map::TaskMap,
};

use self::tables::{ReadOnlyTables, Tables};

/// The tracker server.
///
/// This is a cheaply cloneable handle to the state and the options.
#[derive(Debug, Clone)]
pub struct Tracker(Arc<Inner>);

/// The inner state of the tracker server. Options are immutable and don't need to be locked.
#[derive(Debug)]
struct Inner {
    state: RwLock<State>,
    /// The options for the tracker server.
    options: Options,
    /// Tasks that announce to the DHT. There is one task per content item, just to inform the DHT
    /// that we know about the content.
    announce_tasks: TaskMap<HashAndFormat>,
    /// Tasks that probe nodes. There is one task per node, and it probes all content items for that peer.
    probe_tasks: TaskMap<NodeId>,
    /// A handle to the DHT client, which is used to announce to the DHT.
    dht: Arc<mainline::async_dht::AsyncDht>,
    /// The magic endpoint, which is used to accept incoming connections and to probe peers.
    magic_endpoint: MagicEndpoint,
    /// To spawn non-send futures.
    local_pool: tokio_util::task::LocalPoolHandle,
    /// The announce database.
    announce_db: redb::Database,
}

fn split_signed_announce(announce: SignedAnnounce) -> (AnnouncePath, AnnounceValue) {
    let path = AnnouncePath::new(announce.content, announce.kind, announce.host);
    let value = AnnounceValue {
        timestamp: announce.timestamp,
        signature: announce.signature,
    };
    (path, value)
}

fn join_signed_announce(path: AnnouncePath, value: AnnounceValue) -> SignedAnnounce {
    SignedAnnounce {
        announce: Announce {
            content: path.content(),
            kind: path.announce_kind(),
            host: path.node(),
            timestamp: value.timestamp,
        },
        signature: value.signature,
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
struct AnnouncePath {
    hash: [u8; 32],
    format: u8,
    kind: u8,
    node: [u8; 32],
}

impl AnnouncePath {
    fn new(content: HashAndFormat, kind: AnnounceKind, node: NodeId) -> Self {
        Self {
            hash: *content.hash.as_bytes(),
            format: content.format as u8,
            kind: kind as u8,
            node: *node.as_bytes(),
        }
    }

    fn content(&self) -> HashAndFormat {
        HashAndFormat {
            hash: Hash::from_bytes(self.hash),
            format: if self.format == 0 {
                BlobFormat::Raw
            } else {
                BlobFormat::HashSeq
            },
        }
    }

    fn announce_kind(&self) -> AnnounceKind {
        if self.kind == 0 {
            AnnounceKind::Partial
        } else {
            AnnounceKind::Complete
        }
    }

    fn node(&self) -> NodeId {
        NodeId::from_bytes(&self.node).unwrap()
    }

    fn content_min(content: HashAndFormat) -> Self {
        Self {
            hash: *content.hash.as_bytes(),
            format: 0,
            kind: 0,
            node: [0; 32],
        }
    }

    fn content_max(content: HashAndFormat) -> Self {
        Self {
            hash: *content.hash.as_bytes(),
            format: 255,
            kind: 255,
            node: [255; 32],
        }
    }
}

impl redb::RedbValue for AnnouncePath {
    type SelfType<'a> = Self;

    type AsBytes<'a> = [u8; 66];

    fn fixed_width() -> Option<usize> {
        Some(66)
    }

    fn from_bytes<'a>(data: &'a [u8]) -> Self::SelfType<'a>
    where
        Self: 'a,
    {
        let mut hash = [0; 32];
        hash.copy_from_slice(&data[0..32]);
        let format = data[32];
        let kind = data[33];
        let mut node = [0; 32];
        node.copy_from_slice(&data[34..66]);
        Self {
            hash,
            format,
            kind,
            node,
        }
    }

    fn as_bytes<'a, 'b: 'a>(value: &'a Self::SelfType<'b>) -> Self::AsBytes<'a>
    where
        Self: 'a,
        Self: 'b,
    {
        let mut res = [0; 66];
        res[0..32].copy_from_slice(&value.hash);
        res[32] = value.format;
        res[33] = value.kind;
        res[34..66].copy_from_slice(&value.node);
        res
    }

    fn type_name() -> redb::TypeName {
        redb::TypeName::new("AnnouncePath")
    }
}

impl redb::RedbKey for AnnouncePath {
    fn compare(data1: &[u8], data2: &[u8]) -> std::cmp::Ordering {
        data1.cmp(data2)
    }
}

#[derive(Debug, Serialize, Deserialize, PartialEq, Eq, PartialOrd, Ord)]
struct AnnounceValue {
    timestamp: AbsoluteTime,
    #[serde(with = "BigArray")]
    signature: [u8; 64],
}

impl RedbValue for AnnounceValue {
    type SelfType<'a> = Self;

    type AsBytes<'a> = [u8; 72];

    fn fixed_width() -> Option<usize> {
        Some(8 + 64)
    }

    fn from_bytes<'a>(data: &'a [u8]) -> Self::SelfType<'a>
    where
        Self: 'a,
    {
        assert!(data.len() == 72);
        let mut timestamp = [0; 8];
        timestamp.copy_from_slice(&data[0..8]);
        let mut signature = [0; 64];
        signature.copy_from_slice(&data[8..72]);
        Self {
            timestamp: AbsoluteTime::from_micros(u64::from_le_bytes(timestamp)),
            signature,
        }
    }

    fn as_bytes<'a, 'b: 'a>(value: &'a Self::SelfType<'b>) -> Self::AsBytes<'a>
    where
        Self: 'a,
        Self: 'b,
    {
        let mut res = [0; 72];
        res[0..8].copy_from_slice(&value.timestamp.as_micros().to_le_bytes());
        res[8..72].copy_from_slice(&value.signature);
        res
    }

    fn type_name() -> redb::TypeName {
        redb::TypeName::new("peer-info")
    }
}

#[derive(Debug, derive_more::From)]
struct ProbeValue {
    timestamp: AbsoluteTime,
}

impl redb::RedbValue for ProbeValue {
    type SelfType<'a> = Self;

    type AsBytes<'a> = [u8; 8];

    fn fixed_width() -> Option<usize> {
        Some(8)
    }

    fn from_bytes<'a>(data: &'a [u8]) -> Self::SelfType<'a>
    where
        Self: 'a,
    {
        Self {
            timestamp: AbsoluteTime::from_micros(u64::from_le_bytes(data.try_into().unwrap())),
        }
    }

    fn as_bytes<'a, 'b: 'a>(value: &'a Self::SelfType<'b>) -> Self::AsBytes<'a>
    where
        Self: 'a,
        Self: 'b,
    {
        value.timestamp.as_micros().to_le_bytes()
    }

    fn type_name() -> redb::TypeName {
        redb::TypeName::new("probe-value")
    }
}

/// The mutable state of the tracker server.
#[derive(Debug, Clone, Default)]
struct State {
    // cache for verified sizes of hashes, used during probing
    sizes: BTreeMap<Hash, u64>,
    // cache for collections, used during collection probing
    collections: BTreeMap<Hash, (HashSeq, Arc<[u64]>)>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ProbeKind {
    Incomplete,
    Complete,
}

impl From<AnnounceKind> for ProbeKind {
    fn from(kind: AnnounceKind) -> Self {
        match kind {
            AnnounceKind::Partial => Self::Incomplete,
            AnnounceKind::Complete => Self::Complete,
        }
    }
}

impl From<ProbeKind> for AnnounceKind {
    fn from(kind: ProbeKind) -> Self {
        match kind {
            ProbeKind::Incomplete => Self::Partial,
            ProbeKind::Complete => Self::Complete,
        }
    }
}

impl Tracker {
    /// Create a new tracker server.
    ///
    /// You will have to drive the tracker server yourself, using `handle_connection` and `probe_loop`.
    pub fn new(options: Options, magic_endpoint: MagicEndpoint) -> anyhow::Result<Self> {
        tracing::info!("creating tracker using database at {}", options.announce_data_path.display());
        let announce_db = redb::Database::create(&options.announce_data_path)?;
        let tx = announce_db.begin_write()?;
        {
            let _tables = Tables::new(&tx)?;
        }
        tx.commit()?;
        let tx = announce_db.begin_read()?;
        let tables = ReadOnlyTables::new(&tx)?;
        let mut distinct_content = Vec::new();
        let mut distinct_nodes = BTreeSet::new();
        for entry in tables.announces.iter()? {
            let (path, _) = entry?;
            let path = path.value();
            distinct_content.push(path.content());
            distinct_nodes.insert(path.node());
        }
        drop(tables);
        drop(tx);

        let state = State::default();
        let dht = Arc::new(mainline::Dht::default().as_async());
        let tpc = tokio_util::task::LocalPoolHandle::new(1);
        let res = Self(Arc::new(Inner {
            state: RwLock::new(state),
            options,
            announce_tasks: Default::default(),
            probe_tasks: Default::default(),
            announce_db,
            magic_endpoint,
            local_pool: tpc,
            dht,
        }));
        // spawn independent announce tasks for each content item
        for content in distinct_content {
            res.setup_dht_announce_task(content);
        }
        for node in distinct_nodes {
            res.setup_probe_task(node);
        }
        Ok(res)
    }

    fn setup_probe_task(&self, node: NodeId) {
        let this = self.clone();
        // announce task only captures this, an Arc, and the content.
        let task = self.0.local_pool.spawn_pinned(move || async move {
            loop {
                if let Ok(content_for_node) = this.get_content_for_node(node) {
                    let now = AbsoluteTime::now();
                    let res = this.probe_one(node, content_for_node).await;
                    match res {
                        Ok(results) => {
                            tracing::info!("probed {node}, applying result");
                            if let Err(cause) = this.apply_result(node, results, now) {
                                tracing::error!("error applying result: {}", cause);
                            }
                        }
                        Err(cause) => {
                            tracing::warn!("error probing {node}: {cause}");
                        }
                    }
                }
                tokio::time::sleep(this.0.options.probe_interval).await;
            }
        });
        self.0.probe_tasks.publish(node, task);
    }

    fn setup_dht_announce_task(&self, content: HashAndFormat) {
        let this = self.clone();
        // announce task only captures this, an Arc, and the content.
        let task = tokio::spawn(async move {
            let info_hash = to_infohash(content);
            loop {
                let res = this
                    .0
                    .dht
                    .announce_peer(info_hash, Some(this.0.options.quinn_port))
                    .await;
                match res {
                    Ok(sqm) => {
                        let stored_at = sqm.stored_at();
                        tracing::info!(
                            "announced {} as {} on {} nodes",
                            content,
                            sqm.target(),
                            stored_at.len()
                        );
                        for item in stored_at {
                            tracing::debug!("stored at {} {}", item.id, item.address);
                        }
                    }
                    Err(cause) => {
                        tracing::warn!("error announcing: {}", cause);
                    }
                }
                tokio::time::sleep(this.0.options.dht_announce_interval).await;
            }
        });
        self.0.announce_tasks.publish(content, task);
    }

    pub async fn magic_accept_loop(self, endpoint: MagicEndpoint) -> std::io::Result<()> {
        while let Some(connecting) = endpoint.accept().await {
            tracing::info!("got connecting");
            let db = self.clone();
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

    pub async fn quinn_accept_loop(self, endpoint: quinn::Endpoint) -> std::io::Result<()> {
        let local_addr = endpoint.local_addr()?;
        println!("quinn listening on {}", local_addr);
        while let Some(connecting) = endpoint.accept().await {
            tracing::info!("got connecting");
            let db = self.clone();
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

    /// Handle a single incoming connection on the tracker ALPN.
    pub async fn handle_connection(&self, connection: quinn::Connection) -> anyhow::Result<()> {
        tracing::debug!("calling accept_bi");
        let (mut send, mut recv) = connection.accept_bi().await?;
        tracing::debug!("got bi stream");
        let request = recv.read_to_end(REQUEST_SIZE_LIMIT).await?;
        let request = postcard::from_bytes::<Request>(&request)?;
        match request {
            Request::Announce(announce) => {
                tracing::debug!("got announce: {:?}", announce);
                self.handle_announce(announce)?;
                send.finish().await?;
            }

            Request::Query(query) => {
                tracing::debug!("handle query: {:?}", query);
                let response = self.handle_query(query)?;
                let response = Response::QueryResponse(response);
                let response = postcard::to_stdvec(&response)?;
                send.write_all(&response).await?;
                send.finish().await?;
            }
        }
        Ok(())
    }

    async fn get_or_insert_size(
        &self,
        connection: &quinn::Connection,
        hash: &Hash,
    ) -> anyhow::Result<u64> {
        let state = &self.0.state;
        let size_opt = state.read().unwrap().sizes.get(hash).copied();
        let size = match size_opt {
            Some(size) => size,
            None => {
                let (size, _) = verified_size(connection, hash).await?;
                state.write().unwrap().sizes.insert(*hash, size);
                size
            }
        };
        Ok(size)
    }

    async fn get_or_insert_sizes(
        &self,
        connection: &quinn::Connection,
        hash: &Hash,
    ) -> anyhow::Result<(HashSeq, Arc<[u64]>)> {
        let state = &self.0.state;
        let entry = state.read().unwrap().collections.get(hash).cloned();
        let res = match entry {
            Some(hs) => hs,
            None => {
                let hs = get_hash_seq_and_sizes(connection, hash, self.0.options.max_hash_seq_size)
                    .await?;
                state.write().unwrap().collections.insert(*hash, hs.clone());
                hs
            }
        };
        Ok(res)
    }

    async fn probe(
        &self,
        connection: &quinn::Connection,
        host: &NodeId,
        content: &HashAndFormat,
        probe_kind: ProbeKind,
    ) -> anyhow::Result<Stats> {
        let cap = format!("{} at {}", content, host);
        let HashAndFormat { hash, format } = content;
        let mut rng = rand::thread_rng();
        let stats = if probe_kind == ProbeKind::Incomplete {
            tracing::debug!("Size probing {}...", cap);
            let (size, stats) = unverified_size(connection, hash).await?;
            tracing::debug!(
                "Size probed {}, got unverified size {}, {:.6}s",
                cap,
                size,
                stats.elapsed.as_secs_f64()
            );
            stats
        } else {
            match format {
                BlobFormat::Raw => {
                    let size = self.get_or_insert_size(connection, hash).await?;
                    let random_chunk = rng.gen_range(0..ByteNum(size).chunks().0);
                    tracing::debug!("Chunk probing {}, chunk {}", cap, random_chunk);
                    let stats = chunk_probe(connection, hash, ChunkNum(random_chunk)).await?;
                    tracing::debug!(
                        "Chunk probed {}, chunk {}, {:.6}s",
                        cap,
                        random_chunk,
                        stats.elapsed.as_secs_f64()
                    );
                    stats
                }
                BlobFormat::HashSeq => {
                    let (hs, sizes) = self.get_or_insert_sizes(connection, hash).await?;
                    let ranges = random_hash_seq_ranges(&sizes, rand::thread_rng());
                    let text = ranges
                        .iter_non_empty()
                        .map(|(index, ranges)| {
                            format!("child={}, ranges={:?}", index, ranges.to_chunk_ranges())
                        })
                        .collect::<Vec<_>>()
                        .join(", ");
                    tracing::debug!("Seq probing {} using {}", cap, text);
                    let request = GetRequest::new(*hash, ranges);
                    let request = iroh_bytes::get::fsm::start(connection.clone(), request);
                    let connected = request.next().await?;
                    let iroh_bytes::get::fsm::ConnectedNext::StartChild(child) =
                        connected.next().await?
                    else {
                        unreachable!("request does not include root");
                    };
                    let index =
                        usize::try_from(child.child_offset()).expect("child offset too large");
                    let hash = hs.get(index).expect("request inconsistent with hash seq");
                    let at_blob_header = child.next(hash);
                    let at_end_blob = at_blob_header.drain().await?;
                    let EndBlobNext::Closing(closing) = at_end_blob.next() else {
                        unreachable!("request contains only one blob");
                    };
                    let stats = closing.next().await?;
                    tracing::debug!(
                        "Seq probed {} using {}, {:.6}s",
                        cap,
                        text,
                        stats.elapsed.as_secs_f64()
                    );
                    stats
                }
            }
        };
        Ok(stats)
    }

    fn handle_announce(&self, signed_announce: SignedAnnounce) -> anyhow::Result<()> {
        tracing::info!("got announce");
        signed_announce.verify()?;
        tracing::info!("verified announce: {:?}", signed_announce);
        let content = signed_announce.content;
        let tx = self.0.announce_db.begin_write()?;
        let mut tables = Tables::new(&tx)?;
        let (path, value1) = split_signed_announce(signed_announce);
        // true if this is entirely new content, false if it is just a new host for existing content
        // if this is true we need to start announcing it to the DHT
        let new_content = tables
            .announces
            .range(AnnouncePath::content_min(content)..=AnnouncePath::content_max(content))?
            .next()
            .transpose()?
            .is_none();
        let prev = tables.announces.get(path)?.map(|x| x.value());
        // new_host_for_content is true if this is a new host for this path (content, kind, node), false if it is just an update
        // if this is true we need to start probing it
        //
        // update is true if the new announce is newer than the previous one
        // if this is true we need to store the new announce
        let (new_host_for_content, update) = if let Some(prev) = prev {
            (false, prev.timestamp < value1.timestamp)
        } else {
            (true, true)
        };
        if update {
            tables.announces.insert(path, value1)?;
        }
        drop(tables);
        tx.commit()?;
        if new_content {
            // if this is a new content, start announcing it to the DHT
            self.setup_dht_announce_task(signed_announce.content);
        }
        if new_host_for_content {
            // if this is a new host for this content, start probing it
            self.setup_probe_task(signed_announce.host);
        }
        Ok(())
    }

    fn handle_query(&self, query: Query) -> anyhow::Result<QueryResponse> {
        let tx = self.0.announce_db.begin_read()?;
        let tables = ReadOnlyTables::new(&tx)?;
        let iter = tables.announces.range(
            AnnouncePath::content_min(query.content)..=AnnouncePath::content_max(query.content),
        )?;
        let options = &self.0.options;
        let now = AbsoluteTime::now();
        let kind: AnnounceKind = AnnounceKind::from_complete(query.flags.complete);
        let mut announces = Vec::new();
        for entry in iter {
            let (path, value) = entry?;
            let path = path.value();
            let value = value.value();
            if kind == AnnounceKind::Complete && path.announce_kind() == AnnounceKind::Partial {
                // we only want complete announces
                continue;
            }
            let recently_announced = now - value.timestamp <= options.announce_timeout;
            if !recently_announced {
                // announce is too old
                tracing::error!("announce is too old");
                continue;
            }
            if query.flags.verified {
                let last_probed = tables.probes.get(&path)?.map(|x| x.value().timestamp);
                let recently_probed = last_probed
                    .map(|t| now - t <= options.probe_timeout)
                    .unwrap_or_default();
                if !recently_probed {
                    // query asks for verificated hosts, but the last successful probe is too old
                    tracing::error!("verification of complete data is too old");
                    continue;
                }
            }
            let signed_announce = join_signed_announce(path, value);
            announces.push(signed_announce);
        }
        Ok(QueryResponse { hosts: announces })
    }

    /// Get the content that is supposedly available, grouped by peers
    ///
    /// Todo: this is a full table scan, could be optimized.
    fn get_content_for_node(
        &self,
        node: NodeId,
    ) -> anyhow::Result<BTreeMap<AnnounceKind, HashAndFormat>> {
        let mut content_for_node = BTreeMap::<AnnounceKind, HashAndFormat>::new();
        let tx = self.0.announce_db.begin_read()?;
        let tables = ReadOnlyTables::new(&tx)?;
        for entry in tables.announces.iter()? {
            let (path, ..) = entry.unwrap();
            let path = path.value();
            if path.node() != node {
                continue;
            }
            content_for_node.insert(path.announce_kind(), path.content());
        }
        Ok(content_for_node)
    }

    /// Apply the results of a probe to the database.
    fn apply_result(
        &self,
        node: NodeId,
        results: Vec<(HashAndFormat, AnnounceKind, anyhow::Result<Stats>)>,
        now: AbsoluteTime,
    ) -> anyhow::Result<()> {
        let tx = self.0.announce_db.begin_write()?;
        let mut tables = Tables::new(&tx)?;
        for (content, announce_kind, result) in &results {
            if result.is_ok() {
                let path = AnnouncePath::new(*content, *announce_kind, node);
                tables.probes.insert(path, ProbeValue::from(now))?;
            }
        }
        drop(tables);
        tx.commit()?;
        Ok(())
    }

    /// Execute probes for a single peer.
    ///
    /// This will fail if the connection fails, or if local logging fails.
    /// Individual probes can fail, but the probe will continue.
    async fn probe_one(
        &self,
        host: NodeId,
        by_kind_and_content: BTreeMap<AnnounceKind, HashAndFormat>,
    ) -> anyhow::Result<Vec<(HashAndFormat, AnnounceKind, anyhow::Result<Stats>)>> {
        let t0 = Instant::now();
        let res = self
            .0
            .magic_endpoint
            .connect_by_node_id(&host, iroh_bytes::protocol::ALPN)
            .await;
        log_connection_attempt(&self.0.options.dial_log, &host, t0, &res)?;
        let connection = match res {
            Ok(connection) => connection,
            Err(cause) => {
                tracing::error!("error dialing host {}: {}", host, cause);
                return Err(cause);
            }
        };
        let mut results = Vec::new();
        for (announce_kind, content) in by_kind_and_content {
            let probe_kind = ProbeKind::from(announce_kind);
            let t0 = Instant::now();
            let res = self.probe(&connection, &host, &content, probe_kind).await;
            log_probe_attempt(
                &self.0.options.probe_log,
                &host,
                &content,
                probe_kind,
                t0,
                &res,
            )?;
            if let Err(cause) = &res {
                tracing::error!("error probing host {}: {}", host, cause);
            }
            results.push((content, announce_kind, res));
        }
        anyhow::Ok(results)
    }
}

/// Accept an incoming connection and extract the client-provided [`NodeId`] and ALPN protocol.
async fn accept_conn(
    mut conn: quinn::Connecting,
) -> anyhow::Result<(NodeId, String, quinn::Connection)> {
    let alpn = get_alpn(&mut conn).await?;
    let conn = conn.await?;
    let peer_id = get_remote_node_id(&conn)?;
    Ok((peer_id, alpn, conn))
}
