use anyhow::Context;
use bao_tree::{io::outboard::EmptyOutboard, BaoTree, ChunkRanges};
use futures_lite::StreamExt;
use iroh_blobs::{get::request, protocol::{RangeSpec}, provider::send_blob, store::{fs::Store, Store as _}, BlobFormat, Hash, IROH_BLOCK_SIZE};
use iroh_io::{TokioStreamReader, TokioStreamWriter};
use iroh_net::endpoint::{Connecting, RecvStream, SendStream};
use libipld::{multihash::{MultihashDigest}, Cid, Multihash};
use redb::ReadableTable;
use tokio::io::AsyncReadExt;

use crate::{protocol::{MiniCid, Request, SyncRequest}, tables::{ReadableTables, Tables}, traversal::{FullTraversal, Traversal}, util::{insert_data_and_links, read_framed, to_framed}};
 
const MAX_REQUEST_SIZE: usize = 1024 * 1024 * 16;

pub async fn handle_request(connecting: Connecting, tables: &impl ReadableTables, blobs: &Store) -> anyhow::Result<()> {
    let connection = connecting.await?;
    let (send, mut recv) = connection.accept_bi().await?;
    let request = recv.read_to_end(MAX_REQUEST_SIZE).await?;
    let request = postcard::from_bytes::<Request>(&request)?;
    match request {
        Request::Sync(args) => {
            handle_sync_request(send, args, tables, blobs).await?;
        }
    }
    Ok(())
}

pub async fn handle_sync_request(send: SendStream, request: SyncRequest, tables: &impl ReadableTables, blobs: &Store) -> anyhow::Result<()> {
    let root_hash: Multihash = Multihash::wrap(request.root.hash_format, &request.root.hash)?;
    let root = Cid::new_v1(request.root.data_format, root_hash);
    let mut send = TokioStreamWriter(send);
    match request.method.as_str() {
        _ => {
            let mut traversal = FullTraversal::new(tables, root);
            while let Some(cid) = traversal.next().await? {
                let hash = tables.hash_to_blake3().get((cid.hash().code(), cid.hash().digest()))?
                    .context("corresponding blake3 hash not found")?
                    .value();
                let header = (MiniCid::from(cid), hash);
                let header = to_framed::<Header>(&header)?;
                send.0.write_all(&header).await?;
                send_blob::<iroh_blobs::store::fs::Store, _>(&blobs, hash, &RangeSpec::all(), &mut send).await?;
            }
            send.0.finish().await?;
        }
    }
    Ok(())
}

type Header = (MiniCid, Hash);

pub async fn handle_sync_response<'a>(root: Cid, recv: RecvStream, tables: &mut Tables<'a>, store: &Store) -> anyhow::Result<()> {
    let mut reader = TokioStreamReader(recv);
    let mut traversal = FullTraversal::new(tables, root);
    while let Some((_cid, hash)) = read_framed::<Header>(&mut reader.0).await? {
        let Some(cid) = traversal.next().await? else {
            break;
        };
        let cid = Cid::try_from(cid)?;
        let size = reader.0.read_u64_le().await?;
        let outboard = EmptyOutboard {
            tree: BaoTree::new(size, IROH_BLOCK_SIZE),
            root: hash.into(),
        };
        let mut buffer = Vec::new();
        bao_tree::io::fsm::decode_ranges(&mut reader, ChunkRanges::all(), &mut buffer, outboard).await?;
        let hasher = libipld::multihash::Code::try_from(cid.hash().code())?;
        let actual = hasher.digest(&buffer);
        if &actual != cid.hash() {
            anyhow::bail!("hash mismatch");
        }
        println!("{:?} {} {}", cid, hash, size);
        insert_data_and_links(traversal.tables, store, cid, buffer).await?;
        // store.import_bytes(buffer.into(), BlobFormat::Raw).await?;
    }
    Ok(())
}
