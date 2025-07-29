//! A simple implementation of a tokio-util codec (the [`Encoder`] and [`Decoder`] traits)
//! that wraps [`LengthDelimitedCodec`] and works on `Vec<u8>` instead of [`Bytes`].
//!
//! Also adds a bit of tracing to the encoding and decoding.
//!
//! This codec allows turning things that implement `AsyncRead` or `AsyncWrite`
//! into `Stream`s and `Sink`s that work on whole messages instead of individual bytes.
use bytes::Bytes;
use tokio_util::codec::{Decoder, Encoder, LengthDelimitedCodec};

#[derive(Clone)]
pub(crate) struct Codec {
    remote_node_id: iroh::NodeId, // used for tracing
    inner: LengthDelimitedCodec,
}

impl Codec {
    pub(crate) fn new(remote_node_id: iroh::NodeId) -> Self {
        Self {
            remote_node_id,
            inner: LengthDelimitedCodec::new(), // using default values
        }
    }
}

impl Encoder<Vec<u8>> for Codec {
    type Error = std::io::Error;

    fn encode(&mut self, bytes: Vec<u8>, dst: &mut bytes::BytesMut) -> Result<(), Self::Error> {
        let len = bytes.len();
        let result = self.inner.encode(Bytes::from(bytes), dst);
        if result.is_ok() {
            tracing::trace!(len, %self.remote_node_id, "encoded msg");
        }
        result
    }
}

impl Decoder for Codec {
    type Item = Vec<u8>;

    type Error = std::io::Error;

    fn decode(&mut self, src: &mut bytes::BytesMut) -> Result<Option<Self::Item>, Self::Error> {
        let Some(bytes) = self.inner.decode(src)? else {
            return Ok(None);
        };

        tracing::trace!(len = bytes.len(), %self.remote_node_id, "decoded msg");

        Ok(Some(Vec::from(bytes)))
    }

    fn decode_eof(&mut self, buf: &mut bytes::BytesMut) -> Result<Option<Self::Item>, Self::Error> {
        let Some(bytes) = self.inner.decode_eof(buf)? else {
            return Ok(None);
        };

        tracing::trace!(len = bytes.len(), %self.remote_node_id, "decoded msg");

        Ok(Some(Vec::from(bytes)))
    }
}
