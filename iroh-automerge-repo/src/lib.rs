use automerge_repo::{Message, NetworkError};
use bytes::{Buf, BytesMut};
use tokio_util::codec::{Decoder, Encoder};

/// A simple length prefixed codec over `crate::Message` for use over stream oriented transports
#[derive(Debug, Clone, Copy)]
pub struct Codec;

#[derive(Debug, thiserror::Error)]
pub enum CodecError {
    #[error(transparent)]
    Io(#[from] std::io::Error),
    #[error("Failed to decode: {0}")]
    DecodeError(String),
    #[error(transparent)]
    Network(#[from] NetworkError),
}

impl From<CodecError> for NetworkError {
    fn from(err: CodecError) -> Self {
        NetworkError::Error(err.to_string())
    }
}

impl Decoder for Codec {
    type Item = Message;

    type Error = CodecError;

    fn decode(&mut self, src: &mut BytesMut) -> Result<Option<Self::Item>, Self::Error> {
        if src.len() < 4 {
            return Ok(None);
        }

        // Read the length prefix
        let len = src.get_u32() as usize;

        // Check if we have enough data for this message
        if src.len() < len {
            src.reserve(len - src.len());
            return Ok(None);
        }

        // Parse the message
        let data = &src[..len];
        Message::decode(data)
            .map(Some)
            .map_err(|e| CodecError::DecodeError(e.to_string()))
    }
}

impl Encoder<Message> for Codec {
    type Error = CodecError;

    fn encode(&mut self, msg: Message, dst: &mut BytesMut) -> Result<(), Self::Error> {
        let encoded = msg.encode();
        let len = encoded.len() as u32;
        let len_slice = len.to_be_bytes();
        dst.reserve(4 + len as usize);
        dst.extend_from_slice(&len_slice);
        dst.extend_from_slice(&encoded);
        Ok(())
    }
}
