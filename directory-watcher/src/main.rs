use std::path::{Path, PathBuf};

use clap::Parser;
mod args;
mod config;
mod io;
use args::{Args, WatchArgs};
use bytes::Bytes;
use io::setup_logging;
use iroh::rpc_protocol::ShareMode;
use notify::{event::CreateKind, Event, EventKind, RecursiveMode, Watcher};

/// Is this file relevant for insertion?
fn is_relevant(path: &Path) -> bool {
    let text = path.to_string_lossy();
    text.starts_with("new/") || text.starts_with("cur/")
}

/// Get a key given an email.
fn get_key(data: &[u8]) -> Option<String> {
    let headers = utf8_prefix(data);
    let message_id = extract_message_id(headers)?;
    let key = format!("/inbox/{}", message_id);
    Some(key)
}

/// Get the UTF-8 prefix of a blob. This should parse all ascii headers
fn utf8_prefix(blob: &[u8]) -> &str {
    match std::str::from_utf8(blob) {
        Ok(s) => s, // If the entire blob is valid UTF-8, return it.
        Err(e) => {
            // If there's an error, get the index of the first invalid byte.
            let valid_up_to = e.valid_up_to();
            // Convert the valid part of the blob to a str safely.
            std::str::from_utf8(&blob[..valid_up_to]).unwrap_or_default()
        }
    }
}

fn extract_message_id(email: &str) -> Option<String> {
    for line in email.lines() {
        if line.is_empty() {
            return None;
        }
        if line.to_lowercase().starts_with("message-id:") {
            let parts: Vec<&str> = line.splitn(2, ':').collect();
            if parts.len() == 2 {
                return Some(parts[1].trim().to_string());
            }
        }
    }
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
    println!("Writing to document {}", doc.id());
    let ticket = doc.share(ShareMode::Write).await?;
    println!("Got ticket {}", ticket);
    let author = iroh.authors.create().await?;
    println!("Using author {}", author);

    // Automatically select the best implementation for your platform.
    let root = args.path.canonicalize()?;
    let root2 = root.clone();
    let (send, mut recv) = tokio::sync::mpsc::unbounded_channel();
    let mut watcher = notify::recommended_watcher(move |msg| {
        send.send(msg).ok();
    })?;
    watcher.watch(&root, RecursiveMode::Recursive)?;
    tokio::spawn(async move {
        while let Some(msg) = recv.recv().await {
            let Ok(event) = msg else {
                continue;
            };
            let EventKind::Create(CreateKind::File) = event.kind else {
                continue;
            };
            for path in event.paths {
                tracing::error!("create: {:?} {:?}", path, root2);
                if let Some(relative_path) = make_relative(&root2, &path) {
                    tracing::error!("create: {:?}", relative_path);
                    if is_relevant(&relative_path) {
                        if let Ok(bytes) = std::fs::read(&path) {
                            if let Some(key) = get_key(&bytes) {
                                println!("Found something that looks like a mail");
                                println!("Using key {}", key);
                                let key = Bytes::from(key);
                                let doc = doc.clone();
                                let hash = doc.set_bytes(author, key, bytes).await?;
                                println!("added entry with hash {}", hash);
                            }
                        }
                    }
                }
            }
        }
        anyhow::Ok(())
    });
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
