use std::{
    future::Future,
    pin::Pin,
    sync::{Arc, Mutex},
};

use anyhow::Result;
use automerge::{
    sync::{self, SyncDoc},
    transaction::Transactable,
    AutoCommit, ReadDoc,
};
use clap::Parser;
use iroh::node::{Node, ProtocolHandler};
use serde::{Deserialize, Serialize};

#[derive(Debug)]
struct IrohAutomergeProtocol {
    inner: Mutex<AutomergeState>,
}

#[derive(Debug)]
struct AutomergeState {
    commit: AutoCommit,
}

impl IrohAutomergeProtocol {
    const ALPN: &'static [u8] = b"iroh/automerge/1";

    pub fn new(commit: AutoCommit) -> Arc<Self> {
        Arc::new(Self {
            inner: Mutex::new(AutomergeState { commit }),
        })
    }

    pub fn fork_state(&self) -> AutoCommit {
        let mut guard = self.inner.lock().expect("lock poisoned");
        guard.commit.fork()
    }

    pub fn merge_state(&self, mut commit: AutoCommit) {
        let mut guard = self.inner.lock().expect("lock poisoned");
        guard.commit.merge(&mut commit);
    }

    pub async fn initiate_sync(
        self: Arc<Self>,
        conn: iroh::net::endpoint::Connection,
    ) -> Result<()> {
        let (mut send, mut recv) = conn.open_bi().await?;

        let mut commit = self.fork_state();
        let mut sync = commit.sync();
        let mut sync_state = sync::State::new();

        let mut is_local_done = false;
        loop {
            let msg = match sync.generate_sync_message(&mut sync_state) {
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

            // process incominng message
            if let Protocol::SyncMessage(sync_msg) = msg {
                let sync_msg = sync::Message::decode(&sync_msg)?;
                sync.receive_sync_message(&mut sync_state, sync_msg)?;
            }

            if is_remote_done && is_local_done {
                // both sides are done
                break;
            }
        }

        send.finish().await?;

        drop(sync);
        self.merge_state(commit);

        Ok(())
    }

    pub async fn respond_sync(
        self: Arc<Self>,
        conn: iroh::net::endpoint::Connecting,
    ) -> Result<()> {
        let (mut send, mut recv) = conn.await?.accept_bi().await?;

        let mut commit = self.fork_state();
        let mut sync = commit.sync();
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

            // process incominng message
            if let Protocol::SyncMessage(sync_msg) = msg {
                let sync_msg = sync::Message::decode(&sync_msg)?;
                sync.receive_sync_message(&mut sync_state, sync_msg)?;
            }

            let msg = match sync.generate_sync_message(&mut sync_state) {
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

        drop(sync);
        self.merge_state(commit);

        let commit = self.fork_state();
        println!("State");
        let keys: Vec<_> = commit.keys(automerge::ROOT).collect();
        for key in keys {
            let (value, _) = commit.get(automerge::ROOT, &key)?.unwrap();
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

#[derive(Parser)]
#[command(version, about, long_about = None)]
struct Cli {
    #[clap(long)]
    remote_id: Option<iroh::net::NodeId>,
    #[clap(long)]
    remote_relay: Option<url::Url>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
enum Protocol {
    SyncMessage(Vec<u8>),
    Done,
}

#[tokio::main]
async fn main() -> Result<()> {
    let opts = Cli::parse();

    let automerge = IrohAutomergeProtocol::new(AutoCommit::new());
    let iroh = Node::memory()
        .build()
        .await?
        .accept(
            IrohAutomergeProtocol::ALPN,
            Arc::clone(&automerge) as Arc<dyn ProtocolHandler>,
        )
        .spawn()
        .await?;

    let addr = iroh.my_addr().await?;

    println!("Running\nNode Id: {}", addr.node_id,);

    let mut am = automerge.inner.lock().unwrap();
    for i in 0..5 {
        am.commit
            .put(automerge::ROOT, format!("key-{i}"), format!("value-{i}"))?;
    }
    am.commit.save();
    drop(am);

    if let Some(remote_id) = opts.remote_id {
        let mut node_addr = iroh::net::NodeAddr::new(remote_id);

        if let Some(remote_relay) = opts.remote_relay {
            node_addr = node_addr.with_relay_url(remote_relay.into());
        }

        let conn = iroh
            .endpoint()
            .connect(node_addr, IrohAutomergeProtocol::ALPN)
            .await?;

        automerge.initiate_sync(conn).await?;
    } else {
        iroh.cancel_token().cancelled().await;
    }

    Ok(())
}
