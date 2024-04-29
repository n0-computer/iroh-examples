use std::str::FromStr;

use anyhow::{bail, ensure, Context, Result};
use bytes::Bytes;
use futures_lite::{Stream, StreamExt};
use iroh::client::{
    mem::{Doc, Iroh},
    Entry, LiveEvent,
};
use iroh::rpc_protocol::{DocTicket, ShareMode};
use iroh::sync::AuthorId;
use serde::{Deserialize, Serialize};

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
    doc: Doc,
    ticket: DocTicket,
    author: AuthorId,
}

impl Todos {
    pub async fn new(ticket: Option<String>, node: Iroh) -> anyhow::Result<Self> {
        let author = node.authors.create().await?;

        let doc = match ticket {
            None => node.docs.create().await?,
            Some(ticket) => {
                let ticket = DocTicket::from_str(&ticket)?;
                node.docs.import(ticket).await?
            }
        };

        let ticket = doc.share(ShareMode::Write, Default::default()).await?;

        Ok(Todos {
            node,
            author,
            doc,
            ticket,
        })
    }

    pub fn ticket(&self) -> String {
        self.ticket.to_string()
    }

    pub async fn doc_subscribe(&self) -> Result<impl Stream<Item = Result<LiveEvent>>> {
        self.doc.subscribe().await
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
        let mut entries = self
            .doc
            .get_many(iroh::sync::store::Query::single_latest_per_key())
            .await?;

        let mut todos = Vec::new();
        while let Some(entry) = entries.next().await {
            let entry = entry?;
            let todo = self.todo_from_entry(&entry).await?;
            if !todo.is_delete {
                todos.push(todo);
            }
        }
        todos.sort_by_key(|t| t.created);
        Ok(todos)
    }

    async fn insert_bytes(&self, key: impl AsRef<[u8]>, content: Bytes) -> anyhow::Result<()> {
        self.doc
            .set_bytes(self.author, key.as_ref().to_vec(), content)
            .await?;
        Ok(())
    }

    async fn update_todo(&mut self, key: impl AsRef<[u8]>, todo: Todo) -> anyhow::Result<()> {
        let content = todo.as_bytes()?;
        self.insert_bytes(key, content).await
    }

    async fn get_todo(&self, id: String) -> anyhow::Result<Todo> {
        let entry = self
            .doc
            .get_many(iroh::sync::store::Query::single_latest_per_key().key_exact(id))
            .await?
            .next()
            .await
            .ok_or_else(|| anyhow::anyhow!("no todo found"))??;

        self.todo_from_entry(&entry).await
    }

    async fn todo_from_entry(&self, entry: &Entry) -> anyhow::Result<Todo> {
        let id = String::from_utf8(entry.key().to_owned()).context("invalid key")?;
        match self.node.blobs.read_to_bytes(entry.content_hash()).await {
            Ok(b) => Todo::from_bytes(b),
            Err(_) => Ok(Todo::missing_todo(id)),
        }
    }
}
