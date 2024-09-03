use anyhow::{bail, ensure, Context, Result};
use bytes::Bytes;
use futures_lite::future::Boxed;
use futures_lite::{Stream, StreamExt};
use iroh::client::spaces::{EntryForm, Space, SpaceTicket};
use iroh::client::Iroh;
use iroh::net::ticket::NodeTicket;
use iroh::net::NodeAddr;
use iroh::node::ProtocolHandler;
use iroh::spaces::interest::RestrictArea;
use iroh::spaces::proto::data_model::{AuthorisedEntry, Component, Entry, Path};
use iroh::spaces::proto::grouping::{Area, Range, Range3d};
use iroh::spaces::proto::keys::{NamespaceKind, UserId};
use iroh::spaces::proto::meadowcap::AccessMode;
use iroh::spaces::session::SessionMode;
use iroh::spaces::store::traits::StoreEvent;
use serde::{Deserialize, Serialize};
use std::collections::{btree_map, BTreeMap};
use std::str::FromStr;
use std::sync::Arc;
use tokio::task::JoinSet;

/// Todo in a list of todos.
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Todo {
    /// String id
    pub id: String,
    /// Description of the todo
    /// Limited to 2000 characters
    pub label: String,
    /// Record creation timestamp. Counted as micros since the Unix epoch.
    pub created: u64,
    /// Whether or not the todo has been completed. Done todos will show up in the todo list until
    /// they are archived.
    pub done: bool,
    /// Indicates whether or not the todo is tombstoned
    pub is_delete: bool,
}

impl Todo {
    fn from_bytes(bytes: Bytes) -> anyhow::Result<Self> {
        let todo = serde_json::from_slice(&bytes).context("invalid json")?;
        Ok(todo)
    }

    fn as_bytes(&self) -> anyhow::Result<Bytes> {
        let buf = serde_json::to_vec(self)?;
        ensure!(buf.len() < MAX_TODO_SIZE, "todo too large");
        Ok(buf.into())
    }

    fn missing_todo(id: String) -> Self {
        Self {
            label: String::from("Missing Content"),
            created: 0,
            done: false,
            is_delete: false,
            id,
        }
    }
}

const MAX_TODO_SIZE: usize = 2 * 1024;
const MAX_LABEL_LEN: usize = 2 * 1000;

/// List of todos, including completed todos that have not been archived
pub struct Todos {
    node: Iroh,
    space: Space,
    user: UserId,
    tasks: JoinSet<Result<()>>,
}

impl Todos {
    pub async fn new(
        node_ticket: Option<String>,
        node: Iroh,
        endpoint: iroh::net::Endpoint,
    ) -> anyhow::Result<Self> {
        let user = node.spaces().create_user().await?;

        let (space, tasks) = match node_ticket {
            None => (
                node.spaces().create(NamespaceKind::Owned, user).await?,
                JoinSet::new(),
            ),
            Some(node_ticket) => {
                let node_addr = NodeTicket::from_str(&node_ticket)?.node_addr().clone();
                let ticket = CapExchangeProtocol::request(&endpoint, node_addr, user).await?;
                println!("Importing & Syncing");
                let (space, mut sync) = node
                    .spaces()
                    .import_and_sync(ticket, SessionMode::Continuous)
                    .await?;
                let mut tasks = JoinSet::new();
                tasks.spawn(async move {
                    while let Some(ev) = sync.next().await {
                        println!("=== SYNC EVENT === {ev:?}");
                    }
                    anyhow::Ok(())
                });
                (space, tasks)
            }
        };

        Ok(Todos {
            node,
            user,
            space,
            tasks,
        })
    }

    pub async fn ticket(&self) -> Result<String> {
        Ok(NodeTicket::new(self.node.net().node_addr().await?)?.to_string())
    }

    pub async fn share_ticket(&self, user: UserId) -> Result<SpaceTicket> {
        self.space
            .share(user, AccessMode::Write, RestrictArea::None)
            .await
    }

    pub async fn doc_subscribe(&self) -> Result<impl Stream<Item = Result<StoreEvent>>> {
        let stream = self
            .space
            .subscribe_area(Area::new_full(), Default::default())
            .await?;
        Ok(stream)
    }

    pub async fn add(&mut self, id: String, label: String) -> anyhow::Result<()> {
        if label.len() > MAX_LABEL_LEN {
            bail!("label is too long, max size is {MAX_LABEL_LEN} characters");
        }
        let created = std::time::SystemTime::now()
            .duration_since(std::time::SystemTime::UNIX_EPOCH)
            .expect("time drift")
            .as_secs();
        let todo = Todo {
            label,
            created,
            done: false,
            is_delete: false,
            id: id.clone(),
        };
        self.insert_bytes(id.as_bytes(), todo.as_bytes()?).await
    }

    pub async fn toggle_done(&mut self, id: String) -> anyhow::Result<()> {
        let mut todo = self.get_todo(id.clone()).await?;
        todo.done = !todo.done;
        self.update_todo(id.as_bytes(), todo).await
    }

    pub async fn delete(&mut self, id: String) -> anyhow::Result<()> {
        let mut todo = self.get_todo(id.clone()).await?;
        todo.is_delete = true;
        self.update_todo(id.as_bytes(), todo).await
    }

    pub async fn update(&mut self, id: String, label: String) -> anyhow::Result<()> {
        if label.len() >= MAX_LABEL_LEN {
            bail!("label is too long, must be {MAX_LABEL_LEN} or shorter");
        }
        let mut todo = self.get_todo(id.clone()).await?;
        todo.label = label;
        self.update_todo(id.as_bytes(), todo).await
    }

    pub async fn get_todos(&self) -> anyhow::Result<Vec<Todo>> {
        let mut entries = self.space.get_many(Range3d::new_full()).await?;

        let mut todos = BTreeMap::<String, (Entry, Todo)>::new();
        while let Some(entry) = entries.next().await {
            let (entry, _) = entry?.into_parts();
            let todo = self.todo_from_entry(&entry).await?;
            if !todo.is_delete {
                match todos.entry(todo.id.clone()) {
                    btree_map::Entry::Occupied(mut curr) => {
                        if !curr.get().0.is_newer_than(&entry) {
                            *curr.get_mut() = (entry, todo);
                        }
                    }
                    btree_map::Entry::Vacant(space) => {
                        space.insert((entry, todo));
                    }
                }
            }
        }

        let mut todos = todos
            .into_values()
            .map(|(_, todo)| todo)
            .collect::<Vec<_>>();
        todos.sort_by_key(|todo| todo.created);
        Ok(todos)
    }

    async fn insert_bytes(&self, key: impl AsRef<[u8]>, content: Bytes) -> anyhow::Result<()> {
        self.space
            .insert_bytes(
                EntryForm::new(self.user, Self::to_willow_path(key)?),
                content,
            )
            .await?;
        Ok(())
    }

    async fn update_todo(&mut self, key: impl AsRef<[u8]>, todo: Todo) -> anyhow::Result<()> {
        let content = todo.as_bytes()?;
        self.insert_bytes(key, content).await
    }

    async fn get_todo(&self, id: String) -> anyhow::Result<Todo> {
        let entry = self
            .space
            .get_many(Range3d::new(
                Range::full(),
                Range::new_open(Self::to_willow_path(&id)?),
                Range::full(),
            ))
            .await?
            .next()
            .await
            .ok_or_else(|| anyhow::anyhow!("no todo found"))??;

        self.todo_from_entry(&entry.into_parts().0).await
    }

    async fn todo_from_entry(&self, entry: &Entry) -> anyhow::Result<Todo> {
        let key_component = entry
            .path()
            .get_component(0)
            .ok_or_else(|| anyhow::anyhow!("path component missing"))?;
        let id = String::from_utf8(key_component.to_vec()).context("invalid key")?;
        let digest = entry.payload_digest();
        match self.node.blobs().read_to_bytes(digest.0).await {
            Ok(b) => Todo::from_bytes(b),
            Err(_) => Ok(Todo::missing_todo(id)),
        }
    }

    fn to_willow_path(key: impl AsRef<[u8]>) -> anyhow::Result<Path> {
        Ok(Path::new_singleton(
            Component::new(key.as_ref()).ok_or_else(|| anyhow::anyhow!("invalid component"))?,
        )?)
    }
}

type GetTicketFn = Arc<dyn Fn(UserId) -> Boxed<Result<SpaceTicket>> + Send + Sync + 'static>;

#[derive(derive_more::Debug)]
pub struct CapExchangeProtocol {
    #[debug(skip)]
    build_ticket: GetTicketFn,
}

impl CapExchangeProtocol {
    pub const ALPN: &'static [u8] = b"iroh-tauri-todos/cap-request/0";

    pub fn new(
        build_ticket: impl Fn(UserId) -> Boxed<Result<SpaceTicket>> + Send + Sync + 'static,
    ) -> Arc<Self> {
        Arc::new(Self {
            build_ticket: Arc::new(build_ticket),
        })
    }

    pub async fn request(
        endpoint: &iroh::net::Endpoint,
        node_addr: NodeAddr,
        user: UserId,
    ) -> Result<SpaceTicket> {
        println!("Requesting caps from {}", node_addr.node_id.fmt_short());
        let conn = endpoint
            .connect(node_addr, CapExchangeProtocol::ALPN)
            .await?;
        let (mut send, mut recv) = conn.open_bi().await?;
        send.write_all(user.as_bytes()).await?;
        send.finish()?;
        println!("Sent request");
        let ticket_bytes = recv.read_to_end(1024 * 10).await?;
        let ticket: SpaceTicket = postcard::from_bytes(&ticket_bytes)?;
        println!("Received ticket");
        conn.close(0u32.into(), b"thanks for the ticket!");
        Ok(ticket)
    }

    pub async fn respond(self: Arc<Self>, conn: iroh::net::endpoint::Connecting) -> Result<()> {
        let conn = conn.await?;

        let (mut send, mut recv) = conn.accept_bi().await?;

        let bytes: [u8; 32] = recv
            .read_to_end(1000)
            .await?
            .try_into()
            .map_err(|v: Vec<u8>| anyhow::anyhow!("Expected 32 bytes, but got {}", v.len()))?;
        let user_id = UserId::from(bytes);
        println!("Got incoming cap request from {user_id}");

        let ticket = (self.build_ticket)(user_id).await?;
        let ticket_bytes = postcard::to_allocvec(&ticket)?;
        send.write_all(&ticket_bytes).await?;
        send.finish()?;
        println!("Sent ticket");

        let close = conn.closed().await;
        println!("conn closed: {close:?}");

        Ok(())
    }
}

impl ProtocolHandler for CapExchangeProtocol {
    fn accept(self: Arc<Self>, conn: iroh::net::endpoint::Connecting) -> Boxed<Result<()>> {
        Box::pin(self.respond(conn))
    }
}
