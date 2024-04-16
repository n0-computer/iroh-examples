use std::str::FromStr;

use anyhow::Context;
use axum::{
    extract::{Path, State},
    response::{Html, IntoResponse},
    Json,
};
use bytes::Bytes;
use futures::TryStreamExt;
use iroh::{
    rpc_protocol::Hash,
    sync::{store::Query, NamespaceId},
};
use serde::Serialize;

use crate::iroh::{join_doc, DocDetails, DocJoin};
use crate::{error::AppError, node::ProviderInfo, AppState};

pub async fn node_status_handler(
    State(app_state): State<AppState>,
) -> Result<Json<ProviderInfo>, AppError> {
    let provider_details = app_state.provider_details.clone();
    Ok(Json(provider_details))
}

pub async fn home_handler() -> Html<&'static str> {
    Html(include_str!("./static/index.html"))
}

pub async fn doc_photos_html_handler() -> Html<&'static str> {
    Html(include_str!("./static/gallery.html"))
}

pub async fn join_doc_handler(
    State(app_state): State<AppState>,
    Json(import): Json<DocJoin>,
) -> Result<Json<DocDetails>, AppError> {
    tracing::info!("joining doc: {:?}", &import);
    let doc = join_doc(&app_state, import.ticket).await?;
    Ok(doc.into())
}

#[derive(Serialize)]
pub struct DocPhoto {
    pub key: String,
    pub url: String,
}

pub async fn doc_photos_handler(
    State(app_state): State<AppState>,
    Path(doc_id): Path<String>,
) -> Result<Json<Vec<DocPhoto>>, AppError> {
    let doc_id = NamespaceId::from_str(&doc_id)?;
    let doc = app_state
        .iroh()
        .docs
        .open(doc_id)
        .await?
        .context("doc not found")?;
    let mut doc_entries_stream = doc.get_many(Query::all()).await?;
    let mut photos = Vec::new();
    while let Some(entry) = doc_entries_stream.try_next().await? {
        let key = match String::from_utf8(entry.key().to_vec()) {
            Ok(s) => s,
            Err(..) => continue,
        };
        let hash = entry.content_hash();
        if entry.key().ends_with(b".jpg")
            || entry.key().ends_with(b".jpeg")
            || entry.key().ends_with(b".png")
        {
            let header = app_state.iroh().blobs.read(hash).await?;
            if header.is_complete() {
                photos.push(DocPhoto {
                    key,
                    url: format!("/blobs/{}", entry.content_hash()),
                });
            }
        }
    }
    Ok(photos.into())
}

pub async fn blob_handler(
    State(app_state): State<AppState>,
    Path(hash): Path<String>,
) -> Result<impl IntoResponse, AppError> {
    let hash = Hash::from_str(&hash).map_err(|e| AppError::Other(e.into()))?;
    let mut header = app_state.iroh().blobs.read(hash).await?;
    let data = header.read_to_bytes().await?;
    Ok(data)
}

#[derive(Debug)]
pub struct DataResponse {
    pub status_code: hyper::StatusCode,
    pub body: axum::body::BoxBody,
    pub headers: hyper::HeaderMap,
}

impl axum::response::IntoResponse for DataResponse {
    fn into_response(self) -> axum::response::Response {
        let mut rb = axum::response::Response::builder().status(self.status_code);
        let rh = rb.headers_mut().unwrap();
        rh.extend(self.headers);
        rb.body(self.body).unwrap()
    }
}

impl DataResponse {
    #[tracing::instrument(skip(body))]
    pub fn new<B>(
        status_code: hyper::StatusCode,
        body: B,
        headers: hyper::HeaderMap,
    ) -> DataResponse
    where
        B: 'static + hyper::body::HttpBody<Data = Bytes> + Send,
        <B as hyper::body::HttpBody>::Error:
            Into<Box<dyn std::error::Error + Send + Sync + 'static>>,
    {
        DataResponse {
            status_code,
            body: axum::body::boxed(body),
            headers,
        }
    }
}
