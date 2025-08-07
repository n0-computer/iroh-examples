use std::str::FromStr;
use std::sync::Arc;

use anyhow::Context;
use automerge::{Automerge, ReadDoc, transaction::Transactable};
use clap::Parser;
use hex::{decode, encode};
use iroh::NodeId;
use iroh_automerge_repo::IrohRepo;

use samod::{DocumentId, PeerId, Samod, storage::TokioFilesystemStorage};
use tokio::sync::Mutex;

#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
struct Args {
    /// A NodeId to connect to and keep syncing with
    #[clap(long)]
    sync_with: Option<NodeId>,

    /// Path where storage files will be created
    #[clap(long, default_value = ".")]
    config_path: String,

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
    let secret_key = match std::env::var("IROH_NODE_SECRET_KEY") {
        Ok(key_hex) => match decode(&key_hex) {
            Ok(key_bytes) => {
                if key_bytes.len() == 32 {
                    let mut bytes = [0u8; 32];
                    bytes.copy_from_slice(&key_bytes);
                    Some(iroh::SecretKey::from_bytes(&bytes))
                } else {
                    println!(
                        "invalid IROH_NODE_SECRET_KEY provided: expected 32 bytes, got {}",
                        key_bytes.len()
                    );
                    None
                }
            }
            Err(_) => {
                println!("invalid IROH_NODE_SECRET_KEY provided: not valid hex");
                None
            }
        },
        Err(_) => None,
    };

    match secret_key {
        Some(ref key) => {
            println!("Using existing key: {}", key.public());
        }
        None => {
            println!("Generating new key");
        }
    }

    let mut rng = rand::rngs::OsRng;
    let _key = iroh::SecretKey::generate(&mut rng);

    let secret_key = secret_key.unwrap_or_else(|| _key);

    if args.print_secret_key {
        println!("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        println!("Secret Key: {}", encode(secret_key.to_bytes()));
        println!(
            "Set env var for persistent Node ID: export IROH_NODE_SECRET_KEY={}",
            encode(secret_key.to_bytes())
        );
        println!("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    }

    let endpoint = iroh::Endpoint::builder()
        .discovery_n0()
        .secret_key(secret_key)
        .bind()
        .await?;

    println!("Node ID: {}", endpoint.node_id());

    let samod = Samod::build_tokio()
        .with_peer_id(PeerId::from_string(endpoint.node_id().to_string()))
        .with_storage(TokioFilesystemStorage::new(format!(
            "{}/{}",
            args.config_path,
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

            // Track the last known heads to detect changes
            let last_heads = Arc::new(Mutex::new(Vec::new()));

            // Get initial heads
            let initial_heads = doc.with_document(|doc| anyhow::Ok(doc.get_heads()))?;

            // Initialize the last_heads tracker
            *last_heads.lock().await = initial_heads;

            // Set up polling for changes
            let doc_clone = doc.clone();
            let last_heads_clone = last_heads.clone();

            tokio::spawn(async move {
                loop {
                    tokio::time::sleep(tokio::time::Duration::from_millis(1000)).await;

                    // Get current heads from document
                    let current_heads_result =
                        doc_clone.with_document(|current_doc| anyhow::Ok(current_doc.get_heads()));

                    match current_heads_result {
                        Ok(current_heads) => {
                            let mut last_heads_guard = last_heads_clone.lock().await;

                            // Check if heads have changed (indicating document updates)
                            if current_heads != *last_heads_guard {
                                println!("Document changed! New state:");

                                // Get the updated document content
                                if let Err(e) = doc_clone.with_document(|current_doc| {
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

                                *last_heads_guard = current_heads;
                            }
                        }
                        Err(e) => {
                            eprintln!("Error getting document heads: {e}");
                        }
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
