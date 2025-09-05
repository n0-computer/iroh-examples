use std::collections::HashMap;
use std::sync::Arc;
use std::time::SystemTime;
use serde::{Deserialize, Serialize};
use tokio::sync::{mpsc, RwLock};
use uuid::Uuid;
use crate::events::{ConflictingOperation, TextRange};

/// Manages conflict detection and resolution for concurrent edits
#[derive(Debug, Clone)]
pub struct ConflictResolver {
    /// Pending conflicts awaiting resolution
    pending_conflicts: Arc<RwLock<HashMap<String, ConflictInfo>>>,
    
    /// Channel for sending conflict resolutions
    resolution_tx: mpsc::Sender<ConflictResolution>,
    
    /// Channel for receiving conflict resolutions
    resolution_rx: Arc<RwLock<Option<mpsc::Receiver<ConflictResolution>>>>,
}

/// Information about a detected conflict
#[derive(Debug, Clone)]
pub struct ConflictInfo {
    pub operations: Vec<ConflictingOperation>,
    pub affected_range: TextRange,
    pub timestamp: SystemTime,
    pub conflict_type: ConflictType,
}

/// Types of conflicts that can occur
#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum ConflictType {
    /// Two users edited the same text range
    OverlappingEdit,
    
    /// Simultaneous insertions at the same position
    SimultaneousInsert,
    
    /// One user deleted text while another edited it
    EditDelete,
    
    /// Complex multi-operation conflict
    Complex,
}

/// Result of conflict resolution
#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum ConflictResolution {
    /// Conflict was automatically merged using CRDT rules
    AutoMerged,
    
    /// User chose to accept local changes
    AcceptLocal,
    
    /// User chose to accept remote changes
    AcceptRemote,
    
    /// User provided custom resolution
    Custom { resolved_content: String },
    
    /// Conflict requires user input
    RequiresUserInput { conflict_id: String },
}

/// A text operation that can conflict with others
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TextOperation {
    pub id: String,
    pub author: iroh::NodeId,
    pub timestamp: u64,
    pub operation_type: TextOperationType,
    pub position: usize,
    pub content: String,
    pub container_id: String,
}

/// Types of text operations
#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum TextOperationType {
    Insert,
    Delete,
    Replace,
    Format,
}

impl ConflictResolver {
    /// Create a new conflict resolver
    pub fn new() -> Self {
        let (resolution_tx, resolution_rx) = mpsc::channel(100);
        
        Self {
            pending_conflicts: Arc::new(RwLock::new(HashMap::new())),
            resolution_tx,
            resolution_rx: Arc::new(RwLock::new(Some(resolution_rx))),
        }
    }

    /// Detect conflicts between local and remote operations
    pub async fn detect_conflicts(
        &self,
        local_ops: &[TextOperation],
        remote_ops: &[TextOperation],
    ) -> anyhow::Result<Vec<ConflictingOperation>> {
        let mut conflicts = Vec::new();

        for local_op in local_ops {
            for remote_op in remote_ops {
                if let Some(conflict) = self.check_operation_conflict(local_op, remote_op) {
                    conflicts.push(conflict);
                }
            }
        }

        Ok(conflicts)
    }

    /// Check if two operations conflict with each other
    fn check_operation_conflict(
        &self,
        local_op: &TextOperation,
        remote_op: &TextOperation,
    ) -> Option<ConflictingOperation> {
        // Only check operations in the same container
        if local_op.container_id != remote_op.container_id {
            return None;
        }

        // Check for overlapping ranges
        let local_range = self.get_operation_range(local_op);
        let remote_range = self.get_operation_range(remote_op);

        if self.ranges_overlap(&local_range, &remote_range) {
            Some(ConflictingOperation {
                operation_id: remote_op.id.clone(),
                author: remote_op.author,
                timestamp: remote_op.timestamp,
                operation_type: format!("{:?}", remote_op.operation_type),
                affected_range: remote_range,
                content: remote_op.content.clone(),
            })
        } else {
            None
        }
    }

    /// Get the text range affected by an operation
    fn get_operation_range(&self, op: &TextOperation) -> TextRange {
        let end = match op.operation_type {
            TextOperationType::Insert => op.position,
            TextOperationType::Delete => op.position + op.content.len(),
            TextOperationType::Replace => op.position + op.content.len(),
            TextOperationType::Format => op.position + op.content.len(),
        };

        TextRange {
            start: op.position,
            end,
            container_id: op.container_id.clone(),
        }
    }

    /// Check if two text ranges overlap
    fn ranges_overlap(&self, range1: &TextRange, range2: &TextRange) -> bool {
        range1.container_id == range2.container_id &&
        !(range1.end <= range2.start || range2.end <= range1.start)
    }

    /// Handle concurrent edits and determine resolution strategy
    pub async fn handle_concurrent_edits(
        &self,
        local_ops: &[TextOperation],
        remote_ops: &[TextOperation],
    ) -> anyhow::Result<ConflictResolution> {
        let conflicts = self.detect_conflicts(local_ops, remote_ops).await?;

        if conflicts.is_empty() {
            return Ok(ConflictResolution::AutoMerged);
        }

        // Analyze conflict complexity
        let conflict_type = self.analyze_conflict_type(&conflicts);
        
        match conflict_type {
            ConflictType::SimultaneousInsert => {
                // Simple insertions can usually be auto-merged
                Ok(ConflictResolution::AutoMerged)
            }
            ConflictType::OverlappingEdit | ConflictType::EditDelete => {
                // These require user input
                let conflict_id = Uuid::new_v4().to_string();
                self.store_conflict(conflict_id.clone(), conflicts, conflict_type).await?;
                Ok(ConflictResolution::RequiresUserInput { conflict_id })
            }
            ConflictType::Complex => {
                // Complex conflicts always require user input
                let conflict_id = Uuid::new_v4().to_string();
                self.store_conflict(conflict_id.clone(), conflicts, conflict_type).await?;
                Ok(ConflictResolution::RequiresUserInput { conflict_id })
            }
        }
    }

    /// Analyze the type of conflict based on operations
    fn analyze_conflict_type(&self, conflicts: &[ConflictingOperation]) -> ConflictType {
        if conflicts.len() == 1 {
            match conflicts[0].operation_type.as_str() {
                "Insert" => ConflictType::SimultaneousInsert,
                "Delete" => ConflictType::EditDelete,
                _ => ConflictType::OverlappingEdit,
            }
        } else {
            ConflictType::Complex
        }
    }

    /// Store a conflict for later resolution
    async fn store_conflict(
        &self,
        conflict_id: String,
        conflicts: Vec<ConflictingOperation>,
        conflict_type: ConflictType,
    ) -> anyhow::Result<()> {
        let affected_range = self.calculate_affected_range(&conflicts);
        
        let conflict_info = ConflictInfo {
            operations: conflicts,
            affected_range,
            timestamp: SystemTime::now(),
            conflict_type,
        };

        let mut pending = self.pending_conflicts.write().await;
        pending.insert(conflict_id, conflict_info);

        Ok(())
    }

    /// Calculate the overall range affected by a set of conflicts
    fn calculate_affected_range(&self, conflicts: &[ConflictingOperation]) -> TextRange {
        if conflicts.is_empty() {
            return TextRange {
                start: 0,
                end: 0,
                container_id: String::new(),
            };
        }

        let first = &conflicts[0];
        let mut min_start = first.affected_range.start;
        let mut max_end = first.affected_range.end;
        let container_id = first.affected_range.container_id.clone();

        for conflict in conflicts.iter().skip(1) {
            min_start = min_start.min(conflict.affected_range.start);
            max_end = max_end.max(conflict.affected_range.end);
        }

        TextRange {
            start: min_start,
            end: max_end,
            container_id,
        }
    }

    /// Resolve a conflict with user input
    pub async fn resolve_conflict(
        &self,
        conflict_id: &str,
        resolution: ConflictResolution,
    ) -> anyhow::Result<()> {
        // Remove from pending conflicts
        let mut pending = self.pending_conflicts.write().await;
        pending.remove(conflict_id);

        // Send resolution
        self.resolution_tx.send(resolution).await?;

        Ok(())
    }

    /// Get information about a pending conflict
    pub async fn get_conflict_info(&self, conflict_id: &str) -> Option<ConflictInfo> {
        let pending = self.pending_conflicts.read().await;
        pending.get(conflict_id).cloned()
    }

    /// Get all pending conflicts
    pub async fn get_pending_conflicts(&self) -> HashMap<String, ConflictInfo> {
        self.pending_conflicts.read().await.clone()
    }

    /// Take the resolution receiver (can only be called once)
    pub async fn take_resolution_receiver(&self) -> Option<mpsc::Receiver<ConflictResolution>> {
        self.resolution_rx.write().await.take()
    }

    /// Clean up old conflicts that haven't been resolved
    pub async fn cleanup_old_conflicts(&self, max_age: std::time::Duration) {
        let mut pending = self.pending_conflicts.write().await;
        let now = SystemTime::now();

        pending.retain(|_, conflict| {
            now.duration_since(conflict.timestamp).unwrap_or_default() < max_age
        });
    }
}

impl Default for ConflictResolver {
    fn default() -> Self {
        Self::new()
    }
}

impl TextOperation {
    /// Create a new text insert operation
    pub fn insert(
        author: iroh::NodeId,
        position: usize,
        content: String,
        container_id: String,
    ) -> Self {
        Self {
            id: Uuid::new_v4().to_string(),
            author,
            timestamp: SystemTime::now()
                .duration_since(SystemTime::UNIX_EPOCH)
                .unwrap()
                .as_millis() as u64,
            operation_type: TextOperationType::Insert,
            position,
            content,
            container_id,
        }
    }

    /// Create a new text delete operation
    pub fn delete(
        author: iroh::NodeId,
        position: usize,
        content: String,
        container_id: String,
    ) -> Self {
        Self {
            id: Uuid::new_v4().to_string(),
            author,
            timestamp: SystemTime::now()
                .duration_since(SystemTime::UNIX_EPOCH)
                .unwrap()
                .as_millis() as u64,
            operation_type: TextOperationType::Delete,
            position,
            content,
            container_id,
        }
    }
}
