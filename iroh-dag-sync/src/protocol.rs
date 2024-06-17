use iroh_blobs::Hash;
use serde::{Deserialize, Serialize};

enum Request {
    Sync(SyncRequest),
}

/// A sync request is a request to sync a DAG from a remote node.
///
/// The request contains basically a ipfs cid and a dag traversal method.
///
/// The response is a sequence of blocks consisting of a sync response header
/// and bao encoded block data.
#[derive(Debug, Serialize, Deserialize)]
struct SyncRequest {
    /// ipld hash format. must be one of the registered ones
    hash_format: u64,
    /// ipld data format. must be one of the registered ones
    data_format: u64,
    /// hash bytes, must be consistent with hash_format
    hash: Vec<u8>,
    /// walk method. must be one of the registered ones
    method: &'static str,
}

#[derive(Debug, Serialize, Deserialize)]
struct SyncResponseHeader {
    /// ipld hash format. must be one of the registered ones
    hash_format: u64,
    /// ipld data format. must be one of the registered ones
    data_format: u64,
    /// hash bytes, must be consistent with hash_format
    hash: Vec<u8>,
    /// corresponding blake3 hash
    blake3_hash: Hash,
}
