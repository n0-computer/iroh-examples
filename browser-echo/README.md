# iroh browser demo

Run this yourself:
```sh
$ cargo install wasm-bindgen-cli
$ rustup target install wasm32-unknown-unknown
$ npm i
$ npm run build 
$ npm run serve
```

Then:
- Go to https://localhost:8080
- Open DevTools
- Look at the `window.wasm` object. Depending on the state of this repo it has stuff to play with.
  Right now that stuff to play with is just `await wasm.connect_relay()`. Have fun.

