use std::str::FromStr;

use anyhow::Context;
use automerge::{Automerge, ReadDoc, transaction::Transactable};
use clap::Parser;
use iroh::NodeId;
use iroh_automerge_repo::IrohRepo;
use samod::{DocumentId, PeerId, Samod};

#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
struct Args {
    /// A NodeId to connect to to keep syncing with
    #[clap(long)]
    sync_with: Option<NodeId>,

    #[clap(subcommand)]
    command: Commands,
}

/// Subcommands for the iroh doctor.
#[derive(clap::Subcommand, Debug, Clone)]
pub enum Commands {
    /// Creates a new document with given key-value pairs
    /// and prints its document ID.
    Create {
        /// An initial key to set
        key: String,
        /// An initial value to set
        value: String,
    },
    /// Updates a document with the given document ID, either
    /// inserting a new key-value pair or updating the value at
    /// an existing key.
    Upsert {
        /// The document ID of the document to modify
        doc: String,
        /// The key to set
        key: String,
        /// The value to set at the given key
        value: String,
    },
    /// Prints document's contents by ID
    Print {
        /// The document's ID
        doc: String,
    },
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    tracing_subscriber::fmt()
        .with_env_filter(tracing_subscriber::EnvFilter::from_default_env())
        .init();

    let args = Args::parse();

    let endpoint = iroh::Endpoint::builder().discovery_n0().bind().await?;

    let samod = Samod::build_tokio()
        .with_peer_id(PeerId::from_string(endpoint.node_id().to_string()))
        .load()
        .await;
    let proto = IrohRepo::new(endpoint.clone(), samod);
    let router = iroh::protocol::Router::builder(endpoint)
        .accept(IrohRepo::SYNC_ALPN, proto.clone())
        .spawn();

    println!("Running as {}", router.endpoint().node_id());

    if let Some(addr) = args.sync_with {
        tokio::spawn({
            let proto = proto.clone();
            async move { proto.sync_with(addr).await }
        });

        proto
            .repo()
            .when_connected(PeerId::from_string(addr.to_string()))
            .await?;
        println!("Connected to {addr}");
    }

    match args.command {
        Commands::Create { key, value } => {
            let mut doc = Automerge::new();
            doc.transact(|tx| tx.put(automerge::ROOT, key, value))
                .map_err(debug_err)?;
            let doc = proto.repo().create(doc).await?;
            println!("Created document {}", doc.document_id());
        }
        Commands::Upsert { doc, key, value } => {
            let doc_id = DocumentId::from_str(&doc).context("Couldn't parse document ID")?;
            let doc = proto
                .repo()
                .find(doc_id)
                .await?
                .context("Couldn't find document with this ID")?;
            doc.with_document(|doc| doc.transact(|tx| tx.put(automerge::ROOT, key, value)))
                .map_err(debug_err)?;
            println!("Updated document");
        }
        Commands::Print { doc } => {
            let doc_id = DocumentId::from_str(&doc).context("Couldn't parse document ID")?;
            let doc = proto
                .repo()
                .find(doc_id)
                .await?
                .context("Couldn't find document with this ID")?;
            doc.with_document(|doc| {
                for key in doc.keys(automerge::ROOT) {
                    let (value, _) = doc.get(automerge::ROOT, &key)?.expect("missing value");
                    println!("{key}={value}");
                }
                anyhow::Ok(())
            })?;
        }
    }

    println!("Waiting for Ctrl+C");

    tokio::signal::ctrl_c().await?;

    router.shutdown().await?;

    Ok(())
}

fn debug_err(e: impl std::fmt::Debug) -> anyhow::Error {
    anyhow::anyhow!("{e:?}")
}
