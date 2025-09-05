//! # Iroh-Loro Realtime
//! 
//! A real-time collaborative CRDT synchronization library using Loro and iroh P2P networking.
//! 
//! This library provides the foundation for building collaborative applications with:
//! - Real-time document synchronization
//! - Presence awareness (cursors, selections, typing indicators)
//! - Conflict resolution
//! - Offline support with automatic reconnection
//! - P2P networking without central servers
//! 
//! ## Quick Start
//! 
//! ```rust,no_run
//! use iroh_loro_realtime::{RealtimeLoroProtocol, DocumentEvent};
//! use loro::LoroDoc;
//! use tokio::sync::broadcast;
//! 
//! #[tokio::main]
//! async fn main() -> anyhow::Result<()> {
//!     let doc = LoroDoc::new();
//!     let (update_tx, _) = broadcast::channel(100);
//!     let (presence_tx, _) = broadcast::channel(100);
//!     
//!     let protocol = RealtimeLoroProtocol::new(doc, update_tx, presence_tx).await?;
//!     
//!     // Start listening for connections
//!     protocol.start_server("127.0.0.1:0").await?;
//!     
//!     Ok(())
//! }
//! ```

pub mod protocol;
pub mod presence;
pub mod conflict;
pub mod connection;
pub mod events;
pub mod tui;

pub use protocol::RealtimeLoroProtocol;
pub use presence::{PresenceManager, PresenceInfo, CursorPosition, Selection};
pub use conflict::{ConflictResolver, ConflictResolution};
pub use events::{DocumentEvent, PresenceEvent, ProtocolMessage};
pub use connection::{ConnectionManager, PeerConnection};

/// Re-export commonly used types
pub use loro::{LoroDoc, VersionVector};
pub use iroh::NodeId;
