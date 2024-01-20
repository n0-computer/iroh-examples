//! Discovery services
//!
//! Originally copied and adapted from <https://github.com/dvc94ch/p2p/blob/master/src/discovery.rs>
use std::{net::IpAddr, str::FromStr};

use anyhow::{Context, Result};
use ed25519_dalek::SigningKey;
use futures::{future, future::BoxFuture, FutureExt};
use iroh::{
    base::ticket::Ticket,
    net::{key::SecretKey, magicsock::Discovery, AddrInfo, NodeAddr},
    ticket::NodeTicket,
};
use mainline::{common::MutableItem, dht::DhtSettings};
use pkarr::{
    dns::{
        rdata::{RData, A, AAAA, TXT},
        Name, Packet, ResourceRecord, CLASS,
    },
    Keypair, SignedPacket,
};
use url::Url;

use crate::NodeId;

const IROH_TICKET_KEY: &str = "_ticket.iroh.";
#[derive(Debug, Clone)]
pub struct PkarrDiscovery {
    keypair: SecretKey,
    pkarr_client: pkarr::PkarrClient,
}

impl PkarrDiscovery {
    pub fn new(keypair: SecretKey) -> Self {
        let pkarr_client = pkarr::PkarrClient::new();
        Self {
            keypair,
            pkarr_client,
        }
    }
}

fn node_addr_to_packet(secret: SecretKey, addr: NodeAddr, ttl: u32) -> Result<SignedPacket> {
    let mut packet = Packet::new_reply(0);
    let ticket = NodeTicket::new(addr)?;
    let ticket = ticket.to_string();
    packet.answers.push(ResourceRecord::new(
        Name::new(IROH_TICKET_KEY).unwrap(),
        CLASS::IN,
        ttl,
        RData::TXT(TXT::new().with_string(&ticket)?),
    ));
    let keypair = Keypair::from_secret_key(&secret.to_bytes());
    let signed_packet = SignedPacket::from_packet(&keypair, &packet)?;
    Ok(signed_packet)
}

#[allow(unused)]
fn filter_ipaddr(rr: &ResourceRecord) -> Option<IpAddr> {
    if rr.class != CLASS::IN {
        return None;
    }
    let addr: IpAddr = match rr.rdata {
        RData::A(A { address }) => IpAddr::V4(address.into()),
        RData::AAAA(AAAA { address }) => IpAddr::V6(address.into()),
        _ => return None,
    };
    Some(addr)
}

fn filter_txt(rr: &ResourceRecord) -> Option<String> {
    if rr.class != CLASS::IN {
        return None;
    }
    if let RData::TXT(txt) = &rr.rdata {
        String::try_from(txt.clone()).ok()
    } else {
        None
    }
}

fn filter_ticket(rr: &ResourceRecord) -> Option<NodeTicket> {
    let txt = filter_txt(rr)?;
    NodeTicket::from_str(&txt).ok()
}

fn packet_to_node_addr(packet: &SignedPacket) -> anyhow::Result<NodeAddr> {
    packet
        .resource_records(IROH_TICKET_KEY)
        .find_map(filter_ticket)
        .map(|ticket| ticket.node_addr().clone())
        .context("No ticket found in packet")
}

impl Discovery for PkarrDiscovery {
    fn publish(&self, info: &AddrInfo) {
        let Ok(signed_packet) = node_addr_to_packet(
            self.keypair.clone(),
            NodeAddr {
                node_id: self.keypair.public(),
                info: info.clone(),
            },
            60,
        ) else {
            return;
        };
        let pkarr_client = self.pkarr_client.clone();

        tokio::spawn(async move {
            let res = pkarr_client.publish(&signed_packet).await;
            match res {
                Ok(x) => {
                    println!("published to pkarr: {:?}", x);
                }
                Err(cause) => {
                    tracing::warn!("error publishing to pkarr: {}", cause);
                }
            }
        });
    }

    fn resolve<'a>(&'a self, node_id: &'a iroh::net::NodeId) -> BoxFuture<'a, Result<AddrInfo>> {
        let pkarr_client = self.pkarr_client.clone();
        let node_id_bytes = *node_id.as_bytes();
        tokio::spawn(async move {
            let public_key = pkarr::PublicKey::try_from(node_id_bytes)?;
            let signed_packet = pkarr_client
                .resolve(public_key)
                .await
                .context("not found")?;
            let addr: NodeAddr = packet_to_node_addr(&signed_packet)?;
            Ok(addr.info)
        })
        .map(|res| match res {
            Ok(res) => res,
            Err(cause) => Err(cause.into()),
        })
        .boxed()
    }
}

#[derive(Debug, Clone)]
pub struct MainlineDiscovery {
    mainline_client: mainline::async_dht::AsyncDht,
    keypair: SecretKey,
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
