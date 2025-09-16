use anyhow::Result;
use async_channel::Sender;
use iroh::discovery::DiscoveryItem;
use iroh::node_info::NodeData;
use iroh::{
    Endpoint, NodeId,
    endpoint::Connection,
    protocol::{AcceptError, ProtocolHandler, Router},
};
use n0_future::{Stream, StreamExt, boxed::BoxStream, task};
use serde::{Deserialize, Serialize};
use tokio::sync::broadcast;
use tokio_stream::wrappers::BroadcastStream;
use tracing::info;

#[derive(Debug, Clone)]
pub struct EchoNode {
    router: Router,
    accept_events: broadcast::Sender<AcceptEvent>,
}

impl EchoNode {
    pub async fn spawn() -> Result<Self> {
        let endpoint = iroh::Endpoint::builder()
            .discovery_n0()
            .alpns(vec![Echo::ALPN.to_vec()])
            .bind()
            .await?;
        let (event_sender, _event_receiver) = broadcast::channel(128);
        let echo = Echo::new(event_sender.clone());
        let router = Router::builder(endpoint).accept(Echo::ALPN, echo).spawn();
        Ok(Self {
            router,
            accept_events: event_sender,
        })
    }

    pub fn endpoint(&self) -> &Endpoint {
        self.router.endpoint()
    }

    pub fn accept_events(&self) -> BoxStream<AcceptEvent> {
        let receiver = self.accept_events.subscribe();
        Box::pin(BroadcastStream::new(receiver).filter_map(|event| event.ok()))
    }

    pub fn connect(
        &self,
        node_id: NodeId,
        payload: String,
    ) -> impl Stream<Item = ConnectEvent> + Unpin + use<> {
        let (event_sender, event_receiver) = async_channel::bounded(16);
        let endpoint = self.router.endpoint().clone();
        task::spawn(async move {
            let res = connect(&endpoint, node_id, payload, event_sender.clone()).await;
            let error = res.as_ref().err().map(|err| err.to_string());
            event_sender.send(ConnectEvent::Closed { error }).await.ok();
        });
        Box::pin(event_receiver)
    }

    pub fn publish(&self, data: NodeData) {
        let endpoint = self.router.endpoint();
        if let Some(ref dis) = endpoint.discovery() {
            dis.publish(&data)
        };
    }

    // pub fn subscribe(&self) -> Option<BoxStream<DiscoveryItem>> {
    //     let endpoint = self.router.endpoint();
    //     if let Some(ref discovery) = endpoint.discovery() {
    //         // Return the discovery stream directly
    //         discovery.subscribe()
    //     } else {
    //         None
    //     }
    // }

    // // Or if you want to process the discoveries:
    // pub fn subscribe_and_process(&self) -> Option<impl Stream<Item = DiscoveryItem>> {
    //     let endpoint = self.router.endpoint();
    //     if let Some(ref discovery) = endpoint.discovery() {
    //         let stream = discovery.subscribe()?;
    //         // Process each discovered item
    //         Some(stream.map(|item| {
    //             info!(
    //                 "Discovered peer: {} from {}",
    //                 item.node_id().fmt_short(),
    //                 item.provenance()
    //             );
    //             item
    //         }))
    //     } else {
    //         None
    //     }
    // }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "type", rename_all = "camelCase")]
pub enum ConnectEvent {
    Connected,
    Sent { bytes_sent: u64 },
    Received { bytes_received: u64 },
    Closed { error: Option<String> },
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "type", rename_all = "camelCase")]
pub enum AcceptEvent {
    Accepted {
        node_id: NodeId,
    },
    Echoed {
        node_id: NodeId,
        bytes_sent: u64,
    },
    Closed {
        node_id: NodeId,
        error: Option<String>,
    },
}

#[derive(Debug, Clone)]
pub struct Echo {
    event_sender: broadcast::Sender<AcceptEvent>,
}

impl Echo {
    pub const ALPN: &[u8] = b"iroh/example-browser-echo/0";
    pub fn new(event_sender: broadcast::Sender<AcceptEvent>) -> Self {
        Self { event_sender }
    }
}

impl Echo {
    async fn handle_connection(
        self,
        connection: Connection,
    ) -> std::result::Result<(), AcceptError> {
        // Wait for the connection to be fully established.
        let node_id = connection.remote_node_id()?;
        self.event_sender
            .send(AcceptEvent::Accepted { node_id })
            .ok();
        let res = self.handle_connection_0(&connection).await;
        let error = res.as_ref().err().map(|err| err.to_string());
        self.event_sender
            .send(AcceptEvent::Closed { node_id, error })
            .ok();
        res
    }
    async fn handle_connection_0(
        &self,
        connection: &Connection,
    ) -> std::result::Result<(), AcceptError> {
        // We can get the remote's node id from the connection.
        let node_id = connection.remote_node_id()?;
        info!("Accepted connection from {node_id}");

        // Our protocol is a simple request-response protocol, so we expect the
        // connecting peer to open a single bi-directional stream.
        let (mut send, mut recv) = connection.accept_bi().await?;

        // Echo any bytes received back directly.
        let bytes_sent = tokio::io::copy(&mut recv, &mut send).await?;
        info!("Copied over {bytes_sent} byte(s)");
        self.event_sender
            .send(AcceptEvent::Echoed {
                node_id,
                bytes_sent,
            })
            .ok();

        // By calling `finish` on the send stream we signal that we will not send anything
        // further, which makes the receive stream on the other end terminate.
        send.finish()?;

        // Wait until the remote closes the connection, which it does once it
        // received the response.
        connection.closed().await;
        Ok(())
    }
}

impl ProtocolHandler for Echo {
    /// The `accept` method is called for each incoming connection for our ALPN.
    ///
    /// The returned future runs on a newly spawned tokio task, so it can run as long as
    /// the connection lasts.
    async fn accept(&self, connection: Connection) -> std::result::Result<(), AcceptError> {
        self.clone().handle_connection(connection).await
    }
}

async fn connect(
    endpoint: &Endpoint,
    node_id: NodeId,
    payload: String,
    event_sender: Sender<ConnectEvent>,
) -> Result<()> {
    let connection = endpoint.connect(node_id, Echo::ALPN).await?;
    event_sender.send(ConnectEvent::Connected).await?;
    let (mut send_stream, mut recv_stream) = connection.open_bi().await?;
    let send_task = task::spawn({
        let event_sender = event_sender.clone();
        async move {
            let bytes_sent = payload.len();
            send_stream.write_all(payload.as_bytes()).await?;
            event_sender
                .send(ConnectEvent::Sent {
                    bytes_sent: bytes_sent as u64,
                })
                .await?;
            anyhow::Ok(())
        }
    });
    let n = tokio::io::copy(&mut recv_stream, &mut tokio::io::sink()).await?;
    // We know we received the last data, so we close the connection.
    connection.close(1u8.into(), b"done");
    event_sender
        .send(ConnectEvent::Received {
            bytes_received: n as u64,
        })
        .await?;
    send_task.await??;
    Ok(())
}
