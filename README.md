# Iroh-Examples

Examples how to use iroh or one of the iroh library crates.
Things in here should be somewhat easy to understand.

For very experimental things there is [iroh-experiments].

## Examples

### [browser-echo](browser-echo)

Use iroh in the browser, compiled to web assembly. [Try it here!](https://n0-computer.github.io/iroh-examples/main/browser-echo/index.html)

### [browser-chat](browser-chat)

A chat app based on iroh-gossip that can run both in the browser and on the command line.
[Try it here!](https://n0-computer.github.io/iroh-examples/main/browser-chat/index.html)

### [browser-blobs](browser-blobs)

Small example for running [iroh-blobs](https://github.com/n0-computer/iroh-blobs) in the browser.
[Try it here!](https://n0-computer.github.io/iroh-examples/main/browser-blobs/index.html)

### [custom-router](custom-router)

When you need more control or customizations than the
[iroh `Router`](https://docs.rs/iroh/latest/iroh/protocol/struct.Router.html) allows, we
recommend to build your own router instead. This example implements a router that allows
to add and remove protocols at runtime.

### [dumbpipe-web](dumbpipe-web)

Forward http requests to dumbpipe. Share a local dev server publicly.

### [extism](extism)

Use iroh through [extism]

### [framed messages](framed-messages)

Send chess moves back and forth on the same bi-directional stream by framing it using `tokio-util`'s `codec` feature.

### [frosty](frosty)

Experiment with [FROST] threshold signatures for iroh.

### [iroh-automerge](iroh-automerge)

Iroh integration with [automerge]

### [iroh-gateway](iroh-gateway)

A http gateway for iroh-blobs data, written using iroh-blobs.

### [tauri-todos](tauri-todos)

Todo app using iroh documents and [tauri].


[iroh-experiments]: https://github.com/n0-computer/iroh-experiments
[extism]: https://extism.org/
[automerge]: https://automerge.org/
[mainline]: https://en.wikipedia.org/wiki/Mainline_DHT
[pkarr]: https://pkarr.org/
[tauri]: https://tauri.app/
[FROST]: https://eprint.iacr.org/2020/852.pdf
