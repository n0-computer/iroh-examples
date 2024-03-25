# iroh + exsitm

This is an example of running iroh thorugh [exitsm](https://extism.org/) as a set of [host functions](https://extism.org/docs/concepts/host-functions). It's written entirely in rust, but the purpose is to show how one would build an API that any plugin could use to gain access to a plugin-host-provided iroh instance.

## Requirements

You'll need the latest version of the rust toolchain, and the `wasm32-unknown-unknown` target. Install it with:

```
rustup target add wasm32-unknown-unknown
```

## Running the Example

There are three 

1. Build the WASM plugin
2. Get a blob ticket
3. run the host

### 1. Build the WASM plugin

`cd` to `extism/plugin` and run `cargo build --target wasm32-unknown-unknown`. If you get an error, check the requirements section above. This will generate a WASM plugin that actually calls the blob download host function.

### 2. Get a blob ticket

This example needs a `Raw` blob ticket, which you can get from `iroh blob add` on a raw file, or just use this one, which should be hosted on iroh.network:
```
blobabk62aofuwwwu5zb5ocvzj5v3rtqt6siglyuhoxhqtu4fxravvoteajcnb2hi4dthixs65ltmuys2mjomrsxe4bonfzg62bonzsxi53pojvs4lydaac2cyt22erablaraaa5ciqbfiaqj7ya6cbpuaaaaaaaaaaaahjceagucztuhgez4qucv2733xphmgpc2nkgj54od2vuygn6sz4zzxo6ce
```
(it's a text file that says hello)

### 3. Run the host

The host code will actually call the example. `cd` to `./extism/host` and run

```
cargo run <TICKET>
```

pasting in the ticket you'd like to fetch. It'll fetch the bytes & print it out, proving this host can provide iroh to extism plugins!


## Future work

What would be truly neat would be to reverse the direction, and write a plugin that brings iroh to a host. For that we'd need to be able to compile some/all of iroh to WASM, which we're [working on](https://github.com/n0-computer/iroh/issues/1803).