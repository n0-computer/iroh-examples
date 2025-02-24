use std::{
    collections::BTreeSet,
    sync::{Arc, Mutex},
};

use anyhow::Result;
use chat_shared::{ChatSender, ChatTicket, NodeId, TopicId};
use n0_future::{time::Duration, StreamExt};
use serde::{Deserialize, Serialize};
use tracing::level_filters::LevelFilter;
use tracing_subscriber_wasm::MakeConsoleWriter;
use wasm_bindgen::{prelude::wasm_bindgen, JsError, JsValue};
use wasm_streams::ReadableStream;

#[wasm_bindgen(start)]
fn start() {
    console_error_panic_hook::set_once();

    tracing_subscriber::fmt()
        .with_max_level(LevelFilter::DEBUG)
        .with_writer(
            // To avoide trace events in the browser from showing their JS backtrace
            MakeConsoleWriter::default().map_trace_level_to(tracing::Level::DEBUG),
        )
        // If we don't do this in the browser, we get a runtime error.
        .without_time()
        .with_ansi(false)
        .init();

    tracing::info!("(testing logging) Logging setup");
}

/// Node for chatting over iroh-gossip
#[wasm_bindgen]
pub struct ChatNode(chat_shared::ChatNode);

#[wasm_bindgen]
impl ChatNode {
    /// Spawns a gossip node.
    pub async fn spawn() -> Result<Self, JsError> {
        let inner = chat_shared::ChatNode::spawn(None)
            .await
            .map_err(to_js_err)?;
        Ok(Self(inner))
    }

    /// Returns the node id of this node.
    pub fn node_id(&self) -> String {
        self.0.node_id().to_string()
    }

    /// Returns information about all the remote nodes this [`Endpoint`] knows about.
    pub fn remote_info(&self) -> Vec<JsValue> {
        self.0
            .remote_info()
            .into_iter()
            .map(|value| serde_wasm_bindgen::to_value(&value).unwrap())
            .collect()
    }

    /// Opens a chat.
    pub fn create(&self, nickname: String) -> Result<Channel, JsError> {
        // let ticket = ChatTicket::new(topic);
        let ticket = ChatTicket::new_random();
        self.join_inner(ticket, nickname)
    }

    /// Joins a chat.
    pub fn join(&self, ticket: String, nickname: String) -> Result<Channel, JsError> {
        let ticket = ChatTicket::deserialize(&ticket).map_err(to_js_err)?;
        self.join_inner(ticket, nickname)
    }

    fn join_inner(&self, ticket: ChatTicket, nickname: String) -> Result<Channel, JsError> {
        let (sender, receiver) = self.0.join(&ticket, nickname).map_err(to_js_err)?;
        let sender = ChannelSender(sender);
        let neighbors = Arc::new(Mutex::new(BTreeSet::new()));
        let neighbors2 = neighbors.clone();
        let receiver = receiver.map(move |event| {
            if let Ok(event) = &event {
                match event {
                    chat_shared::Event::Joined { neighbors } => {
                        neighbors2.lock().unwrap().extend(neighbors.iter().cloned());
                    }
                    chat_shared::Event::NeighborUp { node_id } => {
                        neighbors2.lock().unwrap().insert(*node_id);
                    }
                    chat_shared::Event::NeighborDown { node_id } => {
                        neighbors2.lock().unwrap().remove(node_id);
                    }
                    _ => {}
                }
            }
            event
                .map_err(|err| JsValue::from(&err.to_string()))
                .map(|event| serde_wasm_bindgen::to_value(&event).unwrap())
        });
        let receiver = ReadableStream::from_stream(receiver).into_raw();

        // Add ourselves to the ticket.
        let mut ticket = ticket;
        ticket.bootstrap.insert(self.0.node_id());
        // ticket.bootstrap = [self.0.node_id()].into_iter().collect();

        let topic = Channel {
            topic_id: ticket.topic_id,
            bootstrap: ticket.bootstrap,
            neighbors,
            me: self.0.node_id(),
            sender,
            receiver,
        };
        Ok(topic)
    }
}

type ChannelReceiver = wasm_streams::readable::sys::ReadableStream;

#[wasm_bindgen]
pub struct Channel {
    topic_id: TopicId,
    me: NodeId,
    bootstrap: BTreeSet<NodeId>,
    neighbors: Arc<Mutex<BTreeSet<NodeId>>>,
    sender: ChannelSender,
    receiver: ChannelReceiver,
}

#[wasm_bindgen]
impl Channel {
    #[wasm_bindgen(getter)]
    pub fn sender(&self) -> ChannelSender {
        self.sender.clone()
    }

    #[wasm_bindgen(getter)]
    pub fn receiver(&mut self) -> ChannelReceiver {
        self.receiver.clone()
    }

    pub fn ticket(&self, opts: JsValue) -> Result<String, JsError> {
        let opts: TicketOpts = serde_wasm_bindgen::from_value(opts)?;
        let mut ticket = ChatTicket::new(self.topic_id);
        if opts.include_myself {
            ticket.bootstrap.insert(self.me);
        }
        if opts.include_bootstrap {
            ticket.bootstrap.extend(self.bootstrap.iter().copied());
        }
        if opts.include_neighbors {
            let neighbors = self.neighbors.lock().unwrap();
            ticket.bootstrap.extend(neighbors.iter().copied())
        }
        tracing::info!("opts {:?} ticket {:?}", opts, ticket);
        Ok(ticket.serialize())
    }

    pub fn id(&self) -> String {
        self.topic_id.to_string()
    }

    pub fn neighbors(&self) -> Vec<String> {
        self.neighbors
            .lock()
            .unwrap()
            .iter()
            .map(|x| x.to_string())
            .collect()
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PeerInfo {
    pub node_id: NodeId,
    pub nickname: String,
    pub last_active: Duration,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct TicketOpts {
    pub include_myself: bool,
    pub include_bootstrap: bool,
    pub include_neighbors: bool,
}

#[wasm_bindgen]
#[derive(Debug, Clone)]
pub struct ChannelSender(ChatSender);

#[wasm_bindgen]
impl ChannelSender {
    pub async fn broadcast(&self, text: String) -> Result<(), JsError> {
        self.0.send(text).await.map_err(to_js_err)?;
        Ok(())
    }

    pub fn set_nickame(&self, nickname: String) {
        self.0.set_nickname(nickname);
    }
}

fn to_js_err(err: impl Into<anyhow::Error>) -> JsError {
    let err: anyhow::Error = err.into();
    JsError::new(&err.to_string())
}
