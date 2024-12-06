#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
mod iroh;
mod todos;

use anyhow::{anyhow, Result};
use futures_lite::StreamExt;
use iroh_docs::{rpc::client::docs::LiveEvent, ContentStatus};
use tauri::Manager;
use tokio::sync::Mutex;

use self::{
    iroh::Iroh,
    todos::{Todo, Todos},
};

// setup an iroh node
async fn setup<R: tauri::Runtime>(handle: tauri::AppHandle<R>) -> Result<()> {
    // get the applicaiton data root, join with "iroh_data" to get the data root for the iroh node
    let data_root = handle
        .path_resolver()
        .app_data_dir()
        .ok_or_else(|| anyhow!("can't get application data directory"))?
        .join("iroh_data");

    let iroh = Iroh::new(data_root).await?;
    handle.manage(AppState::new(iroh));

    Ok(())
}

struct AppState {
    todos: Mutex<Option<(Todos, tokio::task::JoinHandle<()>)>>,
    iroh: Iroh,
}
impl AppState {
    fn new(iroh: Iroh) -> Self {
        AppState {
            todos: Mutex::new(None),
            iroh,
        }
    }

    fn iroh(&self) -> &Iroh {
        &self.iroh
    }

    async fn init_todos<R: tauri::Runtime>(
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
                            app_handle.emit_all("update-all", ()).ok();
                        }
                    }
                    LiveEvent::InsertLocal { .. } | LiveEvent::ContentReady { .. } => {
                        app_handle.emit_all("update-all", ()).ok();
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

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let handle = app.handle();
            #[cfg(debug_assertions)] // only include this code on debug builds
            {
                let window = app.get_window("main").unwrap();
                window.open_devtools();
            }

            tauri::async_runtime::spawn(async move {
                println!("starting backend...");
                if let Err(err) = setup(handle).await {
                    eprintln!("failed: {:?}", err);
                }
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            new_list,
            get_ticket,
            get_todos,
            new_todo,
            toggle_done,
            update_todo,
            delete,
            set_ticket,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
async fn get_todos(state: tauri::State<'_, AppState>) -> Result<Vec<Todo>, String> {
    if let Some((todos, _)) = &mut *state.todos.lock().await {
        let todos = todos.get_todos().await.map_err(|e| e.to_string())?;
        return Ok(todos);
    }
    Err("not initialized".to_string())
}

#[tauri::command]
async fn new_list(
    app_handle: tauri::AppHandle,
    state: tauri::State<'_, AppState>,
) -> Result<(), String> {
    let todos = Todos::new(None, state.iroh().clone())
        .await
        .map_err(|e| e.to_string())?;

    state
        .init_todos(app_handle, todos)
        .await
        .map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
async fn new_todo(todo: Todo, state: tauri::State<'_, AppState>) -> Result<(), String> {
    if let Some((todos, _)) = &mut *state.todos.lock().await {
        todos
            .add(todo.id, todo.label)
            .await
            .map_err(|e| e.to_string())?;
        return Ok(());
    }
    Err("not initialized".to_string())
}

#[tauri::command]
async fn update_todo(todo: Todo, state: tauri::State<'_, AppState>) -> Result<(), String> {
    if let Some((todos, _)) = &mut *state.todos.lock().await {
        todos
            .update(todo.id, todo.label)
            .await
            .map_err(|e| e.to_string())?;
        return Ok(());
    }
    Err("not initialized".to_string())
}

#[tauri::command]
async fn toggle_done(id: String, state: tauri::State<'_, AppState>) -> Result<bool, String> {
    if let Some((todos, _)) = &mut *state.todos.lock().await {
        todos.toggle_done(id).await.map_err(|e| e.to_string())?;
        return Ok(true);
    }
    Err("not initialized".to_string())
}

#[tauri::command]
async fn delete(id: String, state: tauri::State<'_, AppState>) -> Result<bool, String> {
    if let Some((todos, _)) = &mut *state.todos.lock().await {
        todos.delete(id).await.map_err(|e| e.to_string())?;
        return Ok(true);
    }
    Err("not initialized".to_string())
}

#[tauri::command]
async fn set_ticket(
    app_handle: tauri::AppHandle,
    ticket: String,
    state: tauri::State<'_, AppState>,
) -> Result<(), String> {
    let todos = Todos::new(Some(ticket), state.iroh().clone())
        .await
        .map_err(|e| e.to_string())?;

    state
        .init_todos(app_handle, todos)
        .await
        .map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
async fn get_ticket(state: tauri::State<'_, AppState>) -> Result<String, String> {
    if let Some((todos, _)) = &mut *state.todos.lock().await {
        return Ok(todos.ticket());
    }
    Err("not initialized".to_string())
}
