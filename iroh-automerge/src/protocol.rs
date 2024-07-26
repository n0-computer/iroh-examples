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

    pub async fn initiate_sync(&self, conn: &iroh::net::endpoint::Connection) -> Result<()> {
        tracing::debug!("Opening syncing stream");
        let bi_stream = conn.open_bi().await?;
        let mut session = SyncSession::new(bi_stream, self.fork_doc().await);
        loop {
            tracing::debug!("initiator round");
            session.send_step().await?;
            tracing::debug!("initiator receive");
            session.recv_step().await?;

            if session.is_done() {
                tracing::debug!("Both sides are done");
                break;
            }
        }

        let mut synced = session.finish().await?;
        self.merge_doc(&mut synced).await?;

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
            let bi_stream = conn.accept_bi().await?;
            tracing::debug!("Accepted sync stream");
            let mut session = SyncSession::new(bi_stream, self.fork_doc().await);

            loop {
                tracing::debug!("responder round");
                session.recv_step().await?;
                tracing::debug!("responder send");
                session.send_step().await?;

                if session.is_done() {
                    tracing::debug!("Both sides are done");
                    break;
                }
            }

            let mut synced = session.finish().await?;
            self.merge_doc(&mut synced).await?;

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

struct SyncSession {
    doc: Automerge,
    state: sync::State,
    local_done: bool,
    remote_done: bool,
    send: SendStream,
    recv: RecvStream,
}

impl SyncSession {
    fn new((send, recv): (SendStream, RecvStream), doc: Automerge) -> Self {
        Self {
            doc,
            state: sync::State::new(),
            local_done: false,
            remote_done: false,
            send,
            recv,
        }
    }

    fn is_done(&self) -> bool {
        self.local_done && self.remote_done
    }

    async fn send_step(&mut self) -> Result<()> {
        let msg = match self.doc.generate_sync_message(&mut self.state) {
            Some(msg) => Protocol::SyncMessage(msg.encode()),
            None => {
                tracing::debug!("Local is done");
                Protocol::Done
            }
        };

        if !self.local_done {
            self.local_done = matches!(msg, Protocol::Done);
            self.send_msg(msg).await?;
        }

        Ok(())
    }

    async fn recv_step(&mut self) -> Result<()> {
        let msg = match self.recv_msg().await {
            Ok(msg) => msg,
            Err(e) if self.local_done => {
                tracing::debug!("Couldn't receive but local is done already, so assuming remote is finished, too ({e})");
                self.remote_done = true;
                return Ok(());
            }
            Err(e) => return Err(e),
        };

        if matches!(msg, Protocol::Done) {
            self.remote_done = true;
            tracing::debug!("Remote is done");
        }

        // process incoming message
        if let Protocol::SyncMessage(sync_msg) = msg {
            let sync_msg = sync::Message::decode(&sync_msg)?;
            self.doc.receive_sync_message(&mut self.state, sync_msg)?;
        }

        Ok(())
    }

    async fn send_msg(&mut self, msg: Protocol) -> Result<()> {
        let encoded = postcard::to_stdvec(&msg)?;
        self.send
            .write_all(&(encoded.len() as u64).to_le_bytes())
            .await?;
        self.send.write_all(&encoded).await?;
        tokio::time::sleep(std::time::Duration::from_millis(100)).await;
        Ok(())
    }

    async fn recv_msg(&mut self) -> Result<Protocol> {
        let mut incoming_len = [0u8; 8];
        self.recv.read_exact(&mut incoming_len).await?;
        let len = u64::from_le_bytes(incoming_len);

        let mut buffer = vec![0u8; len as usize];
        self.recv.read_exact(&mut buffer).await?;
        tokio::time::sleep(std::time::Duration::from_millis(100)).await;
        let msg: Protocol = postcard::from_bytes(&buffer)?;
        Ok(msg)
    }

    async fn finish(mut self) -> Result<Automerge> {
        self.send.finish().await?;
        Ok(self.doc)
    }
}
