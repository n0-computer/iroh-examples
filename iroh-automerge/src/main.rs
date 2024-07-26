use std::sync::Arc;

use anyhow::Result;
use automerge::{transaction::Transactable, Automerge, ObjType};
use clap::Parser;
use iroh::node::{Node, ProtocolHandler};

use protocol::IrohAutomergeProtocol;
use tokio::io::{AsyncBufReadExt, BufReader};

mod protocol;
mod tui;

#[derive(Parser)]
#[command(version, about, long_about = None)]
struct Cli {
    #[clap(long)]
    remote_id: Option<iroh::net::NodeId>,
}

#[tokio::main]
async fn main() -> Result<()> {
    let opts = Cli::parse();

    if opts.remote_id.is_none() {
        tracing_subscriber::fmt()
            .with_writer(std::fs::File::create("server.log")?)
            .with_env_filter(tracing_subscriber::EnvFilter::from_default_env())
            .init();
        tracing::info!("server mode");
    } else {
        tracing_subscriber::fmt()
            .with_writer(std::fs::File::create("client.log")?)
            .with_env_filter(tracing_subscriber::EnvFilter::from_default_env())
            .init();
        tracing::info!("client mode");
    }

    let mut doc = Automerge::new();

    // We set up a channel so we can subscribe to sync events from the automerge protocol
    let (sync_sender, sync_finished) = flume::bounded(100);
    let automerge = IrohAutomergeProtocol::new(doc.clone(), sync_sender);
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

    let conn = if let Some(remote_id) = opts.remote_id {
        let conn = iroh
            .endpoint()
            .connect_by_node_id(remote_id, IrohAutomergeProtocol::ALPN)
            .await?;

        automerge.initiate_sync(&conn).await?;

        doc = automerge.fork_doc().await;

        Some(conn)
    } else {
        let addr = iroh.node_addr().await?;

        println!("This is your node id: {}", addr.node_id);
        println!("Press <Enter> after copying this ID to go to the editor.");

        BufReader::new(tokio::io::stdin())
            .lines()
            .next_line()
            .await?
            .unwrap();

        let mut tx = doc.transaction();
        let ta = &tx.put_object(automerge::ROOT, "textarea", ObjType::Text)?;
        tx.update_text(ta, "Hello!|")?;
        tx.commit();

        automerge.merge_doc(&mut doc).await?;

        None
    };

    let (send_am, am_updates) = flume::bounded(100);

    tokio::spawn({
        let automerge = automerge.clone();
        async move {
            while let Ok(mut update) = am_updates.recv_async().await {
                automerge.merge_doc(&mut update).await?;
                tracing::debug!("Received local automerge update");
                if let Some(conn) = conn.as_ref() {
                    tracing::debug!("Sending automerge update to remote");
                    automerge.initiate_sync(conn).await?;
                }
            }
            anyhow::Ok(())
        }
    });

    tui::run_textarea_tui(doc, sync_finished, send_am)?;

    // finally shut down
    iroh.shutdown().await?;

    Ok(())
}
