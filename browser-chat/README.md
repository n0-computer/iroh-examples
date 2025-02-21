# browser-chat

This is a chat app that runs in both the browser and the command line. It uses [`iroh-gossip`](https://github.com/n0-computer/iroh-gossip/).

The example has the following parts:

* [`shared`](shared) is a Rust library that exposes a `ChatNode`, which uses iroh and iroh-gossip to power a simple ephemeral gossip chat between peers.
* [`cli`](cli) uses the `shared` library to create a basic command-line interface to chat with peers
* [`browser-wasm`] is a WebAssembly wrapper around the shared library which uses [`wasm-bindgen`](https://github.com/rustwasm/wasm-bindgen) to expose the chat node to JavaScript running in web browser. It can be packaged with [`wasm-pack`](https://rustwasm.github.io/wasm-pack/) into a NPM package.
* [`frontend`] is a web app that uses `browser-wasm`. The web app is a single-page application built with React and shadcn. The UI was mostly built by an AI tool, which we then adapted to use the API exposed by `browser-wasm`.
