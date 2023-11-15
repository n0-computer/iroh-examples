use axum::response::{IntoResponse, Json, Response};
use hyper::StatusCode;
use serde_json::json;
use tracing::warn;

#[derive(Debug, thiserror::Error)]
pub enum AppError {
    #[error("{0:#}")]
    Other(anyhow::Error),
}

impl From<anyhow::Error> for AppError {
    fn from(err: anyhow::Error) -> Self {
        AppError::Other(err)
    }
}

impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        use AppError::*;
        let (status, error_message) = match self {
            Other(err) => {
                warn!("other error: {:?}", err);
                (StatusCode::INTERNAL_SERVER_ERROR, "".to_string())
            }
        };

        let body = Json(json!({
            "error": error_message,
        }));

        (status, body).into_response()
    }
}

/// Convenient extension to log errors using tracing.
pub trait LogExt<T, E>
where
    Self: std::marker::Sized,
{
    /// Logs an error if the receiver contains an Err value.
    #[track_caller]
    fn log_err(self) -> Result<T, E>;
}

impl<T, E: std::fmt::Display> LogExt<T, E> for Result<T, E> {
    #[track_caller]
    fn log_err(self) -> Result<T, E> {
        if let Err(err) = &self {
            tracing::error!("{err:#}");
        };
        self
    }
}
