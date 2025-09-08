use anyhow::Result;
use clap::Parser;
use notify::Watcher;
use tokio::signal;
use tokio::sync::mpsc;
use tokio::task::JoinSet;

mod protocol;
use protocol::IrohLoroProtocol;

#[derive(Parser)]
#[command(version, about, long_about = None)]
enum Cli {
    Serve {
        file_path: String,
    },
    Join {
        remote_id: iroh::NodeId,
        file_path: String,
    },
}

#[tokio::main]
async fn main() -> Result<()> {
    let opts = Cli::parse();

    let mut tasks = JoinSet::new();

    let iroh = match opts {
        Cli::Serve { file_path } => {
            // Initialize document with file contents
            let contents = tokio::fs::read_to_string(&file_path).await?;

            let doc = loro::LoroDoc::new();
            doc.get_text("text")
                .update_by_line(&contents, loro::UpdateOptions::default())?;
            doc.commit();

            println!("Serving file: {}", file_path);

            let protocol = setup_protocol(doc, file_path.clone(), &mut tasks).await?;
            let iroh = setup_node(protocol.clone()).await?;

            tasks.spawn(async move {
                if let Err(e) = watch_files(file_path, protocol).await {
                    println!("❌ File watcher task failed: {e}");
                }
            });

            iroh
        }

        Cli::Join {
            remote_id,
            file_path,
        } => {
            let doc = loro::LoroDoc::new();
            if !std::path::Path::new(&file_path).exists() {
                tokio::fs::write(&file_path, "").await?;
                println!("Created new file at: {file_path}");
            }

            let protocol = setup_protocol(doc, file_path.clone(), &mut tasks).await?;
            let iroh = setup_node(protocol.clone()).await?;

            tasks.spawn({
                let protocol = protocol.clone();
                async move {
                    if let Err(e) = watch_files(file_path, protocol).await {
                        println!("❌ File watcher task failed: {e}");
                    }
                }
            });

            // Connect to remote node and sync
            let conn = iroh
                .endpoint()
                .connect(remote_id, IrohLoroProtocol::ALPN)
                .await?;

            tasks.spawn(async move {
                if let Err(e) = protocol.initiate_sync(conn).await {
                    println!("Sync protocol failed: {e}");
                }
            });

            iroh
        }
    };

    // Wait for Ctrl+C
    signal::ctrl_c().await?;

    n0_future::future::race(
        async move {
            println!("Received Ctrl+C, shutting down...");
            iroh.shutdown().await?;
            tasks.shutdown().await;
            println!("shut down gracefully");
            Ok(())
        },
        async {
            signal::ctrl_c().await?;
            println!("Another Ctrl+C detected, forcefully shutting down...");
            std::process::exit(1);
        },
    )
    .await
}

// Common protocol setup function for both Serve and Join modes
async fn setup_protocol(
    doc: loro::LoroDoc,
    file_path: String,
    tasks: &mut JoinSet<()>,
) -> Result<IrohLoroProtocol> {
    let (tx, mut rx) = mpsc::channel(100);
    let protocol = IrohLoroProtocol::new(doc, tx);

    // Spawn file writer task
    tasks.spawn(async move {
        while let Some(contents) = rx.recv().await {
            println!("💾 Writing new contents to file. Length={}", contents.len());
            match tokio::fs::write(&file_path, contents).await {
                Ok(_) => println!("✅ Successfully wrote to file"),
                Err(e) => println!("❌ Failed to write to file: {}", e),
            }
        }
    });

    Ok(protocol)
}

// Common setup function for both Serve and Join modes
async fn setup_node(
    protocol: IrohLoroProtocol,
) -> Result<iroh::protocol::Router> {
    let endpoint = iroh::Endpoint::builder()
        .discovery_local_network()
        .bind()
        .await?;

    let iroh = iroh::protocol::Router::builder(endpoint)
        .accept(IrohLoroProtocol::ALPN, protocol)
        .spawn();

    let node_id = iroh.endpoint().node_id();
    println!("Running\nNode Id: {}", node_id);

    Ok(iroh)
}

// File watcher for watching given file path that updates the loro doc when it changes
async fn watch_files(file_path: String, protocol: IrohLoroProtocol) -> Result<()> {
    println!("👀 Starting file watcher for: {}", file_path);
    let (notify_tx, mut notify_rx) = mpsc::channel(10);
    let mut watcher = notify::recommended_watcher(move |res| {
        let _ = notify_tx.blocking_send(res); // ignore when the rx is dropped
    })?;

    watcher.watch(
        std::path::Path::new(&file_path),
        notify::RecursiveMode::NonRecursive,
    )?;

    while let Some(res) = notify_rx.recv().await {
        match res? {
            notify::Event {
                kind: notify::EventKind::Modify(_),
                ..
            } => {
                println!("📝 File modification detected");
                let contents = tokio::fs::read_to_string(&file_path).await?;
                println!("📖 Read file contents (length={})", contents.len());
                protocol.update_doc(&contents)?;
            }
            _ => {
                // Ignoring other watcher events
            }
        }
    }

    Ok(())
}
