use automerge::{ReadDoc, transaction::Transactable};
use clap::Parser;
use iroh::NodeId;
use iroh_automerge_repo::IrohRepo;

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

    let repo = IrohRepo::new(endpoint.clone());
    let router = iroh::protocol::Router::builder(endpoint)
        .accept(IrohRepo::SYNC_ALPN, repo.clone())
        // .accept(IrohRepo::API_ALPN, repo.api().expose()?)
        .spawn();

    println!("Running as {}", router.endpoint().node_id());

    if let Some(addr) = args.sync_with {
        // Start a client.
        // Spawn a task connecting to the other peer.
        repo.sync_with(addr).await?;
        println!("Connected to {addr}");

        let doc = repo.handle().new_document();
        doc.with_doc_mut(|doc| doc.transact(|tx| tx.put(automerge::ROOT, "Hello!", "Woooorld")))
            .map_err(debug_err)?;

        println!("Wrote!");
    }

    tokio::signal::ctrl_c().await?;

    let synced_docs = repo.handle().list_all().await.map_err(debug_err)?;
    println!("Synced {} doc(s)", synced_docs.len());
    for doc_id in synced_docs {
        let doc = repo
            .handle()
            .request_document(doc_id.clone())
            .await
            .map_err(debug_err)?;
        doc.with_doc(|doc| {
            println!("Synced {doc_id:?}");
            for key in doc.keys(automerge::ROOT) {
                let val = doc.get(automerge::ROOT, &key)?.expect("key listed");
                // Only do this for string keys for now
                if let Some(val) = val.0.to_str() {
                    println!("String kv: {key}={val:?}");
                }
            }
            anyhow::Ok(())
        })?;
    }

    router.shutdown().await?;

    Ok(())
}

fn debug_err(e: impl std::fmt::Debug) -> anyhow::Error {
    anyhow::anyhow!("{e:?}")
}
