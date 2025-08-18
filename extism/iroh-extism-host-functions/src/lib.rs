use std::{path::PathBuf, str::FromStr};

use anyhow::{Result, anyhow};
use extism::*;
use futures::stream::StreamExt;
use iroh::{Endpoint, NodeId, protocol::Router};
use iroh_blobs::{BlobsProtocol, api::downloader::Shuffled, store::fs::FsStore};

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

pub struct Iroh {
    router: Router,
    blobs: BlobsProtocol,
}

impl Iroh {
    pub async fn new(path: PathBuf) -> Result<Iroh> {
        // create an endpoint
        let endpoint = Endpoint::builder().discovery_n0().bind().await?;

        // create blobs protocol
        let store = FsStore::load(path).await?;

        let blobs = BlobsProtocol::new(&store, endpoint.clone(), None);
        // create router
        let router = Router::builder(endpoint)
            .accept(iroh_blobs::ALPN, blobs.clone())
            .spawn();
        Ok(Iroh { router, blobs })
    }

    pub fn node_id(&self) -> NodeId {
        self.router.endpoint().node_id()
    }

    pub fn blobs(&self) -> BlobsProtocol {
        self.blobs.clone()
    }

    pub fn router(&self) -> &Router {
        &self.router
    }
}

struct Context {
    rt: tokio::runtime::Handle,
    iroh: Iroh,
}

host_fn!(iroh_blob_get_ticket(user_data: Context; ticket: &str) -> Vec<u8> {
    let ctx = user_data.get()?;
    let ctx = ctx.lock().unwrap();

    let (node_addr, hash, format) = iroh_blobs::ticket::BlobTicket::from_str(ticket).map_err(|_| anyhow!("invalid ticket"))?.into_parts();

    if format != iroh_blobs::BlobFormat::Raw {
        return Err(anyhow!("can only get raw bytes for now, not HashSequences (collections)"));
    }
    let router = ctx.iroh.router();
    let blobs = ctx.iroh.blobs();
    let store = blobs.store();
    let downloader = store.downloader(router.endpoint());
    let buf = ctx.rt.block_on(async move {
        let blobs = store.blobs();
        let mut stream = downloader.download(hash, Shuffled::new(vec![node_addr.node_id])).stream().await?;
        while stream.next().await.is_some() {}

        let buffer = blobs.get_bytes(hash).await?;
        router.shutdown().await?;

        anyhow::Ok(buffer.to_vec())
    })?;

    Ok(buf)
});

pub fn add_all_host_functions(
    rt: tokio::runtime::Handle,
    b: PluginBuilder,
    iroh: Iroh,
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
