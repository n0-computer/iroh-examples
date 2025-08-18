use std::path::PathBuf;

use anyhow::{Context, Result};
use iroh::SecretKey;
use iroh::protocol::Router;
use iroh_blobs::{ALPN as BLOBS_ALPN, BlobsProtocol, api::blobs::Blobs, store::fs::FsStore};
use iroh_docs::{ALPN as DOCS_ALPN, protocol::Docs};
use iroh_gossip::{ALPN as GOSSIP_ALPN, net::Gossip};
use tokio::io::AsyncWriteExt;

#[derive(Clone, Debug)]
pub(crate) struct Iroh {
    #[allow(dead_code)]
    router: Router,
    store: FsStore,
    docs: Docs,
}

impl Iroh {
    pub async fn new(path: PathBuf) -> Result<Self> {
        // create dir if it doesn't already exist
        tokio::fs::create_dir_all(&path).await?;

        let key = load_secret_key(path.clone().join("keypair")).await?;

        // create endpoint
        let endpoint = iroh::Endpoint::builder()
            .discovery_n0()
            .secret_key(key)
            .bind()
            .await?;

        // add iroh gossip
        let gossip = Gossip::builder().spawn(endpoint.clone());

        let blobs = FsStore::load(&path).await?;

        // add docs
        let docs = Docs::persistent(path)
            .spawn(endpoint.clone(), (*blobs).clone(), gossip.clone())
            .await?;

        // build the protocol router
        let builder = iroh::protocol::Router::builder(endpoint.clone());

        let router = builder
            .accept(
                BLOBS_ALPN,
                BlobsProtocol::new(&blobs, endpoint.clone(), None),
            )
            .accept(GOSSIP_ALPN, gossip)
            .accept(DOCS_ALPN, docs.clone())
            .spawn();

        Ok(Self {
            router,
            docs,
            store: blobs,
        })
    }

    pub fn blobs(&self) -> &Blobs {
        self.store.blobs()
    }

    pub fn docs(&self) -> &Docs {
        &self.docs
    }

    #[allow(dead_code)]
    pub(crate) async fn shutdown(self) -> Result<()> {
        self.router.shutdown().await?;
        Ok(())
    }
}

pub async fn load_secret_key(key_path: PathBuf) -> Result<SecretKey> {
    if key_path.exists() {
        let key_bytes = tokio::fs::read(key_path).await?;

        let secret_key = SecretKey::try_from(&key_bytes[0..32])?;
        Ok(secret_key)
    } else {
        let secret_key = SecretKey::generate(rand::rngs::OsRng);

        // Try to canonicalize if possible
        let key_path = key_path.canonicalize().unwrap_or(key_path);
        let key_path_parent = key_path.parent().ok_or_else(|| {
            anyhow::anyhow!("no parent directory found for '{}'", key_path.display())
        })?;
        tokio::fs::create_dir_all(&key_path_parent).await?;

        // write to tempfile
        let (file, temp_file_path) = tempfile::NamedTempFile::new_in(key_path_parent)
            .context("unable to create tempfile")?
            .into_parts();
        let mut file = tokio::fs::File::from_std(file);
        file.write_all(&secret_key.to_bytes())
            .await
            .context("unable to write keyfile")?;
        file.flush().await?;
        drop(file);

        // move file
        tokio::fs::rename(temp_file_path, key_path)
            .await
            .context("failed to rename keyfile")?;

        Ok(secret_key)
    }
}
