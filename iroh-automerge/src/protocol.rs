use std::{future::Future, pin::Pin, sync::Arc};

use anyhow::Result;
use automerge::{
    sync::{self, SyncDoc},
    Automerge,
};
use iroh::{
    net::endpoint::{RecvStream, SendStream},
    node::ProtocolHandler,
};
use serde::{Deserialize, Serialize};
use tokio::sync::Mutex;

#[derive(Debug)]
pub struct IrohAutomergeProtocol {
    inner: Mutex<Automerge>,
    sync_finished: flume::Sender<Automerge>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
enum Protocol {
    SyncMessage(Vec<u8>),
    Done,
}

impl IrohAutomergeProtocol {
    pub const ALPN: &'static [u8] = b"iroh/automerge/1";

    pub fn new(doc: Automerge, sync_finished: flume::Sender<Automerge>) -> Arc<Self> {
        Arc::new(Self {
            inner: Mutex::new(doc),
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

    pub async fn replace_doc(&self, doc: Automerge) {
        let mut automerge = self.inner.lock().await;
        *automerge = doc;
    }

    async fn send_msg(msg: Protocol, send: &mut SendStream) -> Result<()> {
        let encoded = postcard::to_stdvec(&msg)?;
        send.write_all(&(encoded.len() as u64).to_le_bytes())
            .await?;
        send.write_all(&encoded).await?;
        Ok(())
    }

    async fn recv_msg(recv: &mut RecvStream) -> Result<Protocol> {
        let mut incoming_len = [0u8; 8];
        recv.read_exact(&mut incoming_len).await?;
        let len = u64::from_le_bytes(incoming_len);

        let mut buffer = vec![0u8; len as usize];
        recv.read_exact(&mut buffer).await?;
        let msg: Protocol = postcard::from_bytes(&buffer)?;
        Ok(msg)
    }

    pub async fn initiate_sync(&self, conn: &iroh::net::endpoint::Connection) -> Result<()> {
        tracing::debug!("Opening syncing stream");
        let (mut send, mut recv) = conn.open_bi().await?;

        let mut doc = self.fork_doc().await;
        let mut sync_state = sync::State::new();

        let mut is_local_done = false;
        loop {
            tracing::debug!("Sync round");
            let msg = match doc.generate_sync_message(&mut sync_state) {
                Some(msg) => Protocol::SyncMessage(msg.encode()),
                None => {
                    tracing::debug!("Local is done");
                    Protocol::Done
                }
            };

            if !is_local_done {
                is_local_done = matches!(msg, Protocol::Done);
                Self::send_msg(msg, &mut send).await?;
            }

            let msg = match Self::recv_msg(&mut recv).await {
                Ok(msg) => msg,
                Err(e) if is_local_done => {
                    tracing::debug!("Couldn't send but local is done already ({e})");
                    break;
                }
                Err(e) => return Err(e),
            };
            let is_remote_done = matches!(msg, Protocol::Done);

            if is_remote_done {
                tracing::debug!("Remote is done");
            }

            // process incoming message
            if let Protocol::SyncMessage(sync_msg) = msg {
                let sync_msg = sync::Message::decode(&sync_msg)?;
                doc.receive_sync_message(&mut sync_state, sync_msg)?;
                self.merge_doc(&mut doc).await?;
            }

            if is_remote_done && is_local_done {
                tracing::debug!("Both sides are done");
                // both sides are done
                break;
            }
        }

        send.finish().await?;
        tracing::debug!("Finished initiated sync");

        Ok(())
    }

    pub async fn respond_sync(
        self: Arc<Self>,
        conn: iroh::net::endpoint::Connecting,
    ) -> Result<()> {
        let conn = conn.await?;
        tracing::debug!("Accepted sync connection");
        loop {
            let (mut send, mut recv) = conn.accept_bi().await?;
            tracing::debug!("Accepted sync stream");

            let mut doc = self.fork_doc().await;
            let mut sync_state = sync::State::new();

            let mut is_local_done = false;
            loop {
                tracing::debug!("Sync round");
                let msg = match Self::recv_msg(&mut recv).await {
                    Ok(msg) => msg,
                    Err(e) if is_local_done => {
                        tracing::debug!("Couldn't send but local is done already ({e})");
                        break;
                    }
                    Err(e) => return Err(e),
                };
                let is_remote_done = matches!(msg, Protocol::Done);

                if is_remote_done {
                    tracing::debug!("Remote is done");
                }

                // process incoming message
                if let Protocol::SyncMessage(sync_msg) = msg {
                    let sync_msg = sync::Message::decode(&sync_msg)?;
                    doc.receive_sync_message(&mut sync_state, sync_msg)?;
                    self.merge_doc(&mut doc).await?;
                }

                let msg = match doc.generate_sync_message(&mut sync_state) {
                    Some(msg) => Protocol::SyncMessage(msg.encode()),
                    None => {
                        tracing::debug!("Local is done");
                        Protocol::Done
                    }
                };

                if !is_local_done {
                    is_local_done = matches!(msg, Protocol::Done);
                    Self::send_msg(msg, &mut send).await?;
                }

                if is_remote_done && is_local_done {
                    tracing::debug!("Both sides are done");
                    // both sides are done
                    break;
                }
            }

            send.finish().await?;

            self.sync_finished.send_async(self.fork_doc().await).await?;

            tracing::debug!("Finished responding to sync");
        }
    }
}

impl ProtocolHandler for IrohAutomergeProtocol {
    fn accept(
        self: Arc<Self>,
        conn: iroh::net::endpoint::Connecting,
    ) -> Pin<Box<dyn Future<Output = Result<()>> + Send + 'static>> {
        Box::pin(self.respond_sync(conn))
    }
}
