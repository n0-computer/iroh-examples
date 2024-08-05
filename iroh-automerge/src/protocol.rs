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
use tokio::{sync::Mutex, task::JoinSet};

#[derive(Debug)]
pub struct IrohAutomergeProtocol {
    state: Mutex<State>,
    sync_finished: flume::Sender<Automerge>,
}

#[derive(Debug)]
struct State {
    doc: Automerge,
    connections: Vec<Arc<iroh::net::endpoint::Connection>>,
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
            state: Mutex::new(State {
                doc,
                connections: Vec::new(),
            }),
            sync_finished,
        })
    }

    pub async fn fork_doc(&self) -> Automerge {
        let inner = self.state.lock().await;
        inner.doc.fork()
    }

    pub async fn merge_doc(&self, doc: &mut Automerge) -> Result<()> {
        let mut inner = self.state.lock().await;
        inner.doc.merge(doc)?;
        Ok(())
    }

    pub async fn replace_doc(&self, doc: Automerge) {
        let mut inner = self.state.lock().await;
        inner.doc = doc;
    }

    pub async fn add_connection(&self, conn: Arc<iroh::net::endpoint::Connection>) -> Result<()> {
        tracing::debug!("Adding a new live connection");
        let incoming_node_id = iroh::net::endpoint::get_remote_node_id(&conn)?;
        let mut inner = self.state.lock().await;
        inner.connections.retain(|conn| {
            conn.close_reason().is_none() // only retain open connections
                && iroh::net::endpoint::get_remote_node_id(&conn) // and remove existing equivalent connections
                    .map_or(false, |node_id| node_id != incoming_node_id)
        });
        inner.connections.push(conn);
        Ok(())
    }

    async fn get_connections(&self) -> Vec<Arc<iroh::net::endpoint::Connection>> {
        let inner = self.state.lock().await;
        inner.connections.clone()
    }

    pub async fn sync_with_connected(self: &Arc<Self>) -> Result<JoinSet<Result<()>>> {
        tracing::debug!("Syncing with all connected nodes");
        let connections = self.get_connections().await;
        let mut join_set = JoinSet::new();
        for conn in connections {
            tracing::debug!("Initiating a task to sync with one connected node");
            join_set.spawn({
                let this = Arc::clone(&self);
                async move { this.initiate_sync(&conn).await }
            });
        }
        Ok(join_set)
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
        let conn = Arc::new(conn.await?);
        tracing::debug!("Accepted sync connection");
        self.add_connection(conn.clone()).await?;
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
        Ok(())
    }

    async fn recv_msg(&mut self) -> Result<Protocol> {
        let mut incoming_len = [0u8; 8];
        read_exact(&mut self.recv, &mut incoming_len).await?;
        let len = u64::from_le_bytes(incoming_len);

        let mut buffer = vec![0u8; len as usize];
        read_exact(&mut self.recv, &mut buffer).await?;
        let msg: Protocol = postcard::from_bytes(&buffer)?;
        Ok(msg)
    }

    async fn finish(mut self) -> Result<Automerge> {
        tracing::debug!("FINISHING");
        self.send.finish().await?;
        Ok(self.doc)
    }
}

async fn read_exact(stream: &mut RecvStream, buf: &mut [u8]) -> Result<()> {
    let mut total_bytes_read = 0;
    while let Some(bytes_read) = stream.read(&mut buf[total_bytes_read..]).await? {
        total_bytes_read += bytes_read;
        if total_bytes_read >= buf.len() {
            break;
        }
    }
    if total_bytes_read != buf.len() {
        anyhow::bail!("Stream finished early");
    }
    Ok(())
}
