use std::pin::Pin;

use futures_lite::Future;
use libipld::Cid;

use crate::tables::ReadableTables;

/// A DAG traversal over a database.
///
/// This is very similar to a stream of Cids, but gives mutable access to the
/// database between calls to `next` to perform changes.
pub trait Traversal {
    type Db;

    fn next(&mut self) -> impl Future<Output = anyhow::Result<Option<Cid>>>;

    fn db_mut(&mut self) -> &mut Self::Db;

    fn filter<F: Fn(&Cid) -> bool>(self, f: F) -> Filtered<Self, F>
    where
        Self: Sized,
    {
        Filtered {
            inner: self,
            filter: f,
        }
    }

    fn boxed<'a>(self) -> BoxedTraversal<'a, Self::Db>
    where
        Self: Sized + Unpin + 'a,
    {
        BoxedTraversal(Box::pin(BoxableTraversalImpl { inner: self }))
    }
}

pub struct BoxedTraversal<'a, D>(Pin<Box<dyn BoxableTraversal<D> + Unpin + 'a>>);

impl<'a, D> Traversal for BoxedTraversal<'a, D> {
    type Db = D;

    async fn next(&mut self) -> anyhow::Result<Option<Cid>> {
        self.0.next().await
    }

    fn db_mut(&mut self) -> &mut D {
        self.0.db_mut()
    }
}

struct BoxableTraversalImpl<D, T: Traversal<Db = D>> {
    inner: T,
}

trait BoxableTraversal<D> {
    fn next(&mut self) -> Pin<Box<dyn Future<Output = anyhow::Result<Option<Cid>>> + '_>>;
    fn db_mut(&mut self) -> &mut D;
}

impl<D, T: Traversal<Db = D>> BoxableTraversal<D> for BoxableTraversalImpl<D, T> {
    fn next(&mut self) -> Pin<Box<dyn Future<Output = anyhow::Result<Option<Cid>>> + '_>> {
        Box::pin(self.inner.next())
    }

    fn db_mut(&mut self) -> &mut D {
        self.inner.db_mut()
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

pub struct SingleTraversal<T> {
    cid: Option<Cid>,
    db: T,
}

impl<D> SingleTraversal<D> {
    pub fn new(db: D, cid: Cid) -> Self {
        Self { cid: Some(cid), db }
    }
}

impl<D> Traversal for SingleTraversal<D> {
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
                if let Some(links) = self.db.links(&cid)? {
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

pub fn get_traversal<'a, D: ReadableTables + Unpin + 'a>(
    cid: Cid,
    traversal: &str,
    db: D,
) -> anyhow::Result<BoxedTraversal<'a, D>> {
    Ok(match traversal {
        "full" => FullTraversal::new(db, cid).boxed(),
        "full_no_raw" => FullTraversal::new(db, cid)
            .filter(|cid| cid.codec() != 0x55)
            .boxed(),
        "single" => SingleTraversal::new(db, cid).boxed(),
        _ => anyhow::bail!("Unknown traversal method: {}", traversal),
    })
}
