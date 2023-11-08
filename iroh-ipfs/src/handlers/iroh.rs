use axum::{
    extract::State,
    Json,
};
use bytes::Bytes;


use crate::iroh::{join_doc, subscribe_for_kubo_replication, DocDetails, DocJoin};
use crate::{error::AppError, AppState};

pub async fn join_doc_handler(
    State(app_state): State<AppState>,
    Json(import): Json<DocJoin>,
) -> Result<Json<DocDetails>, AppError> {
    tracing::info!("joining doc: {:?}", &import);
    let doc = join_doc(&app_state, import.ticket).await?;

    let app_state_2 = app_state.clone();
    tokio::task::spawn(async move {
        tracing::info!("subscibing for kubo replication");
        if let Err(e) = subscribe_for_kubo_replication(&app_state_2, doc.doc_id).await {
            tracing::error!("Failed to subscribe for kubo replication: {:#}", e);
        }
    });

    Ok(doc.into())
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
