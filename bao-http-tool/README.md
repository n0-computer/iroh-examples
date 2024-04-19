# Validate external data using external outboard

## Usage

To test this, run a http dev server that supports range requests in your iroh data dir.

The outboard data must be *without* length prefix.

```
RUST_LOG=debug \
  cargo run -- \
  --hash 370e2b3002be3b38b120f7b3be53da4cf646810e26f8f4a5018247c8188af5b2 \
  --block-size-log 4
  --url http://127.0.0.1:3003/370e2b3002be3b38b120f7b3be53da4cf646810e26f8f4a5018247c8188af5b2.data
  --outboard http://127.0.0.1:3003/370e2b3002be3b38b120f7b3be53da4cf646810e26f8f4a5018247c8188af5b2.obao4
  --range 0..10000000
```