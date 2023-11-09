use axum::{extract::State, Json};

use crate::{error::AppError, node::ProviderInfo, AppState};

pub async fn node_status_handler(
    State(app_state): State<AppState>,
) -> Result<Json<ProviderInfo>, AppError> {
    let provider_details = app_state.provider_details.clone();
    Ok(Json(provider_details))
}
