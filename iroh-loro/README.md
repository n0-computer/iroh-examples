# iroh-loro

> Integration of iroh with [Loro](https://loro.dev).

## What is Loro?

Loro is a high‑performance CRDT framework for local‑first apps that keeps state consistent across devices and users, works offline and in real time, automatically merges conflicts and enables undo/redo and time travel.
LoroDoc is the main entry point for almost all Loro functionality. LoroDoc supports several container types:

- Text - For rich text editing
- List - For ordered collections
- Map - For key-value pairs
- Tree - For hierarchical data structures
- MovableList - For lists with movable items

## What does this example do?

This example highlights how to integrate [Loro's sync protocol] with [iroh's peer-to-peer connectivity].
It is a A peer-to-peer **plain text** file synchronization system that showcases the power of combining **Iroh's P2P networking** with **Loro's CRDT technology** for seamless real-time collaboration.

> **⚠️ Important**: This implementation is specifically designed for **plain text only** (using Loro's `LoroText` container). It does **not** support rich text formatting.

### Try It Out!
To run this example, please open a terminal, clone the examples repository using `git clone https://github.com/n0-computer/iroh-examples`
and enter the `iroh-loro` directory using `cd iroh-loro`.

1. **Start the host peer:**
   ```bash
   cargo run serve demo/test.txt
   ```

2. **Start the client peer:**
   ```bash
   cargo run join <NODE_ID> demo/peer.txt
   ```

3. **Edit both files simultaneously:**
    - `demo/test.txt` starts with content about Iroh's networking capabilities
    - `demo/peer.txt` starts with content about Loro's CRDT technology
    - Watch as your edits merge automatically across peers!
