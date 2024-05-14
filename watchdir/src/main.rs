use anyhow::Result;
use futures::{
    // channel::mpsc::channel,
    SinkExt,
    StreamExt,
    TryStreamExt,
};
use iroh::{docs::DocTicket, util::path};
use notify::{
    poll::ScanEvent, Config, Event, PollWatcher, RecommendedWatcher, RecursiveMode, Watcher,
};
use std::{
    path::{Component, Path},
    str::FromStr,
    sync::mpsc::channel,
};

/// Async, futures channel based event watching
#[tokio::main]
async fn main() -> Result<()> {
    let path = std::env::args()
        .nth(1)
        .expect("Argument 1 needs to be a path");

    let mut doc_ticket = None;
    if let Some(ticket) = std::env::args().nth(2) {
        let ticket = iroh::docs::DocTicket::from_str(ticket.as_str())?;
        doc_ticket = Some(ticket);
    }
    println!("watching {}", path);

    let path = std::path::PathBuf::from(&path);
    let iroh_path = path.join(".iroh");
    let node = iroh::node::Node::persistent(iroh_path)
        .await?
        .spawn()
        .await?;

    let doc = open_or_create_document(&node, doc_ticket).await?;
    let author = node.authors.create().await?;

    tokio::spawn(async_watch(path, doc, author)).await??;

    Ok(())
}

async fn open_or_create_document(
    node: &iroh::client::MemIroh,
    ticket: Option<DocTicket>,
) -> anyhow::Result<iroh::client::MemDoc> {
    let doc = match ticket {
        Some(ticket) => {
            println!("importing ticket: {:?}", ticket);
            node.docs.import(ticket).await?
        }
        None => {
            let doc = node.docs.create().await?;
            let ticket = doc
                .share(
                    iroh::client::docs::ShareMode::Write,
                    iroh::base::node_addr::AddrInfoOptions::Relay,
                )
                .await?;
            println!(
                "created new doc {:?} write ticket:\n{:?}",
                doc.id(),
                ticket.to_string()
            );
            doc
        }
    };
    Ok(doc)
}

enum Message {
    Event(notify::Result<notify::Event>),
    Scan(ScanEvent),
}

async fn async_watcher() -> notify::Result<(PollWatcher, std::sync::mpsc::Receiver<Message>)> {
    // let (tx, rx) = tokio::sync::mpsc::channel(1000);
    let (tx, rx) = channel();

    let tx_2 = tx.clone();
    let tx_3 = tx.clone();
    // use the pollwatcher and set a callback for the scanning events
    let watcher = PollWatcher::with_initial_scan(
        move |watch_event| {
            let tx_2 = tx_2.clone();
            // tx_2.blocking_send(Message::Event(watch_event)).unwrap();
            tokio::task::spawn(async move {
                println!("watch_event: {:?}", &watch_event);
                tx_2.send(Message::Event(watch_event)).unwrap();
            });
        },
        Config::default(),
        move |scan_event| {
            // tx_3.blocking_send(Message::Scan(scan_event));
            let tx_3 = tx_3.clone();
            println!("scan_event: {:?}", &scan_event);
            tokio::task::spawn(async move {
                if let Err(err) = tx_3.send(Message::Scan(scan_event)) {
                    println!("send error: {:?}", err);
                }
            });
        },
    )?;

    // let (tx, rx) = std::sync::mpsc::channel();
    // let (mut tx, rx) = tokio::sync::mpsc::channel(1);

    // let tx_c = tx.clone();
    // // use the pollwatcher and set a callback for the scanning events
    // let mut watcher = PollWatcher::with_initial_scan(
    //     move |watch_event| {
    //         (|| async {
    //             tx_c.send(Message::Event(watch_event)).await.unwrap();
    //         });
    //         // tokio::task::spawn_blocking(move || async {
    //         //     tx_c.send(Message::Event(watch_event)).await.unwrap();
    //         // });
    //     },
    //     Config::default(),
    //     move |scan_event| {
    //         tokio::task::block_in_place(|| async {
    //             tx.send(Message::Scan(scan_event)).await.unwrap();
    //         });
    //     },
    // )?;

    // // Automatically select the best implementation for your platform.
    // // You can also access each implementation directly e.g. INotifyWatcher.
    // let watcher = RecommendedWatcher::new(
    //     move |res| {
    //         futures::executor::block_on(async {
    //             tx.send(res).await.unwrap();
    //         })
    //     },
    //     Config::default(),
    // )?;

    Ok((watcher, rx))
}

// fn block_on<F: Future<Output = T>, T>(rt: &tokio::runtime::Handle, fut: F) -> T {
//     tokio::task::block_in_place(move || match tokio::runtime::Handle::try_current() {
//         Ok(handle) => handle.block_on(fut),
//         Err(_) => rt.block_on(fut),
//     })
// }

async fn async_watch<P: AsRef<Path>>(
    path: P,
    doc: iroh::client::MemDoc,
    author: iroh::docs::AuthorId,
) -> anyhow::Result<()> {
    let (mut watcher, mut rx) = async_watcher().await?;

    // Add a path to be watched. All files and directories at that path and
    // below will be monitored for changes.
    watcher.watch(path.as_ref(), RecursiveMode::Recursive)?;

    while let res = rx.recv()? {
        match res {
            Message::Event(Ok(event)) => {
                println!("event: {:?}", event);
                for path in event.paths {
                    let path = path.canonicalize()?;

                    if path.is_file() {
                        // let key = canonicalized_path_to_bytes(&path, true)?;
                        let key = bytes::Bytes::from(path.display().to_string());
                        doc.import_file(author, key, &path, true)
                            .await?
                            .finish()
                            .await?;
                    }
                }
            }
            Message::Event(Err(e)) => {
                println!("watch error: {:?}", e);
            }
            Message::Scan(event) => {
                println!("scan: {:?}", event);
                let path = event?.canonicalize()?;
                if path.is_file() {
                    // let key = canonicalized_path_to_bytes(&path, true)?;
                    let key = bytes::Bytes::from(path.display().to_string());
                    doc.import_file(author, key, &path, true)
                        .await?
                        .finish()
                        .await?;
                }
            }
        }
    }

    Ok(())
}

/// This function converts an already canonicalized path to a string.
///
/// If `must_be_relative` is true, the function will fail if any component of the path is
/// `Component::RootDir`
///
/// This function will also fail if the path is non canonical, i.e. contains
/// `..` or `.`, or if the path components contain any windows or unix path
/// separators.
pub fn canonicalized_path_to_bytes(
    path: impl AsRef<Path>,
    must_be_relative: bool,
) -> anyhow::Result<bytes::Bytes> {
    let mut path_str = String::new();
    let parts = path
        .as_ref()
        .components()
        .filter_map(|c| match c {
            Component::Normal(x) => {
                let c = match x.to_str() {
                    Some(c) => c,
                    None => return Some(Err(anyhow::anyhow!("invalid character in path"))),
                };

                if !c.contains('/') && !c.contains('\\') {
                    Some(Ok(c))
                } else {
                    Some(Err(anyhow::anyhow!("invalid path component {:?}", c)))
                }
            }
            Component::RootDir => {
                if must_be_relative {
                    Some(Err(anyhow::anyhow!("invalid path component {:?}", c)))
                } else {
                    path_str.push('/');
                    None
                }
            }
            _ => Some(Err(anyhow::anyhow!("invalid path component {:?}", c))),
        })
        .collect::<anyhow::Result<Vec<_>>>()?;
    let parts = parts.join("/");
    path_str.push_str(&parts);
    let path_bytes = bytes::Bytes::from(path_str);
    Ok(path_bytes)
}
