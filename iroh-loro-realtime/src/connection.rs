use std::collections::HashMap;
use std::sync::Arc;
use std::time::{Duration, Instant};
use tokio::sync::{broadcast, RwLock};
use iroh::{NodeId, endpoint::Connection};
use loro::VersionVector;
use crate::presence::PresenceInfo;
use crate::events::{DocumentEvent, ProtocolMessage};

/// Manages peer connections and their lifecycle
#[derive(Debug, Clone)]
pub struct ConnectionManager {
    /// Active peer connections
    peers: Arc<RwLock<HashMap<NodeId, PeerConnection>>>,
    
    /// Channel for broadcasting document events
    event_tx: broadcast::Sender<DocumentEvent>,
    
    /// Local node ID
    local_node_id: NodeId,
}

/// Information about a connected peer
#[derive(Debug, Clone)]
pub struct PeerConnection {
    /// The underlying iroh connection
    pub connection: Connection,
    
    /// Last time we heard from this peer
    pub last_seen: Instant,
    
    /// Peer's last known version vector
    pub version_vector: VersionVector,
    
    /// Peer's presence information
    pub presence: Option<PresenceInfo>,
    
    /// Connection state
    pub state: ConnectionState,
    
    /// Number of failed heartbeats
    pub failed_heartbeats: u32,
}

/// State of a peer connection
#[derive(Debug, Clone, PartialEq)]
pub enum ConnectionState {
    /// Connection is being established
    Connecting,
    
    /// Connection is active and healthy
    Connected,
    
    /// Initial sync in progress
    Syncing,
    
    /// Connection is experiencing issues
    Unstable,
    
    /// Connection is being closed
    Disconnecting,
    
    /// Connection is closed
    Disconnected,
}

impl ConnectionManager {
    /// Create a new connection manager
    pub fn new(
        local_node_id: NodeId,
        event_tx: broadcast::Sender<DocumentEvent>,
    ) -> Self {
        Self {
            peers: Arc::new(RwLock::new(HashMap::new())),
            event_tx,
            local_node_id,
        }
    }

    /// Add a new peer connection
    pub async fn add_peer(&self, peer_id: NodeId, connection: Connection) -> anyhow::Result<()> {
        let peer_conn = PeerConnection {
            connection,
            last_seen: Instant::now(),
            version_vector: VersionVector::new(),
            presence: None,
            state: ConnectionState::Connecting,
            failed_heartbeats: 0,
        };

        {
            let mut peers = self.peers.write().await;
            peers.insert(peer_id, peer_conn);
        }

        // Emit peer joined event
        let event = DocumentEvent::PeerJoined {
            peer_id,
            user_info: crate::presence::UserInfo {
                name: format!("User-{}", &peer_id.to_string()[..8]),
                color: self.generate_peer_color(&peer_id),
                avatar_url: None,
            },
        };
        let _ = self.event_tx.send(event);

        Ok(())
    }

    /// Remove a peer connection
    pub async fn remove_peer(&self, peer_id: NodeId) -> anyhow::Result<()> {
        {
            let mut peers = self.peers.write().await;
            if let Some(mut peer) = peers.remove(&peer_id) {
                peer.state = ConnectionState::Disconnected;
                // Close the connection gracefully
                peer.connection.close(0u32.into(), b"session ended");
            }
        }

        // Emit peer left event
        let event = DocumentEvent::PeerLeft { peer_id };
        let _ = self.event_tx.send(event);

        Ok(())
    }

    /// Update peer's version vector
    pub async fn update_peer_version(&self, peer_id: NodeId, version: VersionVector) {
        let mut peers = self.peers.write().await;
        if let Some(peer) = peers.get_mut(&peer_id) {
            peer.version_vector = version;
            peer.last_seen = Instant::now();
            peer.failed_heartbeats = 0;
            
            if peer.state == ConnectionState::Syncing {
                peer.state = ConnectionState::Connected;
            }
        }
    }

    /// Update peer's presence information
    pub async fn update_peer_presence(&self, peer_id: NodeId, presence: PresenceInfo) {
        let mut peers = self.peers.write().await;
        if let Some(peer) = peers.get_mut(&peer_id) {
            peer.presence = Some(presence);
            peer.last_seen = Instant::now();
        }
    }

    /// Get all connected peers
    pub async fn get_connected_peers(&self) -> Vec<NodeId> {
        let peers = self.peers.read().await;
        peers
            .iter()
            .filter(|(_, peer)| peer.state == ConnectionState::Connected)
            .map(|(id, _)| *id)
            .collect()
    }

    /// Get peer connection info
    pub async fn get_peer(&self, peer_id: NodeId) -> Option<PeerConnection> {
        let peers = self.peers.read().await;
        peers.get(&peer_id).cloned()
    }

    /// Send a message to a specific peer
    pub async fn send_to_peer(
        &self,
        peer_id: NodeId,
        message: ProtocolMessage,
    ) -> anyhow::Result<()> {
        let peers = self.peers.read().await;
        
        if let Some(peer) = peers.get(&peer_id) {
            if peer.state == ConnectionState::Connected || peer.state == ConnectionState::Syncing {
                let serialized = bincode::serialize(&message)?;
                let (mut send, _) = peer.connection.open_bi().await?;
                
                // Send length prefix
                send.write_all(&(serialized.len() as u64).to_le_bytes()).await?;
                // Send message
                send.write_all(&serialized).await?;
                send.finish()?;
            }
        }

        Ok(())
    }

    /// Broadcast a message to all connected peers
    pub async fn broadcast_message(&self, message: ProtocolMessage) -> anyhow::Result<()> {
        let peers = self.peers.read().await;
        let serialized = bincode::serialize(&message)?;

        for (_peer_id, peer) in peers.iter() {
            if peer.state == ConnectionState::Connected {
                if let Ok((mut send, _)) = peer.connection.open_bi().await {
                    // Send length prefix
                    if send.write_all(&(serialized.len() as u64).to_le_bytes()).await.is_ok() {
                        // Send message
                        let _ = send.write_all(&serialized).await;
                        let _ = send.finish();
                    }
                }
            }
        }

        Ok(())
    }

    /// Start heartbeat monitoring for all peers
    pub async fn start_heartbeat_monitor(&self) -> anyhow::Result<()> {
        let peers = self.peers.clone();
        let event_tx = self.event_tx.clone();
        
        tokio::spawn(async move {
            let mut interval = tokio::time::interval(Duration::from_secs(30));
            
            loop {
                interval.tick().await;
                
                let mut peers_guard = peers.write().await;
                let mut disconnected_peers = Vec::new();
                
                for (peer_id, peer) in peers_guard.iter_mut() {
                    // Check if peer has been silent too long
                    if peer.last_seen.elapsed() > Duration::from_secs(90) {
                        peer.failed_heartbeats += 1;
                        
                        if peer.failed_heartbeats >= 3 {
                            peer.state = ConnectionState::Disconnected;
                            disconnected_peers.push(*peer_id);
                            continue;
                        } else {
                            peer.state = ConnectionState::Unstable;
                        }
                    }
                    
                    // Send heartbeat
                    if peer.state == ConnectionState::Connected || peer.state == ConnectionState::Unstable {
                        if let Ok((mut send, _)) = peer.connection.open_bi().await {
                            let heartbeat = ProtocolMessage::Heartbeat;
                            if let Ok(serialized) = bincode::serialize(&heartbeat) {
                                let len_bytes = (serialized.len() as u64).to_le_bytes();
                                if send.write_all(&len_bytes).await.is_ok() {
                                    let _ = send.write_all(&serialized).await;
                                    let _ = send.finish();
                                }
                            }
                        }
                    }
                }
                
                // Clean up disconnected peers
                for peer_id in disconnected_peers {
                    peers_guard.remove(&peer_id);
                    
                    // Emit peer left event
                    let event = DocumentEvent::PeerLeft { peer_id };
                    let _ = event_tx.send(event);
                }
            }
        });

        Ok(())
    }

    /// Handle incoming heartbeat from a peer
    pub async fn handle_heartbeat(&self, peer_id: NodeId) {
        let mut peers = self.peers.write().await;
        if let Some(peer) = peers.get_mut(&peer_id) {
            peer.last_seen = Instant::now();
            peer.failed_heartbeats = 0;
            
            if peer.state == ConnectionState::Unstable {
                peer.state = ConnectionState::Connected;
            }
        }
    }

    /// Get connection statistics
    pub async fn get_stats(&self) -> ConnectionStats {
        let peers = self.peers.read().await;
        
        let mut stats = ConnectionStats {
            total_peers: peers.len(),
            connected_peers: 0,
            syncing_peers: 0,
            unstable_peers: 0,
            average_latency: Duration::from_millis(0),
        };

        for peer in peers.values() {
            match peer.state {
                ConnectionState::Connected => stats.connected_peers += 1,
                ConnectionState::Syncing => stats.syncing_peers += 1,
                ConnectionState::Unstable => stats.unstable_peers += 1,
                _ => {}
            }
        }

        stats
    }

    /// Generate a consistent color for a peer
    fn generate_peer_color(&self, peer_id: &NodeId) -> String {
        let colors = [
            "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7",
            "#DDA0DD", "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E9",
        ];
        
        let hash = peer_id.to_string().chars()
            .fold(0u32, |acc, c| acc.wrapping_mul(31).wrapping_add(c as u32));
        
        colors[(hash as usize) % colors.len()].to_string()
    }
}

/// Statistics about peer connections
#[derive(Debug, Clone)]
pub struct ConnectionStats {
    pub total_peers: usize,
    pub connected_peers: usize,
    pub syncing_peers: usize,
    pub unstable_peers: usize,
    pub average_latency: Duration,
}

impl PeerConnection {
    /// Check if this connection is healthy
    pub fn is_healthy(&self) -> bool {
        matches!(self.state, ConnectionState::Connected | ConnectionState::Syncing) &&
        self.failed_heartbeats < 2 &&
        self.last_seen.elapsed() < Duration::from_secs(60)
    }

    /// Get the age of this connection
    pub fn age(&self) -> Duration {
        self.last_seen.elapsed()
    }
}
