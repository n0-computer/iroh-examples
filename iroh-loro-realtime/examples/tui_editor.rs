use anyhow::Result;
use clap::Parser;
use tokio::sync::broadcast;
use tracing::info;
use iroh::{Endpoint, NodeId};
use loro::LoroDoc;
use iroh_loro_realtime::{
    RealtimeLoroProtocol,
    presence::UserInfo,
    tui::TuiEditor,
};

#[derive(Parser, Debug)]
#[command(name = "tui-editor")]
#[command(about = "Collaborative TUI text editor using Loro and iroh")]
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
    let _log_level = if args.verbose { "debug" } else { "info" };
    tracing_subscriber::fmt().init();

    info!("Starting collaborative TUI editor");

    // Create iroh endpoint
    let endpoint = Endpoint::builder()
        .discovery_n0()
        .bind()
        .await?;
    
    let local_node_id = endpoint.node_id();
    info!("Local node ID: {}", local_node_id);

    // Create Loro document
    let doc = LoroDoc::new();
    
    // Initialize with welcome message
    let text = doc.get_text("main");
    text.insert(0, "Welcome to collaborative editing!\nStart typing to see real-time synchronization with other users.\n\nPress Esc to exit.\n\n")?;
    
    info!("Document initialized");

    // Create event channels
    let (update_tx, _update_rx) = broadcast::channel(100);
    let (presence_tx, _presence_rx) = broadcast::channel(100);

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
    let _router = iroh::protocol::Router::builder(endpoint.clone())
        .accept(RealtimeLoroProtocol::ALPN, protocol.clone())
        .spawn();

    info!("Protocol registered and listening for connections");

    // Connect to peer if specified
    if let Some(peer_id) = args.connect {
        info!("Connecting to peer: {}", peer_id);
        match endpoint.connect(peer_id, RealtimeLoroProtocol::ALPN).await {
            Ok(conn) => {
                info!("Connected to peer successfully");
                protocol.add_peer(peer_id, conn).await?;
            }
            Err(e) => {
                eprintln!("Failed to connect to peer: {}", e);
                std::process::exit(1);
            }
        }
    }

    // Create and run TUI editor
    let mut editor = TuiEditor::new(protocol);
    editor.run().await?;

    info!("TUI editor exited");
    Ok(())
}
