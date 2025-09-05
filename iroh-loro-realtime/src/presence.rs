use std::collections::HashMap;
use std::sync::Arc;
use std::time::{Duration, SystemTime};
use serde::{Deserialize, Serialize};
use tokio::sync::{broadcast, RwLock};
use iroh::NodeId;
use crate::events::{PresenceEvent, ProtocolMessage};

/// Manages user presence information in a collaborative session
#[derive(Debug, Clone)]
pub struct PresenceManager {
    /// Local user's cursor position
    local_cursor: Arc<RwLock<Option<CursorPosition>>>,
    
    /// Remote users' presence information
    remote_presence: Arc<RwLock<HashMap<NodeId, PresenceInfo>>>,
    
    /// Channel for broadcasting presence events
    presence_tx: broadcast::Sender<PresenceEvent>,
    
    /// Local user information
    user_info: UserInfo,
    
    /// User ID for this instance
    user_id: NodeId,
}

/// Information about a user's presence in the document
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PresenceInfo {
    pub user_info: UserInfo,
    pub cursor: Option<CursorPosition>,
    pub selection: Option<Selection>,
    pub typing: bool,
    pub last_activity: SystemTime,
}

/// Represents a cursor position in the document
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct CursorPosition {
    pub line: u32,
    pub column: u32,
    pub container_id: String,
    pub offset: usize, // Character offset in the container
}

/// Represents a text selection
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct Selection {
    pub start: CursorPosition,
    pub end: CursorPosition,
    pub direction: SelectionDirection,
}

/// Direction of text selection
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub enum SelectionDirection {
    Forward,
    Backward,
}

/// Information about a user
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserInfo {
    pub name: String,
    pub color: String, // Hex color for cursor/selection display
    pub avatar_url: Option<String>,
}

impl PresenceManager {
    /// Create a new presence manager
    pub fn new(
        user_id: NodeId,
        user_info: UserInfo,
        presence_tx: broadcast::Sender<PresenceEvent>,
    ) -> Self {
        Self {
            local_cursor: Arc::new(RwLock::new(None)),
            remote_presence: Arc::new(RwLock::new(HashMap::new())),
            presence_tx,
            user_info,
            user_id,
        }
    }

    /// Update local cursor position and broadcast to peers
    pub async fn update_cursor(&self, position: CursorPosition) -> anyhow::Result<()> {
        // Update local state
        *self.local_cursor.write().await = Some(position.clone());

        // Create presence update message
        let message = ProtocolMessage::PresenceUpdate {
            user_id: self.user_id,
            cursor: Some(position.clone()),
            selection: None,
            typing: false,
        };

        // Emit local event
        let event = PresenceEvent::CursorMoved {
            user_id: self.user_id,
            position: Some(position),
        };
        let _ = self.presence_tx.send(event);

        Ok(())
    }

    /// Update local selection and broadcast to peers
    pub async fn update_selection(&self, selection: Option<Selection>) -> anyhow::Result<()> {
        let message = ProtocolMessage::PresenceUpdate {
            user_id: self.user_id,
            cursor: self.local_cursor.read().await.clone(),
            selection: selection.clone(),
            typing: false,
        };

        // Emit local event
        let event = PresenceEvent::SelectionChanged {
            user_id: self.user_id,
            selection,
        };
        let _ = self.presence_tx.send(event);

        Ok(())
    }

    /// Update typing status
    pub async fn set_typing(&self, typing: bool) -> anyhow::Result<()> {
        let message = ProtocolMessage::PresenceUpdate {
            user_id: self.user_id,
            cursor: self.local_cursor.read().await.clone(),
            selection: None,
            typing,
        };

        // Emit local event
        let event = PresenceEvent::TypingChanged {
            user_id: self.user_id,
            typing,
        };
        let _ = self.presence_tx.send(event);

        Ok(())
    }

    /// Handle presence update from a remote peer
    pub async fn handle_remote_presence(&self, from_peer: NodeId, message: ProtocolMessage) {
        if let ProtocolMessage::PresenceUpdate { user_id, cursor, selection, typing } = message {
            let mut presence_map = self.remote_presence.write().await;
            
            let presence = presence_map.entry(from_peer).or_insert_with(|| PresenceInfo {
                user_info: UserInfo {
                    name: format!("User-{}", &user_id.to_string()[..8]),
                    color: self.generate_user_color(&user_id),
                    avatar_url: None,
                },
                cursor: None,
                selection: None,
                typing: false,
                last_activity: SystemTime::now(),
            });

            // Update presence info
            if let Some(cursor_pos) = cursor {
                presence.cursor = Some(cursor_pos.clone());
                
                // Emit cursor moved event
                let event = PresenceEvent::CursorMoved {
                    user_id: from_peer,
                    position: Some(cursor_pos),
                };
                let _ = self.presence_tx.send(event);
            }

            if let Some(sel) = selection {
                presence.selection = Some(sel.clone());
                
                // Emit selection changed event
                let event = PresenceEvent::SelectionChanged {
                    user_id: from_peer,
                    selection: Some(sel),
                };
                let _ = self.presence_tx.send(event);
            }

            presence.typing = typing;
            presence.last_activity = SystemTime::now();

            // Emit typing changed event
            let event = PresenceEvent::TypingChanged {
                user_id: from_peer,
                typing,
            };
            let _ = self.presence_tx.send(event);
        }
    }

    /// Add a new user to the session
    pub async fn add_user(&self, user_id: NodeId, user_info: UserInfo) {
        let mut presence_map = self.remote_presence.write().await;
        
        presence_map.insert(user_id, PresenceInfo {
            user_info: user_info.clone(),
            cursor: None,
            selection: None,
            typing: false,
            last_activity: SystemTime::now(),
        });

        // Emit user joined event
        let event = PresenceEvent::UserJoined { user_id, user_info };
        let _ = self.presence_tx.send(event);
    }

    /// Remove a user from the session
    pub async fn remove_user(&self, user_id: NodeId) {
        let mut presence_map = self.remote_presence.write().await;
        presence_map.remove(&user_id);

        // Emit user left event
        let event = PresenceEvent::UserLeft { user_id };
        let _ = self.presence_tx.send(event);
    }

    /// Get all current remote presence information
    pub async fn get_remote_presence(&self) -> HashMap<NodeId, PresenceInfo> {
        self.remote_presence.read().await.clone()
    }

    /// Get local cursor position
    pub async fn get_local_cursor(&self) -> Option<CursorPosition> {
        self.local_cursor.read().await.clone()
    }

    /// Clean up stale presence information
    pub async fn cleanup_stale_presence(&self, timeout: Duration) {
        let mut presence_map = self.remote_presence.write().await;
        let now = SystemTime::now();
        
        let stale_users: Vec<NodeId> = presence_map
            .iter()
            .filter(|(_, presence)| {
                now.duration_since(presence.last_activity)
                    .unwrap_or(Duration::MAX) > timeout
            })
            .map(|(user_id, _)| *user_id)
            .collect();

        for user_id in stale_users {
            presence_map.remove(&user_id);
            
            // Emit user left event
            let event = PresenceEvent::UserLeft { user_id };
            let _ = self.presence_tx.send(event);
        }
    }

    /// Generate a consistent color for a user based on their ID
    fn generate_user_color(&self, user_id: &NodeId) -> String {
        let colors = [
            "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7",
            "#DDA0DD", "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E9",
        ];
        
        let hash = user_id.to_string().chars()
            .fold(0u32, |acc, c| acc.wrapping_mul(31).wrapping_add(c as u32));
        
        colors[(hash as usize) % colors.len()].to_string()
    }
}

impl CursorPosition {
    /// Create a new cursor position
    pub fn new(line: u32, column: u32, container_id: String, offset: usize) -> Self {
        Self {
            line,
            column,
            container_id,
            offset,
        }
    }

    /// Convert to a simple offset for text operations
    pub fn offset(&self) -> usize {
        self.offset
    }
}

impl Selection {
    /// Create a new selection
    pub fn new(start: CursorPosition, end: CursorPosition) -> Self {
        let direction = if start.offset <= end.offset {
            SelectionDirection::Forward
        } else {
            SelectionDirection::Backward
        };

        Self {
            start,
            end,
            direction,
        }
    }

    /// Get the range of this selection as (start_offset, end_offset)
    pub fn range(&self) -> (usize, usize) {
        match self.direction {
            SelectionDirection::Forward => (self.start.offset, self.end.offset),
            SelectionDirection::Backward => (self.end.offset, self.start.offset),
        }
    }

    /// Check if this selection is empty (cursor only)
    pub fn is_empty(&self) -> bool {
        self.start.offset == self.end.offset
    }
}
