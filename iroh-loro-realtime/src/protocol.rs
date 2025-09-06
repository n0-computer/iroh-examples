use std::sync::Arc;
use std::time::Duration;
use tokio::sync::{broadcast, RwLock};
use anyhow::Result;
use loro::LoroDoc;
use iroh::{NodeId, endpoint::{Connection, RecvStream, SendStream}, protocol::{AcceptError, ProtocolHandler}};

use crate::{
    connection::ConnectionManager,
    presence::{PresenceManager, UserInfo},
    conflict::ConflictResolver,
    events::{DocumentEvent, PresenceEvent, ProtocolMessage},
};

/// Real-time collaborative protocol for Loro documents over iroh P2P network
#[derive(Debug, Clone)]
pub struct RealtimeLoroProtocol {
    /// The shared Loro document
    doc: Arc<RwLock<LoroDoc>>,
    
    /// Connection manager for peer lifecycle
    connection_manager: ConnectionManager,
    
    /// Presence manager for user awareness
    presence_manager: PresenceManager,
    
    /// Conflict resolver for handling concurrent edits
    conflict_resolver: ConflictResolver,
    
    /// Event broadcasting channels
    update_tx: broadcast::Sender<DocumentEvent>,
    presence_tx: broadcast::Sender<PresenceEvent>,
    
    /// Local node information
    local_node_id: NodeId,
    local_user_info: UserInfo,
}

impl RealtimeLoroProtocol {
    /// Protocol identifier for iroh
    pub const ALPN: &'static [u8] = b"iroh/loro-realtime/1";

    /// Create a new real-time Loro protocol instance
    pub async fn new(
        doc: LoroDoc,
        local_node_id: NodeId,
        local_user_info: UserInfo,
        update_tx: broadcast::Sender<DocumentEvent>,
        presence_tx: broadcast::Sender<PresenceEvent>,
    ) -> Result<Arc<Self>> {
        let connection_manager = ConnectionManager::new(local_node_id, update_tx.clone());
        let presence_manager = PresenceManager::new(local_node_id, local_user_info.clone(), presence_tx.clone());
        let conflict_resolver = ConflictResolver::new();

        let protocol = Arc::new(Self {
            doc: Arc::new(RwLock::new(doc)),
            connection_manager,
            presence_manager,
            conflict_resolver,
            update_tx,
            presence_tx,
            local_node_id,
            local_user_info,
        });

        // Start background tasks
        protocol.start_background_tasks().await?;

        Ok(protocol)
    }

    /// Start background maintenance tasks
    async fn start_background_tasks(&self) -> Result<()> {
        // Start heartbeat monitoring
        self.connection_manager.start_heartbeat_monitor().await?;

        // Start presence cleanup task
        let presence_manager = self.presence_manager.clone();
        tokio::spawn(async move {
            let mut interval = tokio::time::interval(Duration::from_secs(60));
            loop {
                interval.tick().await;
                presence_manager.cleanup_stale_presence(Duration::from_secs(300)).await;
            }
        });

        // Start conflict cleanup task
        let conflict_resolver = self.conflict_resolver.clone();
        tokio::spawn(async move {
            let mut interval = tokio::time::interval(Duration::from_secs(300));
            loop {
                interval.tick().await;
                conflict_resolver.cleanup_old_conflicts(Duration::from_secs(3600)).await;
            }
        });

        Ok(())
    }

    /// Connect to a remote peer and initiate sync
    pub async fn add_peer(&self, peer_id: NodeId, connection: Connection) -> Result<()> {
        // Add peer to connection manager
        self.connection_manager.add_peer(peer_id, connection.clone()).await?;

        // Start sync process
        self.initiate_sync(peer_id, connection).await?;

        Ok(())
    }

    /// Initiate synchronization with a peer
    async fn initiate_sync(&self, peer_id: NodeId, conn: Connection) -> Result<()> {
        let (mut send, mut recv) = conn.open_bi().await?;

        // Get current document state
        let doc = self.doc.read().await;
        let our_version = doc.oplog_vv();

        // Send sync request
        let sync_request = ProtocolMessage::SyncRequest {
            our_version: our_version.clone(),
        };
        self.send_message(&mut send, sync_request).await?;

        // Receive their version and determine what to sync
        let their_message = self.receive_message(&mut recv).await?;
        
        match their_message {
            ProtocolMessage::SyncRequest { our_version: their_version } => {
                // Send incremental updates since their version
                let updates = doc.export(loro::ExportMode::Updates {
                    from: std::borrow::Cow::Borrowed(&their_version)
                })?;

                let response = ProtocolMessage::SyncResponse {
                    updates,
                    full_snapshot: false,
                };
                self.send_message(&mut send, response).await?;

                // Update peer version
                self.connection_manager.update_peer_version(peer_id, their_version).await;
            }
            _ => {
                anyhow::bail!("Unexpected message during sync initiation");
            }
        }

        // Notify sync completion
        let event = DocumentEvent::SyncCompleted {
            peer_id,
            operations_applied: 0, // TODO: count actual operations
        };
        let _ = self.update_tx.send(event);

        Ok(())
    }

    /// Handle incoming sync from a peer
    async fn handle_peer_message(&self, peer_id: NodeId, conn: Connection) -> Result<()> {
        let (mut send, mut recv) = conn.accept_bi().await?;

        // Receive their sync request
        let their_message = self.receive_message(&mut recv).await?;

        match their_message {
            ProtocolMessage::SyncRequest { our_version: their_version } => {
                let doc = self.doc.write().await;
                let our_version = doc.oplog_vv();

                // Send our version back
                let sync_request = ProtocolMessage::SyncRequest {
                    our_version: our_version.clone(),
                };
                self.send_message(&mut send, sync_request).await?;

                // Receive their updates
                let their_response = self.receive_message(&mut recv).await?;
                
                if let ProtocolMessage::SyncResponse { updates, .. } = their_response {
                    if !updates.is_empty() {
                        // Apply their updates
                        doc.import(&updates)?;
                        
                        // Update peer version
                        self.connection_manager.update_peer_version(peer_id, their_version).await;

                        // Notify of update
                        let event = DocumentEvent::Updated {
                            from_peer: peer_id,
                            changes: vec![], // TODO: extract actual changes
                        };
                        let _ = self.update_tx.send(event);
                    }
                }
            }
            _ => {
                anyhow::bail!("Unexpected message during sync handling");
            }
        }

        Ok(())
    }

    /// Broadcast an update to all connected peers
    pub async fn broadcast_update(&self, _operation_type: &str) -> Result<()> {
        let doc = self.doc.read().await;
        let peers = self.connection_manager.get_connected_peers().await;

        for peer_id in peers {
            if let Some(peer) = self.connection_manager.get_peer(peer_id).await {
                // Get incremental updates since peer's last known version
                let updates = doc.export(loro::ExportMode::Updates {
                    from: std::borrow::Cow::Borrowed(&peer.version_vector)
                })?;

                if !updates.is_empty() {
                    let message = ProtocolMessage::UpdateBatch {
                        updates,
                        from_version: peer.version_vector.clone(),
                        to_version: doc.oplog_vv(),
                    };

                    self.connection_manager.send_to_peer(peer_id, message).await?;
                }
            }
        }

        Ok(())
    }

    /// Handle incoming update from a peer
    pub async fn handle_protocol_message(&self, from_peer: NodeId, message: ProtocolMessage) -> Result<()> {
        match message {
            ProtocolMessage::UpdateBatch { updates, to_version, .. } => {
                let doc = self.doc.write().await;
                
                // Apply updates
                doc.import(&updates)?;
                
                // Update peer's version vector
                self.connection_manager.update_peer_version(from_peer, to_version).await;
                
                // Notify local subscribers
                let event = DocumentEvent::Updated {
                    from_peer,
                    changes: vec![], // TODO: extract actual changes
                };
                let _ = self.update_tx.send(event);
            }
            ProtocolMessage::PresenceUpdate { .. } => {
                self.presence_manager.handle_remote_presence(from_peer, message).await;
            }
            ProtocolMessage::Heartbeat => {
                self.connection_manager.handle_heartbeat(from_peer).await;
            }
            ProtocolMessage::UserJoined { user_info } => {
                self.presence_manager.add_user(from_peer, user_info).await;
            }
            ProtocolMessage::UserLeft { user_id } => {
                self.presence_manager.remove_user(user_id).await;
                self.connection_manager.remove_peer(user_id).await?;
            }
            _ => {
                // Handle other message types as needed
            }
        }

        Ok(())
    }

    /// Send a protocol message over a stream
    async fn send_message(
        &self,
        send: &mut SendStream,
        message: ProtocolMessage,
    ) -> Result<()> {
        let serialized = bincode::serialize(&message)?;
        
        // Send length prefix
        send.write_all(&(serialized.len() as u64).to_le_bytes()).await?;
        // Send message
        send.write_all(&serialized).await?;
        
        Ok(())
    }

    /// Receive a protocol message from a stream
    async fn receive_message(
        &self,
        recv: &mut RecvStream,
    ) -> Result<ProtocolMessage> {
        // Read length prefix
        let mut len_bytes = [0u8; 8];
        recv.read_exact(&mut len_bytes).await?;
        let len = u64::from_le_bytes(len_bytes) as usize;

        // Read message
        let mut buffer = vec![0u8; len];
        recv.read_exact(&mut buffer).await?;

        let message = bincode::deserialize(&buffer)?;
        Ok(message)
    }

    /// Get a copy of the current document
    pub async fn get_document(&self) -> LoroDoc {
        let doc = self.doc.read().await;
        doc.fork()
    }

    /// Apply a local change to the document
    pub async fn apply_local_change<F>(&self, change_fn: F) -> Result<()>
    where
        F: FnOnce(&mut LoroDoc) -> Result<()>,
    {
        {
            let mut doc = self.doc.write().await;
            change_fn(&mut doc)?;
        }

        // Broadcast the change to peers
        self.broadcast_update("local_change").await?;

        Ok(())
    }

    /// Get presence manager for cursor/selection updates
    pub fn presence_manager(&self) -> &PresenceManager {
        &self.presence_manager
    }

    /// Get conflict resolver for handling conflicts
    pub fn conflict_resolver(&self) -> &ConflictResolver {
        &self.conflict_resolver
    }

    /// Get connection statistics
    pub async fn get_connection_stats(&self) -> crate::connection::ConnectionStats {
        self.connection_manager.get_stats().await
    }
}

impl ProtocolHandler for RealtimeLoroProtocol {
    async fn accept(&self, conn: Connection) -> Result<(), AcceptError> {
        let remote_node_id = conn.remote_node_id();
        
        // Add the peer connection
        let remote_node_id = remote_node_id?;
        if let Err(e) = self.connection_manager.add_peer(remote_node_id, conn.clone()).await {
            tracing::error!("Failed to add peer {}: {}", remote_node_id, e);
            return Err(AcceptError::from_err(std::io::Error::new(std::io::ErrorKind::Other, e)));
        }

        // Handle the sync request
        if let Err(e) = self.handle_peer_message(remote_node_id, conn).await {
            tracing::error!("Failed to handle sync request from {}: {}", remote_node_id, e);
            return Err(AcceptError::from_err(std::io::Error::new(std::io::ErrorKind::Other, e)));
        }

        Ok(())
    }
}
