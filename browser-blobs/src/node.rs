use anyhow::{anyhow, Result};
use bytes::Bytes;
use iroh::{discovery::static_provider::StaticProvider, protocol::Router, Endpoint, EndpointId};
use iroh_blobs::{
    api::{blobs::BlobStatus, downloader::Downloader, Store},
    ticket::BlobTicket,
    BlobFormat, BlobsProtocol, Hash,
};

#[derive(Debug, Clone)]
pub struct BlobsNode {
    discovery: StaticProvider,
    router: Router,
    pub blobs: Store,
    downloader: Downloader,
}

impl BlobsNode {
    pub async fn spawn() -> Result<Self> {
        let discovery = StaticProvider::default();
        let endpoint = iroh::Endpoint::bind().await?;
        endpoint.discovery().add(discovery.clone());
        let store = iroh_blobs::store::mem::MemStore::default();
        let downloader = Downloader::new(&store, &endpoint);
        let router = Router::builder(endpoint)
            .accept(iroh_blobs::ALPN, BlobsProtocol::new(&store, None))
            .spawn();
        Ok(Self {
            blobs: store.as_ref().clone(),
            router,
            downloader,
            discovery,
        })
    }

    pub fn endpoint_id(&self) -> EndpointId {
        self.router.endpoint().id()
    }

    pub fn endpoint(&self) -> &Endpoint {
        self.router.endpoint()
    }

    pub async fn download(&self, ticket: BlobTicket) -> anyhow::Result<Hash> {
        self.discovery.add_endpoint_info(ticket.addr().clone());
        self.downloader
            .download(ticket.hash_and_format(), [ticket.addr().id])
            .await?;
        Ok(ticket.hash())
    }

    pub async fn import(&self, data: Bytes) -> Result<BlobTicket> {
        let tag = self
            .blobs
            .add_bytes(data)
            .await
            .inspect_err(|err| tracing::warn!(?err, "import failed"))?;
        tracing::info!(?tag, "imported!");
        let ticket = self.ticket(tag.hash, tag.format).await?;
        Ok(ticket)
    }

    pub async fn complete_size(&self, hash: Hash) -> Result<u64> {
        match self.blobs.status(hash).await? {
            BlobStatus::NotFound => Err(anyhow!("not found")),
            BlobStatus::Partial { size: _ } => Err(anyhow!("blob is incomplete")),
            BlobStatus::Complete { size } => Ok(size),
        }
    }

    pub async fn ticket(&self, hash: Hash, format: BlobFormat) -> Result<BlobTicket> {
        self.endpoint().online().await;
        let addr = self.endpoint().addr();
        Ok(BlobTicket::new(addr, hash, format))
    }
}
