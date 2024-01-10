//! Discovery services
//!
//! Originally copied and adapted from <https://github.com/dvc94ch/p2p/blob/master/src/discovery.rs>
use anyhow::Result;
use ed25519_dalek::SigningKey;
use futures::{future, future::BoxFuture, FutureExt};
use iroh::{
    base::ticket::Ticket,
    net::{key::SecretKey, magicsock::Discovery, AddrInfo, NodeAddr},
};
use mainline::{common::MutableItem, dht::DhtSettings};
use url::Url;

use crate::NodeId;

#[derive(Debug, Clone)]
pub struct MainlineDiscovery {
    mainline_client: mainline::async_dht::AsyncDht,
    keypair: iroh::net::key::SecretKey,
}

impl MainlineDiscovery {
    pub fn new(keypair: SecretKey) -> Self {
        let mainline_client = mainline::Dht::new(DhtSettings::default()).as_async();
        Self {
            mainline_client,
            keypair,
        }
    }
}

impl Discovery for MainlineDiscovery {
    fn publish(&self, info: &AddrInfo) {
        let Ok(ticket) = iroh::net::ticket::NodeTicket::new(NodeAddr {
            node_id: self.keypair.public(),
            info: info.clone(),
        }) else {
            return;
        };
        let ticket = ticket.to_bytes().into();
        let signing_key = SigningKey::from(self.keypair.to_bytes());
        let item = MutableItem::new(signing_key, ticket, 0, None);
        let mainline_client = self.mainline_client.clone();
        tokio::spawn(async move {
            let res = mainline_client.put_mutable(item).await;
            match res {
                Ok(x) => {
                    println!("published to mainline: {:?}", x);
                }
                Err(cause) => {
                    tracing::warn!("error publishing to mainline: {}", cause);
                }
            }
        });
    }

    fn resolve<'a>(&'a self, node_id: &'a iroh::net::NodeId) -> BoxFuture<'a, Result<AddrInfo>> {
        let public_key = *node_id.clone().as_bytes();
        let mainline_client = self.mainline_client.clone();
        tokio::spawn(async move {
            let mut response = mainline_client.get_mutable(&public_key, None).await;
            while let Some(item) = response.next_async().await {
                let Ok(ticket) = iroh::net::ticket::NodeTicket::from_bytes(item.item.value())
                else {
                    continue;
                };
                return Ok(ticket.node_addr().info.clone());
            }
            Err(anyhow::anyhow!("not found"))
        })
        .map(|res| match res {
            Ok(res) => res,
            Err(cause) => Err(cause.into()),
        })
        .boxed()
    }
}

/// A discovery method that just uses a hardcoded region.
#[derive(Debug)]
pub struct HardcodedDerperDiscovery {
    derp_url: Url,
}

impl HardcodedDerperDiscovery {
    /// Create a new discovery method that always returns the given region.
    pub fn new(derp_url: Url) -> Self {
        Self { derp_url }
    }
}

impl iroh::net::magicsock::Discovery for HardcodedDerperDiscovery {
    fn publish(&self, _info: &AddrInfo) {}

    fn resolve<'a>(&'a self, _node_id: &'a NodeId) -> BoxFuture<'a, Result<AddrInfo>> {
        future::ok(AddrInfo {
            derp_url: Some(self.derp_url.clone()),
            direct_addresses: Default::default(),
        })
        .boxed()
    }
}
