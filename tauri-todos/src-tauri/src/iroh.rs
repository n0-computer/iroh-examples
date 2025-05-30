use std::{path::PathBuf, sync::Arc};

use anyhow::Result;
use iroh::protocol::Router;
use quic_rpc::transport::flume::FlumeConnector;

pub(crate) type BlobsClient = iroh_blobs::rpc::client::blobs::Client<
    FlumeConnector<iroh_blobs::rpc::proto::Response, iroh_blobs::rpc::proto::Request>,
>;
pub(crate) type DocsClient = iroh_docs::rpc::client::docs::Client<
    FlumeConnector<iroh_docs::rpc::proto::Response, iroh_docs::rpc::proto::Request>,
>;

#[derive(Clone, Debug)]
pub(crate) struct Iroh {
    #[allow(dead_code)]
    router: Router,
    pub(crate) blobs: BlobsClient,
    pub(crate) docs: DocsClient,
}

impl Iroh {
    pub async fn new(path: PathBuf) -> Result<Self> {
        // create dir if it doesn't already exist
        tokio::fs::create_dir_all(&path).await?;

        let key = iroh_blobs::util::fs::load_secret_key(path.clone().join("keypair")).await?;

        // create endpoint
        let endpoint = iroh::Endpoint::builder()
            .discovery_n0()
            .secret_key(key)
            .bind()
            .await?;

        // build the protocol router
        let mut builder = iroh::protocol::Router::builder(endpoint);

        // add iroh gossip
        let gossip = iroh_gossip::net::Gossip::builder()
            .spawn(builder.endpoint().clone())
            .await?;
        builder = builder.accept(iroh_gossip::ALPN, Arc::new(gossip.clone()));

        // add iroh blobs
        let blobs = iroh_blobs::net_protocol::Blobs::persistent(&path)
            .await?
            .build(builder.endpoint());
        builder = builder.accept(iroh_blobs::ALPN, blobs.clone());

        // add docs
        let docs = iroh_docs::protocol::Docs::persistent(path)
            .spawn(&blobs, &gossip)
            .await?;
        builder = builder.accept(iroh_docs::ALPN, Arc::new(docs.clone()));

        let router = builder.spawn();

        let blobs_client = blobs.client().clone();
        let docs_client = docs.client().clone();

        Ok(Self {
            router,
            blobs: blobs_client,
            docs: docs_client,
        })
    }

    #[allow(dead_code)]
    pub(crate) async fn shutdown(self) -> Result<()> {
        self.router.shutdown().await
    }
}
