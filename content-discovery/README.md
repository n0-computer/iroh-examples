# Iroh content discovery

This library provides global content discovery for iroh.

## Building from source

Make sure you have an up to date version of [rust](https://www.rust-lang.org/) installed. Use the
[rustup](https://rustup.rs/) tool to get the rust compiler `rustc` and build tool
`cargo` for your platform.

Then run `cargo build --release` from the root directory. The resulting binary
will be in `target/release/tracker`

## Running the tracker

```sh
tracker server
```

Will run the server with a persistent node id and announce information.

## Announcing content

When announcing content, you can give either iroh tickets or content hashes.

```sh
tracker announce \
    --tracker t3od3nblvk6csozc3oe7rjum7oebnnwwfkebolbxf2o66clzdyha \
    blob:ealcoyhcjxyklzee4manl3b5see3k3nwekf6npw5oollcsflrsduiaicaiafetezhwjouayaycuadbes5ibqaq7qasiyqmqo74ijal7k7ec4pni5htntx4tpoawgvmbhaa3txa4uaa
```

## Querying content

When querying content, you can use tickets, hashes, or hash and format.

When using tickets, the address part of the ticket will be ignored.

```sh
tracker query \
    --tracker t3od3nblvk6csozc3oe7rjum7oebnnwwfkebolbxf2o66clzdyha \
    blob:ealcoyhcjxyklzee4manl3b5see3k3nwekf6npw5oollcsflrsduiaicaiafetezhwjouayaycuadbes5ibqaq7qasiyqmqo74ijal7k7ec4pni5htntx4tpoawgvmbhaa3txa4uaa
```

## Verification

Verification works in different ways depending if the content is partial or
complete.

For partial content, the tracker will just ask for the unverified content size.
That's the only thing you can do for a node that possibly has just started
downloading the content itself.

For full content and blobs, the tracker will choose a random blake3 chunk of the
data and download it. This is relatively cheap in terms of traffic (2 KiB), and
since the chunk is random a host that has only partial content will be found
eventually.

For full content and hash sequences such as collections, the tracker will choose
a random chunk of a random child.
