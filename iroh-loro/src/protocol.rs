use std::sync::Arc;

use anyhow::Result;
use loro::LoroDoc;
use iroh::{
    endpoint::{Connection, RecvStream, SendStream},
    protocol::{AcceptError, ProtocolHandler},
};
use tokio::sync::{Mutex, mpsc};

#[derive(Debug, Clone)]
pub struct IrohLoroProtocol {
    inner: Arc<Mutex<LoroDoc>>,
    sync_finished: mpsc::Sender<LoroDoc>,
}

impl IrohLoroProtocol {
    pub const ALPN: &'static [u8] = b"iroh/loro/1";

    pub fn new(doc: LoroDoc, sync_finished: mpsc::Sender<LoroDoc>) -> Arc<Self> {
        Arc::new(Self {
            inner: Arc::new(Mutex::new(doc)),
            sync_finished,
        })
    }

    pub async fn fork_doc(&self) -> LoroDoc {
        let loro = self.inner.lock().await;
        loro.fork()
    }

    pub async fn merge_doc(&self, doc: &mut LoroDoc) -> Result<()> {
        let loro = self.inner.lock().await;
        let updates = doc.export(loro::ExportMode::Updates { from: std::borrow::Cow::Borrowed(&loro.oplog_vv()) })?;
        loro.import(&updates)?;
        Ok(())
    }

    async fn send_updates(updates: Vec<u8>, send: &mut SendStream) -> Result<()> {
        if !updates.is_empty() {
            // prefix with the length
            send.write_all(&(updates.len() as u64).to_le_bytes())
                .await?;
            // write the updates
            send.write_all(&updates).await?;
        } else {
            // write length == 0 to indicate no updates
            send.write_all(&0u64.to_le_bytes()).await?;
        }
        Ok(())
    }

    async fn recv_updates(recv: &mut RecvStream) -> Result<Vec<u8>> {
        // read the length prefix
        let mut incoming_len = [0u8; 8];
        recv.read_exact(&mut incoming_len).await?;
        let len = u64::from_le_bytes(incoming_len);

        if len == 0 {
            // zero length indicates no updates this round
            return Ok(Vec::new());
        }

        // read the updates
        let mut buffer = vec![0u8; len as usize];
        recv.read_exact(&mut buffer).await?;

        Ok(buffer)
    }

    pub async fn initiate_sync(self: Arc<Self>, conn: Connection) -> Result<()> {
        let (mut send, mut recv) = conn.open_bi().await?;

        let mut doc = self.fork_doc().await;
        // Send all our updates (export everything)
        let our_updates = doc.export(loro::ExportMode::Snapshot)?;
        Self::send_updates(our_updates, &mut send).await?;

        // Receive their snapshot
        let their_updates = Self::recv_updates(&mut recv).await?;

        if !their_updates.is_empty() {
            // Import the updates from remote
            doc.import(&their_updates)?;
            self.merge_doc(&mut doc).await?;
        }

        // we're done, close the connection
        conn.close(0u32.into(), b"thanks, bye!");

        Ok(())
    }

    pub async fn respond_sync(&self, conn: Connection) -> Result<()> {
        let (mut send, mut recv) = conn.accept_bi().await?;

        let mut doc = self.fork_doc().await;

        // Receive their snapshot
        let their_updates = Self::recv_updates(&mut recv).await?;

        if !their_updates.is_empty() {
            // Import the updates from remote
            doc.import(&their_updates)?;
            self.merge_doc(&mut doc).await?;
        }

        // Send our snapshot back
        let our_updates = doc.export(loro::ExportMode::Snapshot)?;
        Self::send_updates(our_updates, &mut send).await?;

        // We were the last to send, so we wait on the other side to close
        conn.closed().await;

        Ok(())
    }
}

impl ProtocolHandler for IrohLoroProtocol {
    async fn accept(&self, conn: Connection) -> Result<(), iroh::protocol::AcceptError> {
        self.respond_sync(conn)
            .await
            .map_err(anyhow::Error::into_boxed_dyn_error)?;

        self.sync_finished
            .send(self.fork_doc().await)
            .await
            .map_err(AcceptError::from_err)?;

        Ok(())
    }
}
