use std::collections::HashMap;

use automerge_repo::{DocumentId, Storage, StorageError};
use n0_future::boxed::BoxFuture;
use n0_future::{FutureExt, TryFutureExt};
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
