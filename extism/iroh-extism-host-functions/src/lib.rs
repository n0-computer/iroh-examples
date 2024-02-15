use std::path::PathBuf;
use std::str::FromStr;

use anyhow::{anyhow, Result};
use extism::*;
use futures::stream::StreamExt;
use iroh::net::key::SecretKey;
use iroh::node::Node;
use iroh::rpc_protocol::{DownloadLocation, SetTagOption};
use iroh::util::path::IrohPaths;

type IrohNode = Node<iroh::bytes::store::flat::Store>;

const IROH_EXTISM_DATA_DIR: &str = "iroh-extism";

pub async fn default_iroh_extism_data_root() -> Result<PathBuf> {
    if let Some(val) = std::env::var_os("IROH_EXTISM_DATA_DIR") {
        return Ok(PathBuf::from(val));
    }
    let path = dirs_next::data_dir().ok_or_else(|| {
        anyhow!("operating environment provides no directory for application data")
    })?;

    Ok(path.join(IROH_EXTISM_DATA_DIR))
}

pub async fn create_iroh(path: PathBuf) -> Result<IrohNode> {
    tokio::fs::create_dir_all(&path).await?;

    let blob_dir = path.join(IrohPaths::BaoFlatStoreDir);
    tokio::fs::create_dir_all(&blob_dir).await?;

    let db = iroh::bytes::store::flat::Store::load(blob_dir).await?;
    let doc_store = iroh::sync::store::fs::Store::new(path.join(IrohPaths::DocsDatabase))?;
    let node = iroh::node::Node::builder(db, doc_store)
        .secret_key(SecretKey::generate())
        .spawn()
        .await?;

    Ok(node)
}

// host_fn!(iroh_blob_get_node_id(user_data: Node<iroh::bytes::store::flat::Store>) -> String {
//     Ok(user_data.node_id().to_string())
// });

host_fn!(iroh_blob_get_ticket(user_data: IrohNode; ticket: &str) -> Vec<u8> {
    let node = user_data.get()?;
    let node = node.lock().unwrap();

    let (node_addr, hash, format) = iroh::ticket::BlobTicket::from_str(ticket).map_err(|_| anyhow!("invalid ticket"))?.into_parts();

    if format != iroh::rpc_protocol::BlobFormat::Raw {
        return Err(anyhow!("can only get raw bytes for now, not HashSequences (collections)"));
    }

    // TODO(b5): this crashes execution because we don't have a handle to the original _tokio_ runtime :(
    let handle = tokio::runtime::Handle::current();
    let buf = handle.block_on(async move {
        let mut stream = node.client()
        .blobs
        .download(iroh::rpc_protocol::BlobDownloadRequest {
            hash,
            format,
            peer: node_addr,
            out: DownloadLocation::Internal,
            tag: SetTagOption::Auto,
        })
        .await?;
        while stream.next().await.is_some() {}

        let buffer = node.client().blobs.read(hash).await?.read_to_bytes().await.map_err(|e| anyhow!("read error: {}", e))?.to_vec();

        anyhow::Ok(buffer)
    })?;

    Ok(buf)
});

pub fn add_all_host_functions(
    rt: tokio::runtime::Handle,
    b: PluginBuilder,
    node: IrohNode,
) -> PluginBuilder {
    let iroh = UserData::new(node);

    b.with_function(
        "iroh_blob_get_ticket",
        [PTR],
        [PTR],
        iroh.clone(),
        iroh_blob_get_ticket,
    )
}
