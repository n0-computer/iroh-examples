# Iroh gateway example

This is a stateless http gateway. It can be used to serve content from
a local or remote iroh node.

It will connect to the local iroh node via the iroh-blobs protocol.

# Prerequisites

Make sure you have an up to date version of [rust](https://www.rust-lang.org/) installed. Use the
[rustup](https://rustup.rs/) tool to get the rust compiler `rustc` and build tool
`cargo` for your platform.

# Usage

First find or start an iroh node that has content you want to view:

```
❯ iroh start ~/Downloads/my_video.mp4
Listening addresses:
  x.x.x.x:xxxxx
  x.x.x.x:xxxxx
DERP Region: 2
PeerID: cytwbysn6cs6jbhdak6ypmrbg2w3nrcrptl5xlts2yurk4mq5cb

...

Blob: bafkr4ibwueokpaxz3x6fd2tvsdo3uqixzimulg536abicpqmqtt3itaodt
```

Then start the gateway and point it to the node above:
```
> cargo run --default_node cytwbysn6cs6jbhdak6ypmrbg2w3nrcrptl5xlts2yurk4mq5cb
```

Then access content from a browser. Since this supports range requests, you can e.g. stream a video, including seeking in the video, with a supporting player.

```
http://localhost:8080/blob/bafkr4ibwueokpaxz3x6fd2tvsdo3uqixzimulg536abicpqmqtt3itaodt
```

To access content from a node other than the default one, you can explicitly specify it in the URL:

```
http://localhost:8080/node/cytwbysn6cs6jbhdak6ypmrbg2w3nrcrptl5xlts2yurk4mq5cb/blob/bafkr4ibwueokpaxz3x6fd2tvsdo3uqixzimulg536abicpqmqtt3itaodt
```

# Features
- [x] range requests
- [x] mime type sniffing
