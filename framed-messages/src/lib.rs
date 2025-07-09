mod framed_message;

use std::sync::Arc;

use bytes::BytesMut;
use iroh::{
    Endpoint, NodeAddr,
    endpoint::Connection,
    protocol::{AcceptError, ProtocolHandler},
};
use iroh_metrics::{Counter, MetricsGroup};
use serde::{Deserialize, Serialize};

use crate::framed_message::{read_frame, write_frame};

/// Each protocol is identified by its ALPN string.
///
/// The ALPN, or application-layer protocol negotiation, is exchanged in the connection handshake,
/// and the connection is aborted unless both nodes pass the same bytestring.
pub const ALPN: &[u8] = b"iroh/examples/messages/0";

const MAX_MESSAGE_SIZE: usize = 1000;

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Move {
    pub from: (u8, u8),
    pub to: (u8, u8),
}

/// Ping is a struct that holds both the client ping method, and the endpoint
/// protocol implementation
#[derive(Debug, Clone)]
pub struct ChessMoves {
    metrics: Arc<Metrics>,
}

impl Default for ChessMoves {
    fn default() -> Self {
        Self::new()
    }
}

impl ChessMoves {
    pub fn new() -> Self {
        Self {
            metrics: Arc::new(Metrics::default()),
        }
    }

    /// send a ping on the provided endpoint to a given node address
    pub async fn send_move(
        &self,
        endpoint: &Endpoint,
        addr: NodeAddr,
        mv: Move,
    ) -> anyhow::Result<()> {
        // Open a connection to the accepting node
        let conn = endpoint.connect(addr, ALPN).await?;

        // Open a bidirectional QUIC stream
        let (mut send, mut recv) = conn.open_bi().await?;

        let buffer: &mut Vec<u8> = &mut vec![];
        write_frame(&mut send, &mv, buffer, MAX_MESSAGE_SIZE).await?;

        // Signal the end of data for this particular stream
        send.finish()?;

        // read the response, which must be PONG as bytes
        let response = recv.read_to_end(4).await?;
        assert_eq!(&response, b"ACK");

        // Explicitly close the whole connection.
        conn.close(0u32.into(), b"bye!");

        // The above call only queues a close message to be sent (see how it's not async!).
        // We need to actually call this to make sure this message is sent out.
        endpoint.close().await;

        // at this point we've successfully pinged, mark the metric
        self.metrics.pings_sent.inc();

        // If we don't call this, but continue using the endpoint, we then the queued
        // close call will eventually be picked up and sent.
        // But always try to wait for endpoint.close().await to go through before dropping
        // the endpoint to ensure any queued messages are sent through and connections are
        // closed gracefully.
        Ok(())
    }
}

impl ProtocolHandler for ChessMoves {
    /// The `accept` method is called for each incoming connection for our ALPN.
    ///
    /// The returned future runs on a newly spawned tokio task, so it can run as long as
    /// the connection lasts.
    async fn accept(&self, connection: Connection) -> n0_snafu::Result<(), AcceptError> {
        let metrics = self.metrics.clone();

        // We can get the remote's node id from the connection.
        let node_id = connection.remote_node_id()?;
        println!("accepted connection from {node_id}");

        // Our protocol is a simple request-response protocol, so we expect the
        // connecting peer to open a single bi-directional stream.
        let (mut send, mut recv) = connection.accept_bi().await?;

        let mut buffer = BytesMut::new();
        let mv = read_frame::<Move>(&mut recv, &mut buffer, MAX_MESSAGE_SIZE)
            .await
            .map_err(|e| e.into_boxed_dyn_error())?;
        println!("got move: {:?}", mv);

        // adknowledge the message
        send.write_all(b"ACK")
            .await
            .map_err(AcceptError::from_err)?;

        // By calling `finish` on the send stream we signal that we will not send anything
        // further, which makes the receive stream on the other end terminate.
        send.finish()?;

        // Wait until the remote closes the connection, which it does once it
        // received the response.
        connection.closed().await;

        // increment count of pings we've received
        metrics.pings_recv.inc();

        Ok(())
    }
}

/// Enum of metrics for the module
#[derive(Debug, Default, MetricsGroup)]
#[metrics(name = "ChessMoves")]
pub struct Metrics {
    /// count of valid ping messages sent
    pub pings_sent: Counter,
    /// count of valid ping messages received
    pub pings_recv: Counter,
}
