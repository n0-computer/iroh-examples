use std::{
    collections::BTreeMap,
    io,
    sync::{Arc, RwLock},
};

use bao_tree::{blake3::Hash, iter::BaoChunk, ChunkRangesRef, TreeNode};

struct SparseOutboardCache<T> {
    cache: Arc<RwLock<BTreeMap<TreeNode, (Hash, Hash)>>>,
    inner: T,
}

impl<T: bao_tree::io::fsm::Outboard> bao_tree::io::fsm::Outboard for SparseOutboardCache<T> {
    fn root(&self) -> bao_tree::blake3::Hash {
        self.inner.root()
    }

    fn tree(&self) -> bao_tree::BaoTree {
        self.inner.tree()
    }

    async fn load(
        &mut self,
        node: bao_tree::TreeNode,
    ) -> io::Result<Option<(bao_tree::blake3::Hash, bao_tree::blake3::Hash)>> {
        if let Some(entry) = self.cache.read().unwrap().get(&node) {
            return Ok(Some(entry.clone()));
        }
        let entry = self.inner.load(node).await?;
        if let Some(entry) = entry {
            self.cache.write().unwrap().insert(node, entry.clone());
        }
        Ok(entry)
    }
}

pub async fn prefetch(
    mut outboard: impl bao_tree::io::fsm::Outboard,
    ranges: &ChunkRangesRef,
) -> io::Result<()> {
    let tree = outboard.tree();
    // todo!
    // let ranges = bao_tree::rec::truncate_ranges(ranges, outboard.tree().size())
    for chunk in tree.ranges_pre_order_chunks_iter_ref(ranges, tree.block_size().chunk_log()) {
        if let BaoChunk::Parent { node, .. } = chunk {
            outboard.load(node).await?;
        }
    }
    Ok(())
}
