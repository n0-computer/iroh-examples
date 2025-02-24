# browser-chat

This is a chat app that runs in both the browser and the command line. It uses [`iroh-gossip`](https://github.com/n0-computer/iroh-gossip/).

The example has the following parts:

* [`shared`](shared) is a Rust library that exposes a `ChatNode`, which uses iroh and iroh-gossip to power a simple ephemeral gossip chat between peers.
* [`cli`](cli) uses the `shared` library to create a basic command-line interface to chat with peers
* [`browser-wasm`](browser-wasm) is a WebAssembly wrapper around the shared library which uses [`wasm-bindgen`](https://github.com/rustwasm/wasm-bindgen) to expose the chat node to JavaScript running in web browser. It can be packaged with [`wasm-pack`](https://rustwasm.github.io/wasm-pack/) into a NPM package.
* [`frontend`](frontend) is a web app that uses `browser-wasm`. The web app is a single-page application written [Typescript](https://www.typescriptlang.org/), using [React](https://react.dev/) and [shadcn components](https://ui.shadcn.com/).
  It is built and bundled with [Vite](https://vite.dev/). The UI was initially mostly written by an AI tool, which we then adapted to use the API exposed by `browser-wasm`.

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
npm install
npm run dev
```

And then open [`http://localhost:5173`](http://localhost:5173) in your browser.

Note that you have to run `npm run build:wasm` *before* running `npm install`.
`build:wasm` is an alias defined in [`frontend/package.json`](frontend/package.json) that builds and packs the [`browser-wasm` crate](browser-wasm) with [`wasm-pack`](https://rustwasm.github.io/wasm-pack/).
Spelled out:

```
wasm-pack build ./browser-wasm --dev --weak-refs --reference-types -t bundler -d pkg
```
This builds the `browser-wasm` for the `wasm32-unknown-unknown` target, creates the JavaScript bindings with `wasm-bindgen`, and wraps it into an NPM package ready to be used by common frontend bundling tools (like Vite in our chat app frontend).

The frontend package has a `file:` dependency onto the Wasm package created by `wasm-pack`.
Whenever you change something on the rust side, you need to rebuild the Wasm package with `npm run build:wasm` (or the `wasm-pack` command).
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
