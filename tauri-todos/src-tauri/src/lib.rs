mod ipc;
mod iroh;
mod state;
mod todos;

use anyhow::{anyhow, Result};
use state::AppState;
use tauri::Manager as _;

use self::iroh::Iroh;

// setup an iroh node
async fn setup<R: tauri::Runtime>(handle: tauri::AppHandle<R>) -> Result<()> {
    // get the applicaiton data root, join with "iroh_data" to get the data root for the iroh node
    let data_root = handle
        .path()
        .app_data_dir()
        .map_err(|_| anyhow!("can't get application data directory"))?
        .join("iroh_data");

    let iroh = Iroh::new(data_root).await?;
    handle.manage(AppState::new(iroh));

    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            #[cfg(debug_assertions)] // only include this code on debug builds
            app.get_webview_window("main").unwrap().open_devtools();
            let handle = app.handle().clone();

            tauri::async_runtime::spawn(async move {
                println!("starting backend...");
                if let Err(err) = setup(handle).await {
                    eprintln!("failed: {:?}", err);
                }
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            ipc::new_list,
            ipc::get_ticket,
            ipc::get_todos,
            ipc::new_todo,
            ipc::toggle_done,
            ipc::update_todo,
            ipc::delete,
            ipc::set_ticket,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
