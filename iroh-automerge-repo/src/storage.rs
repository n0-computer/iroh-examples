use std::collections::HashMap;

use automerge_repo::{DocumentId, Storage, StorageError};
use n0_future::FutureExt;
use n0_future::boxed::BoxFuture;
use tokio::sync::mpsc::{Sender, channel};
use tokio::sync::oneshot::{Sender as OneShot, channel as oneshot};

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
    pub fn new() -> Self {
        let (chan, recv) = channel::<StorageRequest>(1);
        tokio::spawn(Self::run(recv));
        AsyncInMemoryStorage { chan }
    }

    async fn run(mut doc_request_receiver: tokio::sync::mpsc::Receiver<StorageRequest>) {
        let mut documents: HashMap<DocumentId, Vec<u8>> = Default::default();
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
    }
}

impl Storage for AsyncInMemoryStorage {
    fn get(&self, id: DocumentId) -> BoxFuture<Result<Option<Vec<u8>>, StorageError>> {
        let chan = self.chan.clone();
        async move {
            let (tx, rx) = oneshot();
            chan.send(StorageRequest::Load(id, tx))
                .await
                .map_err(|_| StorageError::Error)?;
            rx.await.map_err(|_| StorageError::Error)
        }
        .boxed()
    }

    fn list_all(&self) -> BoxFuture<Result<Vec<DocumentId>, StorageError>> {
        let chan = self.chan.clone();
        async move {
            let (tx, rx) = oneshot();
            chan.send(StorageRequest::ListAll(tx))
                .await
                .map_err(|_| StorageError::Error)?;
            rx.await.map_err(|_| StorageError::Error)
        }
        .boxed()
    }

    fn append(&self, id: DocumentId, changes: Vec<u8>) -> BoxFuture<Result<(), StorageError>> {
        let chan = self.chan.clone();
        async move {
            let (tx, rx) = oneshot();
            chan.send(StorageRequest::Append(id, changes, tx))
                .await
                .map_err(|_| StorageError::Error)?;
            rx.await.map_err(|_| StorageError::Error)
        }
        .boxed()
    }

    fn compact(&self, id: DocumentId, full_doc: Vec<u8>) -> BoxFuture<Result<(), StorageError>> {
        let chan = self.chan.clone();
        async move {
            let (tx, rx) = oneshot();
            chan.send(StorageRequest::Compact(id, full_doc, tx))
                .await
                .map_err(|_| StorageError::Error)?;
            rx.await.map_err(|_| StorageError::Error)
        }
        .boxed()
    }
}
