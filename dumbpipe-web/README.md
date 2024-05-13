# A web frontend for dumbpipe

This forwards http requests to [dumbpipe](https://crates.io/crates/dumbpipe)

You give a node url like `<ticket>.localhost:8080` or `nodeid`.localhost:8000,
and the request will be forwarded to the dumbpipe command running under that
node id.

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