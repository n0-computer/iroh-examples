use serde::{Deserialize, Serialize};
use loro::VersionVector;
use iroh::NodeId;
use crate::presence::{CursorPosition, Selection, UserInfo};

/// Protocol messages exchanged between peers
#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum ProtocolMessage {
    /// Document synchronization messages
    UpdateBatch {
        updates: Vec<u8>,
        from_version: VersionVector,
        to_version: VersionVector,
    },
    
    /// Initial synchronization
    SyncRequest {
        our_version: VersionVector,
    },
    SyncResponse {
        updates: Vec<u8>,
        full_snapshot: bool,
    },
    
    /// Real-time presence updates
    PresenceUpdate {
        user_id: NodeId,
        cursor: Option<CursorPosition>,
        selection: Option<Selection>,
        typing: bool,
    },
    
    /// Connection management
    Heartbeat,
    UserJoined { user_info: UserInfo },
    UserLeft { user_id: NodeId },
    
    /// Conflict resolution
    ConflictNotification {
        conflict_id: String,
        conflicting_ops: Vec<ConflictingOperation>,
    },
}

/// Events emitted by the document for local subscribers
#[derive(Debug, Clone)]
pub enum DocumentEvent {
    /// Document was updated by a remote peer
    Updated {
        #[allow(dead_code)]
        from_peer: NodeId,
        #[allow(dead_code)]
        changes: Vec<DocumentChange>,
    },
    
    /// A peer joined the collaboration session
    PeerJoined {
        #[allow(dead_code)]
        peer_id: NodeId,
        #[allow(dead_code)]
        user_info: UserInfo,
    },
    
    /// A peer left the collaboration session
    PeerLeft {
        #[allow(dead_code)]
        peer_id: NodeId,
    },
    
    /// Sync completed with a peer
    #[allow(dead_code)]
    SyncCompleted {
        peer_id: NodeId,
        operations_applied: usize,
        sync_time: u64,
    },
    
}

/// Events related to user presence
#[derive(Debug, Clone)]
pub enum PresenceEvent {
    /// User cursor moved
    CursorMoved {
        #[allow(dead_code)]
        user_id: NodeId,
        #[allow(dead_code)]
        position: Option<CursorPosition>,
    },
    
    /// User selection changed
    SelectionChanged {
        #[allow(dead_code)]
        user_id: NodeId,
        #[allow(dead_code)]
        selection: Option<Selection>,
    },
    
    /// User typing indicator changed
    TypingChanged {
        #[allow(dead_code)]
        user_id: NodeId,
        #[allow(dead_code)]
        typing: bool,
    },
    
    /// User joined the session
    UserJoined {
        #[allow(dead_code)]
        user_id: NodeId,
        #[allow(dead_code)]
        user_info: UserInfo,
    },
    
    /// User left the session
    UserLeft {
        #[allow(dead_code)]
        user_id: NodeId,
    },
}

/// Represents a change made to the document
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DocumentChange {
    pub container_id: String,
    pub change_type: ChangeType,
    pub position: usize,
    pub content: Option<String>,
    pub author: NodeId,
    pub timestamp: u64,
}

/// Types of changes that can be made to a document
#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum ChangeType {
    TextInsert,
    TextDelete,
    MapSet,
    MapDelete,
    ListInsert,
    ListDelete,
    ListMove,
}

/// Represents a conflicting operation for conflict resolution
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ConflictingOperation {
    pub operation_id: String,
    pub author: NodeId,
    pub timestamp: u64,
    pub operation_type: String,
    pub affected_range: TextRange,
    pub content: String,
}

/// Represents a range of text
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TextRange {
    pub start: usize,
    pub end: usize,
    pub container_id: String,
}

impl ConflictingOperation {
    /// Check if this is a simple text insertion/deletion
    #[allow(dead_code)]
    pub fn is_simple(&self) -> bool {
        // Simple heuristic: conflicts in different ranges or simple insertions
        matches!(self.operation_type.as_str(), "insert" | "format")
    }
}
