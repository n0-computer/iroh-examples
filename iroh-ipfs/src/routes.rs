use std::net::SocketAddr;
use std::ops::Deref;
use std::sync::Arc;

use anyhow::Result;
use axum::routing::{get, post};
use axum::Router;
use iroh::sync::AuthorId;
use sentry::integrations::tower::{NewSentryLayer, SentryHttpLayer};
use tower_http::trace::{DefaultMakeSpan, TraceLayer};

use crate::config::Config;
use crate::handlers;
use crate::node::{get_provider_peer_id, ProviderInfo};

#[derive(Debug, Clone)]
pub struct AppState(Inner);

impl Deref for AppState {
    type Target = Inner;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

#[derive(Clone, derive_more::Debug)]
pub struct Inner {
    pub(crate) config: Arc<Config>,
    pub(crate) provider_details: ProviderInfo,
    pub(crate) iroh_client: Arc<Option<iroh::client::mem::Iroh>>,
    pub(crate) author_id: Option<AuthorId>,
}

impl AppState {
    pub async fn new() -> Result<Self> {
        let config = Config::new();

        let provider_peer_id = get_provider_peer_id().await.unwrap();
        let provider_details = ProviderInfo {
            author_id: None,
            peer_id: provider_peer_id.to_string(),
            addr: config.provider_address.clone(),
            // Use the empty string as a sentinel value, real value is
            // set in the "provider" api handler
            auth_token: "".to_string(),
        };

        tracing::debug!("connected to postgres");

        Ok(Self(Inner {
            provider_details,
            config: Arc::new(config),
            iroh_client: Arc::new(None),
            author_id: None,
        }))
    }

    pub fn listen_addr(&self) -> SocketAddr {
        self.config.listen_addr
    }

    pub fn provider_node_id(&self) -> String {
        self.provider_details.peer_id.clone()
    }

    pub fn provider_addr(&self) -> SocketAddr {
        self.config.provider_address.parse().unwrap()
    }

    pub fn set_iroh_client(&mut self, client: Option<iroh::client::mem::Iroh>) {
        self.0.iroh_client = Arc::new(client);
    }

    pub fn set_author_id(&mut self, author_id: AuthorId) {
        self.0.author_id = Some(author_id);
        self.0.provider_details.author_id = Some(author_id.to_string());
    }

    pub fn get_author_id(&self) -> AuthorId {
        self.0.author_id.unwrap()
    }

    pub fn iroh(&self) -> Result<iroh::client::mem::Iroh> {
        self.0
            .iroh_client
            .as_ref()
            .clone()
            .ok_or_else(|| anyhow::anyhow!("iroh client not initialized"))
    }

    pub async fn create_app(&self) -> Result<Router> {
        let app = Router::new()
            .route("/api/health", get(|| async { "iroh-kubo" }))
            .route("/api/node/status", get(handlers::node::node_status_handler))
            .route("/api/docs/join", post(handlers::iroh::join_doc_handler))
            .layer(
                TraceLayer::new_for_http()
                    .make_span_with(DefaultMakeSpan::default().include_headers(true)),
            )
            .layer(SentryHttpLayer::new())
            .layer(NewSentryLayer::new_from_top())
            .with_state(self.clone());
        Ok(app)
    }
}
