# gossip-node-discovery

Discover nodes via [iroh-gossip-discovery](https://crates.io/crates/iroh-gossip-discovery).

## node

This binary will start an iroh endpoint and listen for NodeIds on the
mDNS local discovery stream and also make an http request to a known
server for it's NodeId. Once it gets one of these NodeId's it will
subscribe to the [0u8; 32] topic Id and begin to send it's NodeId
every 2 seconds. It also has a task that will listen for NodeId's that
come on the gossip receiver stream and update a hashtable of known
nodes.

## whoami

This is a simple http server that also subscribed to the gossip
topic. `node` can hit this server if it can't find any seed NodeIds
via mDNS.

## Running the Demo

If you are running locally and want to test via mDNS then just do:
```
cd node
cargo run -- <name-of-node>
```

If you also want to test discovery using the `whoami` server do:
```
cd whoami
cargo run
```
in another terminal
```
cd node
cargo run -- <name-of-node>
```
