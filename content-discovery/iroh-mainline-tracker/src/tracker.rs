//! The tracker server
use std::{
    collections::{BTreeMap, BTreeSet},
    sync::Arc,
    time::{Duration, Instant},
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
use tokio::sync::oneshot;

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

use self::{
    tables::{ReadOnlyTables, ReadableTables, Tables},
    util::PeekableFlumeReceiver,
};

/// The tracker server.
///
/// This is a cheaply cloneable handle to the state and the options.
#[derive(Debug, Clone)]
pub struct Tracker(Arc<Inner>);

/// The inner state of the tracker server. Options are immutable and don't need to be locked.
#[derive(Debug)]
struct Inner {
    actor: flume::Sender<ActorMessage>,
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
    /// The handle to the actor thread.
    handle: Option<std::thread::JoinHandle<()>>,
}

impl Drop for Inner {
    fn drop(&mut self) {
        self.actor.send(ActorMessage::Stop).ok();
        if let Some(handle) = self.handle.take() {
            handle.join().ok();
        }
    }
}

struct Actor {
    rx: flume::Receiver<ActorMessage>,
    state: State,
    options: Options,
}

#[derive(derive_more::Debug)]
enum ActorMessage {
    Announce {
        announce: SignedAnnounce,
        #[debug(skip)]
        tx: oneshot::Sender<anyhow::Result<AnnounceResponse>>,
    },
    Query {
        query: Query,
        #[debug(skip)]
        tx: oneshot::Sender<anyhow::Result<QueryResponse>>,
    },
    GetSize {
        hash: Hash,
        #[debug(skip)]
        tx: oneshot::Sender<anyhow::Result<Option<u64>>>,
    },
    GetSizes {
        hash: Hash,
        #[debug(skip)]
        #[allow(clippy::type_complexity)]
        tx: oneshot::Sender<anyhow::Result<Option<(HashSeq, Arc<[u64]>)>>>,
    },
    SetSize {
        hash: Hash,
        size: u64,
    },
    SetSizes {
        hash: Hash,
        sizes: (HashSeq, Arc<[u64]>),
    },
    GetContentForNode {
        node: NodeId,
        #[debug(skip)]
        tx: oneshot::Sender<anyhow::Result<BTreeMap<AnnounceKind, HashAndFormat>>>,
    },
    StoreProbeResult {
        node: NodeId,
        results: Vec<(HashAndFormat, AnnounceKind, anyhow::Result<Stats>)>,
        now: AbsoluteTime,
    },
    GetDistinctContent {
        #[debug(skip)]
        tx: oneshot::Sender<anyhow::Result<GetDistinctContentResponse>>,
    },
    Gc {
        #[debug(skip)]
        tx: oneshot::Sender<anyhow::Result<()>>,
    },
    Dump,
    Stop,
}

enum MessageCategory {
    ReadWrite,
    ReadOnly,
}

impl ActorMessage {
    fn category(&self) -> MessageCategory {
        match self {
            Self::Announce { .. }
            | Self::SetSize { .. }
            | Self::SetSizes { .. }
            | Self::StoreProbeResult { .. }
            | Self::Gc { .. } => MessageCategory::ReadWrite,
            Self::Dump
            | Self::Stop
            | Self::Query { .. }
            | Self::GetContentForNode { .. }
            | Self::GetDistinctContent { .. }
            | Self::GetSize { .. }
            | Self::GetSizes { .. } => MessageCategory::ReadOnly,
        }
    }
}

#[derive(derive_more::Debug)]
struct GetDistinctContentResponse {
    content: BTreeSet<HashAndFormat>,
    nodes: BTreeSet<NodeId>,
}

#[derive(derive_more::Debug)]
struct AnnounceResponse {
    new_content: bool,
    new_host_for_content: bool,
}

impl Actor {
    fn run(mut self, db: redb::Database) -> anyhow::Result<()> {
        let mut msgs = PeekableFlumeReceiver::new(self.rx.clone());
        while let Some(msg) = msgs.peek() {
            if let ActorMessage::Stop = msg {
                break;
            }
            match msg.category() {
                MessageCategory::ReadWrite => {
                    tracing::debug!("write transaction");
                    let txn = db.begin_write()?;
                    let mut tables = Tables::new(&txn)?;
                    for msg in msgs.batch_iter(1000, Duration::from_secs(1)) {
                        if let Err(msg) = self.handle_readwrite(msg, &mut tables)? {
                            msgs.push_back(msg).expect("just recv'd");
                            break;
                        }
                    }
                    drop(tables);
                    tracing::debug!("write transaction end");
                    txn.commit()?;
                }
                MessageCategory::ReadOnly => {
                    tracing::debug!("read transaction");
                    let txn = db.begin_read()?;
                    let tables = ReadOnlyTables::new(&txn)?;
                    for msg in msgs.batch_iter(1000, Duration::from_secs(10)) {
                        if let Err(msg) = self.handle_readonly(msg, &tables)? {
                            msgs.push_back(msg).expect("just recv'd");
                            break;
                        }
                    }
                    tracing::debug!("read transaction end");
                }
            }
        }
        Ok(())
    }

    fn handle_readonly(
        &self,
        msg: ActorMessage,
        tables: &impl ReadableTables,
    ) -> anyhow::Result<std::result::Result<(), ActorMessage>> {
        tracing::debug!("handling readonly message: {:?}", msg);
        match msg {
            ActorMessage::Query { query, tx } => {
                let response = self.handle_query(query, tables);
                tx.send(response).ok();
            }
            ActorMessage::GetSize { hash, tx } => {
                let size = self.state.sizes.get(&hash).cloned();
                tx.send(Ok(size)).ok();
            }
            ActorMessage::GetSizes { hash, tx } => {
                let sizes = self.state.collections.get(&hash).cloned();
                tx.send(Ok(sizes)).ok();
            }
            ActorMessage::GetContentForNode { node, tx } => {
                let content = self.get_content_for_node(tables, node);
                tx.send(content).ok();
            }
            ActorMessage::GetDistinctContent { tx } => {
                let res = self.get_distinct_content(tables);
                tx.send(res).ok();
            }
            ActorMessage::Dump => {
                self.handle_dump(tables).ok();
            }
            x => {
                return Ok(Err(x));
            }
        }
        Ok(Ok(()))
    }

    fn handle_readwrite(
        &mut self,
        msg: ActorMessage,
        tables: &mut Tables,
    ) -> anyhow::Result<std::result::Result<(), ActorMessage>> {
        tracing::debug!("handling readwrite message: {:?}", msg);
        match msg {
            ActorMessage::Announce { announce, tx } => {
                let response = self.handle_announce(tables, announce);
                tx.send(response).ok();
            }
            ActorMessage::SetSize { hash, size } => {
                self.state.sizes.insert(hash, size);
            }
            ActorMessage::SetSizes { hash, sizes } => {
                self.state.collections.insert(hash, sizes);
            }
            ActorMessage::StoreProbeResult { node, results, now } => {
                self.store_probe_result(tables, node, results, now).ok();
            }
            ActorMessage::Gc { tx } => {
                self.gc(tables).ok();
                tx.send(Ok(())).ok();
            }
            ActorMessage::Stop => {
                return Ok(Err(ActorMessage::Stop));
            }
            x => {
                return Ok(Err(x));
            }
        }
        Ok(Ok(()))
    }

    /// Get the content that is supposedly available, grouped by peers
    ///
    /// Todo: this is a full table scan, could be optimized.
    fn get_content_for_node(
        &self,
        tables: &impl ReadableTables,
        node: NodeId,
    ) -> anyhow::Result<BTreeMap<AnnounceKind, HashAndFormat>> {
        let mut content_for_node = BTreeMap::<AnnounceKind, HashAndFormat>::new();
        for entry in tables.announces().iter()? {
            let (path, ..) = entry.unwrap();
            let path = path.value();
            if path.node() != node {
                continue;
            }
            content_for_node.insert(path.announce_kind(), path.content());
        }
        Ok(content_for_node)
    }

    fn handle_announce(
        &mut self,
        tables: &mut Tables,
        signed_announce: SignedAnnounce,
    ) -> anyhow::Result<AnnounceResponse> {
        tracing::info!("got announce");
        signed_announce.verify()?;
        tracing::info!("verified announce: {:?}", signed_announce);
        let content = signed_announce.content;
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
        Ok(AnnounceResponse {
            new_content,
            new_host_for_content,
        })
    }

    fn handle_query(
        &self,
        query: Query,
        tables: &impl ReadableTables,
    ) -> anyhow::Result<QueryResponse> {
        let iter = tables.announces().range(
            AnnouncePath::content_min(query.content)..=AnnouncePath::content_max(query.content),
        )?;
        let options = &self.options;
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
                let last_probed = tables.probes().get(&path)?.map(|x| x.value().timestamp);
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

    fn store_probe_result(
        &mut self,
        tables: &mut Tables,
        node: NodeId,
        results: Vec<(HashAndFormat, AnnounceKind, anyhow::Result<Stats>)>,
        now: AbsoluteTime,
    ) -> anyhow::Result<()> {
        for (content, announce_kind, result) in &results {
            if result.is_ok() {
                let path = AnnouncePath::new(*content, *announce_kind, node);
                tables.probes.insert(path, ProbeValue::from(now))?;
            }
        }
        Ok(())
    }

    fn handle_dump(&self, tables: &impl ReadableTables) -> anyhow::Result<()> {
        for entry in tables.announces().iter()? {
            let (path, value) = entry?;
            let path = path.value();
            let value = value.value();
            println!("announce: {} -> {:?}", path.format_short(), value,);
        }
        for entry in tables.probes().iter()? {
            let (path, value) = entry?;
            let path = path.value();
            let value = value.value();
            println!("probe: {} -> {:?}", path.format_short(), value,);
        }
        Ok(())
    }

    fn get_distinct_content(
        &self,
        tables: &impl ReadableTables,
    ) -> anyhow::Result<GetDistinctContentResponse> {
        let mut content = BTreeSet::new();
        let mut nodes = BTreeSet::new();
        for entry in tables.announces().iter()? {
            let (path, _) = entry?;
            let path = path.value();
            content.insert(path.content());
            nodes.insert(path.node());
        }
        Ok(GetDistinctContentResponse { content, nodes })
    }

    fn gc(&mut self, tables: &mut Tables) -> anyhow::Result<()> {
        let now = AbsoluteTime::now();
        let options = &self.options;
        let mut to_remove = Vec::new();
        for item in tables.probes.iter()? {
            let (path, value) = item?;
            let path = path.value();
            let value = value.value();
            let announce_age = now - value.timestamp;
            if announce_age <= options.announce_expiry {
                tracing::debug!(
                    "keeping announce {} because it was announced {}s ago",
                    path.format_short(),
                    announce_age.as_secs_f64()
                );
                // announce is recent, keep it
                continue;
            }
            if let Some(last_probe) = tables.probes.get(&path)?.map(|x| x.value().timestamp) {
                // announce is expired, but we have probed it recently, keep it
                let age = now - last_probe;
                if age <= options.probe_expiry {
                    tracing::trace!(
                        "keeping expired announce {} because it was probed {}s ago",
                        path.format_short(),
                        age.as_secs_f64()
                    );
                    continue;
                }
            }
            tracing::trace!("removing announce {}", path.format_short(),);
            to_remove.push(path);
        }
        for path in to_remove {
            tables.announces.remove(&path)?;
            tables.probes.remove(&path)?;
        }
        Ok(())
    }
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

#[derive(derive_more::Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
struct AnnouncePath {
    #[debug("{}", self.content().hash)]
    hash: [u8; 32],
    #[debug("{:?}", self.content().format)]
    format: u8,
    #[debug("{:?}", self.announce_kind())]
    kind: u8,
    #[debug("{}", self.node())]
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

    fn format_short(&self) -> String {
        format!(
            "({}, {:?}, {:?}, {})",
            self.content().hash,
            self.content().format,
            self.announce_kind(),
            self.node()
        )
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

#[derive(derive_more::Debug, Serialize, Deserialize, PartialEq, Eq, PartialOrd, Ord)]
struct AnnounceValue {
    timestamp: AbsoluteTime,
    #[debug("{}", hex::encode(self.signature))]
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
        tracing::info!(
            "creating tracker using database at {}",
            options.announce_data_path.display()
        );
        let db = redb::Database::create(&options.announce_data_path)?;
        let dht = Arc::new(mainline::Dht::default().as_async());
        let tpc = tokio_util::task::LocalPoolHandle::new(1);
        let (tx, rx) = flume::unbounded();
        let actor = Actor {
            rx,
            state: State::default(),
            options: options.clone(),
        };
        let txn = db.begin_write()?;
        let dc = {
            let tables = Tables::new(&txn)?;
            actor.get_distinct_content(&tables)?
        };
        txn.commit()?;
        let handle = std::thread::spawn(move || {
            if let Err(cause) = actor.run(db) {
                tracing::error!("error in actor: {}", cause);
            }
        });
        tx.send(ActorMessage::Dump).ok();
        let res = Self(Arc::new(Inner {
            actor: tx,
            options,
            announce_tasks: Default::default(),
            probe_tasks: Default::default(),
            magic_endpoint,
            local_pool: tpc,
            dht,
            handle: Some(handle),
        }));
        // spawn independent announce tasks for each content item
        for content in dc.content {
            res.setup_dht_announce_task(content);
        }
        for node in dc.nodes {
            res.setup_probe_task(node);
        }
        Ok(res)
    }

    fn setup_probe_task(&self, node: NodeId) {
        let this = self.clone();
        // announce task only captures this, an Arc, and the content.
        let task = self.0.local_pool.spawn_pinned(move || async move {
            loop {
                if let Ok(content_for_node) = this.get_content_for_node(node).await {
                    let now = AbsoluteTime::now();
                    let res = this.probe_one(node, content_for_node).await;
                    match res {
                        Ok(results) => {
                            tracing::debug!("probed {node}, applying result");
                            if let Err(cause) = this.apply_result(node, results, now).await {
                                tracing::error!("error applying result: {}", cause);
                            }
                        }
                        Err(cause) => {
                            tracing::debug!("error probing {node}: {cause}");
                        }
                    }
                }
                tokio::time::sleep(this.0.options.probe_interval).await;
            }
        });
        self.0.probe_tasks.publish(node, task);
    }

    fn setup_dht_announce_task(&self, content: HashAndFormat) {
        let dht = self.0.dht.clone();
        let dht_announce_interval = self.0.options.dht_announce_interval;
        let quinn_port = self.0.options.quinn_port;
        // announce task only captures this, an Arc, and the content.
        let task = tokio::spawn(async move {
            let info_hash = to_infohash(content);
            loop {
                let res = dht.announce_peer(info_hash, Some(quinn_port)).await;
                match res {
                    Ok(sqm) => {
                        let stored_at = sqm.stored_at();
                        tracing::debug!(
                            "announced {} as {} on {} nodes",
                            content,
                            sqm.target(),
                            stored_at.len()
                        );
                        for item in stored_at {
                            tracing::trace!("stored at {} {}", item.id, item.address);
                        }
                    }
                    Err(cause) => {
                        tracing::warn!("error announcing: {}", cause);
                    }
                }
                tokio::time::sleep(dht_announce_interval).await;
            }
        });
        self.0.announce_tasks.publish(content, task);
    }

    pub async fn gc_loop(self) -> anyhow::Result<()> {
        loop {
            tokio::time::sleep(self.0.options.gc_interval).await;
            tracing::debug!("gc start");
            self.gc().await?;
            tracing::debug!("gc end");
            let distinct = self.get_distinct_content().await?;
            // make sure tasks for expired nodes or content items are removed
            self.0
                .announce_tasks
                .retain(|x| distinct.content.contains(x));
            self.0.probe_tasks.retain(|x| distinct.nodes.contains(x));
        }
    }

    async fn get_distinct_content(&self) -> anyhow::Result<GetDistinctContentResponse> {
        let (tx, rx) = oneshot::channel();
        self.0
            .actor
            .send_async(ActorMessage::GetDistinctContent { tx })
            .await?;
        rx.await?
    }

    pub async fn magic_accept_loop(self, endpoint: MagicEndpoint) -> std::io::Result<()> {
        while let Some(connecting) = endpoint.accept().await {
            tracing::info!("got connecting");
            let tracker = self.clone();
            tokio::spawn(async move {
                let Ok((remote_node_id, alpn, conn)) = accept_conn(connecting).await else {
                    tracing::error!("error accepting connection");
                    return;
                };
                // if we were supporting multiple protocols, we'd need to check the ALPN here.
                tracing::info!("got connection from {} {}", remote_node_id, alpn);
                if let Err(cause) = tracker.handle_connection(conn).await {
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
            let tracker = self.clone();
            tokio::spawn(async move {
                let Ok((remote_node_id, alpn, conn)) = accept_conn(connecting).await else {
                    tracing::error!("error accepting connection");
                    return;
                };
                // if we were supporting multiple protocols, we'd need to check the ALPN here.
                tracing::info!("got connection from {} {}", remote_node_id, alpn);
                if let Err(cause) = tracker.handle_connection(conn).await {
                    tracing::error!("error handling connection: {}", cause);
                }
            });
        }
        Ok(())
    }

    pub async fn udp_accept_loop(self, socket: tokio::net::UdpSocket) -> std::io::Result<()> {
        println!("udp listening on {}", socket.local_addr()?);
        let mut buf = [0; 1200];
        loop {
            let (len, addr) = socket.recv_from(&mut buf).await?;
            let data = &buf[..len];
            let res = self.handle_udp_packet(data, &socket, addr).await;
            if let Err(cause) = res {
                tracing::error!("error handling UDP packet: {}", cause);
            }
        }
    }

    pub async fn handle_udp_packet(
        &self,
        data: &[u8],
        socket: &tokio::net::UdpSocket,
        addr: std::net::SocketAddr,
    ) -> anyhow::Result<()> {
        tracing::info!("got UDP packet from {}, {} bytes", addr, data.len());
        let request = match postcard::from_bytes::<Request>(data) {
            Ok(request) => request,
            Err(cause) => {
                tracing::error!("error parsing request: {}", cause);
                return Err(cause.into());
            }
        };
        tracing::info!("got request: {:?}", request);
        match request {
            Request::Announce(announce) => {
                tracing::info!("got announce: {:?}", announce);
                self.handle_announce(announce).await?;
            }

            Request::Query(query) => {
                let mut buf = [0u8; 1200];
                tracing::info!("handle query: {:?}", query);
                let response = self.handle_query(query).await?;
                let response = Response::QueryResponse(response);
                let response = postcard::to_slice(&response, &mut buf)?;
                socket.send_to(response, addr).await?;
            }
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
                self.handle_announce(announce).await?;
                send.finish().await?;
            }

            Request::Query(query) => {
                tracing::debug!("handle query: {:?}", query);
                let response = self.handle_query(query).await?;
                let response = Response::QueryResponse(response);
                let response = postcard::to_stdvec(&response)?;
                send.write_all(&response).await?;
                send.finish().await?;
            }
        }
        Ok(())
    }

    async fn get_size(&self, hash: Hash) -> anyhow::Result<Option<u64>> {
        let (tx, rx) = oneshot::channel();
        self.0
            .actor
            .send_async(ActorMessage::GetSize { hash, tx })
            .await?;
        rx.await?
    }

    async fn get_sizes(&self, hash: Hash) -> anyhow::Result<Option<(HashSeq, Arc<[u64]>)>> {
        let (tx, rx) = oneshot::channel();
        self.0
            .actor
            .send_async(ActorMessage::GetSizes { hash, tx })
            .await?;
        rx.await?
    }

    async fn set_size(
        &self,
        hash: Hash,
        size: u64,
    ) -> std::result::Result<(), flume::SendError<ActorMessage>> {
        self.0
            .actor
            .send_async(ActorMessage::SetSize { hash, size })
            .await
    }

    async fn set_sizes(
        &self,
        hash: Hash,
        sizes: (HashSeq, Arc<[u64]>),
    ) -> std::result::Result<(), flume::SendError<ActorMessage>> {
        self.0
            .actor
            .send_async(ActorMessage::SetSizes { hash, sizes })
            .await
    }

    async fn get_or_insert_size(
        &self,
        connection: &quinn::Connection,
        hash: &Hash,
    ) -> anyhow::Result<u64> {
        let size_opt = self.get_size(*hash).await?;
        let size = match size_opt {
            Some(size) => size,
            None => {
                let (size, _) = verified_size(connection, hash).await?;
                self.set_size(*hash, size).await?;
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
        let sizes = self.get_sizes(*hash).await?;
        let res = match sizes {
            Some(hs) => hs,
            None => {
                let hs = get_hash_seq_and_sizes(connection, hash, self.0.options.max_hash_seq_size)
                    .await?;
                self.set_sizes(*hash, hs.clone()).await?;
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

    async fn handle_announce(&self, announce: SignedAnnounce) -> anyhow::Result<()> {
        tracing::info!("got announce");
        announce.verify()?;
        tracing::info!("verified announce: {:?}", announce);

        let (tx, rx) = oneshot::channel();
        self.0
            .actor
            .send_async(ActorMessage::Announce { announce, tx })
            .await?;
        let AnnounceResponse {
            new_content,
            new_host_for_content,
        } = rx.await??;
        if new_content {
            // if this is a new content, start announcing it to the DHT
            self.setup_dht_announce_task(announce.content);
        }
        if new_host_for_content {
            // if this is a new host for this content, start probing it
            self.setup_probe_task(announce.host);
        }
        Ok(())
    }

    async fn handle_query(&self, query: Query) -> anyhow::Result<QueryResponse> {
        let (tx, rx) = oneshot::channel();
        self.0
            .actor
            .send_async(ActorMessage::Query { query, tx })
            .await?;
        rx.await?
    }

    /// Get the content that is supposedly available, grouped by peers
    ///
    /// Todo: this is a full table scan, could be optimized.
    async fn get_content_for_node(
        &self,
        node: NodeId,
    ) -> anyhow::Result<BTreeMap<AnnounceKind, HashAndFormat>> {
        let (tx, rx) = oneshot::channel();
        self.0
            .actor
            .send_async(ActorMessage::GetContentForNode { node, tx })
            .await?;
        rx.await?
    }

    /// Apply the results of a probe to the database.
    async fn apply_result(
        &self,
        node: NodeId,
        results: Vec<(HashAndFormat, AnnounceKind, anyhow::Result<Stats>)>,
        now: AbsoluteTime,
    ) -> std::result::Result<(), flume::SendError<ActorMessage>> {
        self.0
            .actor
            .send_async(ActorMessage::StoreProbeResult { node, results, now })
            .await
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
                tracing::debug!("error probing host {}: {}", host, cause);
            }
            results.push((content, announce_kind, res));
        }
        anyhow::Ok(results)
    }

    async fn gc(&self) -> anyhow::Result<()> {
        let (tx, rx) = oneshot::channel();
        self.0.actor.send_async(ActorMessage::Gc { tx }).await?;
        rx.await?
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
