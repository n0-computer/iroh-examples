use anyhow::Result;
use loro::{LoroDoc, LoroMap};
use clap::Parser;
use iroh::{Endpoint, protocol::Router};
use protocol::IrohLoroProtocol;
use tokio::sync::mpsc;

mod protocol;

#[derive(Parser)]
#[command(version, about, long_about = None)]
struct Cli {
    #[clap(long)]
    remote_id: Option<iroh::NodeId>,
}

#[tokio::main]
async fn main() -> Result<()> {
    tracing_subscriber::fmt::init();

    let opts = Cli::parse();

    // We set up a channel so we can subscribe to sync events from the loro protocol
    let (sync_sender, mut sync_finished) = mpsc::channel(10);
    let loro = IrohLoroProtocol::new(LoroDoc::new(), sync_sender);
    let endpoint = Endpoint::builder().discovery_n0().bind().await?;
    let iroh = Router::builder(endpoint)
        .accept(IrohLoroProtocol::ALPN, loro.clone())
        .spawn();

    let node_id = iroh.endpoint().node_id();

    println!("Running\nNode Id: {node_id}",);

    // we distinguish the roles in protocol based on if the --remote-id CLI argument is present
    if let Some(remote_id) = opts.remote_id {
        // on the provider side:

        // Put some data in the document to sync
        let mut doc = loro.fork_doc().await;
        let map: LoroMap = doc.get_map("data");
        for i in 0..5 {
            map.insert(&format!("key-{i}"), loro::LoroValue::String(format!("value-{i}").into()))?;
        }
        loro.merge_doc(&mut doc).await?;

        // connect to the other node
        let node_addr = iroh::NodeAddr::new(remote_id);
        let conn = iroh
            .endpoint()
            .connect(node_addr, IrohLoroProtocol::ALPN)
            .await?;

        // initiate a sync session over an iroh-net direct connection
        loro.initiate_sync(conn).await?;
    } else {
        // on the receiver side:

        // wait for the first sync to finish
        let doc = sync_finished.recv().await.unwrap();
        println!("State");
        let map: LoroMap = doc.get_map("data");
        let json_value = map.get_deep_value();
        if let loro::LoroValue::Map(map_data) = json_value {
            for (key, value) in map_data.iter() {
                if let loro::LoroValue::String(s) = value {
                    println!("{key} => \"{}\"", s.as_str());
                } else {
                    println!("{key} => {:?}", value);
                }
            }
        }
    }

    // finally shut down
    iroh.shutdown().await?;

    Ok(())
}
