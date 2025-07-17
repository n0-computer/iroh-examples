use std::sync::Arc;

use anyhow::Context;
use automerge::{AutoSerde, transaction::Transactable};
use automerge_repo::{DocumentId, RepoHandle};
use iroh::protocol::ProtocolHandler;
use irpc::WithChannels;

use crate::api::protocol::{
    AutomergeRepoMessage, AutomergeRepoRequest, AutomergeRepoService, GetDoc, NewDoc, RequestDoc,
};

mod protocol;

#[derive(Clone)]
pub struct AutomergeRepoClient {
    inner: irpc::Client<AutomergeRepoMessage, AutomergeRepoRequest, AutomergeRepoService>,
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

    pub async fn request_doc(&self, document_id: DocumentId) -> anyhow::Result<()> {
        Ok(self
            .inner
            .rpc(RequestDoc { document_id })
            .await?
            .map_err(|e| anyhow::anyhow!("API error: {e:?}"))?)
    }

    pub async fn new_doc(&self) -> anyhow::Result<DocumentId> {
        Ok(self
            .inner
            .rpc(NewDoc)
            .await?
            .map_err(|e| anyhow::anyhow!("API error: {e:?}"))?)
    }

    pub async fn get_doc(&self, document_id: DocumentId) -> anyhow::Result<serde_json::Value> {
        Ok(self
            .inner
            .rpc(GetDoc { document_id })
            .await?
            .map_err(|e| anyhow::anyhow!("API error: {e:?}"))?)
    }
}

#[derive(Debug)]
struct AutomergeRepoActor {
    recv: tokio::sync::mpsc::Receiver<AutomergeRepoMessage>,
    repo_handle: RepoHandle,
}

impl AutomergeRepoActor {
    async fn run(mut self) {
        while let Some(request) = self.recv.recv().await {
            match request {
                AutomergeRepoMessage::RequestDoc(WithChannels { inner, tx, .. }) => {
                    tx.send(self.request_doc(inner).await).await.ok();
                }
                AutomergeRepoMessage::NewDoc(WithChannels { inner, tx, .. }) => {
                    tx.send(self.new_doc(inner).await).await.ok();
                }
                AutomergeRepoMessage::GetDoc(WithChannels { inner, tx, .. }) => {
                    tx.send(self.get_doc(inner).await).await.ok();
                }
            };
        }
    }

    async fn request_doc(&self, req_doc: RequestDoc) -> Result<(), String> {
        self.repo_handle
            .request_document(req_doc.document_id)
            .await
            .map_err(|e| format!("{e:?}"))?;
        Ok(())
    }

    async fn new_doc(&self, _new_doc: NewDoc) -> Result<DocumentId, String> {
        let doc_handle = self.repo_handle.new_document();
        let our_id = self.repo_handle.get_repo_id();
        doc_handle.with_doc_mut(|doc| {
            let mut tx = doc.transaction();
            tx.put(automerge::ROOT, "repo_id", format!("{}", our_id))
                .map_err(|e| format!("Failed to change the document: {e:?}"))?;
            tx.commit();
            Ok::<(), String>(())
        })?;
        let doc_id = doc_handle.document_id();
        Ok(doc_id)
    }

    async fn get_doc(&self, get: GetDoc) -> Result<serde_json::Value, String> {
        let doc_handle = self
            .repo_handle
            .request_document(get.document_id)
            .await
            .map_err(|e| format!("{e:?}"))?;
        let value = doc_handle.with_doc(|doc| {
            serde_json::to_value(AutoSerde::from(doc)).map_err(|e| format!("{e:?}"))
        })?;
        Ok(value)
    }
}
