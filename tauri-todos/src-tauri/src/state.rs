use anyhow::Result;
use iroh_docs::{engine::LiveEvent, sync::ContentStatus};
use n0_future::StreamExt;
use tauri::Emitter as _;
use tokio::sync::Mutex;

use crate::{Iroh, todos::Todos};

pub struct AppState {
    pub todos: Mutex<Option<(Todos, tokio::task::JoinHandle<()>)>>,
    iroh: Iroh,
}
impl AppState {
    pub fn new(iroh: Iroh) -> Self {
        AppState {
            todos: Mutex::new(None),
            iroh,
        }
    }

    pub fn iroh(&self) -> &Iroh {
        &self.iroh
    }

    pub async fn init_todos<R: tauri::Runtime>(
        &self,
        app_handle: tauri::AppHandle<R>,
        todos: Todos,
    ) -> Result<()> {
        let mut events = todos.doc_subscribe().await?;
        let events_handle = tokio::spawn(async move {
            while let Some(Ok(event)) = events.next().await {
                match event {
                    LiveEvent::InsertRemote { content_status, .. } => {
                        // Only update if the we already have the content. Likely to happen when a remote user toggles "done".
                        if content_status == ContentStatus::Complete {
                            app_handle.emit("update-all", ()).ok();
                        }
                    }
                    LiveEvent::InsertLocal { .. } | LiveEvent::ContentReady { .. } => {
                        app_handle.emit("update-all", ()).ok();
                    }
                    _ => {}
                }
            }
        });

        let mut t = self.todos.lock().await;
        if let Some((_t, handle)) = t.take() {
            handle.abort();
        }
        *t = Some((todos, events_handle));

        Ok(())
    }
}
