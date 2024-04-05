use std::{fmt, str::FromStr};

use anyhow::{bail, Result};
use iroh_net::{ticket::NodeTicket, NodeAddr};
use serde::{Deserialize, Serialize};
use url::Url;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct CastUrl {
    node: NodeTicket,
    broadcast_name: String,
}

impl fmt::Display for CastUrl {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.to_iroh_url())
    }
}

impl CastUrl {
    pub fn new(node: NodeAddr, broadcast_name: String) -> Result<Self> {
        let node = NodeTicket::new(node)?;
        Ok(Self {
            node,
            broadcast_name,
        })
    }
    pub fn to_iroh_url(&self) -> Url {
        Url::parse(&format!("iroh:{}/{}", self.node, self.broadcast_name))
            .expect("URL construction not to fail")
    }

    pub fn to_fake_https_url(&self) -> Url {
        Url::parse(&format!(
            "https://{}.iroh/{}",
            self.node_addr().node_id,
            self.broadcast_name
        ))
        .expect("URL construction not to fail")
    }

    pub fn node_addr(&self) -> &NodeAddr {
        self.node.node_addr()
    }

    // pub fn broadcast_name(&self) -> &str {
    //     self.broadcast_name.as_str()
    // }
}

impl FromStr for CastUrl {
    type Err = anyhow::Error;
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let url = Url::parse(s)?;
        if url.scheme() != "iroh" {
            bail!("Invalid URL: Expected iroh: scheme")
        };
        let mut parts = url.path().split("/");
        let (Some(node), Some(broadcast_name), None) = (parts.next(), parts.next(), parts.next())
        else {
            bail!("Invalid URL: Expected two path segments")
        };
        let node = NodeTicket::from_str(node)?;
        Ok(Self {
            node,
            broadcast_name: broadcast_name.to_string(),
        })
    }
}
