use std::collections::BTreeMap;
use std::str::{self, FromStr};

use anyhow::{Context, Result};
use bytes::Bytes;
use futures::{StreamExt, TryStreamExt};
use iroh::rpc_protocol::{DocTicket, ShareMode};
use iroh::sync_engine::LiveEvent;
use iroh_sync::store::Query;
use iroh_sync::{Entry, NamespaceId};
use serde::{Deserialize, Deserializer, Serialize};
use tracing::{debug, error};

use crate::kubo::AddToKuboMessage;
use crate::{
    error::AppError,
    node::{Blake3Cid, PublicListResponse},
    AppState,
};

#[derive(Deserialize)]
pub struct Pagination {
    offset: usize,
    limit: usize,
}

/// Details for an iroh document this anchor knows about.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DocDetails {
    /// The document ID from iroh for the document.
    pub doc_id: NamespaceId,
    /// A ticket which can be used to join this document.
    pub ticket: String,
    /// The data in this document.  Possibly maybe?
    pub data: Option<Vec<DocEntry>>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DocEntry {
    pub author_id: String,
    pub key: String,
    pub hash: String,
    pub content_length: u64,
    pub timestamp: u64,
}

impl From<Entry> for DocEntry {
    fn from(entry: Entry) -> Self {
        let hash = entry.content_hash();
        let key = entry.id().key();
        let key = match String::from_utf8(key.to_vec()) {
            Ok(key) => key,
            Err(_) => {
                // key is not valid UTF-8, base32 encode
                data_encoding::BASE32_NOPAD.encode(key)
            }
        };

        DocEntry {
            author_id: entry.author().to_string(),
            key,
            hash: Blake3Cid(hash).to_string(), // TODO: verify this is correct
            content_length: entry.content_len(),
            timestamp: entry.timestamp(),
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DocJoin {
    #[serde(deserialize_with = "from_str")]
    pub ticket: DocTicket,
}

fn from_str<'de, D, T>(deserializer: D) -> Result<T, D::Error>
where
    D: Deserializer<'de>,
    T: FromStr,
    T::Err: std::fmt::Display,
{
    let s = String::deserialize(deserializer)?;
    T::from_str(&s).map_err(serde::de::Error::custom)
}

#[derive(Deserialize)]
pub struct DocEntryPrefix {
    pub prefix: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DocKV {
    pub key: String,
    pub value: String,
}

pub async fn create_doc(app_state: &AppState) -> Result<DocDetails, AppError> {
    let doc = app_state.iroh()?.docs.create().await?;
    let doc_id = doc.id();
    let ticket = doc.share(ShareMode::Write).await?;

    Ok(DocDetails {
        doc_id,
        ticket: ticket.to_string(),
        data: None,
    })

    // TODO(arqu) record doc name, ticket and id in db?
}

const REPLICATION_PREFIX: &[u8] = b"rep:iroh:";

pub fn is_replicate_prefix(key: &[u8]) -> bool {
    key.starts_with(REPLICATION_PREFIX)
}

pub(crate) async fn subscribe_for_kubo_replication(
    app_state: &AppState,
    doc_id: NamespaceId,
) -> Result<(), AppError> {
    let doc = app_state
        .iroh()?
        .docs
        .open(doc_id)
        .await?
        .context("doc not found")?;

    let mut awaiting_content = BTreeMap::new();
    let kubo_replicate_tx = app_state.kubo_replicator.tx();

    let mut stream = doc.subscribe().await?;
    tracing::info!("subscribe_for_kubo_replication: subscribed");
    while let Some(event) = stream.next().await {
        let event = event?;
        match event {
            LiveEvent::InsertRemote {
                entry,
                content_status,
                ..
            } => {
                // ignore everything that isn't a replicate prefix
                if !is_replicate_prefix(entry.key()) {
                    tracing::info!("ignoring key {:?}", str::from_utf8(entry.key()).unwrap());
                    continue;
                }

                match content_status {
                    iroh_sync::ContentStatus::Missing | iroh_sync::ContentStatus::Incomplete => {
                        // wait for the data, store the entry
                        tracing::info!("subscribe_for_kubo_replication: missing/incomplete");
                        awaiting_content.insert(entry.content_hash(), entry);
                    }
                    iroh_sync::ContentStatus::Complete => {
                        // we have the data, skip the map & go straight to replication
                        let msg = AddToKuboMessage {
                            doc_id,
                            iroh_hash: entry.content_hash(),
                        };
                        let tx = kubo_replicate_tx.clone();
                        tokio::task::spawn(async move {
                            tracing::info!("subscribe_for_kubo_replication: complete. sending");
                            if let Err(e) = tx.send(msg).await {
                                error!("failed to send entry to kubo: {}", e);
                            }
                        });
                    }
                }
            }
            LiveEvent::ContentReady { hash } => {
                // we have data! check to see if it needs replicating
                if let Some(entry) = awaiting_content.get(&hash) {
                    let msg = AddToKuboMessage {
                        doc_id,
                        iroh_hash: entry.content_hash(),
                    };
                    let tx = kubo_replicate_tx.clone();
                    tokio::task::spawn(async move {
                        tracing::info!("subscribe_for_kubo_replication: ContentReady. sending");
                        if let Err(e) = tx.send(msg).await {
                            error!("failed to send entry to kubo: {}", e);
                        }
                    });
                    awaiting_content.remove(&hash);
                }
            }
            _ => {} // LiveEvent::ContentReady { hash } => {
                    // }
                    // LiveEvent::SyncFinished(..) => ()
                    // LiveEvent::NeighborUp(..) => ()
                    // LiveEvent::NeighborDown(..) => ()
        };
    }
    Ok(())
}

pub async fn get_docs(app_state: &AppState) -> Result<Vec<DocDetails>, AppError> {
    let mut stream = app_state.iroh()?.docs.list().await?;
    let mut doc_details = Vec::new();
    while let Some((id, _)) = stream.try_next().await? {
        let doc = app_state.iroh()?.docs.open(id).await?;
        if let Some(d) = doc {
            let doc_id = d.id();
            let ticket = d.share(ShareMode::Write).await?;
            doc_details.push(DocDetails {
                doc_id,
                ticket: ticket.to_string(),
                data: None,
            });
        }
    }
    Ok(doc_details)
}

pub async fn get_doc(app_state: &AppState, doc_id: String) -> Result<DocDetails, AppError> {
    let namespace_id = NamespaceId::from_str(&doc_id)?;
    let doc = app_state
        .iroh()?
        .docs
        .open(namespace_id)
        .await?
        .ok_or_else(|| {
            AppError::Other(anyhow::anyhow!(
                "doc not found: {}",
                namespace_id.to_string()
            ))
        })?;
    let ticket = doc.share(ShareMode::Write).await?;
    let mut doc_entries_stream = doc.get_many(Query::all()).await?;
    let mut doc_entries = Vec::new();
    while let Some(entry) = doc_entries_stream.try_next().await? {
        let doc_entry: DocEntry = entry.into();
        doc_entries.push(doc_entry);
    }
    let doc_details = DocDetails {
        doc_id: namespace_id,
        ticket: ticket.to_string(),
        data: Some(doc_entries),
    };

    Ok(doc_details)
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DocSetItem {
    pub key: String,
    pub value: Bytes,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DocSetList {
    pub items: Vec<DocSetItem>,
}

#[derive(Serialize)]
pub struct DocMutationResult {
    pub deleted_count: usize,
}

pub async fn doc_del(
    app_state: &AppState,
    doc_id: String,
    prefix: Vec<u8>,
) -> Result<DocMutationResult, AppError> {
    let namespace_id = NamespaceId::from_str(&doc_id)?;
    let doc = app_state
        .iroh()?
        .docs
        .open(namespace_id)
        .await?
        .ok_or_else(|| {
            AppError::Other(anyhow::anyhow!(
                "doc not found: {}",
                namespace_id.to_string()
            ))
        })?;

    let deleted_count = doc.del(app_state.get_author_id(), prefix).await?;

    Ok(DocMutationResult { deleted_count })
}

pub async fn doc_drop(app_state: &AppState, doc_id: String) -> Result<(), AppError> {
    let namespace_id = NamespaceId::from_str(&doc_id)?;
    app_state
        .iroh()?
        .docs
        .drop_doc(namespace_id)
        .await
        .map_err(|_| {
            AppError::Other(anyhow::anyhow!(
                "doc not found: {}",
                namespace_id.to_string()
            ))
        })
}

pub async fn update_doc(
    app_state: &AppState,
    doc_id: String,
    kv: DocSetItem,
) -> Result<DocDetails, AppError> {
    let namespace_id = NamespaceId::from_str(&doc_id)?;
    let doc = app_state
        .iroh()?
        .docs
        .open(namespace_id)
        .await?
        .ok_or_else(|| {
            AppError::Other(anyhow::anyhow!(
                "doc not found: {}",
                namespace_id.to_string()
            ))
        })?;
    let ticket = doc.share(ShareMode::Write).await?;

    doc.set_bytes(
        app_state.get_author_id(),
        kv.key.into_bytes(),
        kv.value.to_vec(),
    )
    .await?;

    let doc_details = DocDetails {
        doc_id: namespace_id,
        ticket: ticket.to_string(),
        data: None,
    };

    Ok(doc_details)
}

pub async fn get_blobs(
    app_state: AppState,
    pagination: Pagination,
) -> Result<Vec<PublicListResponse>, AppError> {
    let mut offset = pagination.offset;
    let mut response = app_state.iroh()?.blobs.list().await?;
    let mut blobs = Vec::new();
    debug!("offset: {}, limit: {}", offset, pagination.limit);
    while let Some(item) = response.next().await {
        if offset > 0 {
            offset -= 1;
            continue;
        }
        if blobs.len() == pagination.limit {
            break;
        }
        match item {
            Ok(item) => blobs.push(PublicListResponse {
                path: item.path.into(),
                hash: Blake3Cid(item.hash).to_string(),
                size: item.size,
            }),
            Err(e) => {
                println!("error: {}", e);
            }
        };
    }
    debug!("returning {} blobs", blobs.len());
    Ok(blobs)
    // TODO: handle pagination
}

pub async fn join_doc(app_state: &AppState, ticket: DocTicket) -> Result<DocDetails, AppError> {
    let doc = app_state.iroh()?.docs.import(ticket.clone()).await?;
    let doc_id = doc.id();

    Ok(DocDetails {
        doc_id,
        ticket: ticket.to_string(),
        data: None,
    })
}

pub async fn get_doc_item_bytes(
    app_state: AppState,
    doc_id: String,
    key: String,
) -> Result<Bytes, AppError> {
    let namespace_id = NamespaceId::from_str(&doc_id)?;
    let doc = app_state
        .iroh()?
        .docs
        .open(namespace_id)
        .await?
        .ok_or_else(|| {
            AppError::Other(anyhow::anyhow!(
                "doc not found: {}",
                namespace_id.to_string()
            ))
        })?;
    let _ticket = doc.share(ShareMode::Write).await?;
    let query = Query::all().key_exact(key.into_bytes());
    let mut doc_entries_stream = doc.get_many(query).await?;
    let mut latest_entry: Option<Entry> = None;
    while let Some(entry) = doc_entries_stream.try_next().await? {
        let e_id = entry.id();
        let key = e_id.key();
        let key = String::from_utf8(key.to_vec());
        let ts = entry.timestamp();

        match key {
            Ok(_) => {
                if ts > latest_entry.as_ref().map(|a| a.timestamp()).unwrap_or(0) {
                    latest_entry = Some(entry);
                }
            }
            Err(e) => {
                error!("error: {}", e);
            }
        }
    }

    if let Some(entry) = latest_entry {
        match doc.read_to_bytes(&entry).await {
            Ok(content) => {
                return Ok(content);
            }
            Err(err) => {
                error!("failed to read entry: {}", err);
                return Err(AppError::Other(anyhow::anyhow!("failed to read entry")));
            }
        }
    }

    Err(AppError::Other(anyhow::anyhow!("no entry found")))
}
