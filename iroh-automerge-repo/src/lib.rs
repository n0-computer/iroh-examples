pub mod codec;
pub mod storage;

use automerge_repo::{ConnDirection, Repo, RepoHandle};
use tokio_util::codec::{FramedRead, FramedWrite};

use crate::{codec::Codec, storage::AsyncInMemoryStorage};

#[derive(derive_more::Debug, Clone)]
pub struct IrohRepo {
    endpoint: iroh::Endpoint,
    repo_handle: RepoHandle,
}

impl IrohRepo {
    pub const SYNC_ALPN: &[u8] = b"iroh/automerge-repo/1";

    pub fn new(endpoint: iroh::Endpoint) -> Self {
        // Create a repo.
        let repo_handle = Repo::new(None, Box::new(AsyncInMemoryStorage::new())).run();
        Self::with_repo(endpoint, repo_handle)
    }

    pub fn with_repo(endpoint: iroh::Endpoint, repo_handle: RepoHandle) -> Self {
        Self {
            endpoint,
            repo_handle,
        }
    }

    pub async fn sync_with(&self, addr: impl Into<iroh::NodeAddr>) -> anyhow::Result<()> {
        let conn = self.endpoint.connect(addr, IrohRepo::SYNC_ALPN).await?;
        let (send, recv) = conn.open_bi().await?;

        self.repo_handle
            .connect_stream(
                FramedRead::new(recv, Codec),
                FramedWrite::new(send, Codec),
                ConnDirection::Outgoing,
            )
            .await
            .map_err(|e| anyhow::anyhow!("{e:?}"))?;
        Ok(())
    }

    pub fn handle(&self) -> &RepoHandle {
        &self.repo_handle
    }
}

impl iroh::protocol::ProtocolHandler for IrohRepo {
    async fn accept(
        &self,
        connection: iroh::endpoint::Connection,
    ) -> Result<(), iroh::protocol::AcceptError> {
        println!(
            "Accepted incoming repo connection from {}",
            connection.remote_node_id()?
        );

        let (send, recv) = connection.accept_bi().await?;

        self.repo_handle
            .connect_stream(
                FramedRead::new(recv, Codec),
                FramedWrite::new(send, Codec),
                ConnDirection::Incoming,
            )
            .await
            .map_err(iroh::protocol::AcceptError::from_err)?;

        Ok(())
    }

    async fn shutdown(&self) {
        let repo_handle = self.repo_handle.clone();
        if let Err(e) = tokio::task::spawn_blocking(|| repo_handle.stop()).await {
            tracing::warn!(?e, "Error shutting down automerge repo");
        }
    }
}
