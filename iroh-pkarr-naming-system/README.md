# IPNS, the iroh pkarr naming system

This is a minimalist reimplementation of the idea of [ipfs_ipns] using the
bittorrent mainline DHT via [pkarr].

It can be used to publish an iroh blake3 content hash under an ed25519 public
key, and to retrieve the latest content hash.

[pkarr]: https://pkarr.org
[ipfs_ipns]: https://docs.ipfs.tech/concepts/ipns/
