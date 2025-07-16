use std::sync::Arc;

use anyhow::Result;
use automerge::{
    sync::{self, SyncDoc},
    Automerge,
};
use iroh::{
    endpoint::{Connection, RecvStream, SendStream},
    protocol::{AcceptError, ProtocolHandler},
};
use tokio::sync::{mpsc, Mutex};

#[derive(Debug, Clone)]
pub struct IrohAutomergeProtocol {
    inner: Arc<Mutex<Automerge>>,
    sync_finished: mpsc::Sender<Automerge>,
}

impl IrohAutomergeProtocol {
    pub const ALPN: &'static [u8] = b"iroh/automerge/2";

    pub fn new(doc: Automerge, sync_finished: mpsc::Sender<Automerge>) -> Arc<Self> {
        Arc::new(Self {
            inner: Arc::new(Mutex::new(doc)),
            sync_finished,
        })
    }

    pub async fn fork_doc(&self) -> Automerge {
        let automerge = self.inner.lock().await;
        automerge.fork()
    }

    pub async fn merge_doc(&self, doc: &mut Automerge) -> Result<()> {
        let mut automerge = self.inner.lock().await;
        automerge.merge(doc)?;
        Ok(())
    }

    async fn send_msg(msg: Option<automerge::sync::Message>, send: &mut SendStream) -> Result<()> {
        if let Some(msg) = msg {
            let encoded = msg.encode();
            // prefix with the length
            send.write_all(&(encoded.len() as u64).to_le_bytes())
                .await?;
            // write the message itself
            send.write_all(&encoded).await?;
        } else {
            // write length == 0 to indicate no message
            // (actual message lengths will always be > 0)
            send.write_all(&0u64.to_le_bytes()).await?;
        }
        Ok(())
    }

    async fn recv_msg(recv: &mut RecvStream) -> Result<Option<automerge::sync::Message>> {
        // read the length prefix
        let mut incoming_len = [0u8; 8];
        recv.read_exact(&mut incoming_len).await?;
        let len = u64::from_le_bytes(incoming_len);

        if len == 0 {
            // zero length indicates no meaningful message this round
            return Ok(None);
        }

        // read the message itself
        let mut buffer = vec![0u8; len as usize];
        recv.read_exact(&mut buffer).await?;
        let msg = automerge::sync::Message::decode(&buffer)?;

        Ok(Some(msg))
    }

    pub async fn initiate_sync(self: Arc<Self>, conn: Connection) -> Result<()> {
        let (mut send, mut recv) = conn.open_bi().await?;

        let mut doc = self.fork_doc().await;
        let mut sync_state = sync::State::new();

        loop {
            let our_msg = doc.generate_sync_message(&mut sync_state);
            let is_local_done = our_msg.is_none();
            Self::send_msg(our_msg, &mut send).await?;

            let their_msg = Self::recv_msg(&mut recv).await?;
            let is_remote_done = their_msg.is_none();

            if let Some(sync_msg) = their_msg {
                doc.receive_sync_message(&mut sync_state, sync_msg)?;
                self.merge_doc(&mut doc).await?;
            }

            if is_remote_done && is_local_done {
                // both sides are done
                break;
            }
        }

        // we're the last to receive data, so we close
        conn.close(0u32.into(), b"thanks, bye!");

        Ok(())
    }

    pub async fn respond_sync(&self, conn: Connection) -> Result<()> {
        let (mut send, mut recv) = conn.accept_bi().await?;

        let mut doc = self.fork_doc().await;
        let mut sync_state = sync::State::new();

        loop {
            let their_msg = Self::recv_msg(&mut recv).await?;
            let is_remote_done = their_msg.is_none();

            // process incoming message
            if let Some(sync_msg) = their_msg {
                doc.receive_sync_message(&mut sync_state, sync_msg)?;
                self.merge_doc(&mut doc).await?;
            }

            let our_msg = doc.generate_sync_message(&mut sync_state);
            let is_local_done = our_msg.is_none();
            Self::send_msg(our_msg, &mut send).await?;

            if is_remote_done && is_local_done {
                // both sides are done
                break;
            }
        }

        // We were the last to send, so we wait on the other side to close
        conn.closed().await;

        Ok(())
    }
}

impl ProtocolHandler for IrohAutomergeProtocol {
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
