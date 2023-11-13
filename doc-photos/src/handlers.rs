use axum::{extract::State, response::Html, Json};
use bytes::Bytes;

use crate::iroh::{join_doc, DocDetails, DocJoin};
use crate::{error::AppError, node::ProviderInfo, AppState};

pub async fn node_status_handler(
    State(app_state): State<AppState>,
) -> Result<Json<ProviderInfo>, AppError> {
    let provider_details = app_state.provider_details.clone();
    Ok(Json(provider_details))
}

pub async fn frontend_handler() -> Html<&'static str> {
    Html(include_str!("./static/index.html"))
}

pub async fn join_doc_handler(
    State(app_state): State<AppState>,
    Json(import): Json<DocJoin>,
) -> Result<Json<DocDetails>, AppError> {
    tracing::info!("joining doc: {:?}", &import);
    let doc = join_doc(&app_state, import.ticket).await?;
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
