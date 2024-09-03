#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
mod todos;

use anyhow::Result;
use futures_lite::StreamExt;
use iroh::client::Iroh;
use tauri::Manager;
use todos::CapExchangeProtocol;
use tokio::sync::Mutex;

use self::todos::{Todo, Todos};

// this example uses a persistend iroh node stored in the application data directory
type IrohNode = iroh::node::Node<iroh::blobs::store::mem::Store>;

// setup an iroh node
async fn setup<R: tauri::Runtime>(handle: tauri::AppHandle<R>) -> Result<()> {
    // let iroh_data_dir = std::env::var("IROH_DATA_DIR")
    //     .ok()
    //     .map(std::path::PathBuf::from);

    // // get the application data root, join with "iroh_data" to get the data root for the iroh node
    // let data_root = iroh_data_dir.map(anyhow::Ok).unwrap_or_else(|| {
    //     anyhow::Ok(
    //         handle
    //             .path_resolver()
    //             .app_data_dir()
    //             .ok_or_else(|| anyhow::anyhow!("can't get application data directory"))?
    //             .join("iroh_data"),
    //     )
    // })?;

    // create the iroh node
    let node = iroh::node::Node::memory()
        .build()
        .await?
        .accept(
            CapExchangeProtocol::ALPN,
            CapExchangeProtocol::new({
                let handle = handle.clone();
                move |user_id| {
                    Box::pin({
                        let handle = handle.clone();
                        async move {
                            let state: tauri::State<'_, AppState> =
                                handle.try_state().ok_or(anyhow::anyhow!("Missing state"))?;
                            let Some((todos, _)) = &mut *state.todos.lock().await else {
                                anyhow::bail!("Not initialized");
                            };
                            let ticket = todos.share_ticket(user_id).await?;
                            Ok(ticket)
                        }
                    })
                }
            }),
        )
        .spawn()
        .await?;
    handle.manage(AppState::new(node));

    Ok(())
}

struct AppState {
    todos: Mutex<Option<(Todos, tokio::task::JoinHandle<()>)>>,
    iroh: IrohNode,
}

impl AppState {
    fn new(iroh: IrohNode) -> Self {
        AppState {
            todos: Mutex::new(None),
            iroh,
        }
    }

    fn iroh(&self) -> Iroh {
        self.iroh.client().clone()
    }

    fn endpoint(&self) -> iroh::net::Endpoint {
        self.iroh.endpoint().clone()
    }

    async fn init_todos<R: tauri::Runtime>(
        &self,
        app_handle: tauri::AppHandle<R>,
        todos: Todos,
    ) -> Result<()> {
        let mut events = todos.doc_subscribe().await?;
        let events_handle = tokio::spawn(async move {
            while let Some(Ok(event)) = events.next().await {
                println!("Got an event {event:?}");
                app_handle.emit_all("update-all", ()).ok();
            }
        });

        let mut t = self.todos.lock().await;
        if let Some((_t, handle)) = t.take() {
            println!("Aborting existing state");
            handle.abort();
        }
        println!("Initializing state");
        *t = Some((todos, events_handle));

        Ok(())
    }
}

fn main() {
    tracing_subscriber::fmt::init();

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
            join_list,
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
    let todos = Todos::new(None, state.iroh(), state.endpoint())
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
    let Some((todos, _)) = &mut *state.todos.lock().await else {
        return Err("not initialized".to_string());
    };
    todos.toggle_done(id).await.map_err(|e| e.to_string())?;
    Ok(true)
}

#[tauri::command]
async fn delete(id: String, state: tauri::State<'_, AppState>) -> Result<bool, String> {
    let Some((todos, _)) = &mut *state.todos.lock().await else {
        return Err("not initialized".to_string());
    };
    todos.delete(id).await.map_err(|e| e.to_string())?;
    Ok(true)
}

#[tauri::command]
async fn join_list(
    app_handle: tauri::AppHandle,
    ticket: String,
    state: tauri::State<'_, AppState>,
) -> Result<(), String> {
    let todos = Todos::new(Some(ticket), state.iroh(), state.endpoint())
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
    let Some((todos, _)) = &mut *state.todos.lock().await else {
        return Err("not initialized".to_string());
    };
    todos.ticket().await.map_err(|e| e.to_string())
}
