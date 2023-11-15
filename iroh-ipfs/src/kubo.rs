use std::collections::BTreeMap;
use std::fmt::Debug;
use std::str;

use anyhow::{anyhow, ensure, Context, Result};
use async_trait::async_trait;
use bytes::Bytes;
use cid::Cid;
use futures::StreamExt;
use hyper::StatusCode;
use ipfs_api_prelude::response::{AddResponse, BlockPutResponse, IdResponse, PinLsResponse};
use iroh::{
    bytes::util::Hash,
    client::Doc,
    rpc_protocol::{ProviderRequest, ProviderResponse},
    sync::{store::Query, AuthorId, NamespaceId},
    sync_engine::LiveEvent,
};
use libipld::{cbor::DagCborCodec, raw::RawCodec};
use quic_rpc::transport::flume::FlumeConnection;
use serde::{Deserialize, Serialize};
use tokio::{io::AsyncRead, sync::mpsc, task::JoinHandle};
use tracing::error;
use url::Url;

/// Kubo max block size: 1MB
const KUBO_MAX_BLOCK_SIZE: u64 = 1024 * 1000;
/// don't replicate files larger than 1 Gig
const KUBO_MAX_REPLICATION_SIZE: u64 = 1024 * 1000 * 100;

const REPLICATION_PREFIX: &str = "ipfs:";

pub fn is_replicate_prefix(key: &[u8]) -> bool {
    key.starts_with(REPLICATION_PREFIX.as_bytes())
}

pub fn ipfs_cid_from_key(key: &[u8]) -> Result<cid::Cid> {
    // trim off REPLICATION_PREFIX & return a new array
    let bytes = &key[REPLICATION_PREFIX.len()..];
    // confirm the resulting array is a valid IPFS hash by parsing it as a CID
    cid::Cid::try_from(bytes).map_err(|_| anyhow::anyhow!("invalid IPFS CID"))
}

#[derive(Debug)]
pub(crate) struct KuboReplicator {
    doc: Doc<FlumeConnection<ProviderResponse, ProviderRequest>>,
    kubo_tx: mpsc::Sender<Hash>,
    handle: JoinHandle<()>,
}

impl Drop for KuboReplicator {
    fn drop(&mut self) {
        self.handle.abort();
    }
}

impl KuboReplicator {
    pub(crate) async fn new(
        doc_id: NamespaceId,
        author_id: AuthorId,
        kubo_url: Url,
        iroh_client: iroh::client::mem::Iroh,
    ) -> Result<Self> {
        let (kubo_tx, mut rx) = mpsc::channel::<Hash>(10000);

        let doc = iroh_client
            .docs
            .open(doc_id)
            .await?
            .context("doc not found")?;

        let mut replicated = BTreeMap::new();
        let mut replicated_keys = doc
            .get_many(Query::all().key_prefix(REPLICATION_PREFIX))
            .await?;
        while let Some(entry) = replicated_keys.next().await {
            let entry = entry?;
            if let Ok(ipfs_cid) = ipfs_cid_from_key(entry.key()) {
                replicated.insert(entry.content_hash(), ipfs_cid);
            }
        }
        tracing::info!("found {} key(s) that need replicating", replicated.len());

        // build receive task
        let iroh = iroh_client.clone();
        let doc_2 = doc.clone();
        let iroh_2 = iroh.clone();
        let mut kubo_client = KuboClient::new(&kubo_url);

        let handle = tokio::spawn(async move {
            while let Some(iroh_hash) = rx.recv().await {
                match replicate(&iroh_2, &mut kubo_client, iroh_hash, author_id, &doc_2).await {
                    Ok(kubo_cid) => {
                        tracing::info!("replicated iroh hash: {} to kubo: {}", iroh_hash, kubo_cid);
                        replicated.insert(iroh_hash, kubo_cid);
                    }
                    Err(err) => {
                        tracing::warn!("failed to replicate {}: {:?}", iroh_hash, err);
                    }
                }
            }
        });

        Ok(Self {
            doc,
            kubo_tx,
            handle,
        })
    }

    pub(crate) async fn start(&mut self) -> Result<()> {
        let mut awaiting_content = BTreeMap::new();
        let mut stream = self.doc.subscribe().await?;
        tracing::info!("subscribe_for_kubo_replication: subscribed");

        while let Some(event) = stream.next().await {
            let event = event?;
            match event {
                LiveEvent::InsertRemote {
                    entry,
                    content_status,
                    ..
                } => {
                    // ignore any changes that have the replication prefix
                    if is_replicate_prefix(entry.key()) {
                        tracing::info!("ignoring key {:?}", str::from_utf8(entry.key()));
                        continue;
                    }

                    match content_status {
                        iroh::sync::ContentStatus::Missing
                        | iroh::sync::ContentStatus::Incomplete => {
                            // wait for the data, store the entry
                            tracing::info!("subscribe_for_kubo_replication: missing/incomplete");
                            awaiting_content.insert(entry.content_hash(), entry);
                        }
                        iroh::sync::ContentStatus::Complete => {
                            // we have the data, skip the map & go straight to replication
                            let tx = self.kubo_tx.clone();
                            tokio::task::spawn(async move {
                                tracing::info!("subscribe_for_kubo_replication: complete. sending");
                                if let Err(e) = tx.send(entry.content_hash()).await {
                                    error!("failed to send entry to kubo: {}", e);
                                }
                            });
                        }
                    }
                }
                LiveEvent::ContentReady { hash } => {
                    // we have data! check to see if it needs replicating
                    if let Some(entry) = awaiting_content.get(&hash) {
                        let tx = self.kubo_tx.clone();
                        if let Err(e) = tx.send(entry.content_hash()).await {
                            error!("failed to send entry to kubo: {}", e);
                        }
                        awaiting_content.remove(&hash);
                    }
                }
                _ => {} // LiveEvent::SyncFinished(..) => ()
                        // LiveEvent::NeighborUp(..) => ()
                        // LiveEvent::NeighborDown(..) => ()
            };
        }
        Ok(())
    }
}

#[derive(Debug, Clone, PartialEq, PartialOrd, Serialize, Deserialize)]
pub enum ReplicationStatus {
    /// This content is not replicated
    None,
    /// This content cannot be replicated  
    Invalid,
    /// Tried to replicate this content, but it failed
    Failed,
    /// At least one replica has ACK'd having this content
    Replicated,
}

async fn replicate(
    iroh: &iroh::client::mem::Iroh,
    kubo_client: &mut KuboClient,
    iroh_hash: Hash,
    author_id: AuthorId,
    doc: &Doc<FlumeConnection<ProviderResponse, ProviderRequest>>,
) -> Result<cid::Cid> {
    tracing::info!("replicating {}", iroh_hash);
    let (kubo_cid, size) = replicate_to_kubo(iroh, kubo_client, iroh_hash).await?;

    let key = [String::from(REPLICATION_PREFIX), kubo_cid.to_string()].concat();
    doc.set_hash(author_id, key, iroh_hash, size).await?;

    Ok(kubo_cid)
}

async fn replicate_to_kubo(
    iroh: &iroh::client::mem::Iroh,
    kubo_client: &mut KuboClient,
    iroh_hash: Hash,
) -> Result<(cid::Cid, u64)> {
    // get size of file at path
    let mut reader = iroh.blobs.read(iroh_hash).await?;
    let size = reader.size();

    if size > KUBO_MAX_REPLICATION_SIZE {
        return Err(anyhow!("file too large"));
    }

    if size < KUBO_MAX_BLOCK_SIZE {
        let cid = Cid::try_from(crate::node::Blake3Cid(iroh_hash).to_string())?;
        let data = reader.read_to_bytes().await?;
        kubo_client.put_block(&cid, data).await?;
        Ok((cid, size))
    } else {
        // bigger than a block, use unixfs add
        let data = reader.read_to_bytes().await?;
        let cid = kubo_client.unixfs_add(data).await?;
        Ok((cid, size))
    }
}

#[async_trait]
pub trait IpfsClientAsyncReadSendSync: AsyncRead + Send + Sync + 'static {}
impl<S> IpfsClientAsyncReadSendSync for S where S: AsyncRead + Send + Sync + 'static {}

/// A generic interface for interacting with an IPFS-like backend where it may
/// be desirable to syndicate sphere data to. Although the interface was
/// designed after a small subset of the capabilities of IPFS Kubo, it is
/// intended to be general enough to apply to other IPFS implementations.
#[async_trait]
pub trait IpfsClient: Clone + Debug {
    /// Returns true if the block (referenced by [Cid]) is pinned by the IPFS
    /// server
    async fn block_is_pinned(&self, cid: &Cid) -> Result<bool>;

    /// Returns a string that represents the identity (for example, a
    /// base64-encoded public key) of a node. This node is used to track
    /// syndication progress over time, so it should ideally be stable for a
    /// given server as the client interacts with it over time
    async fn server_identity(&self) -> Result<String>;

    /// Given some CAR bytes, syndicate that CAR to the IPFS server. Callers
    /// expect the roots in the CAR to be explicitly pinned, and for their
    /// descendents to be pinned by association.
    async fn syndicate_blocks<R>(&self, car: R) -> Result<()>
    where
        R: IpfsClientAsyncReadSendSync;

    /// Returns the associated block (referenced by [Cid]) if found.
    async fn get_block(&self, cid: &Cid) -> Result<Option<Vec<u8>>>;

    /// Places the associated block with cid on the corresponding backend.
    async fn put_block(&mut self, cid: &Cid, block: Bytes) -> Result<()>;

    ///
    async fn unixfs_add(&self, data: Bytes) -> Result<Cid>;

    /// Same as `get_block`, but turns a `None` value into an error.
    async fn require_block(&self, cid: &Cid) -> Result<Vec<u8>> {
        match self.get_block(cid).await? {
            Some(block) => Ok(block),
            None => Err(anyhow!("No block found for CID {}", cid)),
        }
    }
}

/// Maps a codec defined in a [Cid] to a string
/// used in the Kubo RPC API. Mappings can be found:
/// <https://github.com/multiformats/multicodec/blob/master/table.csv>
fn get_codec(cid: &Cid) -> Result<String> {
    match cid.codec() {
        codec if codec == u64::from(RawCodec) => Ok(String::from("raw")),
        codec if codec == u64::from(DagCborCodec) => Ok(String::from("dag-cbor")),
        codec => Err(anyhow!("Codec not supported {}", codec)),
    }
}

/// A high-level HTTP client for accessing IPFS
/// [Kubo RPC APIs](https://docs.ipfs.tech/reference/kubo/rpc/) and normalizing
/// their expected payloads to Noosphere-friendly formats
#[derive(Clone, Debug)]
pub struct KuboClient {
    client: reqwest::Client,
    api_url: Url,
}

impl KuboClient {
    pub fn new(api_url: &Url) -> Self {
        let client = reqwest::Client::new();
        KuboClient {
            client,
            api_url: api_url.clone(),
        }
    }
}

#[async_trait]
impl IpfsClient for KuboClient {
    async fn block_is_pinned(&self, cid: &Cid) -> Result<bool> {
        let mut url = self.api_url.clone();
        let cid_base64 = cid.to_string();

        url.set_path("/api/v0/pin/ls");

        let response = self
            .client
            .post(url)
            .query(&[("arg", &cid_base64)])
            .send()
            .await?;

        ensure!(
            response.status() == StatusCode::OK,
            "unexpected status code: {}",
            response.status()
        );

        let PinLsResponse { keys } = response.json().await?;

        Ok(keys.contains_key(&cid_base64))
    }

    async fn server_identity(&self) -> Result<String> {
        let mut url = self.api_url.clone();
        url.set_path("/api/v0/id");

        let response = self.client.post(url).send().await?;
        ensure!(
            response.status() == StatusCode::OK,
            "unexpected status code: {}",
            response.status()
        );

        let IdResponse { public_key, .. } = response.json().await?;

        Ok(public_key)
    }

    async fn syndicate_blocks<R>(&self, car: R) -> Result<()>
    where
        R: IpfsClientAsyncReadSendSync,
    {
        let mut url = self.api_url.clone();
        url.set_path("/api/v0/dag/import");

        let part = reqwest::multipart::Part::stream(reqwest::Body::wrap_stream(
            tokio_util::io::ReaderStream::new(car),
        ));
        let form = reqwest::multipart::Form::new().part("file", part);

        let response = self.client.post(url).multipart(form).send().await?;
        ensure!(
            response.status() == StatusCode::OK,
            "unexpected status code: {}",
            response.status()
        );

        Ok(())
    }

    async fn put_block(&mut self, cid: &Cid, block: Bytes) -> Result<()> {
        let codec = get_codec(cid)?;
        let mut url = self.api_url.clone();
        url.set_path("/api/v0/block/put");

        let len = block.len() as _;
        let part = reqwest::multipart::Part::stream_with_length(reqwest::Body::from(block), len);
        let form = reqwest::multipart::Form::new().part("data", part);

        let response = self
            .client
            .post(url)
            .query(&[
                ("cid-codec", codec.as_str()),
                ("mhtype", "blake3"),
                ("pin", "true"),
            ])
            .multipart(form)
            .send()
            .await?;

        ensure!(
            response.status() == StatusCode::OK,
            "unexpected status code: {}",
            response.status()
        );

        let BlockPutResponse { key, .. } = response.json().await?;
        if key != cid.to_string() {
            Err(anyhow!("Put CID: {} Got CID: {}", cid, key))
        } else {
            Ok(())
        }
    }

    async fn get_block(&self, cid: &Cid) -> Result<Option<Vec<u8>>> {
        let output_codec = get_codec(cid)?;
        let mut url = self.api_url.clone();
        url.set_path("/api/v0/dag/get");

        let response = self
            .client
            .post(url)
            .query(&[("arg", cid.to_string()), ("output-codec", output_codec)])
            .send()
            .await?;

        ensure!(
            response.status() == StatusCode::OK,
            "unexpected status code: {}",
            response.status()
        );

        let res = response.bytes().await?;
        Ok(Some(res.into()))
    }

    async fn unixfs_add(&self, data: Bytes) -> Result<Cid> {
        let mut url = self.api_url.clone();
        url.set_path("/api/v0/add");

        let len = data.len() as _;
        let part = reqwest::multipart::Part::stream_with_length(reqwest::Body::from(data), len);
        let form = reqwest::multipart::Form::new().part("data", part);

        let response = self
            .client
            .post(url)
            .query(&[("pin", "true"), ("hash", "blake3"), ("raw-leaves", "true")])
            .multipart(form)
            .send()
            .await?;

        ensure!(
            response.status() == StatusCode::OK,
            "unexpected status code: {}",
            response.status()
        );

        let AddResponse { hash, .. } = response.json().await?;
        Ok(Cid::try_from(hash)?)
    }
}
