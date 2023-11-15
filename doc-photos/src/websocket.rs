use std::collections::BTreeMap;

use anyhow::{anyhow, Context, Result};
use axum::extract::ws::{Message, WebSocket, WebSocketUpgrade};
use axum::extract::State;
use axum::response::IntoResponse;
use futures::stream::{SplitSink, SplitStream};
use futures::{SinkExt, StreamExt};
use iroh::bytes::Hash;
use iroh::net::key::PublicKey;
use iroh::sync::{ContentStatus, NamespaceId};
use iroh::sync_engine::LiveEvent;
use sentry::{Hub, SentryFutureExt};
use serde::{Deserialize, Serialize};
use serde_with::{serde_as, DisplayFromStr};
use time::OffsetDateTime as DateTime;
use tokio::sync::mpsc;
use tokio::task::JoinSet;
use tracing::{debug, error, info_span, warn, Instrument};

use crate::iroh::DocEntry;
use crate::AppState;

/// Finishes upgrading the websocket, handling the resulting websocket stream.
// #[axum_macros::debug_handler]
pub(crate) async fn ws_handler(
    ws: WebSocketUpgrade,
    State(state): State<AppState>,
) -> impl IntoResponse {
    ws.on_upgrade(|socket| run_websocket_connection(socket, state))
}

/// The set of messages we accept from websocket clients.
#[derive(Deserialize)]
#[serde(tag = "type", content = "payload")]
enum ClientMessage {
    DocSubscribe(DocSubscribeMessage),
    DocUnsubscribe(DocSubscribeMessage),
}

#[serde_as]
#[derive(Debug, Deserialize)]
struct DocSubscribeMessage {
    #[serde_as(as = "DisplayFromStr")]
    doc_id: NamespaceId,
}

/// The set of possible mesages the server will send to clients.
///
/// These messages tie directly into the react-redux actions client-side
/// <https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow#actions>
#[derive(Serialize)]
#[serde(tag = "type", content = "payload")]
enum ServerMessage {
    IrohProviderEvent(IrohProviderMessage),
    DocumentInsertLocal(InsertLocalMessage),
    DocumentInsertRemote(InsertRemoteMessage),
    DocumentContentReady(ContentReadyMessage),
    DocumentSyncFinished(SyncFinishedMessage),
    DocumentNeighborUp(DocNeighborMessage),
    DocumentNeighborDown(DocNeighborMessage),
}

#[serde_as]
#[derive(Serialize)]
struct InsertLocalMessage {
    #[serde_as(as = "DisplayFromStr")]
    doc_id: NamespaceId,
    entry: DocEntry,
}

#[serde_as]
#[derive(Serialize)]
struct InsertRemoteMessage {
    #[serde_as(as = "DisplayFromStr")]
    doc_id: NamespaceId,
    #[serde_as(as = "DisplayFromStr")]
    peer: PublicKey,
    entry: DocEntry,
    content_status: ContentStatus,
}

#[serde_as]
#[derive(Serialize)]
struct ContentReadyMessage {
    #[serde_as(as = "DisplayFromStr")]
    doc_id: NamespaceId,
    #[serde_as(as = "DisplayFromStr")]
    hash: Hash,
}

#[serde_as]
#[derive(Serialize)]
struct SyncFinishedMessage {
    #[serde_as(as = "DisplayFromStr")]
    doc_id: NamespaceId,
    #[serde_as(as = "DisplayFromStr")]
    peer: PublicKey,
}

#[serde_as]
#[derive(Serialize)]
struct DocNeighborMessage {
    #[serde_as(as = "DisplayFromStr")]
    doc_id: NamespaceId,
    #[serde_as(as = "DisplayFromStr")]
    peer: PublicKey,
}

#[serde_as]
#[derive(Serialize)]
struct DocIdMessage {
    #[serde_as(as = "DisplayFromStr")]
    doc_id: NamespaceId,
}

/// The (de)serialisable type for [`ConnectionType`].
///
/// [`ConnectionType`]: iroh::net::magicsock::ConnectionType
#[derive(Serialize)]
enum ConnectionTypeMsg {
    Direct { addr: SocketAddrMsg },
    Relay { port: u16 },
    Mixed { addr: SocketAddrMsg, region: u16 },
    None,
}

impl From<iroh::net::magicsock::ConnectionType> for ConnectionTypeMsg {
    fn from(value: iroh::net::magicsock::ConnectionType) -> Self {
        match value {
            iroh::net::magicsock::ConnectionType::Direct(addr) => {
                ConnectionTypeMsg::Direct { addr: addr.into() }
            }
            iroh::net::magicsock::ConnectionType::Relay(region) => {
                ConnectionTypeMsg::Relay { port: region }
            }
            iroh::net::magicsock::ConnectionType::Mixed(addr, region) => ConnectionTypeMsg::Mixed {
                addr: addr.into(),
                region,
            },
            iroh::net::magicsock::ConnectionType::None => ConnectionTypeMsg::None,
        }
    }
}

/// The (de)serialisable format for [`ConnectionInfo`].
///
/// [`ConnectionInfo`]: iroh::net::magic_endpoint::ConnectionInfo
#[serde_as]
#[derive(Serialize)]
struct ConnectionInfoMsg {
    id: u64,
    #[serde_as(as = "DisplayFromStr")]
    peer: PublicKey,
    derp_region: Option<u16>,
    addrs: Vec<SocketAddrMsg>,
    conn_type: ConnectionTypeMsg,
    /// Latency in seconds.
    latency: Option<f64>,
}

impl From<iroh::net::magic_endpoint::ConnectionInfo> for ConnectionInfoMsg {
    fn from(value: iroh::net::magic_endpoint::ConnectionInfo) -> Self {
        ConnectionInfoMsg {
            id: value.id as _,
            peer: value.public_key,
            derp_region: value.derp_region,
            addrs: value.addrs.iter().map(|dai| dai.addr.into()).collect(),
            conn_type: value.conn_type.into(),
            latency: value.latency.map(|l| l.as_secs_f64()),
        }
    }
}

/// The (de)serialisable format for [`SocketAddr`].
///
/// [`SocketAddr`]: std::net::SocketAddr
#[derive(Debug, Serialize)]
enum SocketAddrMsg {
    V4 { a: u8, b: u8, c: u8, d: u8 },
    V6 { addr: Vec<u8> },
}

impl From<std::net::SocketAddr> for SocketAddrMsg {
    fn from(value: std::net::SocketAddr) -> Self {
        match value {
            std::net::SocketAddr::V4(addr) => {
                let [a, b, c, d] = addr.ip().octets();
                SocketAddrMsg::V4 { a, b, c, d }
            }
            std::net::SocketAddr::V6(addr) => SocketAddrMsg::V6 {
                addr: addr.ip().octets().to_vec(),
            },
        }
    }
}

#[derive(Serialize)]
struct IrohProviderMessage {
    #[serde(rename = "type")]
    tipe: String,
    details: String,
    timestamp: i64,
}

#[derive(Debug, Serialize, Deserialize)]
pub(crate) struct AnchorTestRoom {
    test_id: String,
    participants: Vec<AnchorTestParticipant>,
    created_at: DateTime,
    updated_at: DateTime,
}

#[derive(Debug, Serialize, Deserialize)]
struct AnchorTestParticipant {
    name: String,
    pub_key: String,
    last_seen: DateTime,
    // #[serde(skip_serializing, skip_deserializing)]
    // ws: Option<UnboundedSender<axum::extract::ws::Message>>,
    // #[serde(skip_serializing, skip_deserializing)]
    // error_count: u32,
}

/// This runs one websocket connection.
///
/// Can be dropped and will release all resources.  This mostly runs all as chained futures,
/// any parallelism is accidental (see handling of the [`DocSubscribeMessage`] in
/// [`handle_ws_messages`]).
///
/// Normal termination is when the stream finishes or a close message was received in which
/// case the [`ws_sender`] will gracefull terminate and the other futures will be dropped.
/// However on errors with sending or receiving from the WebSocket stream this terminates
/// with an error return.  Likewise on error communicating with iroh this terminates with an
/// error.  The client is expected to re-create the websocket connection this case as we
/// currently do not send errors to individual websocket requests.
async fn run_websocket_connection(ws: WebSocket, state: AppState) {
    let (ws_sink, ws_stream) = ws.split();
    let (funnel_tx, funnel_rx) = mpsc::channel(32);

    let ws_sender = ws_sender(funnel_rx, ws_sink);
    let ws_handler = handle_ws_messages(state.clone(), funnel_tx.clone(), ws_stream);
    let events_proxy = provider_events_proxy(funnel_tx.clone(), state.clone());

    let ret = tokio::select! {
        biased;
        ret = ws_sender => ret,
        ret = ws_handler => ret,
        ret = events_proxy => ret,
    };
    match ret {
        Ok(()) => debug!("Websocket connection closed"),
        Err(err) => error!("Error in WebSocket handling: {err:#}"),
    }
}

/// Funnels [`IrohProviderMessage`]s over to the [`WebSocket`].
///
/// This is a future which only exists so we can have multiple independent writers to the
/// websocket.  They all write to the funnel mpsc channel and it is proxied to the websocket
/// here.
///
/// If there is an error writing to the websocket this future will terminate with an error.
///
/// Note that when this future completes, all funnel senders will have been dropped.  Normal
/// termination is by receiving the close message over the WebSocket after which this future
/// is dropped together with all funnel senders, so it never sees the closed funnel.
async fn ws_sender(
    mut funnel: mpsc::Receiver<ServerMessage>,
    mut ws_sink: SplitSink<WebSocket, Message>,
) -> Result<()> {
    while let Some(msg) = funnel.recv().await {
        let msg = serde_json::to_string(&msg).context("Error serialising json")?;
        ws_sink
            .send(Message::Text(msg))
            .await
            .context("Error sending over WebSocket")?;
    }
    debug!("WebSocket funnel sender stopped");
    Ok(())
}

/// Handles incoming WebSocket messages.
///
/// Terminates with `Ok` when the WebSocket stream ends.  Terminates with `Err` if there is
/// any error during the handling of messages.  Unrecognised or incorrectly formatted
/// messages are logged and ignored.
///
/// If dropped or cancelled all resources for this WebSocket are released.
async fn handle_ws_messages(
    state: AppState,
    funnel: mpsc::Sender<ServerMessage>,
    mut ws_stream: SplitStream<WebSocket>,
) -> Result<()> {
    let mut subscription_tasks = JoinSet::new();
    let mut subscription_handles = BTreeMap::new();

    while let Some(msg) = ws_stream.next().await {
        let ws_msg = msg.context("Error receiving WebSocket message")?;
        match ws_msg {
            Message::Text(msg) => {
                let msg: ClientMessage = match serde_json::from_str(msg.as_str()) {
                    Ok(msg) => msg,
                    Err(err) => {
                        error!("Error deserialising WebSocket message: {err:#}");
                        continue;
                    }
                };
                match msg {
                    ClientMessage::DocSubscribe(DocSubscribeMessage { doc_id }) => {
                        let handle = subscription_tasks.spawn(
                            run_doc_subscription(state.clone(), funnel.clone(), doc_id)
                                .instrument(info_span!("ws-doc-sub"))
                                .bind_hub(Hub::new_from_top(Hub::current())),
                        );
                        subscription_handles.insert(doc_id, handle);
                    }
                    ClientMessage::DocUnsubscribe(DocSubscribeMessage { doc_id }) => {
                        match subscription_handles.remove(&doc_id) {
                            Some(handle) => handle.abort(),
                            None => error!("DocUnsubscibe task AbortHandle not found"),
                        }
                    }
                }
            }
            Message::Binary(msg) => warn!("Received binary message: {msg:02X?}"),
            Message::Ping(_) | Message::Pong(_) => debug!("WebSocket ping/pong {ws_msg:02X?}"),
            Message::Close(msg) => {
                // tungstenite handles the reply.
                match msg {
                    Some(msg) => debug!(%msg.code, %msg.reason, "WebSocket received close"),
                    None => debug!("WebSocket received close"),
                }
                break;
            }
        }
    }
    debug!("WebSocket reader/message handler closed");
    Ok(())
}

/// Handles a single document subscription.
///
/// This is a long-running future spawned in a task.  It stays active until a matching
/// unsubscribe is received or an error occurs.  The normal way to terminate it is by
/// aborting the task, thus the future can be cancelled at any await point.
async fn run_doc_subscription(
    state: AppState,
    funnel: mpsc::Sender<ServerMessage>,
    doc_id: NamespaceId,
) -> Result<()> {
    let doc_events_sender = proxy_doc_events(state, funnel, doc_id);
    tokio::select! {
        biased;
        res = doc_events_sender => res,
    }
}

/// Future which subscribes to document events and sends them to the websocket.
///
/// Normally this would stop by being cancelled.
async fn proxy_doc_events(
    state: AppState,
    funnel: mpsc::Sender<ServerMessage>,
    doc_id: NamespaceId,
) -> Result<()> {
    tracing::debug!("proxying document events for doc {}", doc_id);
    let client = state.iroh();
    let doc = client
        .docs
        .open(doc_id)
        .await?
        .context("Document not found")?;
    let mut stream = doc.subscribe().await?;
    while let Some(event) = stream.next().await {
        let event = event?;
        let msg = match event {
            LiveEvent::InsertLocal { entry } => {
                ServerMessage::DocumentInsertLocal(InsertLocalMessage {
                    doc_id,
                    entry: entry.into(),
                })
            }
            LiveEvent::InsertRemote {
                entry,
                from,
                content_status,
            } => ServerMessage::DocumentInsertRemote(InsertRemoteMessage {
                doc_id,
                entry: entry.into(),
                peer: from,
                content_status,
            }),
            LiveEvent::ContentReady { hash } => {
                ServerMessage::DocumentContentReady(ContentReadyMessage { doc_id, hash })
            }
            LiveEvent::SyncFinished(event) => {
                ServerMessage::DocumentSyncFinished(SyncFinishedMessage {
                    doc_id,
                    peer: event.peer,
                })
            }
            LiveEvent::NeighborUp(public_key) => {
                ServerMessage::DocumentNeighborUp(DocNeighborMessage {
                    doc_id,
                    peer: public_key,
                })
            }
            LiveEvent::NeighborDown(public_key) => {
                ServerMessage::DocumentNeighborDown(DocNeighborMessage {
                    doc_id,
                    peer: public_key,
                })
            }
        };
        funnel.send(msg).await?;
    }

    // Since we keep the document open this stream should not end.
    Err(anyhow!("Document events stream ended"))
}

/// Proxies provider events to the websocket.
///
/// This runs infinitely or until an error occurs.  The normal termination is by dropping
/// this future, which is graceful on any await point.
async fn provider_events_proxy(funnel: mpsc::Sender<ServerMessage>, state: AppState) -> Result<()> {
    use iroh::bytes::provider::Event as ProviderEvent;
    use iroh::node::Event::ByteProvide;

    let mut provider_events = state.provider_events.subscribe();
    loop {
        let event = provider_events
            .recv()
            .await
            .context("Provider events sender stopped")?;
        // TODO: ProviderEvent::GetRequestReceived is ignored?
        let timestamp = DateTime::now_utc().unix_timestamp();
        let message = match event {
            ByteProvide(ProviderEvent::TaggedBlobAdded { hash, format, tag }) => {
                IrohProviderMessage {
                    tipe: "TaggedBlobAdded".into(),
                    details: format!("hash: {hash} format: {format:?} tag: {tag}"),
                    timestamp,
                }
            }
            ByteProvide(ProviderEvent::ClientConnected { .. }) => IrohProviderMessage {
                tipe: "ClientConnected".into(),
                details: "".into(),
                timestamp,
            },
            ByteProvide(ProviderEvent::GetRequestReceived { hash, .. }) => IrohProviderMessage {
                tipe: "GetRequestReceived".into(),
                details: format!("hash: {hash}"),
                timestamp,
            },
            ByteProvide(ProviderEvent::CustomGetRequestReceived { .. }) => IrohProviderMessage {
                tipe: "CustomGetRequestReceived".into(),
                details: "".into(),
                timestamp,
            },
            ByteProvide(ProviderEvent::TransferHashSeqStarted { .. }) => IrohProviderMessage {
                tipe: "TransferHashSeqStarted".into(),
                details: format!("{:?}", event),
                timestamp,
            },
            ByteProvide(ProviderEvent::TransferBlobCompleted { hash, size, .. }) => {
                IrohProviderMessage {
                    tipe: "TransferBlobCompleted".into(),
                    details: format!("hash: {} size: {}", hash, size),
                    timestamp,
                }
            }
            ByteProvide(ProviderEvent::TransferCompleted { .. }) => IrohProviderMessage {
                tipe: "TransferCompleted".into(),
                details: "".into(),
                timestamp,
            },
            ByteProvide(ProviderEvent::TransferAborted { .. }) => IrohProviderMessage {
                tipe: "TransferAborted".into(),
                details: "".into(),
                timestamp,
            },
            iroh::node::Event::Db(_) => continue,
        };
        funnel
            .send(ServerMessage::IrohProviderEvent(message))
            .await
            .context("Could not send ProviderEvent, receiver dropped")?;
    }
}
