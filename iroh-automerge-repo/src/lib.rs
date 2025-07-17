use std::path::Path;

use anyhow::Result;
use automerge_repo::{
    ConnDirection, Repo, RepoHandle, SharePolicy, Storage, share_policy, tokio::FsStorage,
};
use tokio_util::codec::{FramedRead, FramedWrite};

use crate::{codec::Codec, storage::AsyncInMemoryStorage};

pub mod codec;
pub mod storage;

#[derive(derive_more::Debug, Clone)]
pub struct IrohRepo {
    endpoint: iroh::Endpoint,
    repo_handle: RepoHandle,
}

#[derive(derive_more::Debug)]
pub struct IrohRepoBuilder {
    endpoint: iroh::Endpoint,
    repo_id: Option<String>,
    #[debug("Box<dyn Storage>")]
    storage: Box<dyn Storage>,
    #[debug("Box<dyn SharePolicy>")]
    share_policy: Box<dyn SharePolicy>,
}

impl IrohRepoBuilder {
    pub fn repo_id(mut self, repo_id: String) -> Self {
        self.repo_id = Some(repo_id);
        self
    }

    pub fn storage(mut self, storage: Box<dyn Storage>) -> Self {
        self.storage = storage;
        self
    }

    pub fn fs_storage(mut self, root: impl AsRef<Path>) -> Result<Self> {
        self.storage = Box::new(FsStorage::open(root)?);
        Ok(self)
    }

    pub fn share_policy(mut self, share_policy: Box<dyn SharePolicy>) -> Self {
        self.share_policy = share_policy;
        self
    }

    pub fn build(self) -> IrohRepo {
        // Create a repo.
        let repo_handle = Repo::new(self.repo_id, self.storage)
            .with_share_policy(self.share_policy)
            .run();
        IrohRepo {
            endpoint: self.endpoint,
            repo_handle,
        }
    }
}

impl IrohRepo {
    pub const SYNC_ALPN: &[u8] = b"iroh/automerge-repo/1";

    pub fn builder(endpoint: iroh::Endpoint) -> IrohRepoBuilder {
        IrohRepoBuilder {
            endpoint,
            repo_id: None,
            storage: Box::new(AsyncInMemoryStorage::new()),
            share_policy: Box::new(share_policy::Permissive),
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
