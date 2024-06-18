use anyhow::Context;
use futures_lite::{Future, Stream};
use genawaiter::rc::{Co, Gen};
use redb::ReadableTable;
use libipld::{
    cbor::DagCborCodec, codec::Codec, raw::RawCodec, Cid
};

use crate::tables::ReadableTables;

pub trait Traversal {
    fn next(&mut self) -> impl Future<Output = anyhow::Result<Option<Cid>>>;
}

pub struct FullTraversal<T> {
    prev: Option<Cid>,
    stack: Vec<Cid>,
    visited: std::collections::HashSet<Cid>,
    pub tables: T,
}

impl<T> FullTraversal<T> {
    pub fn new(tables: T, root: Cid) -> Self {
        let mut stack = Vec::new();
        stack.push(root);
        Self {
            stack,
            visited: std::collections::HashSet::new(),
            tables,
            prev: None,
        }
    }
}

impl<T: ReadableTables> Traversal for FullTraversal<T> {
    async fn next(&mut self) -> anyhow::Result<Option<Cid>> {
        loop {
            // perform deferred work
            if let Some(cid) = self.prev.take() {
                if cid.codec() == 0x55 {
                    // no need to traverse raw nodes
                    continue;
                }
                let hash = self.tables.hash_to_blake3().get((cid.hash().code(), cid.hash().digest()))?
                    .context("blake3 hash not found")?;
                let links = self.tables.data_to_links().get((cid.codec(), hash.value()))?;
                if let Some(links) = links {
                    let links = links.value();
                    let links: Vec<Cid> = DagCborCodec.decode(&links)?;
                    for link in links.into_iter().rev() {
                        self.stack.push(link);
                    }
                }
            }
            let Some(cid) = self.stack.pop() else {
                break;
            };
            if self.visited.contains(&cid) {
                continue;
            }
            self.visited.insert(cid);
            // defer the reading of the data etc, since we might not have the data yet
            self.prev = Some(cid);
            return Ok(Some(cid));
        }
        Ok(None)
    }
}
