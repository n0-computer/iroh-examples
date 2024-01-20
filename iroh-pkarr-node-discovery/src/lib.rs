//! # Pkarr based node discovery for iroh-net
//!
//! Node discovery is being able to find connecting information about an iroh node based on just its node id.
//!
//! This crate implements a discovery mechanism for iroh-net based on https://https://pkarr.org/.
//!
//! TLDR: Each node publishes its address to the mainline DHT as a DNS packet, signed with its private key.
//! The DNS packet contains the node's direct addresses and optionally a DERP URL.
use std::{
    collections::BTreeSet,
    net::SocketAddr,
    sync::{Arc, Mutex},
    time::Duration,
};

use anyhow::Context;
use futures::{future::BoxFuture, FutureExt};
use iroh_net::{
    key::SecretKey, magicsock::Discovery, util::AbortingJoinHandle, AddrInfo, NodeAddr, NodeId,
};
use pkarr::{
    dns::rdata::{RData, TXT},
    dns::{Name, Packet, ResourceRecord, CLASS},
    url::Url,
    Keypair, PkarrClient, SignedPacket,
};

/// The key for the DERP URL TXT record.
const DERP_URL_KEY: &str = "_derp_url.iroh.";
/// Republish delay for the DHT. This is only for when the info does not change.
/// If the info changes, it will be published immediately.
const REPUBLISH_DELAY: Duration = Duration::from_secs(60 * 60);
/// Initial publish delay. This is to avoid spamming the DHT when there are
/// frequent network changes at startup.
const INITIAL_PUBLISH_DELAY: Duration = Duration::from_millis(500);

/// A discovery mechanism for iroh-net based on https://https://pkarr.org/
///
/// TLDR: it stores node addresses in DNS records, signed by the node's private key,
/// and publishes them to the bittorrent mainline DHT.
///
/// Calling publish will start a background task that periodically publishes the node address.
#[derive(Debug, Clone)]
pub struct PkarrNodeDiscovery(Arc<Inner>);

#[derive(Debug)]
struct Inner {
    /// Pkarr client for interacting with the DHT.
    pkarr: PkarrClient,
    /// The background task that periodically publishes the node address.
    /// Due to AbortingJoinHandle, this will be aborted when the discovery is dropped.
    task: Mutex<Option<AbortingJoinHandle<()>>>,
    /// Optional keypair for signing the DNS packets.
    ///
    /// If this is None, the node will not publish its address to the DHT.
    keypair: Option<pkarr::Keypair>,
}

impl PkarrNodeDiscovery {
    /// Create a new discovery mechanism.
    ///
    /// If a secret key is provided, the node will publish its address to the DHT.
    /// If no secret key is provided, publish will be a no-op, but resolving other nodes will still work.
    pub fn new(pkarr: PkarrClient, secret_key: Option<&SecretKey>) -> Self {
        let keypair =
            secret_key.map(|secret_key| pkarr::Keypair::from_secret_key(&secret_key.to_bytes()));
        Self(Arc::new(Inner {
            keypair,
            pkarr,
            task: Default::default(),
        }))
    }
}

impl Discovery for PkarrNodeDiscovery {
    fn publish(&self, info: &AddrInfo) {
        tracing::debug!("publishing {:?}", info);
        let Some(keypair) = &self.0.keypair else {
            tracing::debug!("no keypair set, not publishing");
            return;
        };
        let Ok(signed_packet) = node_addr_to_packet(keypair, info, 0) else {
            tracing::warn!("failed to create signed packet");
            return;
        };
        let this = self.clone();
        let curr = tokio::spawn(async move {
            loop {
                // initial delay. If the task gets aborted before this delay is over,
                // we have not published anything to the DHT yet.
                tokio::time::sleep(INITIAL_PUBLISH_DELAY).await;
                // note: the publish fn will be async only when the async feature is selected
                // this will probably change in the next version of pkarr.
                let res = this.0.pkarr.publish(&signed_packet).await;
                match res {
                    Ok(info) => {
                        tracing::debug!(
                            "pkarr publish success. published to {} nodes",
                            info.stored_at().len()
                        );
                        for node in info.stored_at() {
                            tracing::trace!("stored address: {:?}", node);
                        }
                    }
                    Err(e) => {
                        // we could do a smaller delay here, but in general DHT publish
                        // not working is due to a network issue, and if the network changes
                        // the task will be restarted anyway.
                        //
                        // Being unable to publish to the DHT is something that is expected
                        // to happen from time to time, so this does not warrant a error log.
                        tracing::warn!("pkarr publish error: {}", e);
                    }
                }
                tokio::time::sleep(REPUBLISH_DELAY - INITIAL_PUBLISH_DELAY).await;
            }
        });
        let mut task = self.0.task.lock().unwrap();
        *task = Some(curr.into());
    }

    fn resolve<'a>(
        &'a self,
        node_id: &'a NodeId,
    ) -> BoxFuture<'a, anyhow::Result<iroh_net::AddrInfo>> {
        let this = self.clone();
        async move {
            tracing::info!("resolving {}", node_id);
            let Ok(pkarr_public_key) = pkarr::PublicKey::try_from(*node_id.as_bytes()) else {
                tracing::error!("invalid node id");
                anyhow::bail!("invalid node id");
            };
            let packet = this
                .0
                .pkarr
                .resolve(pkarr_public_key)
                .await
                .context("not found")?;
            let addr = packet_to_node_addr(node_id, &packet).context("invalid packet")?;
            tracing::info!("resolved: {} to {:?}", node_id, addr);
            Ok(addr.info)
        }
        .boxed()
    }
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

/// Try to parse a node address from a signed packet.
fn packet_to_node_addr(node_id: &NodeId, packet: &SignedPacket) -> anyhow::Result<NodeAddr> {
    // set of direct addresses, provided that they are all valid socket addresses
    let direct_addresses = packet
        .resource_records("@")
        .filter_map(filter_txt)
        .map(|addr| anyhow::Ok(addr.parse()?))
        .collect::<anyhow::Result<BTreeSet<SocketAddr>>>()?;

    // first DERP URL, if any
    let derp_url = packet
        .resource_records(DERP_URL_KEY)
        .filter_map(filter_txt)
        .map(|url| anyhow::Ok(Url::parse(&url)?))
        .next()
        .transpose()?;
    Ok(NodeAddr {
        node_id: *node_id,
        info: AddrInfo {
            derp_url,
            direct_addresses,
        },
    })
}

/// Create a signed packet from a node address.
fn node_addr_to_packet(
    keypair: &Keypair,
    info: &AddrInfo,
    ttl: u32,
) -> pkarr::Result<SignedPacket> {
    let mut packet = Packet::new_reply(0);
    for addr in &info.direct_addresses {
        let addr = addr.to_string();
        packet.answers.push(ResourceRecord::new(
            Name::new("@").unwrap(),
            CLASS::IN,
            ttl,
            RData::TXT(TXT::try_from(addr.as_str())?.into_owned()),
        ));
    }
    if let Some(url) = &info.derp_url {
        packet.answers.push(ResourceRecord::new(
            Name::new(DERP_URL_KEY).unwrap(),
            CLASS::IN,
            ttl,
            RData::TXT(TXT::try_from(url.as_str())?.into_owned()),
        ));
    }
    SignedPacket::from_packet(keypair, &packet)
}

#[cfg(test)]
mod tests {
    use super::*;
    use proptest::prelude::*;
    use std::net::SocketAddr;

    fn arb_secret_key() -> impl Strategy<Value = iroh_net::key::SecretKey> {
        prop::array::uniform32(any::<u8>())
            .prop_map(|arr| iroh_net::key::SecretKey::from_bytes(&arr))
    }

    fn arb_addr_info() -> impl Strategy<Value = iroh_net::AddrInfo> {
        prop::collection::btree_set(any::<SocketAddr>(), 0..10).prop_map(|direct_addresses| {
            iroh_net::AddrInfo {
                direct_addresses,
                derp_url: None,
            }
        })
    }

    proptest! {
        #[test]
        #[ignore = "equality for ip addrs seems to be broken in rust stdlib"]
        fn socketaddr_eq_is_broken(addr in any::<SocketAddr>()) {
            let txt = format!("{}", addr);
            let parsed = txt.parse::<SocketAddr>().unwrap();
            if addr != parsed {
                println!("addr: {:?}", addr);
                println!("addr: {}", hex::encode(postcard::to_stdvec(&addr).unwrap()));
                println!("addr: {:?}", parsed);
                println!("addr: {}", hex::encode(postcard::to_stdvec(&parsed).unwrap()));
            }
            assert_eq!(addr, parsed);
        }

        #[test]
        fn test_pkarr_roundtrip(info in arb_addr_info(), key in arb_secret_key()) {
            let node_id = key.public();
            let keypair = pkarr::Keypair::from_secret_key(&key.to_bytes());
            let packet = node_addr_to_packet(&keypair, &info, 0).unwrap();
            let addr = crate::packet_to_node_addr(&node_id, &packet).unwrap();
            // compare the serialized bytes, because equality for ip addrs seems to be broken in rust stdlib
            assert_eq!(postcard::to_stdvec(&addr.info).unwrap(), postcard::to_stdvec(&info).unwrap());
        }
    }
}
