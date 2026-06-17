use anyhow::Result;
use futures_util::StreamExt;
use iroh::protocol::Router;
use iroh::{Endpoint, NodeId};
use iroh_gossip::{net::Gossip, proto::TopicId};
use iroh_gossip_discovery::{GossipDiscoveryBuilder, Node};
use reqwest::Client;
use std::str::FromStr;
use std::sync::Arc;
use tokio::time::{sleep, Duration};
use tracing::error;

#[tokio::main]
async fn main() -> Result<()> {
    // Initialize tracing with immediate output
    tracing_subscriber::fmt()
        .with_target(false)
        .with_thread_ids(false)
        .with_line_number(false)
        .with_file(false)
        .compact()
        .with_env_filter(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "iroh_gossip_discovery=info".into()),
        )
        .init();

    let name = std::env::args().nth(1).expect("No name passed as arg!");
    
    let endpoint = Endpoint::builder()
        .discovery_n0()
        .discovery_local_network()
        .bind()
        .await?;

    let node_id = endpoint.node_id();
    eprintln!("Our Node ID is: {}", node_id);

    let (tx, mut rx) = tokio::sync::mpsc::channel::<String>(1);

    let blos_server = tokio::spawn(async move {
        let client = Client::new();

        loop {
            match client.get("http://localhost:4949/whoami").send().await {
                Ok(resp) => {
                    // Try to read the body as text
                    match resp.text().await {
                        Ok(body) => {
                            // Send the body over the channel
                            if tx.send(body).await.is_err() {
                                eprintln!("Receiver dropped, stopping task.");
                            }
                            break; // exit loop on success
                        }
                        Err(e) => {
                            eprintln!("Failed to read response text: {} – retrying in 5s...", e);
                        }
                    }
                }
                Err(err) => {
                    eprintln!("Request error: {} – retrying in 5s...", err);
                }
            }
            sleep(Duration::from_secs(5)).await;
        }
    });

    let mut discovery_stream = endpoint.discovery_stream();

    let seed_node_id = loop {
        tokio::select! {
            res = discovery_stream.next() => {
                if let Some(res) = res {
                    match res {
                        Ok(node) => {
                            eprintln!("Discovered Node: {}", node.node_id());
                            blos_server.abort();
                            break node.node_id();
                        }
                        Err(e) => {
                            eprintln!("got error {e}");
                        }
                    }
                }
            }
            res = rx.recv() => {
                if let Some(id_str) = res {
                    let id = NodeId::from_str(&id_str)?;
                    break id;
                }
            }
        }
    };

    let gossip = Gossip::builder().spawn(endpoint.clone()).await?;

    // Set up the router with gossip ALPN
    let _router = Router::builder(endpoint.clone())
        .accept(iroh_gossip::ALPN, gossip.clone())
        .spawn();

    let topic_id = TopicId::from([0u8; 32]);

    let (mut sender, mut receiver) = GossipDiscoveryBuilder::new()
        .with_expiration_timeout(Duration::from_secs(60))
        .build_with_peers(gossip, topic_id, vec![seed_node_id], &endpoint)
        .await?;

    let node = Node {
        name: name.clone(),
        node_id,
        count: 0,
    };

    // Get reference to neighbor map for periodic display
    let neighbor_map = Arc::clone(&receiver.neighbor_map);

    // Start receiver task
    let receiver_handle = tokio::spawn(async move {
        if let Err(e) = receiver.update_map().await {
            error!(%e, "Receiver error");
        }
    });

    // Start sender task
    let sender_node = node.clone();
    let sender_handle = tokio::spawn(async move {
        if let Err(e) = sender.gossip(sender_node, Duration::from_secs(2)).await {
            error!(%e, "Sender error");
        }
    });

    // Display address book periodically
    let display_handle = tokio::spawn(async move {
        let mut last_count = 0;
        loop {
            sleep(Duration::from_secs(5)).await;

            let neighbors: Vec<_> = neighbor_map
                .iter()
                .map(|entry| (entry.key().clone(), entry.value().node_id))
                .collect();

            let current_count = neighbors.len();
            if current_count != last_count || current_count == 0 {
                eprintln!("\n📚 Address Book Update:");
                eprintln!("   Self: {} ({})", &name, node.node_id);

                if neighbors.is_empty() {
                    eprintln!("   👥 No peers discovered yet...");
                } else {
                    eprintln!("   👥 Discovered peers ({}):", neighbors.len());
                    for (peer_name, id) in &neighbors {
                        eprintln!("      • {} ({})", peer_name, id);
                    }
                }
                last_count = current_count;
            }
        }
    });

    // Keep running
    eprintln!("\n🚀 Discovery system running... Press Ctrl+C to exit\n");

    // Wait for Ctrl+C
    tokio::signal::ctrl_c().await?;

    eprintln!("\n🛑 Shutting down...");
    receiver_handle.abort();
    sender_handle.abort();
    display_handle.abort();

    Ok(())
}