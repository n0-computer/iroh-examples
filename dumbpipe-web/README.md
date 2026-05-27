# A web frontend for dumbpipe

This forwards http requests to [dumbpipe](https://crates.io/crates/dumbpipe)

You give a node url like `<ticket>.localhost:8080` or `endpointid`.localhost:8000,
and the request will be forwarded to the dumbpipe command running under that
endpoint id.

## Example:

1. Run local dev web server on port 3000:

```
npm run dev
>    - Local:        http://localhost:3000
```

2. Run dumbpipe to make the above accessible

```
dumbpipe listen-tcp --host localhost:3000
```

3. Run this tool

```
cargo run
> Listening on http://0.0.0.0:8080
```

4. Access the website via a browser at

```
http://<ticket>.localhost:8080
```

# License

This project is licensed under either of

 * Apache License, Version 2.0, ([LICENSE-APACHE](../LICENSE-APACHE) or
   http://www.apache.org/licenses/LICENSE-2.0)
 * MIT license ([LICENSE-MIT](../LICENSE-MIT) or
   http://opensource.org/licenses/MIT)

at your option.

### Contribution

Unless you explicitly state otherwise, any contribution intentionally submitted
for inclusion in this project by you, as defined in the Apache-2.0 license,
shall be dual licensed as above, without any additional terms or conditions.
