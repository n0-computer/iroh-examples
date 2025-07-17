use automerge_repo::DocumentId;
use irpc::channel::oneshot;

#[derive(Debug, Clone, Copy)]
pub(crate) struct AutomergeRepoService;

impl irpc::Service for AutomergeRepoService {}

#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub(crate) struct RequestDoc {
    pub(crate) document_id: DocumentId,
}

#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub(crate) struct NewDoc;

#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub(crate) struct GetDoc {
    pub(crate) document_id: DocumentId,
}

// Use the macro to generate both the StorageProtocol and AutomergeRepoMessage enums
// plus implement Channels for each type
#[irpc::rpc_requests(AutomergeRepoService, message = AutomergeRepoMessage)]
#[derive(serde::Serialize, serde::Deserialize)]
pub(crate) enum AutomergeRepoRequest {
    #[rpc(tx=oneshot::Sender<Result<(), String>>)]
    RequestDoc(RequestDoc),
    #[rpc(tx=oneshot::Sender<Result<DocumentId, String>>)]
    NewDoc(NewDoc),
    #[rpc(tx=oneshot::Sender<Result<serde_json::Value, String>>)]
    GetDoc(GetDoc),
}
