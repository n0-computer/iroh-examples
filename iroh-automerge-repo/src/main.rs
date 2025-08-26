use std::str::FromStr;

use anyhow::Context;
use automerge::{Automerge, ReadDoc, transaction::Transactable};
use clap::Parser;
use hex::encode;
use iroh::NodeId;
use iroh_automerge_repo::IrohRepo;

use samod::{DocumentId, PeerId, Repo, storage::TokioFilesystemStorage};

#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
struct Args {
    /// A NodeId to connect to and keep syncing with
    #[clap(long)]
    sync_with: Option<NodeId>,

    /// Path where storage files will be created
    #[clap(long, default_value = ".")]
    storage_path: String,

    /// Print the secret key
    #[clap(long)]
    print_secret_key: bool,

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
    /// Subscribe to a document and print changes as they occur
    Subscribe {
        /// The document's ID to subscribe to
        doc: String,
    },
    /// Delete a key from the document
    Delete {
        /// The document's ID of the document to modify
        doc: String,

        /// The key you want to delete
        key: String,
    },
    /// Host the app and serve existing documents from the automerge-repo stored in at config-path
    Host,
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    tracing_subscriber::fmt()
        .with_env_filter(tracing_subscriber::EnvFilter::from_default_env())
        .init();

    let args = Args::parse();

    // Pull in the secret key from the environment variable if it exists
    // This key is the public Node ID used to identify the node in the network
    // If not provided, a random key will be generated, and a new Node ID will
    // be assigned each time the app is started
    let secret_key = match std::env::var("IROH_SECRET") {
        Ok(key_hex) => match iroh::SecretKey::from_str(&key_hex) {
            Ok(key) => Some(key),
            Err(_) => {
                println!("invalid IROH_SECRET provided: not valid hex");
                None
            }
        },
        Err(_) => None,
    };

    let secret_key = match secret_key {
        Some(key) => {
            println!("Using existing key: {}", key.public());
            key
        }
        None => {
            println!("Generating new key");
            let mut rng = rand::rngs::OsRng;
            iroh::SecretKey::generate(&mut rng)
        }
    };

    if args.print_secret_key {
        println!("Secret Key: {}", encode(secret_key.to_bytes()));
        println!(
            "Set env var for persistent Node ID: export IROH_SECRET={}",
            encode(secret_key.to_bytes())
        );
    }

    let endpoint = iroh::Endpoint::builder()
        .discovery_n0()
        .secret_key(secret_key)
        .bind()
        .await?;

    println!("Node ID: {}", endpoint.node_id());

    let samod = Repo::build_tokio()
        .with_peer_id(PeerId::from_string(endpoint.node_id().to_string()))
        .with_storage(TokioFilesystemStorage::new(format!(
            "{}/{}",
            args.storage_path,
            endpoint.node_id()
        )))
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
        Commands::Delete { doc, key } => {
            let doc_id = DocumentId::from_str(&doc).context("Couldn't parse document ID")?;
            let doc = proto
                .repo()
                .find(doc_id)
                .await?
                .context("Couldn't find document with this ID")?;
            doc.with_document(|doc| doc.transact(|tx| tx.delete(automerge::ROOT, key)))
                .map_err(debug_err)?;
            println!("Key deleted!");
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
        Commands::Subscribe { doc } => {
            let doc_id = DocumentId::from_str(&doc).context("Couldn't parse document ID")?;
            let doc = proto
                .repo()
                .find(doc_id.clone())
                .await?
                .context("Couldn't find document with this ID")?;

            println!("Subscribing to document {} for changes...", doc_id);

            // Print initial state
            println!("Initial document state:");
            doc.with_document(|doc| {
                for key in doc.keys(automerge::ROOT) {
                    let (value, _) = doc.get(automerge::ROOT, &key)?.expect("missing value");
                    println!("  {key}={value}");
                }
                anyhow::Ok(())
            })?;

            // Listen for change events and print latest document contents
            tokio::spawn(async move {
                use n0_future::StreamExt;
                let mut changes = doc.changes();
                while let Some(_change) = changes.next().await {
                    if let Err(e) = doc.with_document(|current_doc| {
                        for key in current_doc.keys(automerge::ROOT) {
                            let (value, _) = current_doc
                                .get(automerge::ROOT, &key)?
                                .expect("missing value");
                            println!("  {key}={value}");
                        }
                        anyhow::Ok(())
                    }) {
                        eprintln!("Error reading document content: {e}");
                    }
                }
            });
        }
        Commands::Host => {
            println!("Hosting existing documents...");
            println!("Repository is now hosted and ready for sync operations.");
            println!("Other nodes can connect to sync with this repository.");
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
