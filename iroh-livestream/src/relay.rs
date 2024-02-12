//! minimal moq relay impl
//! based on: https://github.com/kixelated/moq-rs/tree/main/moq-relay

use std::{
    collections::HashMap,
    ops::{Deref, DerefMut},
    sync::{Arc, Mutex, Weak},
};

use anyhow::Context;
use iroh_net::MagicEndpoint;
use tokio::task::JoinSet;
use tokio::time;
use tracing::info;

use moq_transport::cache::{broadcast, CacheError};
use moq_transport::{session::Request, setup::Role, MoqError};

use crate::ticket::CastUrl;

pub async fn run(endpoint: MagicEndpoint) -> anyhow::Result<()> {
    // Create an iroh-net QUIC server for media.
    let relay = Relay::new(endpoint)
        .await
        .context("failed to create server")?;
    println!("Relay URL:\n{}", relay.url().await?);
    relay.serve().await.context("failed to run quic server")
}

pub struct Relay {
    endpoint: MagicEndpoint,

    // The active connections.
    conns: JoinSet<anyhow::Result<()>>,

    // The map of active broadcasts by path.
    origin: Origin,
}

impl Relay {
    // Create a QUIC endpoint that can be used for both clients and servers.
    pub async fn new(endpoint: MagicEndpoint) -> anyhow::Result<Self> {
        let origin = Origin::new();
        let conns = JoinSet::new();
        Ok(Self {
            endpoint,
            conns,
            origin,
        })
    }

    pub async fn url(&self) -> anyhow::Result<CastUrl> {
        let addr = self.endpoint.my_addr().await?;
        let url = CastUrl::new(addr, "".to_string())?;
        Ok(url)
    }

    pub async fn serve(mut self) -> anyhow::Result<()> {
        info!("listening on {:?}", self.endpoint.local_addr()?);

        loop {
            tokio::select! {
                res = self.endpoint.accept() => {
                    let conn = res.context("failed to accept QUIC connection")?;
                    let mut session = Session::new(self.origin.clone());
                    self.conns.spawn(async move { session.run(conn).await });
                },
                res = self.conns.join_next(), if !self.conns.is_empty() => {
                    let res = res.expect("no tasks").expect("task aborted");
                    if let Err(err) = res {
                        tracing::warn!("connection terminated: {:?}", err);
                    }
                },
            }
        }
    }
}

#[derive(Clone)]
pub struct Origin {
    // A map of active broadcasts by ID.
    cache: Arc<Mutex<HashMap<String, Weak<Subscriber>>>>,
}

impl Origin {
    pub fn new() -> Self {
        Self {
            cache: Default::default(),
        }
    }

    /// Create a new broadcast with the given ID.
    ///
    /// Publisher::run needs to be called to periodically refresh the origin cache.
    pub async fn publish(&mut self, id: &str) -> Result<Publisher, RelayError> {
        let (publisher, subscriber) = broadcast::new(id);

        let subscriber = {
            let mut cache = self.cache.lock().unwrap();

            // Check if the broadcast already exists.
            // TODO This is racey, because a new publisher could be created while existing subscribers are still active.
            if cache.contains_key(id) {
                return Err(CacheError::Duplicate.into());
            }

            // Create subscriber that will remove from the cache when dropped.
            let subscriber = Arc::new(Subscriber {
                broadcast: subscriber,
                origin: self.clone(),
            });

            cache.insert(id.to_string(), Arc::downgrade(&subscriber));

            subscriber
        };

        // Create a publisher.
        // It holds a reference to the subscriber to prevent dropping early.
        let publisher = Publisher {
            broadcast: publisher,
            subscriber,
        };

        Ok(publisher)
    }

    pub fn subscribe(&self, id: &str) -> Option<Arc<Subscriber>> {
        let cache = self.cache.lock().unwrap();

        if let Some(broadcast) = cache.get(id) {
            if let Some(broadcast) = broadcast.upgrade() {
                return Some(broadcast);
            }
        }
        None
    }
}

pub struct Subscriber {
    pub broadcast: broadcast::Subscriber,
    origin: Origin,
}

impl Drop for Subscriber {
    fn drop(&mut self) {
        self.origin.cache.lock().unwrap().remove(&self.broadcast.id);
    }
}

pub struct Publisher {
    pub broadcast: broadcast::Publisher,

    #[allow(dead_code)]
    subscriber: Arc<Subscriber>,
}

impl Publisher {
    pub async fn run(&mut self) -> Result<(), RelayError> {
        // Every 5m tell the API we're still alive.
        // TODO don't hard-code these values
        let mut interval = time::interval(time::Duration::from_secs(60 * 5));

        loop {
            // TODO move to start of loop; this is just for testing
            interval.tick().await;
        }
    }

    pub async fn close(&mut self) -> Result<(), RelayError> {
        Ok(())
    }
}

impl Deref for Publisher {
    type Target = broadcast::Publisher;

    fn deref(&self) -> &Self::Target {
        &self.broadcast
    }
}

impl DerefMut for Publisher {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.broadcast
    }
}

#[derive(Clone)]
pub struct Session {
    origin: Origin,
}

impl Session {
    pub fn new(origin: Origin) -> Self {
        Self { origin }
    }

    pub async fn run(&mut self, conn: quinn::Connecting) -> anyhow::Result<()> {
        tracing::debug!("received QUIC handshake: ip={:?}", conn.remote_address());

        // Wait for the QUIC connection to be established.
        let conn = conn.await.context("failed to establish QUIC connection")?;

        tracing::debug!(
            "established QUIC connection: ip={:?} id={}",
            conn.remote_address(),
            conn.stable_id()
        );
        let id = conn.stable_id();

        // Wait for the CONNECT request.
        let request = webtransport_quinn::accept(conn)
            .await
            .context("failed to receive WebTransport request")?;

        // Strip any leading and trailing slashes to get the broadcast name.
        let path = request.url().path().trim_matches('/').to_string();

        tracing::debug!("received WebTransport CONNECT: id={} path={}", id, path);

        // Accept the CONNECT request.
        let session = request
            .ok()
            .await
            .context("failed to respond to WebTransport request")?;

        // Perform the MoQ handshake.
        let request = moq_transport::session::Server::accept(session)
            .await
            .context("failed to accept handshake")?;

        tracing::debug!("received MoQ SETUP: id={} role={:?}", id, request.role());

        let role = request.role();

        match role {
            Role::Publisher => {
                if let Err(err) = self.serve_publisher(id, request, &path).await {
                    tracing::warn!(
                        "error serving publisher: id={} path={} err={:#?}",
                        id,
                        path,
                        err
                    );
                }
            }
            Role::Subscriber => {
                if let Err(err) = self.serve_subscriber(id, request, &path).await {
                    tracing::warn!(
                        "error serving subscriber: id={} path={} err={:#?}",
                        id,
                        path,
                        err
                    );
                }
            }
            Role::Both => {
                tracing::warn!("role both not supported: id={}", id);
                request.reject(300);
            }
        };

        tracing::debug!("closing connection: id={}", id);

        Ok(())
    }

    async fn serve_publisher(
        &mut self,
        id: usize,
        request: Request,
        path: &str,
    ) -> anyhow::Result<()> {
        tracing::info!("serving publisher: id={}, path={}", id, path);

        let mut origin = match self.origin.publish(path).await {
            Ok(origin) => origin,
            Err(err) => {
                request.reject(err.code());
                return Err(err.into());
            }
        };

        let session = request.subscriber(origin.broadcast.clone()).await?;

        tokio::select! {
            _ = session.run() => origin.close().await?,
            _ = origin.run() => (), // TODO send error to session
        };

        Ok(())
    }

    async fn serve_subscriber(
        &mut self,
        id: usize,
        request: Request,
        path: &str,
    ) -> anyhow::Result<()> {
        tracing::info!("serving subscriber: id={} path={}", id, path);

        let Some(subscriber) = self.origin.subscribe(path) else {
            request.reject(404);
            tracing::warn!("reject request for {path}: no publisher");
            return Ok(())
        };

        let session = request.publisher(subscriber.broadcast.clone()).await?;
        session.run().await?;

        // Make sure this doesn't get dropped too early
        drop(subscriber);

        Ok(())
    }
}

#[derive(thiserror::Error, Debug)]
pub enum RelayError {
    #[error("transport error: {0}")]
    Transport(#[from] moq_transport::session::SessionError),

    #[error("cache error: {0}")]
    Cache(#[from] moq_transport::cache::CacheError),

    // #[error("api error: {0}")]
    // MoqApi(#[from] moq_api::ApiError),
    //
    #[error("url error: {0}")]
    Url(#[from] url::ParseError),

    #[error("webtransport client error: {0}")]
    WebTransportClient(#[from] webtransport_quinn::ClientError),

    #[error("webtransport server error: {0}")]
    WebTransportServer(#[from] webtransport_quinn::ServerError),
    // #[error("missing node")]
    // MissingNode,
}
impl moq_transport::MoqError for RelayError {
    fn code(&self) -> u32 {
        match self {
            Self::Transport(err) => err.code(),
            Self::Cache(err) => err.code(),
            // Self::MoqApi(_err) => 504,
            Self::Url(_) => 500,
            // Self::MissingNode => 500,
            Self::WebTransportClient(_) => 504,
            Self::WebTransportServer(_) => 500,
        }
    }

    fn reason(&self) -> String {
        match self {
            Self::Transport(err) => format!("transport error: {}", err.reason()),
            Self::Cache(err) => format!("cache error: {}", err.reason()),
            // Self::MoqApi(err) => format!("api error: {}", err),
            Self::Url(err) => format!("url error: {}", err),
            // Self::MissingNode => "missing node".to_owned(),
            Self::WebTransportServer(err) => format!("upstream server error: {}", err),
            Self::WebTransportClient(err) => format!("upstream client error: {}", err),
        }
    }
}
