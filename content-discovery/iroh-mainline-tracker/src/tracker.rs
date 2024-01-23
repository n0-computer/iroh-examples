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
        AbsoluteTime, AnnounceKind, Query, QueryResponse, Request, Response, SignedAnnounce,
        REQUEST_SIZE_LIMIT,
    },
    to_infohash,
};
use iroh_net::{
    magic_endpoint::{get_alpn, get_remote_node_id},
    MagicEndpoint, NodeId,
};
use rand::Rng;
use redb::ReadableTable;
use serde::{Deserialize, Serialize};

use crate::{
    io::{log_connection_attempt, log_probe_attempt, AnnounceData},
    iroh_bytes_util::{
        chunk_probe, get_hash_seq_and_sizes, random_hash_seq_ranges, unverified_size, verified_size,
    },
    options::Options,
    task_map::TaskMap,
};

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
    ///
    announce_db: redb::Database,
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

    fn content_and_kind_min(content: HashAndFormat, kind: AnnounceKind) -> Self {
        Self {
            hash: *content.hash.as_bytes(),
            format: content.format as u8,
            kind: kind as u8,
            node: [0; 32],
        }
    }

    fn content_and_kind_max(content: HashAndFormat, kind: AnnounceKind) -> Self {
        Self {
            hash: *content.hash.as_bytes(),
            format: content.format as u8,
            kind: kind as u8,
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

impl redb::RedbValue for PeerInfo {
    type SelfType<'a> = Self;

    type AsBytes<'a> = Vec<u8>;

    fn fixed_width() -> Option<usize> {
        None
    }

    fn from_bytes<'a>(data: &'a [u8]) -> Self::SelfType<'a>
    where
        Self: 'a,
    {
        postcard::from_bytes(data).unwrap()
    }

    fn as_bytes<'a, 'b: 'a>(value: &'a Self::SelfType<'b>) -> Self::AsBytes<'a>
    where
        Self: 'a,
        Self: 'b,
    {
        postcard::to_stdvec(value).unwrap()
    }

    fn type_name() -> redb::TypeName {
        redb::TypeName::new("PeerInfo")
    }
}

const ANNONCE_TABLE_V0: redb::TableDefinition<AnnouncePath, PeerInfo> =
    redb::TableDefinition::new("announces_v0");

/// The mutable state of the tracker server.
#[derive(Debug, Clone, Default)]
struct State {
    // every announce we ever got, indexed by hash, kind and peer
    announce_data: BTreeMap<HashAndFormat, BTreeMap<AnnounceKind, BTreeMap<NodeId, PeerInfo>>>,
    // cache for verified sizes of hashes, used during probing
    sizes: BTreeMap<Hash, u64>,
    // cache for collections, used during collection probing
    collections: BTreeMap<Hash, (HashSeq, Arc<[u64]>)>,
}

impl State {
    /// Get the part of the announce data that is persisted
    fn get_persisted_announce_data(&self) -> AnnounceData {
        let mut data: AnnounceData = Default::default();
        for (content, by_kind_and_peers) in self.announce_data.iter() {
            let mut peers = BTreeMap::<AnnounceKind, BTreeMap<NodeId, SignedAnnounce>>::new();
            for (kind, by_peer) in by_kind_and_peers {
                for (peer, peer_info) in by_peer {
                    peers
                        .entry(*kind)
                        .or_default()
                        .insert(*peer, peer_info.signed_announce);
                }
            }
            data.0.insert(*content, peers);
        }
        data
    }
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

#[derive(Debug, Clone, Serialize, Deserialize)]
struct PeerInfo {
    /// The signed announce from the peer.
    signed_announce: SignedAnnounce,
    /// last time the peer was randomly probed for the data and answered.
    last_probed: Option<AbsoluteTime>,
}

impl From<SignedAnnounce> for PeerInfo {
    fn from(signed_announce: SignedAnnounce) -> Self {
        Self {
            signed_announce,
            last_probed: None,
        }
    }
}

impl PeerInfo {
    fn last_announced(&self) -> AbsoluteTime {
        self.signed_announce.timestamp
    }
}

impl Tracker {
    /// Create a new tracker server.
    ///
    /// You will have to drive the tracker server yourself, using `handle_connection` and `probe_loop`.
    pub fn new(options: Options, magic_endpoint: MagicEndpoint) -> anyhow::Result<Self> {
        let announce_data = if let Some(data_path) = &options.announce_data_path {
            crate::io::load_from_file::<AnnounceData>(data_path)?
        } else {
            Default::default()
        };
        let announce_db = redb::Database::create(&options.announce_data_path_2)?;
        let tx = announce_db.begin_write()?;
        {
            let _table = tx.open_table(ANNONCE_TABLE_V0)?;
        }
        tx.commit()?;
        let tx = announce_db.begin_read()?;
        let table = tx.open_table(ANNONCE_TABLE_V0)?;
        let mut distinct_content_2 = Vec::new();
        let mut distinct_nodes_2 = BTreeSet::new();
        for entry in table.iter()? {
            let (path, peer_info) = entry?;
            let path = path.value();
            let peer_info = peer_info.value();
            distinct_content_2.push(path.content());
            distinct_nodes_2.insert(peer_info.signed_announce.host);
        }
        drop(table);
        drop(tx);

        let mut state = State::default();
        for (content, peers_by_kind) in announce_data.0 {
            for (kind, peers) in peers_by_kind {
                for (peer, signed_announce) in peers {
                    if let Err(cause) = signed_announce.verify() {
                        tracing::error!("invalid signed announce for peer {}: {}", peer, cause);
                        continue;
                    }
                    let by_kind_and_peer = state.announce_data.entry(content).or_default();
                    by_kind_and_peer
                        .entry(kind)
                        .or_default()
                        .entry(peer)
                        .or_insert(PeerInfo::from(signed_announce));
                }
            }
        }
        let dht = Arc::new(mainline::Dht::default().as_async());
        let distinct_content = state.announce_data.keys().copied().collect::<Vec<_>>();
        let distinct_nodes = state
            .announce_data
            .values()
            .flat_map(|by_kind_and_peer| by_kind_and_peer.values())
            .flat_map(|x| x.values())
            .map(|x| x.signed_announce.host)
            .collect::<BTreeSet<_>>();
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
                let content_for_node = this.get_content_for_node(node);
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
        let mut state = self.0.state.write().unwrap();
        let content = signed_announce.content;
        let mut new_content = false;
        let mut new_host = false;
        let tx = self.0.announce_db.begin_write()?;
        let mut table = tx.open_table(ANNONCE_TABLE_V0)?;
        let path = AnnouncePath::new(content, signed_announce.kind, signed_announce.host);
        let new_content_2 = table
            .range(AnnouncePath::content_min(content)..=AnnouncePath::content_max(content))?
            .next()
            .transpose()?
            .is_none();
        let prev = table.get(path)?.map(|x| x.value());
        let new_host_2 = !prev.is_none();
        let curr = PeerInfo {
            signed_announce,
            last_probed: prev.and_then(|x| x.last_probed),
        };
        table.insert(
            AnnouncePath::new(content, signed_announce.kind, signed_announce.host),
            curr,
        )?;
        drop(table);
        tx.commit()?;
        let entry = state.announce_data.entry(content).or_insert_with(|| {
            new_content = true;
            Default::default()
        });
        let peer_info = entry
            .entry(signed_announce.kind)
            .or_default()
            .entry(signed_announce.host)
            .or_insert_with(|| {
                new_host = true;
                PeerInfo::from(signed_announce)
            });
        peer_info.signed_announce = signed_announce;
        if new_content {
            // if this is a new content, start announcing it to the DHT
            self.setup_dht_announce_task(signed_announce.content);
        }
        if new_host {
            // if this is a new host for this content, start probing it
            self.setup_probe_task(signed_announce.host);
        }
        if let Some(path) = &self.0.options.announce_data_path {
            let data = state.get_persisted_announce_data();
            drop(state);
            crate::io::save_to_file(data, path)?;
        }
        Ok(())
    }

    fn handle_query(&self, query: Query) -> anyhow::Result<QueryResponse> {
        let state = self.0.state.read().unwrap();
        let entry = state.announce_data.get(&query.content);
        let options = &self.0.options;
        let kind = AnnounceKind::from_complete(query.flags.complete);
        let mut peers = vec![];
        let now = AbsoluteTime::now();
        if let Some(by_kind_and_peer) = entry {
            if let Some(entry) = by_kind_and_peer.get(&kind) {
                for peer_info in entry.values() {
                    let recently_announced =
                        now - peer_info.last_announced() <= options.announce_timeout;
                    let recently_probed = peer_info
                        .last_probed
                        .map(|t| now - t <= options.probe_timeout)
                        .unwrap_or_default();
                    if !recently_announced {
                        // announce is too old
                        tracing::error!("announce is too old");
                        continue;
                    }
                    if query.flags.verified && !recently_probed {
                        // query asks for verificated hosts, but the last successful probe is too old
                        tracing::error!("verification of complete data is too old");
                        continue;
                    }
                    peers.push(peer_info.signed_announce);
                }
            }
        } else {
            tracing::error!("no peers for content");
        }
        Ok(QueryResponse { hosts: peers })
    }

    /// Get the content that is supposedly available, grouped by peers
    fn get_content_for_node(&self, node: NodeId) -> BTreeMap<AnnounceKind, HashAndFormat> {
        let state = self.0.state.read().unwrap();
        let mut content_for_node = BTreeMap::<AnnounceKind, HashAndFormat>::new();
        for (content, by_kind_and_node) in state.announce_data.iter() {
            for (kind, by_node) in by_kind_and_node {
                if let Some(_info) = by_node.get(&node) {
                    content_for_node.insert(*kind, *content);
                }
            }
        }
        content_for_node
    }

    fn apply_result(
        &self,
        node: NodeId,
        results: Vec<(HashAndFormat, AnnounceKind, anyhow::Result<Stats>)>,
        now: AbsoluteTime,
    ) -> anyhow::Result<()> {
        let mut state = self.0.state.write().unwrap();
        let tx = self.0.announce_db.begin_write()?;
        let mut table = tx.open_table(ANNONCE_TABLE_V0)?;
        for (content, announce_kind, result) in &results {
            if result.is_ok() {
                let path = AnnouncePath::new(*content, *announce_kind, node);
                let peer_info_opt = table.get(&path)?.map(|x| x.value());
                if let Some(mut peer_info) = peer_info_opt {
                    peer_info.last_probed = Some(now);
                    table.insert(path, peer_info)?;
                }
            }
        }
        drop(table);
        tx.commit()?;
        for (content, announce_kind, result) in results {
            if result.is_ok() {
                let state_for_content = state.announce_data.entry(content).or_default();
                if let Some(peer_info) = state_for_content
                    .entry(announce_kind)
                    .or_default()
                    .get_mut(&node)
                {
                    peer_info.last_probed = Some(now);
                }
            }
        }
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
