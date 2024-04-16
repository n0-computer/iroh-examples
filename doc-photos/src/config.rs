use std::path::PathBuf;

use anyhow::{anyhow, Result};
use std::net::SocketAddr;

#[derive(Debug, Clone)]
pub struct Config {
    /// Address on which the HTTP server is bound.
    pub listen_addr: SocketAddr,
    /// The port on which iroh provider is bound.
    pub provider_port: u16,
}

impl Config {
    pub fn new() -> Config {
        let listen_addr: SocketAddr = std::env::var("IROH_IPFS_LISTEN_ADDR")
            .unwrap_or_else(|_| "127.0.0.1:8003".to_string())
            .parse()
            .expect("listen address is invalid");

        let provider_address = std::env::var("IROH_IPFS_PROVIDER_PORT")
            .map_or(Ok(4433), |s| s.parse())
            .expect("provider address is invalid");

        Config {
            listen_addr,
            provider_port: provider_address,
        }
    }
}

impl Default for Config {
    fn default() -> Self {
        Self::new()
    }
}

const DOC_PHOTOS_DIR: &str = "iroh-ipfs";

pub fn doc_photos_data_dir() -> Result<PathBuf> {
    if let Some(val) = std::env::var_os("DOC_PHOTOS_DIR") {
        return Ok(PathBuf::from(val));
    }
    let path = dirs_next::data_dir().ok_or_else(|| {
        anyhow!("operating environment provides no directory for application data")
    })?;
    Ok(path.join(DOC_PHOTOS_DIR))
}
