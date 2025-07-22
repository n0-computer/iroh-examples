use automerge::{Automerge, transaction::Transactable};
use clap::Parser;
use iroh::NodeId;
use iroh_automerge_repo::IrohRepo;
use samod::{PeerId, Samod as Repo};

#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
struct Args {
    #[arg(long)]
    sync_with: Option<NodeId>,
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    tracing_subscriber::fmt()
        .with_env_filter(tracing_subscriber::EnvFilter::from_default_env())
        .init();

    let args = Args::parse();

    let endpoint = iroh::Endpoint::builder().discovery_n0().bind().await?;

    let repo = Repo::build_tokio()
        .with_peer_id(PeerId::from_string(endpoint.node_id().to_string()))
        .load()
        .await;
    let proto = IrohRepo::new(endpoint.clone(), repo);
    let router = iroh::protocol::Router::builder(endpoint)
        .accept(IrohRepo::SYNC_ALPN, proto.clone())
        .spawn();

    println!("Running as {}", router.endpoint().node_id());

    if let Some(addr) = args.sync_with {
        // Start a client.
        // Spawn a task connecting to the other peer.
        let _sync_task = tokio::spawn({
            let proto = proto.clone();
            async move { proto.sync_with(addr).await }
        });

        proto
            .repo()
            .when_connected(PeerId::from_string(addr.to_string()))
            .await?;
        println!("Connected to {addr}");

        let mut doc = Automerge::new();
        doc.transact(|tx| tx.put(automerge::ROOT, "Hello!", "Woooorld"))
            .map_err(debug_err)?;
        let _doc = proto.repo().create(doc).await?;

        println!("Wrote!");
    }

    tokio::signal::ctrl_c().await?;

    router.shutdown().await?;

    Ok(())
}

fn debug_err(e: impl std::fmt::Debug) -> anyhow::Error {
    anyhow::anyhow!("{e:?}")
}
