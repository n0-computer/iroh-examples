//! Combines [`iroh`] with automerge's [`samod`] library, a library to create "automerge repositories"
//! in rust that speak the automerge repo protocol.
use anyhow::Result;
use codec::Codec;
use samod::{ConnDirection, ConnFinishedReason, Repo};
use tokio_util::codec::{FramedRead, FramedWrite};

mod codec;

/// Combines an [`iroh::Endpoint`] with a [`Repo`] (automerge repository) and
/// implements [`iroh::protocol::ProtocolHandler`] to accept incoming connections
/// in an [`iroh::protocol::Router`].
#[derive(derive_more::Debug, Clone)]
pub struct IrohRepo {
    endpoint: iroh::Endpoint,
    #[debug(skip)]
    repo: Repo,
}

impl IrohRepo {
    pub const SYNC_ALPN: &[u8] = b"iroh/automerge-repo/1";

    /// Constructs a new [`IrohRepo`].
    pub fn new(endpoint: iroh::Endpoint, repo: Repo) -> Self {
        IrohRepo { endpoint, repo }
    }

    /// Attempts to continuously sync with a peer at given address.
    ///
    /// To wait for the connection to be established use [`Repo::when_connected`]
    /// (accessible via [`Self::repo`]: `iroh_repo.repo().when_connected(..)`).
    /// with the other node's string-encoded [`NodeId`] as the [`PeerId`].
    ///
    /// [`NodeId`]: iroh::NodeId
    /// [`PeerId`]: samod::PeerId
    pub async fn sync_with(
        &self,
        addr: impl Into<iroh::NodeAddr>,
    ) -> anyhow::Result<ConnFinishedReason> {
        let addr = addr.into();
        let node_id = addr.node_id;
        let conn = self.endpoint.connect(addr, IrohRepo::SYNC_ALPN).await?;
        let (send, recv) = conn.open_bi().await?;

        let conn_finished = self
            .repo
            .connect(
                FramedRead::new(recv, Codec::new(node_id)),
                FramedWrite::new(send, Codec::new(node_id)),
                ConnDirection::Outgoing,
            )
            .await;

        tracing::debug!(%node_id, ?conn_finished, "Connection we initiated shut down");

        Ok(conn_finished)
    }

    /// Returns a reference to the stored [`Repo`] instance inside.
    pub fn repo(&self) -> &Repo {
        &self.repo
    }
}

impl iroh::protocol::ProtocolHandler for IrohRepo {
    async fn accept(
        &self,
        connection: iroh::endpoint::Connection,
    ) -> Result<(), iroh::protocol::AcceptError> {
        let node_id = connection.remote_node_id()?;

        let (send, recv) = connection.accept_bi().await?;

        let conn_finished = self
            .repo
            .connect(
                FramedRead::new(recv, Codec::new(node_id)),
                FramedWrite::new(send, Codec::new(node_id)),
                ConnDirection::Incoming,
            )
            .await;

        tracing::debug!(%node_id, ?conn_finished, "Connection we accepted shut down");

        Ok(())
    }

    async fn shutdown(&self) {
        self.repo.stop().await
    }
}
