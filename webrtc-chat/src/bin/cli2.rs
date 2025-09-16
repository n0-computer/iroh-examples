use anyhow::Result;
use clap::Parser;
use iroh::{NodeId, TransportMode};
use n0_future::StreamExt;
use webrtc_chat::node2::{AcceptEvent, ConnectEvent, EchoNode};

#[derive(Debug, Parser)]
struct Args {
    #[clap(subcommand)]
    command: Command,
}

#[derive(Debug, Parser)]
enum Command {
    Connect { node_id: NodeId, payload: String },
    Accept,
}

#[tokio::main]
async fn main() -> Result<()> {
    // tracing_subscriber::fmt::init();
    let args = Args::parse();
    let node = EchoNode::spawn(TransportMode::WebrtcRelay).await?;
    match args.command {
        Command::Connect { node_id, payload } => {
            let mut events = node.connect_persistent(node_id);
            while let Some(event) = events.next().await {
                match event {
                    ConnectEvent::Connected => {
                        println!("Connection established")
                    }
                    ConnectEvent::Sent { bytes_sent } => {

                        // println!("Sent: {} bytes", bytes_sent);
                    }
                    ConnectEvent::Received { bytes_received } => {
                        // println!("Received: {} bytes", bytes_received);
                    }
                    ConnectEvent::Closed { error } => {
                        println!("Connection closed due to error: {:?}", error);
                    }
                    ConnectEvent::KeepAlive => {
                        println!("Connection keep-alive");
                    }
                }
            }
        }
        Command::Accept => {
            println!("connect to this node:");
            println!(
                "cargo run --bin cli2 connect {} hello-please-echo-back",
                node.endpoint().node_id()
            );
            let mut events = node.accept_events();
            while let Some(event) = events.next().await {
                match event {
                    AcceptEvent::Accepted { node_id } => {
                        println!("Accepted connection {}", node_id);
                    }
                    AcceptEvent::Echoed {
                        node_id,
                        bytes_sent,
                    } => {
                        println!("Echoed: {} bytes", bytes_sent);
                    }
                    AcceptEvent::Closed { error, node_id } => {
                        println!("Connection closed due to error: {:?}", error);
                    }
                    AcceptEvent::StreamData {
                        node_id,
                        bytes_received,
                    } => {
                        // println!("StreamData: {} bytes", bytes_received);
                    }
                }
            }
        }
    }

    Ok(())
}
