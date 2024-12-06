use std::{path::PathBuf, sync::Arc};

use anyhow::Result;
use iroh::protocol::Router;
use iroh_blobs::util::local_pool::LocalPool;
use quic_rpc::transport::flume::FlumeConnector;

pub(crate) type BlobsClient = iroh_blobs::rpc::client::blobs::Client<
    FlumeConnector<iroh_blobs::rpc::proto::Response, iroh_blobs::rpc::proto::Request>,
>;
pub(crate) type DocsClient = iroh_docs::rpc::client::docs::Client<
    FlumeConnector<iroh_docs::rpc::proto::Response, iroh_docs::rpc::proto::Request>,
>;

#[derive(Clone, Debug)]
pub(crate) struct Iroh {
    _local_pool: Arc<LocalPool>,
    router: Router,
    pub(crate) blobs: BlobsClient,
    pub(crate) docs: DocsClient,
}

impl Iroh {
    pub async fn new(path: PathBuf) -> Result<Self> {
        // create dir if it doesn't already exist
        tokio::fs::create_dir_all(&path).await?;

        // load or create key
        let key = iroh_node_util::load_secret_key(path.clone().join("keypair")).await?;

        // load or create docs stores
        let docs_store = iroh_docs::store::Store::persistent(path.join("docs.redb"))?;
        let author_store =
            iroh_docs::engine::DefaultAuthorStorage::Persistent(path.join("default-author"));

        // local thread pool manager for blobs
        let local_pool = LocalPool::default();

        // create endpoint
        let endpoint = iroh::Endpoint::builder()
            .discovery_n0()
            .secret_key(key)
            .bind()
            .await?;

        // build the protocol router
        let mut builder = iroh::protocol::Router::builder(endpoint);

        // add iroh gossip
        let addr = builder.endpoint().node_addr().await?;
        let gossip = iroh_gossip::net::Gossip::from_endpoint(
            builder.endpoint().clone(),
            Default::default(),
            &addr.info,
        );
        builder = builder.accept(iroh_gossip::ALPN, Arc::new(gossip.clone()));

        // add iroh blobs
        let blobs = iroh_blobs::net_protocol::Blobs::persistent(path)
            .await?
            .build(&local_pool.handle(), builder.endpoint());
        builder = builder.accept(iroh_blobs::ALPN, blobs.clone());

        // add docs
        let docs = iroh_docs::engine::Engine::spawn(
            builder.endpoint().clone(),
            gossip,
            docs_store,
            blobs.store().clone(),
            blobs.downloader().clone(),
            author_store,
            local_pool.handle().clone(),
        )
        .await?;
        builder = builder.accept(iroh_docs::ALPN, Arc::new(docs.clone()));

        let router = builder.spawn().await?;

        let blobs_client = blobs.client();
        let docs_client = docs.client().clone();

        Ok(Self {
            _local_pool: Arc::new(local_pool),
            router,
            blobs: blobs_client,
            docs: docs_client,
        })
    }

    pub(crate) async fn shutdown(self) -> Result<()> {
        self.router.shutdown().await
    }
}
