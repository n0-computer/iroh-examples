use std::{path::PathBuf, str::FromStr, sync::Arc};

use anyhow::{anyhow, Result};
use extism::*;
use futures::stream::StreamExt;
use iroh::{key::PublicKey, protocol::Router, Endpoint};
use iroh_blobs::{
    net_protocol::{Blobs, DownloadMode},
    rpc::client::blobs::DownloadOptions,
    store::fs::Store,
    util::{local_pool::LocalPool, SetTagOption},
};

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
    _local_pool: LocalPool,
    router: Router,
    blobs: Arc<Blobs<Store>>,
    node_id: PublicKey,
}

impl Iroh {
    pub async fn new(path: PathBuf) -> Result<Iroh> {
        // create store
        let store = Store::load(path).await?;

        // create local pool
        let local_pool = LocalPool::single();

        // create an endpoint
        let endpoint = Endpoint::builder().bind().await?;
        let node_id = endpoint.node_id();

        // create blobs protocol
        let downloader = iroh_blobs::downloader::Downloader::new(
            store.clone(),
            endpoint.clone(),
            local_pool.handle().clone(),
        );
        let blobs = Arc::new(Blobs::new(
            store.clone(),
            local_pool.handle().clone(),
            Default::default(),
            downloader.clone(),
            endpoint.clone(),
        ));
        let router = Router::builder(endpoint)
            .accept(iroh_blobs::ALPN, blobs.clone())
            .spawn()
            .await?;
        Ok(Iroh {
            _local_pool: local_pool,
            router,
            blobs,
            node_id,
        })
    }

    pub fn node_id(&self) -> PublicKey {
        self.node_id
    }

    pub fn blobs(&self) -> Arc<Blobs<Store>> {
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

    let (node_addr, hash, format) = iroh::ticket::BlobTicket::from_str(ticket).map_err(|_| anyhow!("invalid ticket"))?.into_parts();

    if format != iroh_blobs::BlobFormat::Raw {
        return Err(anyhow!("can only get raw bytes for now, not HashSequences (collections)"));
    }
    let router = ctx.iroh.router();
    let blobs = ctx.iroh.blobs();
    println!("blobs");
    let buf = ctx.rt.block_on(async move {
        let blobs = blobs.client();
        let mut stream = blobs.download_with_opts(hash, DownloadOptions {
            format,
            nodes: vec![node_addr],
            mode: DownloadMode::Queued,
            tag: SetTagOption::Auto,
        }).await?;
        println!("download");
        while stream.next().await.is_some() {}
        println!("stream next");

        let buffer = blobs.read(hash).await?.read_to_bytes().await?;
        println!("read");
        router.shutdown().await?;
        println!("shutdown");

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
