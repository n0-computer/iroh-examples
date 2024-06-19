use iroh_blobs::Hash;
use libipld::{Cid, Multihash};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub enum Request {
    Sync(SyncRequest),
}

/// A generic content identifier, basically an ipld cid.
#[derive(Debug, Serialize, Deserialize)]
pub struct MiniCid {
    /// ipld hash format. must be one of the registered ones
    pub hash_format: u64,
    /// ipld data format. must be one of the registered ones
    pub data_format: u64,
    /// hash bytes, must be consistent with hash_format
    pub hash: Vec<u8>,
}

impl From<Cid> for MiniCid {
    fn from(cid: Cid) -> Self {
        Self {
            hash_format: cid.hash().code(),
            data_format: cid.codec(),
            hash: cid.hash().digest().to_vec(),
        }
    }
}

impl TryFrom<MiniCid> for Cid {
    type Error = anyhow::Error;

    fn try_from(value: MiniCid) -> Result<Self, Self::Error> {
        Ok(Cid::new_v1(
            value.data_format,
            Multihash::wrap(value.hash_format, &value.hash)?,
        ))
    }
}

/// A sync request is a request to sync a DAG from a remote node.
///
/// The request contains basically a ipfs cid and a dag traversal method.
///
/// The response is a sequence of blocks consisting of a sync response header
/// and bao encoded block data.
#[derive(Debug, Serialize, Deserialize)]
pub struct SyncRequest {
    /// the root cid to sync
    pub root: MiniCid,
    /// walk method. must be one of the registered ones
    pub method: String,
    /// arguments to the walk method, postcard encoded
    pub args: Vec<u8>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SyncResponseHeader {
    /// cid of the block
    pub cid: MiniCid,
    /// corresponding blake3 hash
    pub blake3_hash: Hash,
}
