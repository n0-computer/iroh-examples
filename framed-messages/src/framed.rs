use iroh::endpoint::{RecvStream, SendStream};
use tokio_util::codec::{FramedRead, FramedWrite, LengthDelimitedCodec};

const MAX_MESSAGE_SIZE: usize = 1000;

/// This is just a convenience wrapper around a [`FramedRead`] and [`FramedWrite`]
/// with a [`LengthDelimitedCodec`].
///
/// The [`LengthDelimitedCodec`] essentially means we'll prefix messages with a
/// big-endian encoded u32 indicating the length of the following message.
///
/// The [`FramedRead`] and [`FramedWrite`] structs then turn the
/// [`SendStream`] and [`RecvStream`] that implement the individual,
/// bytes-based [`AsyncRead`] and [`AsyncWrite`] implementations into
/// variable-(byte-)sized message [`Stream`]s and [`Sink`]s, also called "Frames"
/// (because you can determine the beginning and end borders on the underlying byte
/// streams).
///
/// [`FramedRead`] does this by implementing a state machine that keeps fetching
/// more and more bytes until it's assembled a full frame, and
/// [`FramedWrite`] does this by implementing a state machine that keeps pushing
/// more and more bytes into the underlying stream until it the whole frame has
/// been written, at which point it accepts more frames to be queued.
///
/// Because these will keep the frames in memory until they're complete, and you
/// probably don't want to an arbitrary amount of memory depending on the bytes
/// that were sent on the wire, you can configure a maximum frame length.
/// We've set it to 1000 bytes in this case ([`MAX_MESSAGE_SIZE`]), but that's
/// (like many other things) configurable in [`LengthDelimitedCodec`].
///
/// [`AsyncRead`]: tokio::io::AsyncRead
/// [`AsyncWrite`]: tokio::io::AsyncWrite
/// [`Stream`]: futures_util::Stream
/// [`Sink`]: futures_util::Sink
pub struct FramedBiStream {
    pub write: FramedWrite<SendStream, LengthDelimitedCodec>,
    pub read: FramedRead<RecvStream, LengthDelimitedCodec>,
}

impl FramedBiStream {
    pub fn new((send, recv): (SendStream, RecvStream)) -> Self {
        let mut codec = LengthDelimitedCodec::builder();
        codec.max_frame_length(MAX_MESSAGE_SIZE);
        Self {
            write: codec.new_write(send),
            read: codec.new_read(recv),
        }
    }
}
