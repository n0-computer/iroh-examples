# iroh-automerge

> Integration of iroh with [automerge](https://automerge.org).

## What is automerge?

Automerge is a Conflict-Free Replicated Data Type (CRDT).
It represents JSON-like data that can be efficiently synchronized between machines without needing
a single source of truth, unlike traditional databases.
This enables machine to simply gossip updates and data with each other, eventually converging to the same state on every replica.

## What does this example do?

This example highlights how to integrate [automerge's sync protocol] with [iroh's peer-to-peer connectivity].

To run this example, please open a terminal, clone the examples repository using `git clone https://github.com/n0-computer/iroh-examples`
and enter the `iroh-automerge` directory using `cd iroh-automerge`.

First, we create one node that listens for sync requests using iroh's connections:

```sh
# First Terminal
> cargo run
Running
Node Id: lkpz2uw6jf7qahl7oo6qc46qad5ysszhtdzqyotkb3pwtd7sv3va
```

In iroh, nodes are neither identified by domain name (like websites in the internet), nor are they identified by IP addresses.
Instead, nodes are identified by cryptographic public keys, such as the one printed using the `cargo run` command above.

You can exchange this public key with anyone to establish a secure, encrypted connection anywhere.
In most cases this connection is even automatically upgraded to a direct peer-to-peer connection.

We make sure to copy this public key, so we can talk to this node from somewhere else.
We also open another terminal, while keeping the original one open, so this node keeps running.

Now, let's start another node in the second terminal that will connect to the first node:

```sh
# Second Terminal
> cargo run -- --remote-id t4xj3pbb2fzkmphnu5npfznpir62i5zxacbgywf22ev5w4sjelma`
Running
Node Id: gcq5e7mcsvwgtxfvbu7w7rkikxhfudbqt5yvl34f47qlmsyuy7wa
>
```

This will connect the two nodes, have them exchnage data and finish running within a couple of seconds.

Coming back to the first terminal, we'll see that the receiving end got all data:

```sh
# Back on the first Terminal
State
key-0 => "value-0"
key-1 => "value-1"
key-2 => "value-2"
key-3 => "value-3"
key-4 => "value-4"
```

[automerge's sync protocol]: https://docs.rs/automerge/latest/automerge/sync/
[iroh's peer-to-peer connectivity]: https://docs.rs/iroh/latest/iroh/net/index.html
