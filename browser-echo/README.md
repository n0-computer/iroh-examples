# iroh browser echo demo

This example runs iroh in the browser, compiled to web assembly. The example uses a custom *Echo protocol*: You connect to remote node, send some data, and the remote node sends back the same data. The protocol may be used both from the browser and from the command line, and browser and cli nodes can connect to each other.

The protocol and setup code is shared between the browser and the CLI.

## Run the browser version:

You can try out the **[deployed example](https://n0-computer.github.io/iroh-examples/main/browser-echo/index.html)**.
To build and run it yourself, follow these steps:

```sh
$ cargo install wasm-bindgen-cli
$ rustup target install wasm32-unknown-unknown
$ npm install
$ npm run build
$ npm run serve
```

Then, open [`http://localhost:8080`](http://localhost:8080). The app will print instructions on how to connect and accept connections.

To build in release mode and apply optimizations to reduce the wasm size, run `npm run build:release` instead.

## Run the CLI version:

To accept connections:
```sh
cargo run --features cli -- accept
```

To initiate a connection:
```sh
cargo run --features cli -- connect <NODE-ID> <PAYLOAD>
```

## Navigate the code

This folder contains a single Rust crate that can be compiled to both webassembly for the browser and to a commad line.

* The shared code between WASM and CLI lives in [`src/node.rs`](src/node.rs).
* A WASM-only wrapper around the `EchoNode` defined there lives in [`src/wasm.rs`](src/wasm.rs).
  It mostly is concerned with converting types to browser-supported equivalents.
* The CLI binary lives in [`src/bin/cli.rs`](src/bin/cli.rs)

Apart from the rust crate, we have a little HTML, CSS and JavaScript for the demo app. There's no further external dependencies used.
The code lives in [`public`].

Running `npm run build` first compiles the crate to WASM, then creates the JavaScript browser bindings with `wasm-bindgen`,
and puts the result into `public/wasm`, from where the wasm is imported in the [`main.js`](public/main.js).
