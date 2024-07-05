use std::{
    future::Future,
    pin::Pin,
    sync::{Arc, Mutex},
};

use anyhow::Result;
use automerge::{
    sync::{self, SyncDoc},
    Automerge, ReadDoc,
};
use iroh::node::ProtocolHandler;
use serde::{Deserialize, Serialize};

#[derive(Debug)]
pub struct IrohAutomergeProtocol {
    inner: Mutex<Automerge>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
enum Protocol {
    SyncMessage(Vec<u8>),
    Done,
}

impl IrohAutomergeProtocol {
    pub const ALPN: &'static [u8] = b"iroh/automerge/1";

    pub fn new(doc: Automerge) -> Arc<Self> {
        Arc::new(Self {
            inner: Mutex::new(doc),
        })
    }

    pub fn fork_doc(&self) -> Automerge {
        let guard = self.inner.lock().expect("lock poisoned");
        guard.fork()
    }

    pub fn merge_doc(&self, mut doc: Automerge) -> Result<()> {
        let mut guard = self.inner.lock().expect("lock poisoned");
        guard.merge(&mut doc)?;
        Ok(())
    }

    pub async fn initiate_sync(
        self: Arc<Self>,
        conn: iroh::net::endpoint::Connection,
    ) -> Result<()> {
        let (mut send, mut recv) = conn.open_bi().await?;

        let mut doc = self.fork_doc();
        let mut sync_state = sync::State::new();

        let mut is_local_done = false;
        loop {
            let msg = match doc.generate_sync_message(&mut sync_state) {
                Some(msg) => Protocol::SyncMessage(msg.encode()),
                None => Protocol::Done,
            };

            if !is_local_done {
                let encoded = postcard::to_stdvec(&msg)?;
                send.write_all(&(encoded.len() as u64).to_le_bytes())
                    .await?;
                send.write_all(&encoded).await?;
                is_local_done = matches!(msg, Protocol::Done);
            }

            let mut incoming_len = [0u8; 8];
            recv.read_exact(&mut incoming_len).await?;
            let len = u64::from_le_bytes(incoming_len);

            let mut buffer = vec![0u8; len as usize];
            recv.read_exact(&mut buffer).await?;
            let msg: Protocol = postcard::from_bytes(&buffer)?;

            let is_remote_done = matches!(msg, Protocol::Done);

            // process incoming message
            if let Protocol::SyncMessage(sync_msg) = msg {
                let sync_msg = sync::Message::decode(&sync_msg)?;
                doc.receive_sync_message(&mut sync_state, sync_msg)?;
            }

            if is_remote_done && is_local_done {
                // both sides are done
                break;
            }
        }

        send.finish().await?;

        self.merge_doc(doc)?;

        Ok(())
    }

    pub async fn respond_sync(
        self: Arc<Self>,
        conn: iroh::net::endpoint::Connecting,
    ) -> Result<()> {
        let (mut send, mut recv) = conn.await?.accept_bi().await?;

        let mut doc = self.fork_doc();
        let mut sync_state = sync::State::new();

        let mut is_local_done = false;
        loop {
            let mut incoming_len = [0u8; 8];
            recv.read_exact(&mut incoming_len).await?;
            let len = u64::from_le_bytes(incoming_len);

            let mut buffer = vec![0u8; len as usize];
            recv.read_exact(&mut buffer).await?;
            let msg: Protocol = postcard::from_bytes(&buffer)?;

            let is_remote_done = matches!(msg, Protocol::Done);

            // process incoming message
            if let Protocol::SyncMessage(sync_msg) = msg {
                let sync_msg = sync::Message::decode(&sync_msg)?;
                doc.receive_sync_message(&mut sync_state, sync_msg)?;
            }

            let msg = match doc.generate_sync_message(&mut sync_state) {
                Some(msg) => Protocol::SyncMessage(msg.encode()),
                None => Protocol::Done,
            };

            if !is_local_done {
                let encoded = postcard::to_stdvec(&msg)?;
                send.write_all(&(encoded.len() as u64).to_le_bytes())
                    .await?;
                send.write_all(&encoded).await?;
                is_local_done = matches!(msg, Protocol::Done);
            }

            if is_remote_done && is_local_done {
                // both sides are done
                break;
            }
        }

        send.finish().await?;

        self.merge_doc(doc)?;

        let doc = self.fork_doc();
        println!("State");
        let keys: Vec<_> = doc.keys(automerge::ROOT).collect();
        for key in keys {
            let (value, _) = doc.get(automerge::ROOT, &key)?.unwrap();
            println!("{} => {}", key, value);
        }

        Ok(())
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
