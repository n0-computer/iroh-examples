use std::path::PathBuf;

use anyhow::{anyhow, Result};
use std::net::SocketAddr;

#[derive(Debug, Clone)]
pub struct Config {
    /// Address on which the HTTP server is bound.
    pub listen_addr: SocketAddr,
    /// The address on which iroh provider is bound.
    pub provider_address: SocketAddr,
    /// URL for the kubo RPC HTTP API
    pub kubo_url: String,
}

impl Config {
    pub fn new() -> Config {
        let listen_addr: SocketAddr = std::env::var("IROH_IPFS_LISTEN_ADDR")
            .unwrap_or_else(|_| "127.0.0.1:8002".to_string())
            .parse()
            .expect("listen address is invalid");

        let provider_address = std::env::var("IROH_IPFS_PROVIDER_ADDRESS")
            .unwrap_or_else(|_| "127.0.0.1:4433".to_string())
            .parse()
            .expect("provider address is invalid");

        let kubo_url = std::env::var("IROH_IPFS_KUBO_URL")
            .unwrap_or_else(|_| "http://127.0.0.1:5001".to_string());

        Config {
            listen_addr,
            provider_address,
            kubo_url,
        }
    }
}

impl Default for Config {
    fn default() -> Self {
        Self::new()
    }
}

const IROH_IPFS_DIR: &str = "iroh-ipfs";

pub fn iroh_ipfs_data_dir() -> Result<PathBuf> {
    if let Some(val) = std::env::var_os("IROH_IPFS_DATA_DIR") {
        return Ok(PathBuf::from(val));
    }
    let path = dirs_next::data_dir().ok_or_else(|| {
        anyhow!("operating environment provides no directory for application data")
    })?;
    Ok(path.join(IROH_IPFS_DIR))
}
