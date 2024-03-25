use std::path::PathBuf;
use std::str::FromStr;

use anyhow::{anyhow, Result};
use extism::*;
use futures::stream::StreamExt;
use iroh::node::Node;
use iroh::rpc_protocol::SetTagOption;

type IrohNode = Node<iroh::bytes::store::fs::Store>;

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
    let node = iroh::node::Node::persistent(path).await?.spawn().await?;
    Ok(node)
}

struct Context {
    rt: tokio::runtime::Handle,
    iroh: IrohNode,
}

host_fn!(iroh_blob_get_ticket(user_data: Context; ticket: &str) -> Vec<u8> {
    let ctx = user_data.get()?;
    let ctx = ctx.lock().unwrap();

    let (node_addr, hash, format) = iroh::ticket::BlobTicket::from_str(ticket).map_err(|_| anyhow!("invalid ticket"))?.into_parts();

    if format != iroh::rpc_protocol::BlobFormat::Raw {
        return Err(anyhow!("can only get raw bytes for now, not HashSequences (collections)"));
    }
    let client = ctx.iroh.client();
    let buf = ctx.rt.block_on(async move {
        let mut stream = client.blobs.download(iroh::rpc_protocol::BlobDownloadRequest {
            hash,
            format,
            peer: node_addr,
            tag: SetTagOption::Auto,
        }).await?;
        while stream.next().await.is_some() {}

        let buffer = client.blobs.read(hash).await?.read_to_bytes().await?;
        anyhow::Ok(buffer.to_vec())
    })?;

    Ok(buf)
});

pub fn add_all_host_functions(
    rt: tokio::runtime::Handle,
    b: PluginBuilder,
    iroh: IrohNode,
) -> PluginBuilder {
    let ctx = UserData::new(Context { rt, iroh });

    b.with_function(
        "iroh_blob_get_ticket",
        [PTR],
        [PTR],
        ctx,
        iroh_blob_get_ticket,
    )
}
