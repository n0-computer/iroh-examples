use std::collections::HashMap;
use std::io;
use std::sync::{Arc, Mutex};

use bao_tree::io::fsm::Outboard;
use bao_tree::io::outboard::{PostOrderMemOutboard, PreOrderMemOutboard};
use bao_tree::BaoTree;
use bytes::Bytes;
use iroh::blobs::store::bao_tree::blake3;
use iroh::blobs::store::{BaoBlobSize, MapEntry};
use iroh::blobs::Hash;
use iroh::blobs::IROH_BLOCK_SIZE;
use iroh_io::{AsyncSliceReader, AsyncSliceReaderExt, HttpAdapter};
use url::Url;

#[derive(Debug, Clone, Default)]
pub struct S3Store(Arc<Inner>);

#[derive(Debug, Default)]
struct Inner {
    entries: Mutex<HashMap<blake3::Hash, Entry>>,
}

impl S3Store {
    pub async fn import_mem(&self, data: Bytes) -> anyhow::Result<Hash> {
        let size = data.as_ref().len() as u64;
        let (outboard, hash) = {
            let outboard = PostOrderMemOutboard::create(&data, IROH_BLOCK_SIZE).flip();
            let hash = outboard.root;
            (outboard.data, hash)
        };
        let tree = BaoTree::new(size, IROH_BLOCK_SIZE);
        let outboard = PreOrderMemOutboard {
            root: hash,
            tree,
            data: outboard.into(),
        };
        let mut state = self.0.entries.lock().unwrap();
        state.insert(
            hash,
            Entry::new(hash.into(), size, DataDescriptor::Inline(data), outboard),
        );
        Ok(hash.into())
    }

    pub async fn import_url(&self, url: Url) -> anyhow::Result<Hash> {
        let mut http_adapter = HttpAdapter::new(url.clone());
        let data = http_adapter.read_to_end().await?;
        let size = data.len() as u64;
        let (outboard, hash) = {
            let outboard = PostOrderMemOutboard::create(data, IROH_BLOCK_SIZE).flip();
            let hash = outboard.root;
            (outboard.data, hash)
        };
        let tree = BaoTree::new(size, IROH_BLOCK_SIZE);
        let outboard = PreOrderMemOutboard {
            root: hash,
            tree,
            data: outboard.into(),
        };
        let mut state = self.0.entries.lock().unwrap();
        state.insert(
            hash,
            Entry::new(
                hash.into(),
                size,
                DataDescriptor::Url(Arc::new(url)),
                outboard,
            ),
        );
        Ok(hash.into())
    }
}

#[derive(Debug, Clone)]
pub enum DataDescriptor {
    Url(Arc<Url>),
    Inline(Bytes),
}

#[derive(Debug, Clone)]
pub struct Entry {
    hash: Hash,
    size: u64,
    data: DataDescriptor,
    outboard: PreOrderMemOutboard<Bytes>,
}

impl Entry {
    pub fn new(
        hash: Hash,
        size: u64,
        data: DataDescriptor,
        outboard: PreOrderMemOutboard<Bytes>,
    ) -> Self {
        Self {
            hash,
            size,
            outboard,
            data,
        }
    }
}

impl MapEntry for Entry {
    fn size(&self) -> BaoBlobSize {
        BaoBlobSize::Verified(self.size)
    }

    fn hash(&self) -> Hash {
        self.hash
    }

    fn is_complete(&self) -> bool {
        true
    }

    async fn outboard(&self) -> io::Result<impl Outboard> {
        Ok(self.outboard.clone())
    }

    async fn data_reader(&self) -> io::Result<impl AsyncSliceReader> {
        Ok(match self.data {
            DataDescriptor::Url(ref url) => {
                let http_adapter = HttpAdapter::new(url.as_ref().clone());
                self::File::S3(http_adapter)
            }
            DataDescriptor::Inline(ref bytes) => self::File::Inline(bytes.clone()),
        })
    }
}

/// DataReader can only be on s3
#[derive(Debug)]
pub enum File {
    S3(iroh_io::HttpAdapter),
    Inline(Bytes),
}

impl AsyncSliceReader for File {
    async fn read_at(&mut self, offset: u64, len: usize) -> io::Result<Bytes> {
        match self {
            Self::S3(s3) => s3.read_at(offset, len).await,
            Self::Inline(ref mut bytes) => bytes.read_at(offset, len).await,
        }
    }

    async fn size(&mut self) -> io::Result<u64> {
        match self {
            Self::S3(s3) => s3.size().await,
            Self::Inline(bytes) => bytes.size().await,
        }
    }
}

impl iroh::blobs::store::Map for S3Store {
    type Entry = Entry;

    async fn get(&self, hash: &iroh::blobs::Hash) -> io::Result<Option<Self::Entry>> {
        let key: blake3::Hash = (*hash).into();
        Ok(self.0.entries.lock().unwrap().get(&key).cloned())
    }
}
