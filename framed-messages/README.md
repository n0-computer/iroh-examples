# Message Framing with iroh

If you're implementing your own protocol on iroh connections, you might run into the issue that the atomic unit of data you can send on a stream is a single byte.
So if you want to send multiple "messages" on the same stream, you need to tell the other side where these messages begin and end.
This is process is called "framing" in networking terms.

In this example we're sending chess moves back and forth on the same bi-directional stream.
To do this, we use the `codec` feature from the `tokio-util` crate.
It works like this:
- The `SendStream` and `RecvStream` that we get from `iroh::Connection::open_bi` implement the `AsyncWrite` and `AsyncWrite` traits, respectively.
  These allow us to send and receive byte streams without framing.
- We wrap these streams using `tokio_util::codec::FramedRead` and `FramedWrite` using a `LengthDelimitedCodec`.
  These wrappers take a codec and an `AsyncRead`/`AsyncWrite` and turn them into a `futures_util::Stream`/`futures_util::Sink`, respectively.
- `Stream` and `Sink` work on messages, not byte streams, so now we can send *framed* "chunks" of `bytes::Bytes` on our streams.
  This works by using the `LengthDelimitedCodec` for framing, it essentially prefixes our messages with a big-endian encoded u32 representing the length of the message that follows it.
  This way the receiving end always knows where a message begins and ends.
- Finally we use `postcard` and `serde` to serialize and deserialize our `Move` struct into and from bytes.
