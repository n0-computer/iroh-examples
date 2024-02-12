use std::{fmt, str::FromStr};

use anyhow::bail;
use iroh_net::{ticket::NodeTicket, NodeAddr};
use url::Url;

#[derive(Debug, Clone)]
pub struct CastUrl {
    node: NodeTicket,
    broadcast: String,
}

impl fmt::Display for CastUrl {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.to_url())
    }
}

impl CastUrl {
    pub fn new(node_ticket: NodeTicket, broadcast_name: String) -> Self {
        Self {
            node: node_ticket,
            broadcast: broadcast_name,
        }
    }
    pub fn to_url(&self) -> Url {
        Url::parse(&format!("iroh:{}/{}", self.node, self.broadcast))
            .expect("URL construction not to fail")
    }

    pub fn to_fake_https_url(&self) -> Url {
        Url::parse(&format!("https://iroh/{}", self.broadcast))
            .expect("URL construction not to fail")
    }

    pub fn node_addr(&self) -> &NodeAddr {
        self.node.node_addr()
    }

    pub fn broadcast_name(&self) -> &str {
        self.broadcast.as_str()
    }
}
impl From<CastUrl> for Url {
    fn from(value: CastUrl) -> Self {
        value.to_url()
    }
}

impl FromStr for CastUrl {
    type Err = anyhow::Error;
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let url = Url::parse(s)?;
        if url.scheme() != "iroh" {
            bail!("Invalid URL: Expected iroh: scheme")
        };
        let mut parts = url.path().split("/");
        let (Some(node), Some(broadcast), None) = (parts.next(), parts.next(), parts.next()) else {
            bail!("Invalid URL: Expected two path segments")
        };
        let node = NodeTicket::from_str(node)?;
        Ok(Self {
            node,
            broadcast: broadcast.to_string(),
        })
    }
}
