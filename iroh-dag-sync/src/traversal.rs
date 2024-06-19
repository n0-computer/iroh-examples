use anyhow::Context;
use futures_lite::Future;
use libipld::{cbor::DagCborCodec, codec::Codec, Cid};
use redb::ReadableTable;

use crate::tables::ReadableTables;

/// A DAG traversal over a database.
///
/// This is very similar to a stream of Cids, but gives mutable access to the
/// database between calls to `next` to perform changes.
pub trait Traversal {
    type Db;

    fn next(&mut self) -> impl Future<Output = anyhow::Result<Option<Cid>>>;

    fn db_mut(&mut self) -> &mut Self::Db;

    fn filter<F>(self, f: F) -> Filtered<Self, F>
    where
        Self: Sized,
    {
        Filtered {
            inner: self,
            filter: f,
        }
    }
}

pub struct Filtered<T, F> {
    inner: T,
    filter: F,
}

impl<T: Traversal, F: Fn(&Cid) -> bool> Traversal for Filtered<T, F> {
    type Db = T::Db;

    async fn next(&mut self) -> anyhow::Result<Option<Cid>> {
        while let Some(item) = self.inner.next().await? {
            if (self.filter)(&item) {
                return Ok(Some(item));
            }
        }
        Ok(None)
    }

    fn db_mut(&mut self) -> &mut Self::Db {
        self.inner.db_mut()
    }
}

pub struct Single<T> {
    cid: Option<Cid>,
    db: T,
}

impl<D> Single<D> {
    pub fn new(db: D, cid: Cid) -> Self {
        Self { cid: Some(cid), db }
    }
}

impl<D> Traversal for Single<D> {
    type Db = D;

    async fn next(&mut self) -> anyhow::Result<Option<Cid>> {
        Ok(self.cid.take())
    }

    fn db_mut(&mut self) -> &mut D {
        &mut self.db
    }
}

pub struct FullTraversal<D> {
    prev: Option<Cid>,
    stack: Vec<Cid>,
    visited: std::collections::HashSet<Cid>,
    db: D,
}

impl<D> FullTraversal<D> {
    pub fn new(db: D, root: Cid) -> Self {
        let mut stack = Vec::new();
        stack.push(root);
        Self {
            stack,
            visited: std::collections::HashSet::new(),
            db,
            prev: None,
        }
    }
}

impl<D: ReadableTables> Traversal for FullTraversal<D> {
    type Db = D;

    async fn next(&mut self) -> anyhow::Result<Option<Cid>> {
        loop {
            // perform deferred work
            if let Some(cid) = self.prev.take() {
                if cid.codec() == 0x55 {
                    // no need to traverse raw nodes
                    continue;
                }
                let hash = self
                    .db
                    .hash_to_blake3()
                    .get((cid.hash().code(), cid.hash().digest()))?
                    .context("blake3 hash not found")?;
                let links = self.db.data_to_links().get((cid.codec(), hash.value()))?;
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

    fn db_mut(&mut self) -> &mut D {
        &mut self.db
    }
}
