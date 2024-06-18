# Iroh dag sync

Example how to use iroh protocols such as gossip and iroh-bytes, as well as
iroh components such as the blob store, to sync very deep DAGs like you would
have with a blockchain.

As an added complexity, we will support non-BLAKE3 hash functions.

# Local store

## Non-blake3 hashes

We reuse the iroh-blobs store, but have an additional table that maps
from a non-blake3 hash to a blake3 hash. This table is only populated
with local, validated data and is therefore assumed to be correct.

## IPLD formats and links

We have an additional table that contains a mapping from a blake3 hash
and an ipld codec/format to a sequence of links. Links in this case are cids.

# Sync algorithm

The sync algorithm is centered around deterministic traversals of DAGs.

## Deterministic traversals

A deterministic traversal of a complete DAG is simple. *Any* traversal is
deterministic as long as it does not intentionally introduce randomness using
e.g. random number generators or use of randomized hash based data structures.

A deterministic traversal for an incomplete DAG is simply a traversal that
stops as soon as some block that might contain links can not be found.

## Sync algorithm

To sync between two nodes, alice (sender) and bob (receiver), bob selects a
root cid and a deterministic traversal. He communicates this information to
alice.

Alice now executes the traversal and loads the data for each cid, then
sends it back to bob as a bao4 encoded message. The message starts with the
blake3 hash, the size as a le encoded u64, and then the bao encoded chunks of
the data. We use a chunk group size of 4, so chunk groups are 2^4*1024 = 16 KiB.

Bob executes *the same* deterministic traversal while receiving data from alice.
Every item from alice corresponds to a cid in the deterministic traversal.

As an item is received, bob validates the item by computing the non-blake3 hash,
then adds the data to the iroh blob store, and extracts links from the blob
according to the format contained in the cid.

Only the reception of this additional data might allow the traversal on bob's
side to continue. So it is important that the traversal is as lazy as possible
in traversing blobs.

## Possible traversals

The above approach will work for any traversal provided that it is
deterministic and that the same traversal is executed on both sides.

A traversal that has a continuous path from the root to each DAG node is
guaranteed to complete even if bob has incomplete data or no data at all, since
the DAG is built from the root. E.g. a traversal of a DAG that *omits* leaf
nodes.

A traversal that does not have a continuous path from the root to each DAG node
relies on data already being present. E.g. a traversal that only produces leaf
nodes.

Traversals can be composed. E.g. you could have a traversal that only produces
leafs of a dag, then a second stage that lets though all cids where the hash
ends with an odd number, or filters based on a bitmap.

The simplest possible traversal is to just return the root cid. Using this,
this protocol can be used to retrieve individual blobs.

## Possible strategy to sync deep DAGs with lots of data.

Assuming you are connected to several nodes that each have a chain-like DAG
with some big data blobs hanging off each chain node. A possible strategy
to quickly sync could be the following:

- Sync the stem of the chain from multiple or even all neighbouring nodes.
- Once this is done, or slightly staggered, sync the leafs of the chain
    from multiple nodes in such a way that the download work is divided.
    E.g. odd hashes from node A, even hashes from node B.

Alternatively the second step could be done as multiple single-cid sync requests
to neighbours in a round robin way.