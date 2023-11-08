use std::fmt::Debug;

use anyhow::{anyhow, ensure, Context, Result};
use async_trait::async_trait;
use bytes::Bytes;
use cid::Cid;
use hyper::StatusCode;
use ipfs_api_prelude::response::{AddResponse, BlockPutResponse, IdResponse, PinLsResponse};
use iroh::bytes::util::Hash;
use iroh_sync::{AuthorId, NamespaceId};
use libipld::cbor::DagCborCodec;
use libipld::raw::RawCodec;
use serde::{Deserialize, Serialize};
use time::OffsetDateTime as DateTime;
use tokio::io::AsyncRead;
use tokio::sync::mpsc;
use url::Url;

use crate::node::Blake3Cid;

/// Kubo max block size: 1MB
const KUBO_MAX_BLOCK_SIZE: u64 = 1024 * 1000;
/// don't replicate files larger than 1 Gig
const KUBO_MAX_REPLICATION_SIZE: u64 = 1024 * 1000 * 100;

#[derive(Debug)]
pub(crate) struct AddToKuboMessage {
    pub doc_id: NamespaceId,
    pub iroh_hash: Hash,
}

#[derive(Debug, Clone)]
pub(crate) struct KuboReplicator {
    iroh_client: Option<iroh::client::mem::Iroh>,
    kubo_url: Url,
    kubo_tx: mpsc::Sender<AddToKuboMessage>,
    author_id: Option<AuthorId>,
}

impl KuboReplicator {
    pub(crate) fn new(kubo_url: Url) -> Self {
        // fake channel to start. the real one is allocated when iroh_client is set
        let (kubo_tx, _) = mpsc::channel::<AddToKuboMessage>(10000);

        Self {
            iroh_client: None,
            kubo_url,
            kubo_tx,
            author_id: None,
        }
    }

    pub(crate) fn set_author_id(&mut self, author_id: AuthorId) {
        self.author_id = Some(author_id);
    }

    pub(crate) fn set_iroh(&mut self, iroh_client: iroh::client::mem::Iroh) {
        self.iroh_client = Some(iroh_client);
    }

    pub(crate) fn start(&mut self) -> Result<()> {
        let (kubo_tx, mut rx) = mpsc::channel::<AddToKuboMessage>(10000);
        self.kubo_tx = kubo_tx;
        let url_2 = self.kubo_url.clone();
        let iroh = self.iroh_client.clone().context("iroh client is missing")?;
        let author_id = self.author_id.context("author id is missing")?;
        tokio::spawn(async move {
            while let Some(msg) = rx.recv().await {
                let iroh = iroh.clone();
                tracing::info!("replicating {} {}", msg.doc_id, msg.iroh_hash);
                let kubo_client = &mut KuboClient::new(&url_2).unwrap();
                let (kubo_cid, size) = replicate_to_kubo(&iroh, kubo_client, msg.iroh_hash)
                    .await
                    .unwrap();

                let doc = iroh.docs.open(msg.doc_id).await.unwrap().unwrap();
                let key = format!("map:iroh:{}:kubo:{}", msg.iroh_hash, kubo_cid);

                doc.set_hash(author_id, key, msg.iroh_hash, size)
                    .await
                    .unwrap();
                tracing::info!(
                    "replicated doc: {} iroh: {} kubo: {}",
                    msg.doc_id,
                    msg.iroh_hash,
                    kubo_cid
                );
            }
        });
        Ok(())
    }

    pub(crate) fn tx(&self) -> mpsc::Sender<AddToKuboMessage> {
        self.kubo_tx.clone()
    }
}

#[derive(Debug, Clone, PartialEq, PartialOrd, Serialize, Deserialize)]
pub enum ReplicationStatus {
    None,       /* this content is not replicated */
    Invalid,    /* this content cannot be replicated  */
    Failed,     /* tried to replicate this content, but it failed */
    Replicated, /* at least one replica has ACK'd having this content */
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct KuboReplication {
    iroh_cid: String,         // TODO - better type
    kubo_cid: Option<String>, // TODO - better type
    created_at: DateTime,
    updated_at: DateTime,
    replica_kubo_id: Option<String>, // TODO - better type
    status: ReplicationStatus,
    creator_pub_key: Option<String>, // TODO - better type
    signature: Option<String>,       // TODO - better type
    size: i64,
}

// /// Retrieve the replication status (if any) for a given iroh hash
async fn get_kubo_replication(_iroh_hash: Hash) -> Result<KuboReplication> {
    Err(anyhow!("not implemented"))
    // match sqlx::query_as!(
    //     KuboReplication,
    //     r#"SELECT
    //         anchor_id,
    //         created_at,
    //         updated_at,
    //         iroh_cid,
    //         kubo_cid,
    //         replica_kubo_id,
    //         status as "status: _",
    //         creator_pub_key,
    //         signature,
    //         size
    //     FROM kubo_replications
    //     WHERE iroh_cid = $1
    //     "#,
    //     iroh_hash.to_string()
    // )
    // .fetch_one(db)
    // .await
    // {
    //     Ok(replication) => Ok(replication),
    //     Err(e) => Err(anyhow!("error getting kubo replication: {}", e)),
    // }
}

// async fn upsert_replication(
//     db: &PgPool,
//     replication: KuboReplication,
//     prev: Option<KuboReplication>,
// ) -> Result<KuboReplication> {
//     match prev {
//         Some(_prev) => update_replication(db, replication).await,
//         None => insert_replication(db, replication).await,
//     }
// }

// async fn insert_replication(db: &PgPool, replication: KuboReplication) -> Result<KuboReplication> {
//     match sqlx::query_as!(
//         KuboReplication,
//         r#"INSERT INTO kubo_replications (anchor_id, iroh_cid, kubo_cid, replica_kubo_id, status, creator_pub_key, signature, size)
//         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
//         RETURNING
//             anchor_id,
//             created_at,
//             updated_at,
//             iroh_cid,
//             kubo_cid,
//             replica_kubo_id,
//             status as "status: _",
//             creator_pub_key,
//             signature,
//             size
//         "#,
//         replication.anchor_id,
//         replication.iroh_cid,
//         replication.kubo_cid,
//         replication.replica_kubo_id,
//         replication.status as _,
//         replication.creator_pub_key,
//         replication.signature,
//         replication.size as i64,
//     ).fetch_one(db).await {
//         Ok(replication) => Ok(replication),
//         Err(e) => Err(anyhow!("error inserting kubo replication: {}", e))
//     }
// }

// async fn update_replication(db: &PgPool, replication: KuboReplication) -> Result<KuboReplication> {
//     match sqlx::query_as!(
//         KuboReplication,
//         // language=PostgreSQL
//         r#"UPDATE kubo_replications
//         SET
//             updated_at = now(),
//             anchor_id = $1,
//             iroh_cid = $2,
//             kubo_cid = $3,
//             replica_kubo_id = $4,
//             status = $5,
//             creator_pub_key = $6,
//             signature = $7,
//             size = $8
//         WHERE iroh_cid = $2
//         RETURNING
//             anchor_id,
//             created_at,
//             updated_at,
//             iroh_cid,
//             kubo_cid,
//             replica_kubo_id,
//             status as "status: _",
//             creator_pub_key,
//             signature,
//             size
//         "#,
//         replication.anchor_id,
//         replication.iroh_cid,
//         replication.kubo_cid,
//         replication.replica_kubo_id,
//         replication.status as _,
//         replication.creator_pub_key,
//         replication.signature,
//         replication.size as i64,
//     )
//     .fetch_one(db)
//     .await
//     {
//         Ok(replication) => Ok(replication),
//         Err(e) => Err(anyhow!("error updating kubo replication: {}", e)),
//     }
// }

async fn replicate_to_kubo(
    iroh: &iroh::client::mem::Iroh,
    kubo_client: &mut KuboClient,
    iroh_hash: Hash,
) -> Result<(cid::Cid, u64)> {
    tracing::debug!("checking replication status for {}", Blake3Cid(iroh_hash));
    let _prev_replication = match get_kubo_replication(iroh_hash).await {
        Ok(replication) => {
            match replication.status {
                ReplicationStatus::None | ReplicationStatus::Failed => Some(replication),
                ReplicationStatus::Invalid => {
                    tracing::info!("iroh cid {} is invalid, replicating again", iroh_hash);
                    Some(replication)
                }
                ReplicationStatus::Replicated => {
                    // TODO(b5) - check updated-at, if it's older than, say 24 hours,
                    // do a confirmation that the given kubo replica still has
                    // the CID
                    if let Some(cid_string) = replication.kubo_cid {
                        // we're already replicated, early return
                        let cid = Cid::try_from(cid_string)?;
                        return Ok((cid, replication.size as u64));
                    }

                    tracing::info!("iroh cid {} is replicated, but no kubo cid exists in the db, replicating again", iroh_hash);
                    Some(replication)
                }
            }
        }
        Err(_) => None,
    };

    // get size of file at path
    let mut reader = iroh.blobs.read(iroh_hash).await?;
    let size = reader.size();

    // TODO(b5): increase this limit
    if size > KUBO_MAX_REPLICATION_SIZE {
        return Err(anyhow!("file too large"));
    }

    if size < KUBO_MAX_BLOCK_SIZE {
        // put_equivelant_block(kubo_client, iroh, iroh_hash).await?;
        // println!("putting {:?}. path: {:?}", &hash, &path);
        let cid = Cid::try_from(crate::node::Blake3Cid(iroh_hash).to_string())?;
        let data = reader.read_to_bytes().await?;
        kubo_client.put_block(&cid, data).await?;
        // upsert_replication(
        //     db,
        //     KuboReplication {
        //         anchor_id: Some(anchor_id),
        //         iroh_cid: iroh_hash.to_string(),
        //         kubo_cid: Some(cid.to_string()),
        //         created_at: DateTime::now_utc(),
        //         updated_at: DateTime::now_utc(),
        //         replica_kubo_id: None,
        //         status: ReplicationStatus::Replicated,
        //         creator_pub_key: None,
        //         signature: None,
        //         size: size as i64,
        //     },
        //     prev_replication,
        // )
        // .await?;
        Ok((cid, size))
    } else {
        // bigger than a block, use unixfs add
        let data = reader.read_to_bytes().await?;
        let cid = kubo_client.unixfs_add(data).await?;
        // upsert_replication(
        //     db,
        //     KuboReplication {
        //         anchor_id: Some(anchor_id),
        //         iroh_cid: iroh_hash.to_string(),
        //         kubo_cid: Some(cid.to_string()),
        //         created_at: DateTime::now_utc(),
        //         updated_at: DateTime::now_utc(),
        //         replica_kubo_id: None,
        //         status: ReplicationStatus::Replicated,
        //         creator_pub_key: None,
        //         signature: None,
        //         size: size as i64,
        //     },
        //     prev_replication,
        // )
        // .await?;

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
    // TODO: This probably doesn't need to return a result
    pub fn new(api_url: &Url) -> Result<Self> {
        let client = reqwest::Client::new();
        Ok(KuboClient {
            client,
            api_url: api_url.clone(),
        })
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
