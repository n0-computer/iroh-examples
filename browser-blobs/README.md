# iroh blobs browser demo

This example runs iroh-blobs in the browser, compiled to web assembly. For now, only the in-memory store works in the browser, so there is no persistence.

The demo implements a very simple blobs app where endpoints provide some text string as a blob, and others can download it. We have a shared library, a module that exposes this as a WASM module to web browsers, and a command line interface.

## Run the browser version:

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

To provide a blob:
```sh
cargo run --features cli -- provide "some text to share"
```

To download from a ticket:
```sh
cargo run --features cli -- download <TICKET>
```

## Navigate the code

This folder contains a single Rust crate that can be compiled to both webassembly for the browser and to a commad line.

* The shared code between WASM and CLI lives in [`src/node.rs`](src/node.rs).
* A WASM-only wrapper around the `BlobNode` defined there lives in [`src/wasm.rs`](src/wasm.rs).
  It mostly is concerned with converting types to browser-supported equivalents.
* The CLI binary is [`src/bin/cli.rs`](src/bin/cli.rs)
* The web app (simple vanilla JS) lives in [`public`].

Running `npm run build` first compiles the crate to WASM, then creates the JavaScript browser bindings with `wasm-bindgen`,
and puts the result into `public/wasm`, from where the wasm is imported in the [`main.js`](public/main.js).
