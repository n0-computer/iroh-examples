pub mod framed;

use bytes::BytesMut;
use futures_util::{SinkExt, TryStreamExt};
use iroh::{
    endpoint::Connection,
    protocol::{AcceptError, ProtocolHandler},
};
use serde::{Deserialize, Serialize};

use crate::framed::FramedBiStream;

/// Each protocol is identified by its ALPN string.
///
/// The ALPN, or application-layer protocol negotiation, is exchanged in the connection handshake,
/// and the connection is aborted unless both nodes pass the same bytestring.
pub const ALPN: &[u8] = b"iroh/examples/messages/0";

/// Move is the message type we'll send & receive over the connection.
///
/// It represents all possible "frames" in our framed protocol.
///
/// We use serde and postcard to serialize it into bytes.
/// Then we write them, prefixed with a big-endian encoded `u32` denoting their length, to the stream.
///
/// The idea is that these denote chess moves, but this wouldn't quite suffice.
/// In practice you'd either also need to add promotion or just use SAN (Standard Algebraic Notation)
/// for this, but this is just for demonstration purposes.
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Move {
    pub from: (u8, u8),
    pub to: (u8, u8),
}

impl Move {
    pub async fn send(&self, stream: &mut FramedBiStream) -> anyhow::Result<()> {
        let encoded_move = postcard::to_extend(self, BytesMut::new())?.freeze();
        stream.write.send(encoded_move).await?;
        Ok(())
    }

    pub async fn recv(stream: &mut FramedBiStream) -> anyhow::Result<Move> {
        let Some(encoded_move) = stream.read.try_next().await? else {
            anyhow::bail!("unexpected end of stream");
        };
        let mv = postcard::from_bytes(&encoded_move)?;
        Ok(mv)
    }
}

async fn black_moves(stream: &mut FramedBiStream) -> anyhow::Result<()> {
    let mv = Move::recv(stream).await?;
    println!("got move: {mv:?}");

    // Respond with some move
    let mv = Move {
        from: (5, 7),
        to: (5, 6),
    };
    mv.send(stream).await?;

    let mv = Move::recv(stream).await?;
    println!("got move: {mv:?}");

    // And respond with another one
    let mv = Move {
        from: (5, 8),
        to: (5, 7),
    };
    mv.send(stream).await?;

    Ok(())
}

/// This struct implements the receiving side of the protocol via [`ProtocolHandler`].
#[derive(Debug, Clone)]
pub struct ChessProtocol;

impl ProtocolHandler for ChessProtocol {
    /// The `accept` method is called for each incoming connection for our ALPN.
    ///
    /// The returned future runs on a newly spawned tokio task, so it can run as long as
    /// the connection lasts.
    async fn accept(&self, connection: Connection) -> Result<(), AcceptError> {
        // We can get the remote's node id from the connection.
        let node_id = connection.remote_node_id()?;
        println!("accepted connection from {node_id}");

        // Our protocol is a simple request-response protocol, so we expect the
        // connecting peer to open a single bi-directional stream.
        let bi_stream = connection.accept_bi().await?;
        let mut stream = FramedBiStream::new(bi_stream);

        // make some moves
        black_moves(&mut stream)
            .await
            .map_err(anyhow::Error::into_boxed_dyn_error)?;

        // We could keep going, but we'll call `SendStream::finish()` to indicate we're done.
        stream.write.get_mut().finish()?;

        // Wait until the remote closes the connection, which it does once it
        // received the response.
        connection.closed().await;

        Ok(())
    }
}
