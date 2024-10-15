# Experiment with FROST signatures for iroh, pkarr or nostr ed keypairs

This is using the [frost-ed25519](https://docs.rs/frost-ed25519/latest/frost_ed25519/) crate, which implements [FROST: Flexible Round-Optimized
Schnorr Threshold Signatures](https://eprint.iacr.org/2020/852.pdf)

## Splitting a keypair

Split the keypair in ~/.iroh/keypair into subdirectories a, b, c

```
> cargo run split --key ~/.iroh/keypair a b c 
```

Minimum number of parts is 3. Default threshold is n-1.

The original keypair is kept in place. In a real application you would delete
the keypair.

## Local signing using the fragments

```
> cargo run sign a c --key 25mzjgjlrcrma7wkm4l3fjv2afcs53cvmmyw3v2uwwt2dczsinaa --message test
Reconstructed a signing key from ["a/25mzjgjlrcrma7wkm4l3fjv2afcs53cvmmyw3v2uwwt2dczsinaa.secret", "c/25mzjgjlrcrma7wkm4l3fjv2afcs53cvmmyw3v2uwwt2dczsinaa.secret"]
Signature: daec0537cd6f080cce1ae7150684ac3147e576c9bde9a74d27e914bcfa834cef2d204ff9295379784fcca3eaa95e4b196b4fb8b60ec316840b5e649844db880e
```

## Co-signing daemon

Start with one of the directories created by split. We created splits a, b and
c in the previous example, so let's use a.

```
> cargo run cosign --data-path a

Can cosign for following keys
- 25mzjgjlrcrma7wkm4l3fjv2afcs53cvmmyw3v2uwwt2dczsinaa (min 2 signers)

Listening on 2wgtsap6bsur5ruzb6pxdindy6j2n4e5zyq34tz7n2kjmngter2a
```

## Signing

Signing assumes that you have 1 fragment local, and need a number of remote
co-signers. You must provide the key you want to sign for and the iroh node id
for all possible co-signers.

Each co-signer must have a different fragment, and the local fragment should also
be different to all the fragments the co-signers are using.

In this case we are using b locally and node 2wgtsap6bsur5ruzb6pxdindy6j2n4e5zyq34tz7n2kjmngter2a
is using a remotely.

In a real usage you would not have the three fragments on the same machine, since
that defeats the purpose of the scheme.

```
> cargo run sign --message test --data-path b --key 25mzjgjlrcrma7wkm4l3fjv2afcs53cvmmyw3v2uwwt2dczsinaa 2wgtsap6bsur5ruzb6pxdindy6j2n4e5zyq34tz7n2kjmngter2a
Signature: 8cfae38266ee55c274d865b352b94d19e701def117fbcafd4eefccde8eefa5a8382d43275bafe2da6c39e07fdd2b88a12a43c8b12126d17e3a7c2bf14590400f
```
