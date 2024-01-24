use std::collections::HashMap;
use std::io;
use std::sync::{Arc, Mutex};

use bao_tree::blake3::Hash;
use bao_tree::io::outboard::PreOrderMemOutboard;
use bao_tree::{BaoTree, ByteNum, ChunkRanges};
use bytes::Bytes;
use futures::future::{self, BoxFuture, LocalBoxFuture};
use futures::FutureExt;
use iroh_bytes::store::bao_tree::blake3;
use iroh_bytes::store::MapEntry;
use iroh_bytes::IROH_BLOCK_SIZE;
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
        let (mut outboard, hash) = bao_tree::io::outboard(&data, IROH_BLOCK_SIZE);
        outboard.splice(0..8, []);
        let tree = BaoTree::new(ByteNum(size), IROH_BLOCK_SIZE);
        let outboard = PreOrderMemOutboard::new(hash, tree, outboard.into())
            .map_err(|e| anyhow::anyhow!("outboard creation fail {}", e))?;
        let mut state = self.0.entries.lock().unwrap();
        state.insert(
            hash,
            Entry::new(hash, size, DataDescriptor::Inline(data), outboard),
        );
        Ok(hash)
    }

    pub async fn import_url(&self, url: Url) -> anyhow::Result<Hash> {
        let mut http_adapter = HttpAdapter::new(url.clone()).await?;
        let data = http_adapter.read_to_end().await?;
        let size = data.len() as u64;
        let (mut outboard, hash) = bao_tree::io::outboard(data, IROH_BLOCK_SIZE);
        outboard.splice(0..8, []);
        let tree = BaoTree::new(ByteNum(size), IROH_BLOCK_SIZE);
        let outboard = PreOrderMemOutboard::new(hash, tree, outboard.into())
            .map_err(|e| anyhow::anyhow!("outboard creation fail {}", e))?;
        let mut state = self.0.entries.lock().unwrap();
        state.insert(
            hash,
            Entry::new(hash, size, DataDescriptor::Url(Arc::new(url)), outboard),
        );
        Ok(hash)
    }
}

#[derive(Debug, Clone)]
pub enum DataDescriptor {
    Url(Arc<Url>),
    Inline(Bytes),
}

#[derive(Debug, Clone)]
pub struct Entry {
    hash: blake3::Hash,
    size: u64,
    data: DataDescriptor,
    outboard: PreOrderMemOutboard<Bytes>,
}

impl Entry {
    pub fn new(
        hash: blake3::Hash,
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

impl MapEntry<S3Store> for Entry {
    fn size(&self) -> u64 {
        self.size
    }

    fn hash(&self) -> blake3::Hash {
        self.hash
    }

    fn is_complete(&self) -> bool {
        true
    }

    fn available_ranges(&self) -> BoxFuture<'_, io::Result<bao_tree::ChunkRanges>> {
        future::ok(ChunkRanges::all()).boxed()
    }

    fn outboard(&self) -> BoxFuture<'_, io::Result<self::Outboard>> {
        async move { Ok(self.outboard.clone()) }.boxed()
    }

    fn data_reader(&self) -> BoxFuture<'_, io::Result<self::DataReader>> {
        async move {
            Ok(match self.data {
                DataDescriptor::Url(ref url) => {
                    let http_adapter = HttpAdapter::new(url.as_ref().clone()).await?;
                    self::File::S3(http_adapter)
                }
                DataDescriptor::Inline(ref bytes) => self::File::Inline(bytes.clone()),
            })
        }
        .boxed()
    }
}

/// DataReader can only be on s3
#[derive(Debug)]
pub enum File {
    S3(iroh_io::HttpAdapter),
    Inline(Bytes),
}

type Outboard = PreOrderMemOutboard<Bytes>;
type DataReader = File;

impl AsyncSliceReader for File {
    type ReadAtFuture<'a> = LocalBoxFuture<'a, io::Result<bytes::Bytes>>;

    fn read_at(&mut self, offset: u64, len: usize) -> Self::ReadAtFuture<'_> {
        match self {
            Self::S3(s3) => s3.read_at(offset, len).boxed_local(),
            Self::Inline(ref mut bytes) => bytes.read_at(offset, len).boxed_local(),
        }
    }

    type LenFuture<'a> = LocalBoxFuture<'a, io::Result<u64>>;

    fn len(&mut self) -> Self::LenFuture<'_> {
        match self {
            Self::S3(s3) => s3.len().boxed_local(),
            Self::Inline(bytes) => bytes.len().boxed_local(),
        }
    }
}

impl iroh_bytes::store::Map for S3Store {
    type Outboard = self::Outboard;

    type DataReader = self::File;

    type Entry = Entry;

    fn get(&self, hash: &iroh_bytes::Hash) -> Option<Self::Entry> {
        let key: blake3::Hash = (*hash).into();
        self.0.entries.lock().unwrap().get(&key).cloned()
    }
}
