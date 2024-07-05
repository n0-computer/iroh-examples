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
use quinn::{ReadError, ReadExactError, RecvStream, SendStream, VarInt};

#[derive(Debug)]
pub struct IrohAutomergeProtocol {
    inner: Mutex<Automerge>,
}

const CLOSE_CODE_DONE: VarInt = VarInt::from_u32(42);
const CLOSE_MSG_DONE: &[u8] = b"automerge sync protocol finished";

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

    pub fn merge_doc(&self, doc: &mut Automerge) -> Result<()> {
        let mut guard = self.inner.lock().expect("lock poisoned");
        guard.merge(doc)?;
        Ok(())
    }

    async fn send_msg(msg: automerge::sync::Message, send: &mut SendStream) -> Result<()> {
        let encoded = msg.encode();
        send.write_all(&(encoded.len() as u64).to_le_bytes())
            .await?;
        send.write_all(&encoded).await?;
        Ok(())
    }

    async fn receive_msg(recv: &mut RecvStream) -> Result<Option<automerge::sync::Message>> {
        let mut incoming_len = [0u8; 8];
        println!("Waiting for msg");
        match recv.read_exact(&mut incoming_len).await {
            Ok(()) => {}
            Err(ReadExactError::ReadError(ReadError::Reset(_))) => {
                // we're done
                return Ok(None);
            }
            Err(e) => {
                return Err(e.into());
            }
        };
        let len = u64::from_le_bytes(incoming_len);

        let mut buffer = vec![0u8; len as usize];
        recv.read_exact(&mut buffer).await?;
        let msg = automerge::sync::Message::decode(&buffer)?;
        println!("Okay, got the msg");
        Ok(Some(msg))
    }

    pub async fn initiate_sync(
        self: Arc<Self>,
        conn: iroh::net::endpoint::Connection,
    ) -> Result<()> {
        let (mut send, mut recv) = conn.open_bi().await?;

        let mut doc = self.fork_doc();
        let mut sync_state = sync::State::new();

        loop {
            let Some(msg) = doc.generate_sync_message(&mut sync_state) else {
                // we're done.
                send.finish().await?;
                conn.close(CLOSE_CODE_DONE, CLOSE_MSG_DONE);
                println!("Sent close");
                return Ok(());
            };

            Self::send_msg(msg, &mut send).await?;

            let Some(msg) = Self::receive_msg(&mut recv).await? else {
                // we're done
                return Ok(());
            };

            // process incoming message
            doc.receive_sync_message(&mut sync_state, msg)?;
            self.merge_doc(&mut doc)?;
        }
    }

    pub async fn respond_sync(
        self: Arc<Self>,
        conn: iroh::net::endpoint::Connecting,
    ) -> Result<()> {
        let conn = conn.await?;
        let (mut send, mut recv) = conn.accept_bi().await?;

        let mut doc = self.fork_doc();
        let mut sync_state = sync::State::new();

        loop {
            let Some(msg) = Self::receive_msg(&mut recv).await? else {
                // we're done
                return Ok(());
            };

            // process incoming message
            doc.receive_sync_message(&mut sync_state, msg)?;
            self.merge_doc(&mut doc)?;

            let Some(msg) = doc.generate_sync_message(&mut sync_state) else {
                send.finish().await?;
                conn.close(CLOSE_CODE_DONE, CLOSE_MSG_DONE);
                println!("Sent close");
                return Ok(());
            };

            Self::send_msg(msg, &mut send).await?;
        }
    }
}

impl ProtocolHandler for IrohAutomergeProtocol {
    fn accept(
        self: Arc<Self>,
        conn: iroh::net::endpoint::Connecting,
    ) -> Pin<Box<dyn Future<Output = Result<()>> + Send + 'static>> {
        Box::pin(async move {
            Arc::clone(&self).respond_sync(conn).await?;
            let doc = self.fork_doc();
            println!("State");
            let keys: Vec<_> = doc.keys(automerge::ROOT).collect();
            for key in keys {
                let (value, _) = doc.get(automerge::ROOT, &key)?.unwrap();
                println!("{} => {}", key, value);
            }
            Ok(())
        })
    }
}
