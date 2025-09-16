use anyhow::Result;
use async_channel::Sender;
use iroh::discovery::DiscoveryItem;
use iroh::node_info::NodeData;
use iroh::{
    Endpoint, NodeId, TransportMode,
    endpoint::Connection,
    protocol::{AcceptError, ProtocolHandler, Router},
};
use n0_future::{Stream, StreamExt, boxed::BoxStream, task};
use serde::{Deserialize, Serialize};
use tokio::io::{AsyncReadExt, AsyncWriteExt};
use tokio::sync::broadcast;
use tokio_stream::wrappers::BroadcastStream;
use tracing::info;

#[derive(Debug, Clone)]
pub struct EchoNode {
    router: Router,
    accept_events: broadcast::Sender<AcceptEvent>,
}

impl EchoNode {
    pub async fn spawn(transport: TransportMode) -> Result<Self> {
        let endpoint = iroh::Endpoint::builder()
            .discovery_n0()
            .alpns(vec![Echo::ALPN.to_vec()])
            .bind_transport(transport)
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

    // New method for persistent connection
    pub fn connect_persistent(
        &self,
        node_id: NodeId,
    ) -> impl Stream<Item = ConnectEvent> + Unpin + use<> {
        let (event_sender, event_receiver) = async_channel::bounded(16);
        let endpoint = self.router.endpoint().clone();
        task::spawn(async move {
            let res = connect_persistent(&endpoint, node_id, event_sender.clone()).await;
            let error = res.as_ref().err().map(|err| err.to_string());
            event_sender.send(ConnectEvent::Closed { error }).await.ok();
        });
        Box::pin(event_receiver)
    }

    // Original connect method (kept for compatibility)
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

    // pub fn subscribe(&self) -> Option<BoxStream<DiscoveryEvent>> {
    //     let endpoint = self.router.endpoint();
    //     if let Some(ref discovery) = endpoint.discovery() {
    //         discovery.subscribe()
    //     } else {
    //         None
    //     }
    // }

    // pub fn subscribe_and_process(&self) -> Option<impl Stream<Item = DiscoveryEvent>> {
    //     let endpoint = self.router.endpoint();
    //     if let Some(ref discovery) = endpoint.discovery() {
    //         let stream = discovery.subscribe()?;
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
    KeepAlive, // New event for persistent connections
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
    StreamData {
        node_id: NodeId,
        bytes_received: u64,
    }, // New event for streaming data
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
        let node_id = connection.remote_node_id()?;
        self.event_sender
            .send(AcceptEvent::Accepted { node_id })
            .ok();
        let res = self.handle_connection_streaming(&connection).await;
        let error = res.as_ref().err().map(|err| err.to_string());
        self.event_sender
            .send(AcceptEvent::Closed { node_id, error })
            .ok();
        res
    }

    // New streaming handler that doesn't close immediately
    async fn handle_connection_streaming(
        &self,
        connection: &Connection,
    ) -> std::result::Result<(), AcceptError> {
        let node_id = connection.remote_node_id()?;
        info!("Accepted streaming connection from {node_id}");

        let (mut send, mut recv) = connection.accept_bi().await?;

        // Keep reading and echoing data until the connection is closed
        loop {
            let mut buffer = [0u8; 1024];
            match recv.read(&mut buffer).await {
                Ok(bytes_read) => {
                    match bytes_read {
                        None => {}
                        Some(0) => {
                            info!("Connection closed by peer {node_id}");
                            break;
                        }
                        Some(bytes_read) => {
                            // Echo the data back
                            if let Err(e) = send.write_all(&buffer[..bytes_read]).await {
                                info!("Failed to write to {node_id}: {e}");
                                break;
                            }

                            self.event_sender
                                .send(AcceptEvent::StreamData {
                                    node_id,
                                    bytes_received: bytes_read as u64,
                                })
                                .ok();

                            info!("Streamed {} bytes with {node_id}", bytes_read);
                        }
                    }
                }
                Err(e) => {
                    info!("Read error from {node_id}: {e}");
                    break;
                }
            }
        }

        Ok(())
    }

    // Original echo handler (kept for compatibility)
    async fn handle_connection_0(
        &self,
        connection: &Connection,
    ) -> std::result::Result<(), AcceptError> {
        let node_id = connection.remote_node_id()?;
        info!("Accepted connection from {node_id}");

        let (mut send, mut recv) = connection.accept_bi().await?;
        let bytes_sent = tokio::io::copy(&mut recv, &mut send).await?;
        info!("Copied over {bytes_sent} byte(s)");
        self.event_sender
            .send(AcceptEvent::Echoed {
                node_id,
                bytes_sent,
            })
            .ok();

        send.finish()?;
        connection.closed().await;
        Ok(())
    }
}

impl ProtocolHandler for Echo {
    async fn accept(&self, connection: Connection) -> std::result::Result<(), AcceptError> {
        self.clone().handle_connection(connection).await
    }
}

// New persistent connection function
async fn connect_persistent(
    endpoint: &Endpoint,
    node_id: NodeId,
    event_sender: Sender<ConnectEvent>,
) -> Result<()> {
    //Here connection is established
    let connection = endpoint.connect(node_id, Echo::ALPN).await?;

    event_sender.send(ConnectEvent::Connected).await?;

    let (mut send_stream, mut recv_stream) = connection.open_bi().await?;

    // Send data continuously
    let send_task = task::spawn({
        let event_sender = event_sender.clone();
        async move {
            let mut counter = 0;
            loop {
                counter += 1;
                let timestamp = std::time::SystemTime::now()
                    .duration_since(std::time::UNIX_EPOCH)?
                    .as_secs();
                let message = format!(
                    "Stream message #{} at {}: {}",
                    counter,
                    timestamp,
                    "x".repeat(20)
                );

                match send_stream.write_all(message.as_bytes()).await {
                    Ok(()) => {
                        event_sender
                            .send(ConnectEvent::Sent {
                                bytes_sent: message.len() as u64,
                            })
                            .await?;
                        info!("Sent stream message #{}", counter);
                    }
                    Err(e) => {
                        info!("Send error: {e}");
                        break;
                    }
                }

                tokio::time::sleep(std::time::Duration::from_secs(2)).await;
            }
            anyhow::Ok(())
        }
    });

    // Receive echoed data continuously
    let recv_task = task::spawn({
        let event_sender = event_sender.clone();
        async move {
            let mut buffer = [0u8; 1024];
            loop {
                match recv_stream.read(&mut buffer).await {
                    Ok(bytes_read) => match bytes_read {
                        None => {}
                        Some(0) => {
                            info!("Receive stream ended");
                            break;
                        }
                        Some(bytes_read) => {
                            event_sender
                                .send(ConnectEvent::Received {
                                    bytes_received: bytes_read as u64,
                                })
                                .await?;
                            info!("Received {} bytes back", bytes_read);
                        }
                    },
                    Err(e) => {
                        info!("Receive error: {e}");
                        break;
                    }
                }
            }
            anyhow::Ok(())
        }
    });

    // Wait for either task to complete (connection closed or error)
    tokio::select! {
        result = send_task => {
            info!("Send task completed: {:?}", result);
        }
        result = recv_task => {
            info!("Receive task completed: {:?}", result);
        }
    }

    Ok(())
}

// Original connect function (kept for compatibility)
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
    // REMOVED: connection.close(1u8.into(), b"done"); // This was closing the connection!
    event_sender
        .send(ConnectEvent::Received {
            bytes_received: n as u64,
        })
        .await?;
    send_task.await??;
    Ok(())
}
