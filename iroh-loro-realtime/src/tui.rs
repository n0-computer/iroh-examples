//! TUI (Terminal User Interface) utilities for collaborative editing
//! 
//! This module provides optional TUI components when the "tui" feature is enabled.

#[cfg(feature = "tui")]
pub use editor::*;

#[cfg(not(feature = "tui"))]
pub struct TuiEditor;

#[cfg(not(feature = "tui"))]
impl TuiEditor {
    pub fn new() -> Self {
        Self
    }
    
    pub async fn run(&self) -> anyhow::Result<()> {
        anyhow::bail!("TUI feature not enabled. Enable with --features tui")
    }
}

#[cfg(feature = "tui")]
mod editor {
    use std::collections::HashMap;
    use std::sync::Arc;
    use tokio::sync::RwLock;
    use ratatui::{
        backend::CrosstermBackend,
        layout::{Constraint, Direction, Layout, Rect},
        style::{Color, Style},
        text::{Line, Span},
        widgets::{Block, Borders, List, ListItem, Paragraph, Wrap},
        Terminal,
    };
    use crossterm::{
        event::{self, DisableMouseCapture, EnableMouseCapture, Event, KeyCode, KeyEventKind},
        execute,
        terminal::{disable_raw_mode, enable_raw_mode, EnterAlternateScreen, LeaveAlternateScreen},
    };
    use iroh::NodeId;
    use crate::{
        RealtimeLoroProtocol,
        presence::{CursorPosition, UserInfo},
        events::{DocumentEvent, PresenceEvent},
    };

    /// A collaborative TUI text editor
    pub struct TuiEditor {
        /// The collaborative protocol
        protocol: Arc<RealtimeLoroProtocol>,
        
        /// Current text content
        content: Arc<RwLock<String>>,
        
        /// Current cursor position
        cursor_line: usize,
        cursor_col: usize,
        
        /// Remote user cursors
        remote_cursors: Arc<RwLock<HashMap<NodeId, CursorPosition>>>,
        
        /// Remote user info
        remote_users: Arc<RwLock<HashMap<NodeId, UserInfo>>>,
        
        /// Status messages
        status_messages: Vec<String>,
        
        /// Whether the editor should exit
        should_exit: bool,
    }

    impl TuiEditor {
        /// Create a new TUI editor
        pub fn new(protocol: Arc<RealtimeLoroProtocol>) -> Self {
            Self {
                protocol,
                content: Arc::new(RwLock::new(String::new())),
                cursor_line: 0,
                cursor_col: 0,
                remote_cursors: Arc::new(RwLock::new(HashMap::new())),
                remote_users: Arc::new(RwLock::new(HashMap::new())),
                status_messages: Vec::new(),
                should_exit: false,
            }
        }

        /// Run the TUI editor
        pub async fn run(&mut self) -> anyhow::Result<()> {
            // Setup terminal
            enable_raw_mode()?;
            let mut stdout = std::io::stdout();
            execute!(stdout, EnterAlternateScreen, EnableMouseCapture)?;
            let backend = CrosstermBackend::new(stdout);
            let mut terminal = Terminal::new(backend)?;

            // Note: Event handling would need public methods on protocol
            // For now, we'll simulate event handling in the main loop

            // Start event handling loop
            let result = self.run_event_loop(&mut terminal).await;

            // Restore terminal
            disable_raw_mode()?;
            execute!(
                terminal.backend_mut(),
                LeaveAlternateScreen,
                DisableMouseCapture
            )?;
            terminal.show_cursor()?;

            result
        }

        /// Main event loop
        async fn run_event_loop(
            &mut self,
            terminal: &mut Terminal<CrosstermBackend<std::io::Stdout>>,
        ) -> anyhow::Result<()> {
            loop {
                // Draw the UI
                terminal.draw(|f| self.draw_ui(f))?;

                // Handle events
                tokio::select! {
                    // Handle keyboard input
                    Ok(true) = self.handle_input() => {
                        if self.should_exit {
                            break;
                        }
                    }
                    
                    // TODO: Handle document and presence updates when public API is available
                }
            }

            Ok(())
        }

        /// Handle keyboard input
        async fn handle_input(&mut self) -> anyhow::Result<bool> {
            if event::poll(std::time::Duration::from_millis(50))? {
                if let Event::Key(key) = event::read()? {
                    if key.kind == KeyEventKind::Press {
                        match key.code {
                            KeyCode::Esc => {
                                self.should_exit = true;
                                return Ok(true);
                            }
                            KeyCode::Char(c) => {
                                self.insert_char(c).await?;
                            }
                            KeyCode::Enter => {
                                self.insert_char('\n').await?;
                            }
                            KeyCode::Backspace => {
                                self.delete_char().await?;
                            }
                            KeyCode::Left => {
                                self.move_cursor_left();
                            }
                            KeyCode::Right => {
                                self.move_cursor_right().await;
                            }
                            KeyCode::Up => {
                                self.move_cursor_up();
                            }
                            KeyCode::Down => {
                                self.move_cursor_down().await;
                            }
                            _ => {}
                        }
                    }
                }
            }
            Ok(true)
        }

        /// Insert a character at the current cursor position
        async fn insert_char(&mut self, c: char) -> anyhow::Result<()> {
            let offset = self.cursor_to_offset().await;
            
            // Update local content
            {
                let mut content = self.content.write().await;
                content.insert(offset, c);
            }

            // Apply change to Loro document
            self.protocol.apply_local_change(|doc| {
                let text = doc.get_text("main");
                text.insert(offset, &c.to_string())?;
                Ok(())
            }).await?;

            // Update cursor position
            if c == '\n' {
                self.cursor_line += 1;
                self.cursor_col = 0;
            } else {
                self.cursor_col += 1;
            }

            // Update presence
            let cursor_pos = CursorPosition::new(
                self.cursor_line as u32,
                self.cursor_col as u32,
                "main".to_string(),
                offset + 1,
            );
            self.protocol.presence_manager().update_cursor(cursor_pos).await?;

            Ok(())
        }

        /// Delete character before cursor
        async fn delete_char(&mut self) -> anyhow::Result<()> {
            if self.cursor_col == 0 && self.cursor_line == 0 {
                return Ok(());
            }

            let offset = self.cursor_to_offset().await;
            if offset == 0 {
                return Ok(());
            }

            // Update local content
            let deleted_char = {
                let mut content = self.content.write().await;
                content.remove(offset - 1)
            };

            // Apply change to Loro document
            self.protocol.apply_local_change(|doc| {
                let text = doc.get_text("main");
                text.delete(offset - 1, 1)?;
                Ok(())
            }).await?;

            // Update cursor position
            if deleted_char == '\n' {
                self.cursor_line -= 1;
                // Move to end of previous line
                let content = self.content.read().await;
                let lines: Vec<&str> = content.lines().collect();
                if self.cursor_line < lines.len() {
                    self.cursor_col = lines[self.cursor_line].len();
                } else {
                    self.cursor_col = 0;
                }
            } else {
                self.cursor_col = self.cursor_col.saturating_sub(1);
            }

            // Update presence
            let cursor_pos = CursorPosition::new(
                self.cursor_line as u32,
                self.cursor_col as u32,
                "main".to_string(),
                offset - 1,
            );
            self.protocol.presence_manager().update_cursor(cursor_pos).await?;

            Ok(())
        }

        /// Move cursor left
        fn move_cursor_left(&mut self) {
            if self.cursor_col > 0 {
                self.cursor_col -= 1;
            } else if self.cursor_line > 0 {
                self.cursor_line -= 1;
                // Move to end of previous line
                // This would need access to content, simplified for now
                self.cursor_col = 0;
            }
        }

        /// Move cursor right
        async fn move_cursor_right(&mut self) {
            let content = self.content.read().await;
            let lines: Vec<&str> = content.lines().collect();
            
            if self.cursor_line < lines.len() {
                let line = lines[self.cursor_line];
                if self.cursor_col < line.len() {
                    self.cursor_col += 1;
                } else if self.cursor_line + 1 < lines.len() {
                    self.cursor_line += 1;
                    self.cursor_col = 0;
                }
            }
        }

        /// Move cursor up
        fn move_cursor_up(&mut self) {
            if self.cursor_line > 0 {
                self.cursor_line -= 1;
                // Keep column position if possible
            }
        }

        /// Move cursor down
        async fn move_cursor_down(&mut self) {
            let content = self.content.read().await;
            let lines: Vec<&str> = content.lines().collect();
            
            if self.cursor_line + 1 < lines.len() {
                self.cursor_line += 1;
                // Keep column position if possible
                let line = lines[self.cursor_line];
                if self.cursor_col > line.len() {
                    self.cursor_col = line.len();
                }
            }
        }

        /// Convert cursor position to character offset
        async fn cursor_to_offset(&self) -> usize {
            let content = self.content.read().await;
            let lines: Vec<&str> = content.lines().collect();
            
            let mut offset = 0;
            for (i, line) in lines.iter().enumerate() {
                if i == self.cursor_line {
                    offset += self.cursor_col.min(line.len());
                    break;
                }
                offset += line.len() + 1; // +1 for newline
            }
            
            offset
        }

        /// Handle document update events
        async fn handle_document_event(&mut self, event: DocumentEvent) {
            match event {
                DocumentEvent::Updated { from_peer, .. } => {
                    // Refresh content from document
                    let doc = self.protocol.get_document().await;
                    let text = doc.get_text("main").to_string();
                if !text.is_empty() {
                        *self.content.write().await = text;
                    }
                    
                    self.status_messages.push(format!("Updated by peer: {}", from_peer));
                }
                DocumentEvent::PeerJoined { peer_id, user_info } => {
                    self.remote_users.write().await.insert(peer_id, user_info.clone());
                    self.status_messages.push(format!("User joined: {}", user_info.name));
                }
                DocumentEvent::PeerLeft { peer_id } => {
                    self.remote_users.write().await.remove(&peer_id);
                    self.remote_cursors.write().await.remove(&peer_id);
                    self.status_messages.push(format!("User left: {}", peer_id));
                }
                _ => {}
            }
            
            // Keep only recent status messages
            if self.status_messages.len() > 10 {
                self.status_messages.remove(0);
            }
        }

        /// Handle presence update events
        async fn handle_presence_event(&mut self, event: PresenceEvent) {
            match event {
                PresenceEvent::CursorMoved { user_id, position } => {
                    if let Some(pos) = position {
                        self.remote_cursors.write().await.insert(user_id, pos);
                    } else {
                        self.remote_cursors.write().await.remove(&user_id);
                    }
                }
                PresenceEvent::UserJoined { user_id, user_info } => {
                    self.remote_users.write().await.insert(user_id, user_info);
                }
                PresenceEvent::UserLeft { user_id } => {
                    self.remote_users.write().await.remove(&user_id);
                    self.remote_cursors.write().await.remove(&user_id);
                }
                _ => {}
            }
        }

        /// Draw the UI
        fn draw_ui(&self, f: &mut ratatui::Frame) {
            let chunks = Layout::default()
                .direction(Direction::Vertical)
                .constraints([
                    Constraint::Min(3),      // Main editor
                    Constraint::Length(5),   // User list
                    Constraint::Length(3),   // Status
                ])
                .split(f.area());

            // Draw main editor
            self.draw_editor(f, chunks[0]);
            
            // Draw user list
            self.draw_user_list(f, chunks[1]);
            
            // Draw status
            self.draw_status(f, chunks[2]);
        }

        /// Draw the main text editor
        fn draw_editor(&self, f: &mut ratatui::Frame, area: Rect) {
            // Use try_read to avoid blocking
            let content = match self.content.try_read() {
                Ok(content) => content.clone(),
                Err(_) => "Loading...".to_string(),
            };
            
            let lines: Vec<Line> = content
                .lines()
                .enumerate()
                .map(|(i, line)| {
                    if i == self.cursor_line {
                        // Highlight current line
                        Line::from(Span::styled(line, Style::default().bg(Color::DarkGray)))
                    } else {
                        Line::from(line)
                    }
                })
                .collect();

            let paragraph = Paragraph::new(lines)
                .block(Block::default().borders(Borders::ALL).title("Collaborative Editor"))
                .wrap(Wrap { trim: false });

            f.render_widget(paragraph, area);
        }

        /// Draw the user list
        fn draw_user_list(&self, f: &mut ratatui::Frame, area: Rect) {
            let users = match self.remote_users.try_read() {
                Ok(users) => users.clone(),
                Err(_) => HashMap::new(),
            };
            let cursors = match self.remote_cursors.try_read() {
                Ok(cursors) => cursors.clone(),
                Err(_) => HashMap::new(),
            };
            
            let items: Vec<ListItem> = users
                .iter()
                .map(|(user_id, user_info)| {
                    let cursor_info = if let Some(cursor) = cursors.get(user_id) {
                        format!(" ({}:{})", cursor.line, cursor.column)
                    } else {
                        String::new()
                    };
                    
                    ListItem::new(format!("{}{}", user_info.name, cursor_info))
                })
                .collect();

            let list = List::new(items)
                .block(Block::default().borders(Borders::ALL).title("Connected Users"));

            f.render_widget(list, area);
        }

        /// Draw the status bar
        fn draw_status(&self, f: &mut ratatui::Frame, area: Rect) {
            let status_text = if self.status_messages.is_empty() {
                "Ready - Press Esc to exit".to_string()
            } else {
                self.status_messages.last().unwrap().clone()
            };

            let paragraph = Paragraph::new(status_text)
                .block(Block::default().borders(Borders::ALL).title("Status"));

            f.render_widget(paragraph, area);
        }
    }
}
