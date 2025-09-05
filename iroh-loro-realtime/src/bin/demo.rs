use std::sync::Arc;
use anyhow::Result;
use clap::Parser;
use tokio::sync::broadcast;
use tracing::{info, warn};
use iroh::{Endpoint, NodeId};
use loro::LoroDoc;
use iroh_loro_realtime::{
    RealtimeLoroProtocol,
    presence::UserInfo,
    events::{DocumentEvent, PresenceEvent},
};

#[derive(Parser, Debug)]
#[command(name = "realtime-demo")]
#[command(about = "Real-time collaborative Loro document demo")]
struct Args {
    /// Connect to this peer
    #[arg(long)]
    connect: Option<NodeId>,
    
    /// User name for this session
    #[arg(long, default_value = "Anonymous")]
    name: String,
    
    /// User color (hex)
    #[arg(long, default_value = "#4ECDC4")]
    color: String,
    
    /// Enable verbose logging
    #[arg(short, long)]
    verbose: bool,
}

#[tokio::main]
async fn main() -> Result<()> {
    let args = Args::parse();
    
    // Initialize logging
    let log_level = if args.verbose { "debug" } else { "info" };
    tracing_subscriber::fmt()
        .with_env_filter(format!("iroh_loro_realtime={},demo={}", log_level, log_level))
        .init();

    info!("Starting real-time Loro collaboration demo");

    // Create iroh endpoint
    let endpoint = Endpoint::builder()
        .discovery_n0()
        .spawn()
        .await?;
    
    let local_node_id = endpoint.node_id();
    info!("Local node ID: {}", local_node_id);

    // Create Loro document
    let mut doc = LoroDoc::new();
    
    // Initialize with some sample content
    let text = doc.get_text("main");
    text.insert(0, "Welcome to collaborative editing!\nStart typing to see real-time sync.\n\n")?;
    
    info!("Document initialized with sample content");

    // Create event channels
    let (update_tx, mut update_rx) = broadcast::channel(100);
    let (presence_tx, mut presence_rx) = broadcast::channel(100);

    // Create user info
    let user_info = UserInfo {
        name: args.name.clone(),
        color: args.color,
        avatar_url: None,
    };

    // Create protocol
    let protocol = RealtimeLoroProtocol::new(
        doc,
        local_node_id,
        user_info,
        update_tx,
        presence_tx,
    ).await?;

    // Register protocol with endpoint
    let mut router = iroh::protocol::Router::builder(endpoint.clone());
    router.accept(RealtimeLoroProtocol::ALPN, protocol.clone());
    let _router = router.spawn().await?;

    info!("Protocol registered and listening for connections");

    // Connect to peer if specified
    if let Some(peer_id) = args.connect {
        info!("Connecting to peer: {}", peer_id);
        match endpoint.connect(peer_id, RealtimeLoroProtocol::ALPN).await {
            Ok(conn) => {
                info!("Connected to peer successfully");
                protocol.connect_to_peer(peer_id, conn).await?;
            }
            Err(e) => {
                warn!("Failed to connect to peer: {}", e);
            }
        }
    }

    // Start event monitoring
    tokio::spawn(async move {
        loop {
            tokio::select! {
                Ok(event) = update_rx.recv() => {
                    match event {
                        DocumentEvent::Updated { from_peer, .. } => {
                            info!("Document updated by peer: {}", from_peer);
                        }
                        DocumentEvent::PeerJoined { peer_id, user_info } => {
                            info!("Peer joined: {} ({})", user_info.name, peer_id);
                        }
                        DocumentEvent::PeerLeft { peer_id } => {
                            info!("Peer left: {}", peer_id);
                        }
                        DocumentEvent::SyncCompleted { peer_id, operations_applied } => {
                            info!("Sync completed with {}: {} operations", peer_id, operations_applied);
                        }
                        _ => {}
                    }
                }
                Ok(event) = presence_rx.recv() => {
                    match event {
                        PresenceEvent::CursorMoved { user_id, position } => {
                            if let Some(pos) = position {
                                info!("User {} cursor at {}:{}", user_id, pos.line, pos.column);
                            }
                        }
                        PresenceEvent::UserJoined { user_id, user_info } => {
                            info!("User joined: {} ({})", user_info.name, user_id);
                        }
                        PresenceEvent::UserLeft { user_id } => {
                            info!("User left: {}", user_id);
                        }
                        _ => {}
                    }
                }
            }
        }
    });

    // Interactive demo loop
    println!("\n=== Real-time Loro Collaboration Demo ===");
    println!("Node ID: {}", local_node_id);
    println!("User: {} ({})", args.name, args.color);
    println!("\nCommands:");
    println!("  add <key> <value>  - Add key-value pair");
    println!("  get <key>          - Get value for key");
    println!("  list               - List all key-value pairs");
    println!("  text <content>     - Add text to document");
    println!("  show               - Show current document content");
    println!("  stats              - Show connection statistics");
    println!("  quit               - Exit the demo");
    println!();

    let stdin = std::io::stdin();
    loop {
        print!("> ");
        use std::io::Write;
        std::io::stdout().flush()?;

        let mut input = String::new();
        stdin.read_line(&mut input)?;
        let input = input.trim();

        if input.is_empty() {
            continue;
        }

        let parts: Vec<&str> = input.split_whitespace().collect();
        match parts.get(0) {
            Some(&"add") if parts.len() >= 3 => {
                let key = parts[1];
                let value = parts[2..].join(" ");
                
                protocol.apply_local_change(|doc| {
                    let map = doc.get_map("kv");
                    map.insert(key, value.clone())?;
                    Ok(())
                }).await?;
                
                println!("Added: {} = {}", key, value);
            }
            Some(&"get") if parts.len() >= 2 => {
                let key = parts[1];
                let doc = protocol.get_document().await;
                let map = doc.get_map("kv");
                
                if let Some(value) = map.get(key) {
                    println!("{} = {}", key, value);
                } else {
                    println!("Key '{}' not found", key);
                }
            }
            Some(&"list") => {
                let doc = protocol.get_document().await;
                let map = doc.get_map("kv");
                
                println!("Key-value pairs:");
                for (key, value) in map.iter() {
                    println!("  {} = {}", key, value);
                }
            }
            Some(&"text") if parts.len() >= 2 => {
                let content = parts[1..].join(" ");
                
                protocol.apply_local_change(|doc| {
                    let text = doc.get_text("main");
                    let current_len = text.len();
                    text.insert(current_len, &format!("\n{}", content))?;
                    Ok(())
                }).await?;
                
                println!("Added text: {}", content);
            }
            Some(&"show") => {
                let doc = protocol.get_document().await;
                let text = doc.get_text("main");
                println!("Document content:\n{}", text.to_string());
            }
            Some(&"stats") => {
                let stats = protocol.get_connection_stats().await;
                println!("Connection Statistics:");
                println!("  Total peers: {}", stats.total_peers);
                println!("  Connected peers: {}", stats.connected_peers);
                println!("  Syncing peers: {}", stats.syncing_peers);
                println!("  Unstable peers: {}", stats.unstable_peers);
            }
            Some(&"quit") => {
                println!("Goodbye!");
                break;
            }
            _ => {
                println!("Unknown command. Type 'quit' to exit.");
            }
        }
    }

    Ok(())
}
