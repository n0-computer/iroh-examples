use std::fmt;
use std::net::{Ipv4Addr, SocketAddr, SocketAddrV4};
use std::path::PathBuf;
use std::str::FromStr;
use std::sync::Arc;

use anyhow::{anyhow, Context, Result};
use futures::TryStreamExt;
use iroh::{
    bytes::{
        protocol::RequestToken,
        store::{flat, Store as BaoStore},
        util::runtime,
        Hash,
    },
    client::{self, quic::RPC_ALPN, Iroh},
    net::{
        derp::{DerpMap, DerpMode},
        key::{PublicKey, SecretKey},
    },
    node::{Node, StaticTokenAuthHandler},
    rpc_protocol::{ProviderRequest, ProviderResponse, ProviderService},
    sync::{store::Store as DocStore, AuthorId},
    util::path::IrohPaths,
};
use quic_rpc::transport::flume::FlumeConnection;
use quic_rpc::transport::quinn::QuinnServerEndpoint;
use quic_rpc::ServiceEndpoint;
use serde::{Deserialize, Serialize};
use tokio::io::AsyncWriteExt;
use tokio::sync::{broadcast, oneshot::Sender};

use crate::config::doc_photos_data_dir;

pub async fn start_node(
    port: u16,
    rpc_port: u16,
    tx_rpc_client: Sender<client::mem::RpcClient>,
    provider_events_sender: Arc<broadcast::Sender<Event>>,
) -> Result<()> {
    let tokio = tokio::runtime::Handle::current();
    let tpc = tokio_util::task::LocalPoolHandle::new(num_cpus::get());
    let rt = iroh::bytes::util::runtime::Handle::new(tokio, tpc);
    let rpc_port = ProviderRpcPort::Enabled(rpc_port);
    let derp_map = iroh::net::defaults::default_derp_map();

    let opts = ProvideOptions {
        port,
        rpc_port,
        keylog: false,
        request_token: None,
        derp_map: Some(derp_map),
    };

    let repo_root = doc_photos_data_dir()?;
    let meta_dir = repo_root.join(IrohPaths::BaoFlatStoreMeta);
    let blob_dir = repo_root.join(IrohPaths::BaoFlatStoreComplete);
    let partial_blob_dir = repo_root.join(IrohPaths::BaoFlatStorePartial);
    let peer_data_path = repo_root.join(IrohPaths::PeerData);
    tokio::fs::create_dir_all(&blob_dir).await?;
    tokio::fs::create_dir_all(&partial_blob_dir).await?;
    let db = flat::Store::load(&blob_dir, &partial_blob_dir, &meta_dir, &rt)
        .await
        .with_context(|| format!("Failed to load iroh database from {}", blob_dir.display()))?;
    tracing::debug!("Starting iroh node config...");
    let key = Some(repo_root.join(IrohPaths::SecretKey));
    tracing::debug!("Starting iroh node config: got key");
    let store = iroh::sync::store::fs::Store::new(repo_root.join(IrohPaths::DocsDatabase))
        .context("no fs store")?;
    tracing::debug!("Starting iroh node config: got store");
    let provider = provide(db.clone(), store, &rt, key, peer_data_path, opts).await?;
    tracing::debug!("Subscribing to node events");
    provider
        .subscribe(move |event| {
            let sender = provider_events_sender.clone();
            Box::pin(async move {
                sender.send(event).unwrap();
            })
        })
        .await?;
    tracing::debug!("Starting iroh node config: got provider");
    let controller = provider.controller();
    tracing::debug!("Starting iroh controller...");
    tx_rpc_client.send(controller).unwrap();

    tracing::debug!("Starting iroh node...");
    tokio::select! {
        biased;
        res = provider => {
            res?;
        }
    }

    Ok(())
}

pub const DOC_PHOTOS_DEFAULT_RPC_PORT: u16 = 0x1340; // NOTE: intentionally different from default iroh RPC port
pub const MAX_RPC_CONNECTIONS: u32 = 16;
pub const MAX_RPC_STREAMS: u64 = 1024;

async fn provide<B: BaoStore, D: DocStore>(
    bao_store: B,
    doc_store: D,
    rt: &runtime::Handle,
    key: Option<PathBuf>,
    peers_data_path: PathBuf,
    opts: ProvideOptions,
) -> Result<Node<B>> {
    let secret_key = get_secret_key(key).await?;

    // TODO(arqu): custom auth handler
    let mut builder = Node::builder(bao_store, doc_store)
        .custom_auth_handler(Arc::new(StaticTokenAuthHandler::new(opts.request_token)))
        .peers_data_path(peers_data_path)
        .keylog(opts.keylog);
    if let Some(dm) = opts.derp_map {
        builder = builder.derp_mode(DerpMode::Custom(dm));
    }
    let builder = builder.bind_port(opts.port).runtime(rt);

    let provider = if let Some(rpc_port) = opts.rpc_port.into() {
        let rpc_endpoint = make_rpc_endpoint(&secret_key, rpc_port)?;
        builder
            .rpc_endpoint(rpc_endpoint)
            .secret_key(secret_key)
            .spawn()
            .await?
    } else {
        builder.secret_key(secret_key).spawn().await?
    };
    let eps = provider.local_endpoints().await?;
    println!("Listening addresses:");
    for ep in eps {
        println!("  {}", ep.addr);
    }
    let region = provider.my_derp();
    println!(
        "DERP Region: {}",
        region.map_or("None".to_string(), |r| r.to_string())
    );
    println!("PeerID: {}", provider.node_id());
    println!();
    Ok(provider)
}

pub async fn get_secret_key(key: Option<PathBuf>) -> Result<SecretKey> {
    match key {
        Some(key_path) => {
            if key_path.exists() {
                let keystr = tokio::fs::read(key_path).await?;
                let secret_key = SecretKey::try_from_openssh(keystr).context("invalid keyfile")?;
                Ok(secret_key)
            } else {
                let secret_key = SecretKey::generate();
                let ser_key = secret_key.to_openssh()?;

                // Try to canoncialize if possible
                let key_path = key_path.canonicalize().unwrap_or(key_path);
                let key_path_parent = key_path.parent().ok_or_else(|| {
                    anyhow!("no parent directory found for '{}'", key_path.display())
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
        None => {
            // No path provided, just generate one
            Ok(SecretKey::generate())
        }
    }
}

/// Makes a an RPC endpoint that uses a QUIC transport
fn make_rpc_endpoint(
    secret_key: &SecretKey,
    rpc_port: u16,
) -> Result<impl ServiceEndpoint<ProviderService>> {
    let rpc_addr = SocketAddr::V4(SocketAddrV4::new(Ipv4Addr::LOCALHOST, rpc_port));
    let rpc_quinn_endpoint = quinn::Endpoint::server(
        iroh::node::make_server_config(
            secret_key,
            MAX_RPC_STREAMS,
            MAX_RPC_CONNECTIONS,
            vec![RPC_ALPN.to_vec()],
        )?,
        rpc_addr,
    )?;
    let rpc_endpoint =
        QuinnServerEndpoint::<ProviderRequest, ProviderResponse>::new(rpc_quinn_endpoint)?;
    Ok(rpc_endpoint)
}

#[derive(Debug)]
pub struct ProvideOptions {
    pub port: u16,
    pub rpc_port: ProviderRpcPort,
    pub keylog: bool,
    pub request_token: Option<RequestToken>,
    pub derp_map: Option<DerpMap>,
}

#[derive(Debug, Clone)]
pub enum ProviderRpcPort {
    Enabled(u16),
    Disabled,
}

impl From<ProviderRpcPort> for Option<u16> {
    fn from(value: ProviderRpcPort) -> Self {
        match value {
            ProviderRpcPort::Enabled(port) => Some(port),
            ProviderRpcPort::Disabled => None,
        }
    }
}

impl fmt::Display for ProviderRpcPort {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            ProviderRpcPort::Enabled(port) => write!(f, "{port}"),
            ProviderRpcPort::Disabled => write!(f, "disabled"),
        }
    }
}

impl FromStr for ProviderRpcPort {
    type Err = anyhow::Error;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        if s == "disabled" {
            Ok(ProviderRpcPort::Disabled)
        } else {
            Ok(ProviderRpcPort::Enabled(s.parse()?))
        }
    }
}

// TODO(arqu): figure out why this is needed in the anchor

#[repr(transparent)]
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Blake3Cid(pub Hash);

const CID_PREFIX: [u8; 4] = [
    0x01, // version
    0x55, // raw codec
    0x1e, // hash function, blake3
    0x20, // hash size, 32 bytes
];

impl Blake3Cid {
    pub fn new(hash: Hash) -> Self {
        Blake3Cid(hash)
    }

    pub fn as_hash(&self) -> &Hash {
        &self.0
    }

    pub fn as_bytes(&self) -> [u8; 36] {
        let hash: [u8; 32] = self.0.as_ref().try_into().unwrap();
        let mut res = [0u8; 36];
        res[0..4].copy_from_slice(&CID_PREFIX);
        res[4..36].copy_from_slice(&hash);
        res
    }

    pub fn from_bytes(bytes: &[u8]) -> anyhow::Result<Self> {
        anyhow::ensure!(
            bytes.len() == 36,
            "invalid cid length, expected 36, got {}",
            bytes.len()
        );
        anyhow::ensure!(bytes[0..4] == CID_PREFIX, "invalid cid prefix");
        let mut hash = [0u8; 32];
        hash.copy_from_slice(&bytes[4..36]);
        Ok(Blake3Cid(Hash::from(hash)))
    }
}

impl fmt::Display for Blake3Cid {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        // result will be 58 bytes plus prefix
        let mut res = "b".to_string();
        // write the encoded bytes
        data_encoding::BASE32_NOPAD.encode_append(&self.as_bytes(), &mut res);
        // hack since data_encoding doesn't have BASE32LOWER_NOPAD as a const
        res.make_ascii_lowercase();
        // write the str, no allocations
        f.write_str(&res)
    }
}

impl FromStr for Blake3Cid {
    type Err = anyhow::Error;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let sb = s.as_bytes();
        if sb.len() == 59 && sb[0] == b'b' {
            // this is a base32 encoded cid, we can decode it directly
            let mut t = [0u8; 58];
            t.copy_from_slice(&sb[1..]);
            // hack since data_encoding doesn't have BASE32LOWER_NOPAD as a const
            std::str::from_utf8_mut(t.as_mut())
                .unwrap()
                .make_ascii_uppercase();
            // decode the bytes
            let mut res = [0u8; 36];
            data_encoding::BASE32_NOPAD
                .decode_mut(&t, &mut res)
                .map_err(|_e| anyhow::anyhow!("invalid base32"))?;
            // convert to cid, this will check the prefix
            Self::from_bytes(&res)
        } else {
            // if we want to support all the weird multibase prefixes, we have no choice
            // but to use the multibase crate
            let (_base, bytes) = multibase::decode(s)?;
            Self::from_bytes(bytes.as_ref())
        }
    }
}

impl Serialize for Blake3Cid {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        // result will be 58 bytes plus prefix
        let mut res = "b".to_string();
        // write the encoded bytes
        data_encoding::BASE32_NOPAD.encode_append(&self.as_bytes(), &mut res);
        // hack since data_encoding doesn't have BASE32LOWER_NOPAD as a const
        res.make_ascii_lowercase();
        serializer.serialize_str(&res)
    }
}

// alias for the type of the event channel, wraps iroh::bytes::provider::Event
pub type Event = iroh::node::Event;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ProviderInfo {
    pub author_id: Option<String>,
    pub peer_id: String,
    pub port: u16,
    // TODO(b5): hack to work with auth token for the moment
    pub auth_token: String,
}

pub async fn get_provider_peer_id() -> Result<PublicKey> {
    let repo_root = doc_photos_data_dir()?;
    let key = Some(repo_root.join(IrohPaths::SecretKey));
    let secret_key = get_secret_key(key).await?;
    let peer_id: PublicKey = secret_key.public();

    Ok(peer_id)
}

#[derive(Debug, Serialize, Deserialize)]
pub struct PublicListResponse {
    pub path: PathBuf,
    pub hash: String,
    pub size: u64,
}

pub async fn get_author(
    iroh: &Iroh<FlumeConnection<ProviderResponse, ProviderRequest>>,
) -> Result<AuthorId> {
    let mut stream = iroh.authors.list().await?;
    if let Some(author_id) = stream.try_next().await? {
        return Ok(author_id);
    }
    let author_id = iroh.authors.create().await?;
    Ok(author_id)
}
