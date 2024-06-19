use anyhow::Context;
use bao_tree::{io::outboard::EmptyOutboard, BaoTree, ChunkRanges};
use iroh_blobs::{
    protocol::RangeSpec,
    provider::send_blob,
    store::{fs::Store, Store as _},
    BlobFormat, IROH_BLOCK_SIZE,
};
use iroh_io::{TokioStreamReader, TokioStreamWriter};
use iroh_net::endpoint::{Connecting, RecvStream, SendStream};
use libipld::{multihash::MultihashDigest, Cid, Multihash};
use tokio::io::AsyncReadExt;

use crate::{
    protocol::{Request, SyncRequest, SyncResponseHeader},
    tables::{ReadableTables, Tables},
    traversal::{get_inline, get_traversal, Traversal},
};

const MAX_REQUEST_SIZE: usize = 1024 * 1024 * 16;

pub async fn handle_request(
    connecting: Connecting,
    tables: &impl ReadableTables,
    blobs: &Store,
) -> anyhow::Result<()> {
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

pub async fn handle_sync_request(
    send: SendStream,
    request: SyncRequest,
    tables: &impl ReadableTables,
    blobs: &Store,
) -> anyhow::Result<()> {
    let root_hash: Multihash = Multihash::wrap(request.root.hash_format, &request.root.hash)?;
    let root = Cid::new_v1(request.root.data_format, root_hash);
    let traversal = get_traversal(root, request.traversal.as_str(), tables)?;
    let inline = get_inline(request.inline.as_str())?;
    write_sync_response(send, traversal, blobs, inline).await?;
    Ok(())
}

async fn write_sync_response<T: Traversal>(
    send: SendStream,
    traversal: T,
    blobs: &Store,
    inline: impl Fn(&Cid) -> bool,
) -> anyhow::Result<()>
where
    T::Db: ReadableTables,
{
    let mut traversal = traversal;
    // wrap the send stream in a TokioStreamWriter so we can use it from send_blob
    let mut send = TokioStreamWriter(send);
    while let Some(cid) = traversal.next().await? {
        let hash = traversal
            .db_mut()
            .blake3_hash(cid.hash())?
            .context("blake3 hash not found")?;
        if inline(&cid) {
            send.0
                .write_all(&SyncResponseHeader::Data(hash).as_bytes())
                .await?;
            send_blob::<iroh_blobs::store::fs::Store, _>(
                &blobs,
                hash,
                &RangeSpec::all(),
                &mut send,
            )
            .await?;
        } else {
            send.0
                .write_all(&SyncResponseHeader::Hash(hash).as_bytes())
                .await?;
        }
    }
    send.0.finish().await?;
    Ok(())
}

pub async fn handle_sync_response<'a>(
    root: Cid,
    recv: RecvStream,
    tables: &mut Tables<'a>,
    store: &Store,
    traversal: &str,
) -> anyhow::Result<()> {
    let mut reader = TokioStreamReader(recv);
    let mut traversal = get_traversal(root, traversal, tables)?;
    loop {
        let Some(cid) = traversal.next().await? else {
            break;
        };
        let Some(header) = SyncResponseHeader::from_stream(&mut reader.0).await? else {
            break;
        };
        println!("{} {:?}", cid, header);
        let blake3_hash = match header {
            SyncResponseHeader::Hash(blake3_hash) => {
                // todo: get the data via another request
                println!("just got hash mapping {} {}", cid, blake3_hash);
                continue;
            }
            SyncResponseHeader::Data(hash) => hash,
        };
        let size = reader.0.read_u64_le().await?;
        let outboard = EmptyOutboard {
            tree: BaoTree::new(size, IROH_BLOCK_SIZE),
            root: blake3_hash.into(),
        };
        let mut buffer = Vec::new();
        bao_tree::io::fsm::decode_ranges(&mut reader, ChunkRanges::all(), &mut buffer, outboard)
            .await?;
        let hasher = libipld::multihash::Code::try_from(cid.hash().code())?;
        let actual = hasher.digest(&buffer);
        if &actual != cid.hash() {
            anyhow::bail!("user hash mismatch");
        }
        let data = bytes::Bytes::from(buffer);
        let tag = store.import_bytes(data.clone(), BlobFormat::Raw).await?;
        if tag.hash() != &blake3_hash {
            anyhow::bail!("blake3 hash mismatch");
        }
        traversal.db_mut().insert_links(&cid, blake3_hash, &data)?;
    }
    Ok(())
}
