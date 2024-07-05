use std::sync::Arc;

use anyhow::Result;
use automerge::{transaction::Transactable, Automerge};
use clap::Parser;
use iroh::node::{Node, ProtocolHandler};

use protocol::IrohAutomergeProtocol;

mod protocol;

#[derive(Parser)]
#[command(version, about, long_about = None)]
struct Cli {
    #[clap(long)]
    remote_id: Option<iroh::net::NodeId>,
    #[clap(long)]
    remote_relay: Option<url::Url>,
}

#[tokio::main]
async fn main() -> Result<()> {
    let opts = Cli::parse();

    let automerge = IrohAutomergeProtocol::new(Automerge::new());
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

    if let Some(remote_id) = opts.remote_id {
        // Put some data in the document to sync
        let mut doc = automerge.fork_doc();
        let mut t = doc.transaction();
        for i in 0..5 {
            t.put(automerge::ROOT, format!("key-{i}"), format!("value-{i}"))?;
        }
        t.commit();
        automerge.merge_doc(doc)?;

        let mut node_addr = iroh::net::NodeAddr::new(remote_id);

        if let Some(remote_relay) = opts.remote_relay {
            node_addr = node_addr.with_relay_url(remote_relay.into());
        }

        let conn = iroh
            .endpoint()
            .connect(node_addr, IrohAutomergeProtocol::ALPN)
            .await?;

        // initiate a sync session over an iroh-net direct connection
        automerge.initiate_sync(conn).await?;
    } else {
        // Simply wait until iroh is cancelled.
        // `IrohAutomergeProtocol` will print the current state when a sync session is finished.
        iroh.cancel_token().cancelled().await;
    }

    Ok(())
}
