use chrono;
use iroh::node_info::NodeData;
use iroh::{NodeId, TransportMode};
use n0_future::StreamExt;
use std::collections::BTreeSet;
use std::env;
use std::str::FromStr;
use std::time::Duration;
use tokio::time;
use webrtc_chat::node2::{AcceptEvent, ConnectEvent, EchoNode};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let args: Vec<String> = env::args().collect();

    if args.len() < 2 {
        println!("Usage: {} <node1|node2> [target_node_id]", args[0]);
        println!("");
        println!("Run two terminals:");
        println!("Terminal 1: {} node1", args[0]);
        println!("Terminal 2: {} node2 <node1_id_from_terminal1>", args[0]);
        return Ok(());
    }

    let node_type = &args[1];
    let node = EchoNode::spawn(TransportMode::UdpRelay).await?;
    let my_id = node.endpoint().node_id();

    println!("Started {} with ID: {}", node_type, my_id);

    // Always subscribe to discoveries
    if let Some(mut stream) = node.subscribe() {
        tokio::spawn(async move {
            while let Some(item) = stream.next().await {
                println!("DISCOVERED: {} from {}", item.node_id(), item.provenance());
            }
        });
    }

    // Subscribe to accept events to monitor incoming connections
    let mut accept_stream = node.accept_events();
    tokio::spawn(async move {
        while let Some(event) = accept_stream.next().await {
            match event {
                AcceptEvent::Accepted { node_id } => {
                    println!("✓ Connection accepted from: {}", node_id);
                }
                AcceptEvent::Echoed {
                    node_id,
                    bytes_sent,
                } => {
                    println!("✓ Echoed {} bytes back to: {}", bytes_sent, node_id);
                }
                AcceptEvent::Closed { node_id, error } => {
                    if let Some(err) = error {
                        println!("✗ Connection closed with {}: {}", node_id, err);
                    } else {
                        println!("✓ Connection closed cleanly with: {}", node_id);
                    }
                }
                AcceptEvent::StreamData {
                    bytes_received,
                    node_id,
                } => {
                    println!("📡 Received {} bytes from: {}", bytes_received, node_id);
                }
            }
        }
    });

    match node_type.as_str() {
        "node1" => {
            println!("Node1 ready! Copy this ID and run:");
            println!("Terminal 2: {} node2 {}", args[0], my_id);
            println!("Waiting for connections...");

            // Publish node data for discovery
            let node_data = NodeData::new(None, BTreeSet::new());
            node.publish(node_data);
            println!("Published node info for discovery");

            // Just wait and monitor
            loop {
                time::sleep(Duration::from_secs(10)).await;
                println!("Node1 still running and listening...");
            }
        }
        "node2" => {
            if args.len() < 3 {
                println!("Error: node2 needs target node ID");
                println!("Usage: {} node2 <target_node_id>", args[0]);
                return Ok(());
            }

            let target_id_str = &args[2];
            let target_node_id = NodeId::from_str(target_id_str)
                .map_err(|e| anyhow::anyhow!("Invalid node ID: {}", e))?;

            println!("Node2 attempting to connect to: {}", target_node_id);

            // Publish our node info for discovery
            let node_data = NodeData::new(None, BTreeSet::new());
            node.publish(node_data);

            // Wait a moment for discovery to propagate
            time::sleep(Duration::from_secs(2)).await;

            println!("Starting persistent connection...");

            // Use the persistent connection method instead!
            let mut connect_stream = node.connect_persistent(target_node_id);

            println!("Monitoring persistent connection events...");
            while let Some(event) = connect_stream.next().await {
                match event {
                    ConnectEvent::Connected => {
                        println!("✓ Persistent connection established!");
                    }
                    ConnectEvent::Sent { bytes_sent } => {
                        println!("📤 Sent {} bytes to target", bytes_sent);
                    }
                    ConnectEvent::Received { bytes_received } => {
                        println!("📥 Received {} bytes back (echo)", bytes_received);
                    }
                    ConnectEvent::Closed { error } => {
                        if let Some(err) = error {
                            println!("✗ Persistent connection closed with error: {}", err);
                        } else {
                            println!("✓ Persistent connection closed successfully");
                        }
                        break;
                    }
                    ConnectEvent::KeepAlive => {
                        println!("💓 Keeping connection alive");
                    }
                }
            }

            println!("Persistent connection session ended.");
        }
        _ => {
            println!("Invalid node type. Use 'node1' or 'node2'");
        }
    }

    Ok(())
}
