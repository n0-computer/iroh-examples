# browser-chat

This is a chat app that runs in both the browser and the command line. It uses [`iroh-gossip`](https://github.com/n0-computer/iroh-gossip/).

The example has the following parts:

* [`shared`](shared) is a Rust library that exposes a `ChatNode`, which uses iroh and iroh-gossip to power a simple ephemeral gossip chat between peers.
* [`cli`](cli) uses the `shared` library to create a basic command-line interface to chat with peers
* [`browser-wasm`] is a WebAssembly wrapper around the shared library which uses [`wasm-bindgen`](https://github.com/rustwasm/wasm-bindgen) to expose the chat node to JavaScript running in web browser. It can be packaged with [`wasm-pack`](https://rustwasm.github.io/wasm-pack/) into a NPM package.
* [`frontend`] is a web app that uses `browser-wasm`. The web app is a single-page application built with React and shadcn. The UI was mostly built by an AI tool, which we then adapted to use the API exposed by `browser-wasm`.

## Requirements

To build the example, you need a Rust toolchain for `wasm32-unknown-unknown`, [`wasm-bindgen`](https://github.com/rustwasm/wasm-bindgen) and [`wasm-pack`](https://github.com/rustwasm/wasm-pack).

```
rustup target install wasm32-unknown-unknown
cargo binstall wasm-bindgen wasm-pack
```
`cargo binstall` is a nifty little tool that downloads binaries from Github releases matching your system architecture. If you don't have it yet, first [install it](https://github.com/cargo-bins/cargo-binstall?tab=readme-ov-file#quickly).

## Usage

To run the example, first build the Wasm library:

To build the chat app in development mode, run these commands:
```
cd frontend
npm run build:wasm
npm run install
npm run dev
```

And then open [`http://localhost:5173`](http://localhost:5173) in your browser.

Note that you have to run `npm run build:wasm` *before* running `npm run install`.
`build:wasm` is an alias defined in [`frontend/package.json`](frontend/package.json) that builds and packs the `wasm-browser` crate with [`wasm-pack`](https://rustwasm.github.io/wasm-pack/).
Spelled out:

```
wasm-pack build ./browser-wasm --dev --weak-refs --reference-types -t bundler -d pkg",
```
This builds the `browser-wasm` for the `wasm32-unknown-unknown` target, creates the JavaScript bindings with `wasm-bindgen` and wrap it into an NPM package ready to be used by common frontend bundling tools (like Vite in our chat app frontend).

Now, you can install and build the frontend in development mode:

```
cd frontend
npm install
npm run dev
```

The frontend package has a `file:` dependency onto the Wasm package created by `wasm-pack`.
Whenever you change something on the rust side, you need to rebuild the Wasm package with the `wasm-pack` command from above.
To make this easier, the `frontend` package defines an command alias `build:wasm` for this, so you can run `npm run build:wasm` instead.
Likely you will have to restart the Vite dev server afterwards, as the Wasm is not properly picked up by Vite's hot module reloader.

## Production build

To build for production, run these commands:
```
cd frontend
npm run build:wasm:release
npm run build
```

You will find the output (HTML and assets) in the `frontend/dist` folder.

The `build:wasm:release` command is an alias to `wasm-pack` in release mode. We also have a custom profile definition for the release build
that includes optimizations to reduce the Wasm size (see [`.cargo/config.toml`](browser-wasm/.cargo/config.toml)).
