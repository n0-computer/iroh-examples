# iroh browser echo demo

This example runs iroh in the browser, compiled to web assembly. The example uses a custom *Echo protocol*: You connect to remote node, send some data, and the remote node sends back the same data. The protocol may be used both from the browser and from the command line, and browser and cli nodes can connect to each other.

The protocol and setup code is shared between the browser and the CLI.

## Run the browser version:

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
