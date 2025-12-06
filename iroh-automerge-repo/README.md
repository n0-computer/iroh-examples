# iroh-automerge-repo

This example allows you to sync [automerge] documents across [iroh] connections, using the automerge-repo protocol.

It currently uses the [samod] library as the backing automerge repo protocol implementation.

## Running it

```sh
# Run the example, create a new document with one key "my-key" set to "my-value"
$ cargo run -- create my-key my-value
Running as [node-id]
Created document [document-id]
Waiting for Ctrl+C
```

Simultaneously, in another terminal or on another machine:

```sh
# Connect to the other node that's running and set the key "hello" to "friend!"
$ cargo run -- --sync-with [node-id] upsert [document-id] hello friend!
Running as [our-node-id]
Connected to [node-id]
Updated document
Waiting for Ctrl+C
# We press Crtl+C
$ cargo run -- --sync-with [node-id] print [document-id]
Running as [our-node-id]
Connected to [node-id]
hello="friend!"
my-key="my-value"
Waiting for Ctrl+C
```

The document with the document ID that was originally printed with the `create` command above is now synced between these two terminals, and the second terminal added a second key-value pair.

Closing both terminals means the document will disappear, as this example only keeps the state in-memory.
This would be easy to adjust by adding `samod`'s `TokioFilesystemStorage` in the `SamodBuilder`, though.

## Code

This directory contains just three source files:
- `lib.rs` is the main implementation of the `IrohRepo` struct that combines an `iroh::Endpoint` with a `samod::Samod` automerge repository and implements `iroh::protocol::ProtocolHandler` so it can be used to accept incoming connections with an `iroh::protocol::Router`.
- `codec.rs` is a very small utility to adapt `tokio-util`'s `LengthDelimitedCodec` to work with `Vec<u8>` instead of `Bytes`.
- `main.rs` implements the example CLI seen in the section above.

[automerge]: https://automerge.org/
[iroh]: https://www.iroh.computer/
[samod]: https://crates.io/crates/samod
