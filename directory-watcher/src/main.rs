use clap::Parser;
mod args;
mod config;
mod io;
use args::{Args, WatchArgs};
use io::setup_logging;
use notify::{event::CreateKind, Event, EventKind, RecursiveMode, Watcher};

async fn watch_cmd(args: WatchArgs) -> anyhow::Result<()> {
    let blobs_path = std::env::current_dir()?.join("blobs");
    let docs_path = std::env::current_dir()?.join("docs");
    let rt = iroh::bytes::util::runtime::Handle::from_current(1)?;
    let blob_store =
        iroh::bytes::store::flat::Store::load_blocking(&blobs_path, &blobs_path, &blobs_path, &rt)?;
    let doc_store = iroh::sync::store::fs::Store::new(docs_path)?;
    let iroh = iroh::node::Node::builder(blob_store, doc_store)
        .runtime(&rt)
        .spawn()
        .await?;
    let client = iroh.client();

    // Automatically select the best implementation for your platform.
    let mut watcher = notify::recommended_watcher(|res| match res {
        Ok(Event { kind, paths, attrs }) => match kind {
            EventKind::Create(CreateKind::File) => {
                for path in paths {
                    tracing::info!("create: {:?}", path);
                }
            }
            other => {
                tracing::info!("other: {:?}", other);
            }
        },
        Err(e) => tracing::error!("watch error: {:?}", e),
    })?;
    watcher.watch(&args.path, RecursiveMode::Recursive)?;
    std::io::stdin().read_line(&mut String::new())?;
    Ok(())
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    setup_logging();
    let args = Args::parse();
    match args.command {
        args::Commands::Watch(watch_args) => {
            watch_cmd(watch_args).await?;
        }
    }
    Ok(())
}
