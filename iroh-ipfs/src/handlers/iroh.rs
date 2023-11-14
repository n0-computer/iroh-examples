use axum::{extract::State, Json};
use bytes::Bytes;
use iroh::sync::NamespaceId;

use crate::iroh::{join_doc, DocDetails, DocJoin};
use crate::kubo::KuboReplicator;
use crate::{error::AppError, AppState};

pub async fn join_doc_handler(
    State(app_state): State<AppState>,
    Json(import): Json<DocJoin>,
) -> Result<Json<DocDetails>, AppError> {
    tracing::info!("joining doc: {:?}", &import);
    let doc = join_doc(&app_state, import.ticket).await?;

    let state = app_state.clone();
    let doc_id = doc.doc_id;

    tokio::task::spawn(async move {
        tracing::info!("subscribing for kubo replication");
        if let Err(err) = subscribe(&state, doc_id).await {
            tracing::error!("Failed to subscribe for kubo replication: {:#?}", err);
        }
    });
    Ok(doc.into())
}

async fn subscribe(state: &AppState, doc_id: NamespaceId) -> anyhow::Result<()> {
    let client = state.iroh();
    let kubo_url = url::Url::parse(&state.config.kubo_url)?;
    let mut replicator =
        KuboReplicator::new(doc_id, state.author_id, kubo_url, client.clone()).await?;

    replicator.start().await
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
