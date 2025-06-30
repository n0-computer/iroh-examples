use anyhow::Result;

use crate::{
    state::AppState,
    todos::{Todo, Todos},
};

#[tauri::command]
pub async fn get_todos(state: tauri::State<'_, AppState>) -> Result<Vec<Todo>, String> {
    if let Some((todos, _)) = &mut *state.todos.lock().await {
        let todos = todos.get_todos().await.map_err(|e| e.to_string())?;
        return Ok(todos);
    }
    Err("not initialized".to_string())
}

#[tauri::command]
pub async fn new_list(
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
pub async fn new_todo(todo: Todo, state: tauri::State<'_, AppState>) -> Result<(), String> {
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
pub async fn update_todo(todo: Todo, state: tauri::State<'_, AppState>) -> Result<(), String> {
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
pub async fn toggle_done(id: String, state: tauri::State<'_, AppState>) -> Result<bool, String> {
    if let Some((todos, _)) = &mut *state.todos.lock().await {
        todos.toggle_done(id).await.map_err(|e| e.to_string())?;
        return Ok(true);
    }
    Err("not initialized".to_string())
}

#[tauri::command]
pub async fn delete(id: String, state: tauri::State<'_, AppState>) -> Result<bool, String> {
    if let Some((todos, _)) = &mut *state.todos.lock().await {
        todos.delete(id).await.map_err(|e| e.to_string())?;
        return Ok(true);
    }
    Err("not initialized".to_string())
}

#[tauri::command]
pub async fn set_ticket(
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
pub async fn get_ticket(state: tauri::State<'_, AppState>) -> Result<String, String> {
    if let Some((todos, _)) = &mut *state.todos.lock().await {
        return Ok(todos.ticket());
    }
    Err("not initialized".to_string())
}
