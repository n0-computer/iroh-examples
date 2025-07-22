use anyhow::Result;
use codec::Codec;
use samod::{ConnDirection, ConnFinishedReason, Samod};
use tokio_util::codec::{FramedRead, FramedWrite};

mod codec;

#[derive(derive_more::Debug, Clone)]
pub struct IrohRepo {
    endpoint: iroh::Endpoint,
    #[debug("Repo")]
    repo: Samod,
}

impl IrohRepo {
    pub const SYNC_ALPN: &[u8] = b"iroh/automerge-repo/1";

    pub fn new(endpoint: iroh::Endpoint, repo: Samod) -> Self {
        IrohRepo { endpoint, repo }
    }

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

    pub fn repo(&self) -> &Samod {
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
