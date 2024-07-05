use std::sync::Arc;

use anyhow::Result;
use automerge::{transaction::Transactable, Automerge, ReadDoc};
use clap::Parser;
use iroh::node::{Node, ProtocolHandler};

use protocol::IrohAutomergeProtocol;
use tokio::sync::mpsc;

mod protocol;

#[derive(Parser)]
#[command(version, about, long_about = None)]
struct Cli {
    #[clap(long)]
    remote_id: Option<iroh::net::NodeId>,
}

#[tokio::main]
async fn main() -> Result<()> {
    tracing_subscriber::fmt::init();

    let opts = Cli::parse();

    // We set up a channel so we can subscribe to sync events from the automerge protocol
    let (sync_sender, mut sync_finished) = mpsc::channel(10);
    let automerge = IrohAutomergeProtocol::new(Automerge::new(), sync_sender);
    let iroh = Node::memory()
        .disable_docs()
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

    // we distinguish the roles in protocol based on if the --remote-id CLI argument is present
    if let Some(remote_id) = opts.remote_id {
        // on the provider side:

        // Put some data in the document to sync
        let mut doc = automerge.fork_doc().await;
        let mut t = doc.transaction();
        for i in 0..5 {
            t.put(automerge::ROOT, format!("key-{i}"), format!("value-{i}"))?;
        }
        t.commit();
        automerge.merge_doc(&mut doc).await?;

        // connect to the other node
        let node_addr = iroh::net::NodeAddr::new(remote_id);
        let conn = iroh
            .endpoint()
            .connect(node_addr, IrohAutomergeProtocol::ALPN)
            .await?;

        // initiate a sync session over an iroh-net direct connection
        automerge.initiate_sync(conn).await?;
    } else {
        // on the receiver side:

        // wait for the first sync to finish
        let doc = sync_finished.recv().await.unwrap();
        println!("State");
        let keys: Vec<_> = doc.keys(automerge::ROOT).collect();
        for key in keys {
            let (value, _) = doc.get(automerge::ROOT, &key)?.unwrap();
            println!("{} => {}", key, value);
        }
    }

    // finally shut down
    iroh.shutdown().await?;

    Ok(())
}
