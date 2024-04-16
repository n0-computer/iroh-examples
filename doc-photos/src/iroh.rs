use std::str::{self, FromStr};

use anyhow::Result;
use bytes::Bytes;
use futures::{StreamExt, TryStreamExt};
use iroh::{
    client::Entry,
    rpc_protocol::{DocTicket, ShareMode},
    sync::{store::Query, NamespaceId},
};
use serde::{Deserialize, Deserializer, Serialize};
use tracing::{debug, error};

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
    pub doc_id: String,
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

pub async fn get_docs(app_state: &AppState) -> Result<Vec<DocDetails>, AppError> {
    let mut stream = app_state.iroh().docs.list().await?;
    let mut doc_details = Vec::new();
    while let Some((id, _)) = stream.try_next().await? {
        let doc = app_state.iroh().docs.open(id).await?;
        if let Some(d) = doc {
            let doc_id = d.id();
            let ticket = d.share(ShareMode::Write).await?;
            doc_details.push(DocDetails {
                doc_id: doc_id.to_string(),
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
        .iroh()
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
        doc_id: namespace_id.to_string(),
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
        .iroh()
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
        .iroh()
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
        .iroh()
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
        doc_id: namespace_id.to_string(),
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
    let mut response = app_state.iroh().blobs.list().await?;
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
    let doc = app_state.iroh().docs.import(ticket.clone()).await?;
    let doc_id = doc.id();

    Ok(DocDetails {
        doc_id: doc_id.to_string(),
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
        .iroh()
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
    let query = Query::single_latest_per_key().key_exact(key.into_bytes());
    let latest_entry = doc.get_one(query).await?;

    if let Some(entry) = latest_entry {
        match entry.content_bytes(&doc).await {
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
