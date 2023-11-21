use std::path::{Path, PathBuf};

use clap::Parser;
mod args;
mod config;
mod io;
use args::{Args, WatchArgs};
use bytes::Bytes;
use io::setup_logging;
use iroh::{
    client::{Doc, Iroh},
    rpc_protocol::{ProviderRequest, ProviderResponse},
    sync::AuthorId,
};
use notify::{event::CreateKind, Event, EventKind, RecursiveMode, Watcher};

fn get_doc_and_key<C>(client: &Iroh<C>, path: &Path) -> Option<(Doc<C>, AuthorId, Bytes)>
where
    C: quic_rpc::transport::Connection<ProviderResponse, ProviderRequest>,
{
    None
}

fn make_relative<'a>(base: &'a Path, target: &'a Path) -> Option<PathBuf> {
    let base = base.components().collect::<Vec<_>>();
    let mut target = target.components().collect::<Vec<_>>();
    let n = base.len();
    if target.len() < base.len() {
        return None;
    }
    for i in 0..n {
        if base[i] != target[i] {
            return None;
        }
    }
    target.splice(..n, []);
    Some(target.iter().collect())
}

async fn watch_cmd(args: WatchArgs) -> anyhow::Result<()> {
    let blobs_path = std::env::current_dir()?.join("blobs");
    let docs_path = std::env::current_dir()?.join("docs");
    let rt = iroh::bytes::util::runtime::Handle::from_current(1)?;
    let blob_store =
        iroh::bytes::store::flat::Store::load_blocking(&blobs_path, &blobs_path, &blobs_path, &rt)?;
    let doc_store = iroh::sync::store::fs::Store::new(docs_path)?;
    let node = iroh::node::Node::builder(blob_store, doc_store)
        .runtime(&rt)
        .spawn()
        .await?;
    let iroh = node.client();
    let doc = iroh.docs.create().await?;
    let author = iroh.authors.create().await?;

    // Automatically select the best implementation for your platform.
    let root = args.path.canonicalize()?;
    let root2 = root.clone();
    let mut watcher = notify::recommended_watcher(move |res| match res {
        Ok(Event { kind, paths, attrs }) => match kind {
            EventKind::Create(CreateKind::File) => {
                for path in paths {
                    tracing::error!("create: {:?} {:?}", path, root2);
                    if let Some(rel) = make_relative(&root2, &path) {
                        tracing::error!("create: {:?}", rel);
                        if let Some((doc, author, key)) = get_doc_and_key(&iroh, &rel) {
                            tokio::spawn(async move {
                                let t = doc.import_file(author, key, path, true).await?;
                                let outcome = t.finish().await?;
                                tracing::error!("create: {:?} {:?}", rel, outcome);
                                anyhow::Ok(())
                            });
                        }
                    }
                    // let progress = doc.import_file(author, key, path, true).await?;
                }
            }
            other => {
                tracing::info!("other: {:?}", other);
            }
        },
        Err(e) => tracing::error!("watch error: {:?}", e),
    })?;
    watcher.watch(&root, RecursiveMode::Recursive)?;
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
