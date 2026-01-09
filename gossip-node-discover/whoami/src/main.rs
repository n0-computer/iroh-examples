use anyhow::Result;
use axum::{routing::get, Router as HttpRouter};
use iroh::protocol::Router;
use iroh::Endpoint;
use iroh_gossip::{net::Gossip, proto::TopicId};
use iroh_gossip_discovery::{GossipDiscoveryBuilder, Node};
use tokio::time::Duration;
use tracing::{error, info};

#[tokio::main]
async fn main() -> Result<()> {
    // Initialize tracing
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

    let endpoint = Endpoint::builder()
        .discovery_n0()
        .discovery_local_network()
        .bind()
        .await?;

    let node_id = endpoint.node_id();
    info!(%node_id, "Whoami server started");

    let gossip = Gossip::builder().spawn(endpoint.clone()).await?;

    // Set up the router with gossip ALPN
    let _router = Router::builder(endpoint.clone())
        .accept(iroh_gossip::ALPN, gossip.clone())
        .spawn();

    let topic_id = TopicId::from([0u8; 32]);

    // Start as the first node with empty peer list - this makes it a seed node
    let (mut sender, mut receiver) = GossipDiscoveryBuilder::new()
        .with_expiration_timeout(Duration::from_secs(60))
        .build_with_peers(gossip, topic_id, vec![], &endpoint)
        .await?;

    let node = Node {
        name: "whoami".to_string(),
        node_id,
        count: 0,
    };

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

    // HTTP server to respond with our NodeId
    let me = node_id;
    let app = HttpRouter::new().route("/whoami", get(move || async move { me.to_string() }));

    info!("HTTP server listening on 0.0.0.0:4949");
    let listener = tokio::net::TcpListener::bind("0.0.0.0:4949").await?;
    
    // Gracefully handle shutdown
    let server_handle = tokio::spawn(async move {
        axum::serve(listener, app).await
    });

    // Wait for Ctrl+C
    tokio::select! {
        _ = tokio::signal::ctrl_c() => {
            info!("Shutdown signal received");
        }
        result = server_handle => {
            if let Err(e) = result {
                error!(%e, "HTTP server error");
            }
        }
    }

    info!("Shutting down whoami server");
    receiver_handle.abort();
    sender_handle.abort();

    Ok(())
}
