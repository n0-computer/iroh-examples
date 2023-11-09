use axum::response::{IntoResponse, Json, Response};
use hyper::StatusCode;
use serde_json::json;
use tracing::warn;

#[derive(Debug, thiserror::Error)]
pub enum AppError {
    #[error("unauthorized")]
    Unauthorized,
    #[error("invalid code")]
    InvalidCode,
    #[error("invalid login")]
    InvalidLogin,
    #[error("invalid email")]
    InvalidEmail,
    #[error("username taken")]
    UsernameTaken,
    #[error("anchor name taken")]
    AnchorNameTaken,
    #[error("invalid request: {0:#}")]
    InvalidRequest(anyhow::Error),
    #[error("{0:#}")]
    Other(anyhow::Error),
    #[error("anchor limit reached")]
    AnchorLimitReached,
    #[error("invalid anchor name")]
    InvalidAnchorName,
    #[error("anchor name reserved")]
    AnchorNameReserved,
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
            Unauthorized => (
                StatusCode::UNAUTHORIZED,
                "user is not authorized".to_string(),
            ),
            InvalidCode => (StatusCode::UNAUTHORIZED, "invalid invite code".to_string()),
            InvalidLogin => (
                StatusCode::UNAUTHORIZED,
                "Invalid username or password".to_string(),
            ),
            InvalidEmail => (StatusCode::BAD_REQUEST, "invalid email".to_string()),
            UsernameTaken => (
                StatusCode::BAD_REQUEST,
                "username already taken".to_string(),
            ),
            AnchorNameTaken => (
                StatusCode::BAD_REQUEST,
                "network name already taken".to_string(),
            ),
            InvalidRequest(err) => (StatusCode::BAD_REQUEST, format!("invalid request: {}", err)),
            Other(err) => {
                warn!("other error: {:?}", err);
                (StatusCode::INTERNAL_SERVER_ERROR, "".to_string())
            }
            AnchorLimitReached => (StatusCode::BAD_REQUEST, "network limit reached".to_string()),
            AnchorNameReserved => (StatusCode::BAD_REQUEST, "network name in use".to_string()),
            InvalidAnchorName => (StatusCode::BAD_REQUEST, "invalid network name".to_string()),
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
