use anyhow::Context;
use automerge::transaction::Transactable;
use automerge::{AutoSerde, ReadDoc};
use automerge_repo::{ConnDirection, Repo, RepoHandle, Storage};
use automerge_repo::{DocumentId, StorageError};
use clap::Parser;
use iroh::NodeId;
use iroh::protocol::ProtocolHandler;
use iroh_automerge_repo::Codec;
use irpc::WithChannels;
use irpc::channel::oneshot;
use n0_future::boxed::BoxFuture;
use n0_future::{FutureExt, TryFutureExt};
use std::collections::HashMap;
use std::sync::Arc;
use tokio::runtime::Handle;
use tokio::sync::mpsc::{Sender, channel};
use tokio::sync::oneshot::{Sender as OneShot, channel as oneshot};
use tokio_util::codec::{FramedRead, FramedWrite};

#[derive(Parser, Debug)]
#[command(author, version, about, long_about = None)]
struct Args {
    #[arg(long)]
    connect: Option<NodeId>,
}

#[derive(Debug)]
struct AutomergeRepoActor {
    recv: tokio::sync::mpsc::Receiver<AutomergeRepoMessage>,
    repo_handle: RepoHandle,
}

#[derive(Clone)]
pub struct AutomergeRepoClient {
    inner: irpc::Client<AutomergeRepoMessage, AutomergeRepoRequest, AutomergeRepoService>,
}

#[derive(Debug, Clone, Copy)]
pub struct AutomergeRepoService;

impl irpc::Service for AutomergeRepoService {}

#[derive(Debug, serde::Serialize, serde::Deserialize)]
struct RequestDoc {
    document_id: DocumentId,
}

#[derive(Debug, serde::Serialize, serde::Deserialize)]
struct NewDoc;

#[derive(Debug, serde::Serialize, serde::Deserialize)]
struct GetDoc {
    document_id: DocumentId,
}

// Use the macro to generate both the StorageProtocol and AutomergeRepoMessage enums
// plus implement Channels for each type
#[irpc::rpc_requests(AutomergeRepoService, message = AutomergeRepoMessage)]
#[derive(serde::Serialize, serde::Deserialize)]
enum AutomergeRepoRequest {
    #[rpc(tx=oneshot::Sender<Result<(), String>>)]
    RequestDoc(RequestDoc),
    #[rpc(tx=oneshot::Sender<Result<DocumentId, String>>)]
    NewDoc(NewDoc),
    #[rpc(tx=oneshot::Sender<Result<serde_json::Value, String>>)]
    GetDoc(GetDoc),
}

impl AutomergeRepoActor {
    async fn run(mut self) {
        while let Some(request) = self.recv.recv().await {
            match request {
                AutomergeRepoMessage::RequestDoc(WithChannels { inner, tx, .. }) => {
                    tx.send(
                        async {
                            self.repo_handle
                                .request_document(inner.document_id)
                                .await
                                .map_err(|e| format!("{e:?}"))?;
                            Ok(())
                        }
                        .await,
                    )
                    .await
                    .ok();
                }
                AutomergeRepoMessage::NewDoc(WithChannels { tx, .. }) => {
                    tx.send(
                        async {
                            let doc_handle = self.repo_handle.new_document();
                            let our_id = self.repo_handle.get_repo_id();
                            doc_handle.with_doc_mut(|doc| {
                                let mut tx = doc.transaction();
                                tx.put(automerge::ROOT, "repo_id", format!("{}", our_id))
                                    .expect("Failed to change the document.");
                                tx.commit();
                            });
                            let doc_id = doc_handle.document_id();
                            Ok(doc_id)
                        }
                        .await,
                    )
                    .await
                    .ok();
                }
                AutomergeRepoMessage::GetDoc(WithChannels { inner, tx, .. }) => {
                    tx.send(
                        async {
                            let doc_handle = self
                                .repo_handle
                                .request_document(inner.document_id)
                                .await
                                .map_err(|e| format!("{e:?}"))?;
                            let value = doc_handle.with_doc(|doc| {
                                serde_json::to_value(AutoSerde::from(doc))
                                    .map_err(|e| format!("{e:?}"))
                            })?;
                            Ok(value)
                        }
                        .await,
                    )
                    .await
                    .ok();
                }
            };
        }
    }
}

impl AutomergeRepoClient {
    pub const ALPN: &[u8] = b"iroh/automerge-repo-api/0";

    pub fn spawn(repo_handle: RepoHandle) -> Self {
        let (tx, rx) = tokio::sync::mpsc::channel(1);
        let actor = AutomergeRepoActor {
            recv: rx,
            repo_handle,
        };
        tokio::spawn(actor.run());
        let local = irpc::LocalSender::<AutomergeRepoMessage, AutomergeRepoService>::from(tx);
        Self {
            inner: local.into(),
        }
    }

    pub fn connect(
        endpoint: iroh::Endpoint,
        addr: impl Into<iroh::NodeAddr>,
    ) -> anyhow::Result<AutomergeRepoClient> {
        let conn = irpc_iroh::IrohRemoteConnection::new(endpoint, addr.into(), Self::ALPN.to_vec());
        Ok(Self {
            inner: irpc::Client::boxed(conn),
        })
    }

    pub fn expose(&self) -> anyhow::Result<impl ProtocolHandler + use<>> {
        let local = self
            .inner
            .local()
            .context("can not listen on remote service")?;
        let handler: irpc::rpc::Handler<AutomergeRepoRequest> = Arc::new(move |msg, _rx, tx| {
            let local = local.clone();
            Box::pin(match msg {
                AutomergeRepoRequest::RequestDoc(req) => local.send((req, tx)),
                AutomergeRepoRequest::NewDoc(new) => local.send((new, tx)),
                AutomergeRepoRequest::GetDoc(get) => local.send((get, tx)),
            })
        });
        Ok(irpc_iroh::IrohProtocol::new(handler))
    }

    pub async fn request_doc(&self, document_id: DocumentId) -> irpc::Result<Result<(), String>> {
        self.inner.rpc(RequestDoc { document_id }).await
    }

    pub async fn new_doc(&self) -> irpc::Result<Result<DocumentId, String>> {
        self.inner.rpc(NewDoc).await
    }

    pub async fn get_doc(
        &self,
        document_id: DocumentId,
    ) -> irpc::Result<Result<serde_json::Value, String>> {
        self.inner.rpc(GetDoc { document_id }).await
    }
}

#[derive(Debug)]
enum StorageRequest {
    Load(DocumentId, OneShot<Option<Vec<u8>>>),
    Append(DocumentId, Vec<u8>, OneShot<()>),
    Compact(DocumentId, Vec<u8>, OneShot<()>),
    ListAll(OneShot<Vec<DocumentId>>),
}

#[derive(Clone, Debug)]
pub struct AsyncInMemoryStorage {
    chan: Sender<StorageRequest>,
}

impl AsyncInMemoryStorage {
    #[allow(clippy::new_without_default)]
    pub fn new() -> Self {
        let mut documents: HashMap<DocumentId, Vec<u8>> = Default::default();
        let (doc_request_sender, mut doc_request_receiver) = channel::<StorageRequest>(1);
        tokio::spawn(async move {
            loop {
                while let Some(request) = doc_request_receiver.recv().await {
                    match request {
                        StorageRequest::ListAll(sender) => {
                            let result = documents.keys().cloned().collect();
                            let _ = sender.send(result);
                        }
                        StorageRequest::Load(doc_id, sender) => {
                            let result = documents.get(&doc_id).cloned();
                            let _ = sender.send(result);
                        }
                        StorageRequest::Append(doc_id, mut data, sender) => {
                            let entry = documents.entry(doc_id).or_default();
                            entry.append(&mut data);
                            let _ = sender.send(());
                        }
                        StorageRequest::Compact(doc_id, data, sender) => {
                            let _entry = documents
                                .entry(doc_id)
                                .and_modify(|entry| *entry = data)
                                .or_default();
                            let _ = sender.send(());
                        }
                    }
                }
            }
        });
        AsyncInMemoryStorage {
            chan: doc_request_sender,
        }
    }
}

impl Storage for AsyncInMemoryStorage {
    fn get(&self, id: DocumentId) -> BoxFuture<Result<Option<Vec<u8>>, StorageError>> {
        let (tx, rx) = oneshot();
        self.chan
            .blocking_send(StorageRequest::Load(id, tx))
            .unwrap();
        rx.map_err(|_| StorageError::Error).boxed()
    }

    fn list_all(&self) -> BoxFuture<Result<Vec<DocumentId>, StorageError>> {
        let (tx, rx) = oneshot();
        self.chan
            .blocking_send(StorageRequest::ListAll(tx))
            .unwrap();
        rx.map_err(|_| StorageError::Error).boxed()
    }

    fn append(&self, id: DocumentId, changes: Vec<u8>) -> BoxFuture<Result<(), StorageError>> {
        let (tx, rx) = oneshot();
        self.chan
            .blocking_send(StorageRequest::Append(id, changes, tx))
            .unwrap();
        rx.map_err(|_| StorageError::Error).boxed()
    }

    fn compact(&self, id: DocumentId, full_doc: Vec<u8>) -> BoxFuture<Result<(), StorageError>> {
        let (tx, rx) = oneshot();
        self.chan
            .blocking_send(StorageRequest::Compact(id, full_doc, tx))
            .unwrap();
        rx.map_err(|_| StorageError::Error).boxed()
    }
}

#[derive(Debug, Clone)]
pub struct AutomergeRepoProtocol {
    repo_handle: RepoHandle,
}

impl AutomergeRepoProtocol {
    pub const ALPN: &[u8] = b"iroh/am-repo/1";

    pub async fn connect(
        &self,
        endpoint: &iroh::Endpoint,
        addr: impl Into<iroh::NodeAddr>,
    ) -> anyhow::Result<()> {
        let conn = endpoint.connect(addr, AutomergeRepoProtocol::ALPN).await?;
        let (send, recv) = conn.open_bi().await?;
        self.repo_handle
            .connect_stream(
                FramedRead::new(recv, Codec),
                FramedWrite::new(send, Codec),
                ConnDirection::Incoming,
            )
            .await
            .map_err(|e| anyhow::anyhow!("{e:?}"))?;
        Ok(())
    }
}

impl ProtocolHandler for AutomergeRepoProtocol {
    async fn accept(
        &self,
        connection: iroh::endpoint::Connection,
    ) -> Result<(), iroh::protocol::AcceptError> {
        println!(
            "Accepted incoming repo connection from {}",
            connection.remote_node_id()?
        );

        let (send, recv) = connection.accept_bi().await?;

        self.repo_handle
            .connect_stream(
                FramedRead::new(recv, Codec),
                FramedWrite::new(send, Codec),
                ConnDirection::Incoming,
            )
            .await
            .map_err(iroh::protocol::AcceptError::from_err)?;

        Ok(())
    }
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let args = Args::parse();

    // Create a repo.
    let repo = Repo::new(None, Box::new(AsyncInMemoryStorage::new()));
    let repo_handle = repo.run();
    let repo_client = AutomergeRepoClient::spawn(repo_handle.clone());

    let endpoint = iroh::Endpoint::builder().discovery_n0().bind().await?;

    // Start a server.
    let repo_protocol = AutomergeRepoProtocol {
        repo_handle: repo_handle.clone(),
    };
    let router = iroh::protocol::Router::builder(endpoint)
        .accept(AutomergeRepoProtocol::ALPN, repo_protocol.clone())
        .accept(AutomergeRepoClient::ALPN, repo_client.expose()?)
        .spawn();

    println!("Running as {}", router.endpoint().node_id());

    if let Some(connect) = args.connect {
        // Start a client.
        // Spawn a task connecting to the other peer.
        repo_protocol.connect(router.endpoint(), connect).await?;
        println!("Connected to {connect}");
    }

    tokio::signal::ctrl_c().await?;

    let synced_docs = repo_handle.list_all().await.unwrap();
    for doc_id in synced_docs {
        let doc = repo_handle.request_document(doc_id.clone()).await.unwrap();
        doc.with_doc(|doc| {
            let val = doc
                .get(automerge::ROOT, "repo_id")
                .expect("Failed to read the document.")
                .unwrap();
            let val = val.0.to_str().unwrap();
            println!("Synced: {doc_id:?} to {val:?}");
        });
    }

    router.shutdown().await.unwrap();

    Handle::current()
        .spawn_blocking(|| {
            repo_handle.stop().unwrap();
        })
        .await
        .unwrap();

    Ok(())
}
