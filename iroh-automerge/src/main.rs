use std::ops::{Deref, DerefMut};

use anyhow::{ensure, Result};
use automerge::{
    sync::{self, SyncDoc},
    transaction::Transactable,
    AutoCommit, ReadDoc,
};
use clap::Parser;
use iroh_net as inet;
use serde::{Deserialize, Serialize};

struct Peer {
    auto_commit: AutoCommit,
    sync_state: sync::State,
    storage: Vec<u8>,
    ep: inet::MagicEndpoint,
}

const ALPN: &[u8] = b"iroh/automerge/1";
const DEFAULT_PORT: u16 = 8888;

impl Peer {
    async fn new() -> Result<Self> {
        let ep = inet::MagicEndpoint::builder()
            .alpns(vec![ALPN.to_vec()])
            .bind(DEFAULT_PORT)
            .await?;

        let addr = ep.my_addr().await?;
        println!(
            "Running \nNode Id: {}\n{}",
            addr.node_id,
            addr.info.relay_url.unwrap()
        );

        Ok(Self {
            auto_commit: AutoCommit::new(),
            sync_state: sync::State::new(),
            storage: Vec::new(),
            ep,
        })
    }

    fn save(&mut self) {
        self.storage = self.auto_commit.save();
    }

    #[allow(unused)]
    async fn load(data: &[u8]) -> Result<Self> {
        let ep = inet::MagicEndpoint::builder()
            .alpns(vec![ALPN.to_vec()])
            .bind(DEFAULT_PORT)
            .await?;

        let auto_commit = AutoCommit::load(data)?;
        Ok(Self {
            auto_commit,
            sync_state: sync::State::new(),
            storage: data.to_vec(),
            ep,
        })
    }

    fn generate_sync_message(&mut self) -> Option<sync::Message> {
        self.auto_commit
            .sync()
            .generate_sync_message(&mut self.sync_state)
    }

    fn receive_sync_message(&mut self, msg: sync::Message) -> Result<()> {
        self.auto_commit
            .sync()
            .receive_sync_message(&mut self.sync_state, msg)?;

        self.save();
        Ok(())
    }
}

impl Deref for Peer {
    type Target = AutoCommit;
    fn deref(&self) -> &Self::Target {
        &self.auto_commit
    }
}

impl DerefMut for Peer {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.auto_commit
    }
}

#[derive(Parser)]
#[command(version, about, long_about = None)]
struct Cli {
    #[clap(long)]
    remote_id: Option<inet::NodeId>,
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

    let mut peer1 = Peer::new().await?;

    for i in 0..5 {
        peer1.put(automerge::ROOT, format!("key-{i}"), format!("value-{i}"))?;
    }

    peer1.save();

    if let Some(remote_id) = opts.remote_id {
        let remote_relay = opts.remote_relay.expect("missing derp");
        let node_addr = inet::NodeAddr::new(remote_id).with_relay_url(remote_relay.into());
        let conn = peer1.ep.connect(node_addr, ALPN).await?;
        let (mut send, mut recv) = conn.open_bi().await?;

        let mut is_local_done = false;
        loop {
            let msg = match peer1.generate_sync_message() {
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
                peer1.receive_sync_message(sync_msg)?;
            }

            if is_remote_done && is_local_done {
                // both sides are done
                break;
            }
        }

        send.finish().await?;
    } else {
        let conn = peer1
            .ep
            .accept()
            .await
            .ok_or_else(|| anyhow::anyhow!("no connection"))?;

        let (_remote_node_id, alpn, conn) = inet::MagicEndpoint::accept(conn).await?;
        ensure!(alpn.as_bytes() == ALPN, "invalid alpn");

        let (mut send, mut recv) = conn.accept_bi().await?;

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
                peer1.receive_sync_message(sync_msg)?;
            }

            let msg = match peer1.generate_sync_message() {
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
    }

    println!("State");
    let keys: Vec<_> = peer1.keys(automerge::ROOT).collect();
    for key in keys {
        let (value, _) = peer1.get(automerge::ROOT, &key)?.unwrap();
        println!("{} => {}", key, value);
    }

    Ok(())
}
