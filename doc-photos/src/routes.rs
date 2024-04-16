use std::net::SocketAddr;
use std::ops::Deref;
use std::sync::Arc;

use anyhow::Result;
use axum::routing::{get, post};
use axum::Router;
use iroh::sync::AuthorId;
use sentry::integrations::tower::{NewSentryLayer, SentryHttpLayer};
use tokio::sync::broadcast;
use tower_http::trace::{DefaultMakeSpan, TraceLayer};

use crate::config::Config;
use crate::node::{get_provider_peer_id, Event, ProviderInfo};
use crate::{handlers, websocket};

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
    pub(crate) provider_events: Arc<broadcast::Sender<Event>>,
    pub(crate) provider_details: ProviderInfo,
    pub(crate) iroh_client: iroh::client::mem::Iroh,
    pub(crate) author_id: AuthorId,
}

pub fn load_config() -> Config {
    Config::new()
}

impl AppState {
    pub async fn new(
        config: Config,
        iroh_client: iroh::client::mem::Iroh,
        author_id: AuthorId,
        provider_events: Arc<broadcast::Sender<Event>>,
    ) -> Result<Self> {
        let provider_peer_id = get_provider_peer_id().await.unwrap();
        let provider_details = ProviderInfo {
            author_id: None,
            peer_id: provider_peer_id.to_string(),
            port: config.provider_port,
            // Use the empty string as a sentinel value, real value is
            // set in the "provider" api handler
            auth_token: "".to_string(),
        };

        tracing::debug!("connected to postgres");

        Ok(Self(Inner {
            provider_details,
            config: Arc::new(config),
            iroh_client,
            author_id,
            provider_events,
        }))
    }

    pub fn listen_addr(&self) -> SocketAddr {
        self.config.listen_addr
    }

    pub fn provider_node_id(&self) -> String {
        self.provider_details.peer_id.clone()
    }

    pub fn provider_port(&self) -> u16 {
        self.config.provider_port
    }

    pub fn get_author_id(&self) -> AuthorId {
        self.0.author_id
    }

    pub fn iroh(&self) -> &iroh::client::mem::Iroh {
        &self.0.iroh_client
    }

    pub async fn create_app(&self) -> Result<Router> {
        let app = Router::new()
            .route("/", get(handlers::home_handler))
            .route("/gallery/:doc_id", get(handlers::doc_photos_html_handler))
            .route("/ws", get(websocket::ws_handler))
            .route("/blobs/:hash", get(handlers::blob_handler))
            .route("/docs/join", post(handlers::join_doc_handler))
            .route("/doc-photos/:doc_id", get(handlers::doc_photos_handler))
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
