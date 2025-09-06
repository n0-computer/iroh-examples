# Real-Time Collaborative Text Editor

A Google Docs-style collaborative text editor built with Rust, using Loro CRDTs for conflict-free synchronization and iroh for P2P networking.

## Features

- **Real-time collaboration**: Multiple users can edit the same document simultaneously
- **Conflict-free synchronization**: Uses Loro CRDTs to handle concurrent edits
- **User presence indicators**: See other users' cursors and activity (colored indicators)
- **P2P networking**: Direct peer-to-peer connections with relay fallback
- **Terminal UI**: Beautiful text-based interface using ratatui

## Usage

### Start the first instance (Alice)
```bash
cargo run --example collaborative-editor --features tui -- --name "Alice" --color "blue"
```

### Connect a second instance (Bob)
```bash
# Use Alice's Node ID from her terminal output
cargo run --example collaborative-editor --features tui -- --name "Bob" --color "red" --connect <ALICE_NODE_ID>
```

### Controls

- **Type normally**: Just start typing to edit the document
- **Arrow keys**: Move cursor left/right
- **Backspace**: Delete characters
- **Enter**: Insert new lines
- **Ctrl+Q**: Quit the editor

## Interface Layout

```
┌─ Header ─────────────────────────────────────────┐
│ Collaborative Text Editor - Press Ctrl+Q to quit │
└───────────────────────────────────────────────────┘
┌─ Document ───────────────────────────────────────┐
│ Welcome to the collaborative editor!             │
│ Start typing to see real-time collaboration.     │
│                                                   │
│ │ ← User cursors shown as colored bars            │
└───────────────────────────────────────────────────┘
┌─ Status ─────────────────────────────────────────┐
│ Status: Ready | Cursor: 45 | Users: 2 | 1.2s ago │
└───────────────────────────────────────────────────┘
┌─ Connected Users ────────────────────────────────┐
│ Alice (09da9660...b46) - cursor at 45            │
│ Bob (cfc4f826...fa1) - cursor at 78              │
└───────────────────────────────────────────────────┘
```

## How It Works

1. **Document Synchronization**: Uses Loro's text CRDT to maintain a shared document state
2. **Real-time Updates**: Changes are immediately broadcast to all connected peers
3. **Conflict Resolution**: Concurrent edits are automatically merged without conflicts
4. **Presence Awareness**: User cursors and activity are shared between peers
5. **P2P Networking**: Direct connections when possible, relay fallback for NAT traversal

## Technical Details

- **CRDT**: Loro provides conflict-free replicated data types
- **Networking**: iroh handles P2P connections and message routing
- **UI**: ratatui provides the terminal-based interface
- **Async**: Built on Tokio for high-performance async I/O

## Examples

Try these scenarios:
1. Start two instances and type simultaneously
2. Move cursors around and see real-time position updates
3. Test with multiple users (3+ instances)
4. Disconnect and reconnect to test sync recovery
