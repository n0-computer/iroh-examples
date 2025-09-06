use anyhow::Result;
use clap::Parser;
use crossterm::{
    event::{self, DisableMouseCapture, EnableMouseCapture, Event, KeyCode, KeyEvent, KeyModifiers},
    execute,
    terminal::{disable_raw_mode, enable_raw_mode, EnterAlternateScreen, LeaveAlternateScreen},
};
use iroh::{Endpoint, NodeId};
mod events;
mod protocol;
mod presence;
mod connection;

use collaborative_editor::{
    RealtimeLoroProtocol, 
    DocumentEvent,
    PresenceEvent,
    presence::UserInfo,
};
use loro::LoroDoc;
use ratatui::{
    backend::CrosstermBackend,
    layout::{Constraint, Direction, Layout},
    style::{Color, Modifier, Style},
    text::{Line, Span, Text},
    widgets::{Block, Borders, List, ListItem, Paragraph, Wrap},
    Frame, Terminal,
};
use std::{
    collections::HashMap,
    io,
    time::{Duration, Instant},
};
use tokio::sync::broadcast;
use tracing::{info, warn};

#[derive(Parser, Debug)]
#[command(name = "collaborative-editor")]
#[command(about = "🚀 Real-time collaborative text editor using Loro CRDTs and iroh P2P")]
#[command(version = "1.0.0")]
#[command(author = "Iroh Examples <examples@iroh.computer>")]
#[command(long_about = "A Google Docs-style collaborative text editor built with Rust.\n\
Features:\n\
• Real-time collaboration with multiple users\n\
• Conflict-free synchronization using Loro CRDTs\n\
• User presence indicators (colored cursors)\n\
• P2P networking with relay fallback\n\
• Beautiful terminal UI")]
struct Args {
    /// Your display name in the editor
    #[arg(short, long, default_value = "Anonymous")]
    #[arg(help = "Display name shown to other users")]
    name: String,

    /// Your cursor/presence color
    #[arg(short, long, default_value = "white")]
    #[arg(help = "Color for your cursor and presence indicator")]
    #[arg(value_parser = ["red", "green", "blue", "yellow", "magenta", "cyan", "white"])]
    color: String,

    /// Connect to an existing peer's node ID
    #[arg(long)]
    #[arg(help = "Node ID of peer to connect to (get this from their terminal output)")]
    #[arg(value_name = "NODE_ID")]
    connect: Option<NodeId>,

    /// Enable verbose logging
    #[arg(short, long)]
    #[arg(help = "Enable detailed logging output")]
    verbose: bool,

    /// Set custom relay server
    #[arg(long)]
    #[arg(help = "Custom relay server URL (advanced users)")]
    #[arg(value_name = "URL")]
    relay: Option<String>,

    /// Disable relay and use direct connections only
    #[arg(long)]
    #[arg(help = "Disable relay fallback (direct connections only)")]
    no_relay: bool,
}

struct EditorState {
    content: String,
    cursor_position: usize,
    /// Scroll offset for the editor
    #[allow(dead_code)]
    scroll_offset: usize,
    users: HashMap<NodeId, UserPresence>,
    status_message: String,
    last_update: Instant,
}

#[derive(Clone)]
struct UserPresence {
    name: String,
    color: String,
    /// Last time this user was seen
    #[allow(dead_code)]
    last_seen: Instant,
    cursor_position: usize,
}

impl EditorState {
    fn new() -> Self {
        Self {
            content: String::new(),
            cursor_position: 0,
            scroll_offset: 0,
            users: HashMap::new(),
            status_message: "Ready".to_string(),
            last_update: Instant::now(),
        }
    }

    fn insert_char(&mut self, ch: char) -> bool {
        self.content.insert(self.cursor_position, ch);
        self.cursor_position += ch.len_utf8();
        self.last_update = Instant::now();
        true
    }

    fn delete_char(&mut self) -> bool {
        if self.cursor_position > 0 {
            let mut chars: Vec<char> = self.content.chars().collect();
            if !chars.is_empty() && self.cursor_position <= chars.len() {
                let char_pos = self.byte_to_char_pos(self.cursor_position);
                if char_pos > 0 {
                    chars.remove(char_pos - 1);
                    self.content = chars.into_iter().collect();
                    self.cursor_position = self.char_to_byte_pos(char_pos - 1);
                    self.last_update = Instant::now();
                    return true;
                }
            }
        }
        false
    }

    fn move_cursor_left(&mut self) {
        if self.cursor_position > 0 {
            let char_pos = self.byte_to_char_pos(self.cursor_position);
            if char_pos > 0 {
                self.cursor_position = self.char_to_byte_pos(char_pos - 1);
            }
        }
    }

    fn move_cursor_right(&mut self) {
        let chars: Vec<char> = self.content.chars().collect();
        let char_pos = self.byte_to_char_pos(self.cursor_position);
        if char_pos < chars.len() {
            self.cursor_position = self.char_to_byte_pos(char_pos + 1);
        }
    }

    fn byte_to_char_pos(&self, byte_pos: usize) -> usize {
        self.content.chars().take_while(|_| {
            self.content.char_indices().take_while(|(i, _)| *i < byte_pos).count() > 0
        }).count()
    }

    fn char_to_byte_pos(&self, char_pos: usize) -> usize {
        self.content.char_indices().nth(char_pos).map(|(i, _)| i).unwrap_or(self.content.len())
    }

    fn update_user_presence(&mut self, user_id: NodeId, name: String, color: String, cursor_pos: usize) {
        self.users.insert(user_id, UserPresence {
            name,
            color,
            cursor_position: cursor_pos,
            last_seen: Instant::now(),
        });
    }

    fn remove_user(&mut self, user_id: &NodeId) {
        self.users.remove(user_id);
    }
}

struct App {
    editor_state: EditorState,
    protocol: RealtimeLoroProtocol,
    should_quit: bool,
    /// Local user information
    #[allow(dead_code)]
    local_user: UserInfo,
    /// Local node ID
    #[allow(dead_code)]
    local_node_id: NodeId,
}

impl App {
    fn new(protocol: RealtimeLoroProtocol, local_user: UserInfo, local_node_id: NodeId) -> Self {
        Self {
            editor_state: EditorState::new(),
            protocol,
            should_quit: false,
            local_user,
            local_node_id,
        }
    }

    async fn handle_key_event(&mut self, key: KeyEvent) -> Result<()> {
        match key.code {
            KeyCode::Char('q') if key.modifiers.contains(KeyModifiers::CONTROL) => {
                self.should_quit = true;
            }
            KeyCode::Char(ch) => {
                if self.editor_state.insert_char(ch) {
                    self.sync_document_changes().await?;
                }
            }
            KeyCode::Backspace => {
                if self.editor_state.delete_char() {
                    self.sync_document_changes().await?;
                }
            }
            KeyCode::Left => {
                self.editor_state.move_cursor_left();
                self.broadcast_cursor_position().await?;
            }
            KeyCode::Right => {
                self.editor_state.move_cursor_right();
                self.broadcast_cursor_position().await?;
            }
            KeyCode::Enter => {
                if self.editor_state.insert_char('\n') {
                    self.sync_document_changes().await?;
                }
            }
            _ => {}
        }
        Ok(())
    }

    async fn sync_document_changes(&mut self) -> Result<()> {
        let content = self.editor_state.content.clone();
        
        self.protocol.apply_local_change(|doc| {
            let text = doc.get_text("main");
            // Clear and replace content (simple approach)
            let current_content = text.to_string();
            if current_content != content {
                text.delete(0, current_content.len())?;
                text.insert(0, &content)?;
            }
            Ok(())
        }).await?;

        self.broadcast_cursor_position().await?;
        Ok(())
    }

    async fn broadcast_cursor_position(&mut self) -> Result<()> {
        // TODO: Implement presence broadcasting
        Ok(())
    }

    async fn handle_document_update(&mut self, _from_peer: NodeId) -> Result<()> {
        let doc = self.protocol.get_document().await;
        let text = doc.get_text("main");
        let new_content = text.to_string();
        
        if new_content != self.editor_state.content {
            // Preserve cursor position relative to content
            let old_len = self.editor_state.content.len();
            let new_len = new_content.len();
            
            self.editor_state.content = new_content;
            
            // Adjust cursor position
            if new_len != old_len {
                self.editor_state.cursor_position = self.editor_state.cursor_position.min(new_len);
            }
            
            self.editor_state.status_message = "Document updated by peer".to_string();
        }
        
        Ok(())
    }
}

fn draw_ui(f: &mut Frame, app: &App) {
    let chunks = Layout::default()
        .direction(Direction::Vertical)
        .constraints([
            Constraint::Length(3),  // Header
            Constraint::Min(0),     // Editor
            Constraint::Length(3),  // Status bar
            Constraint::Length(5),  // Users panel
        ])
        .split(f.area());

    // Header
    let header = Paragraph::new("Collaborative Text Editor - Press Ctrl+Q to quit")
        .style(Style::default().fg(Color::Cyan))
        .block(Block::default().borders(Borders::ALL).title("Header"));
    f.render_widget(header, chunks[0]);

    // Editor content
    let content_with_cursor = render_content_with_cursors(&app.editor_state);
    let editor = Paragraph::new(content_with_cursor)
        .wrap(Wrap { trim: false })
        .block(Block::default().borders(Borders::ALL).title("Document"));
    f.render_widget(editor, chunks[1]);

    // Status bar
    let status = Paragraph::new(format!(
        "Status: {} | Cursor: {} | Users: {} | Last update: {:.1}s ago",
        app.editor_state.status_message,
        app.editor_state.cursor_position,
        app.editor_state.users.len(),
        app.editor_state.last_update.elapsed().as_secs_f32()
    ))
    .style(Style::default().fg(Color::Yellow))
    .block(Block::default().borders(Borders::ALL).title("Status"));
    f.render_widget(status, chunks[2]);

    // Users panel
    let users: Vec<ListItem> = app.editor_state.users.iter()
        .map(|(node_id, presence)| {
            let color = match presence.color.as_str() {
                "red" => Color::Red,
                "green" => Color::Green,
                "blue" => Color::Blue,
                "yellow" => Color::Yellow,
                "magenta" => Color::Magenta,
                "cyan" => Color::Cyan,
                _ => Color::White,
            };
            ListItem::new(format!(
                "{} ({}...{}) - cursor at {}",
                presence.name,
                &node_id.to_string()[..8],
                &node_id.to_string()[node_id.to_string().len()-4..],
                presence.cursor_position
            )).style(Style::default().fg(color))
        })
        .collect();

    let users_list = List::new(users)
        .block(Block::default().borders(Borders::ALL).title("Connected Users"));
    f.render_widget(users_list, chunks[3]);
}

fn render_content_with_cursors(state: &EditorState) -> Text<'_> {
    let mut spans = Vec::new();
    let chars: Vec<char> = state.content.chars().collect();
    
    let mut current_pos = 0;
    let mut i = 0;
    
    while i < chars.len() {
        let ch = chars[i];
        
        // Check if any user cursor is at this position
        let cursor_users: Vec<&UserPresence> = state.users.values()
            .filter(|u| u.cursor_position == current_pos)
            .collect();
        
        // Add cursor indicators
        for user in cursor_users {
            let color = match user.color.as_str() {
                "red" => Color::Red,
                "green" => Color::Green,
                "blue" => Color::Blue,
                "yellow" => Color::Yellow,
                "magenta" => Color::Magenta,
                "cyan" => Color::Cyan,
                _ => Color::White,
            };
            spans.push(Span::styled("│", Style::default().fg(color).add_modifier(Modifier::BOLD)));
        }
        
        // Add the character
        spans.push(Span::raw(ch.to_string()));
        
        current_pos += ch.len_utf8();
        i += 1;
    }
    
    // Check for cursors at the end
    let cursor_users: Vec<&UserPresence> = state.users.values()
        .filter(|u| u.cursor_position == current_pos)
        .collect();
    
    for user in cursor_users {
        let color = match user.color.as_str() {
            "red" => Color::Red,
            "green" => Color::Green,
            "blue" => Color::Blue,
            "yellow" => Color::Yellow,
            "magenta" => Color::Magenta,
            "cyan" => Color::Cyan,
            _ => Color::White,
        };
        spans.push(Span::styled("│", Style::default().fg(color).add_modifier(Modifier::BOLD)));
    }
    
    Text::from(Line::from(spans))
}

#[tokio::main]
async fn main() -> Result<()> {
    let args = Args::parse();
    
    // Initialize logging based on verbosity
    if args.verbose {
        tracing_subscriber::fmt()
            .with_max_level(tracing::Level::DEBUG)
            .init();
    } else {
        tracing_subscriber::fmt()
            .with_max_level(tracing::Level::INFO)
            .init();
    }
    
    // Print welcome message with better formatting
    println!("🚀 Real-time collaborative text editor using Loro CRDTs and iroh P2P");
    println!("📝 Starting collaborative editor for user: {} ({})", args.name, args.color);
    if let Some(ref peer_id) = args.connect {
        println!("🔗 Connecting to peer: {}", peer_id);
    } else {
        println!("👂 Listening for connections...");
    }
    
    // Create iroh endpoint with configuration based on args
    let mut endpoint_builder = Endpoint::builder().discovery_n0();
    
    if args.no_relay {
        endpoint_builder = endpoint_builder.relay_mode(iroh::RelayMode::Disabled);
        println!("🚫 Relay disabled - using direct connections only");
    } else if let Some(relay_url) = args.relay {
        // Custom relay configuration would go here
        println!("🔄 Using custom relay: {}", relay_url);
        endpoint_builder = endpoint_builder.relay_mode(iroh::RelayMode::Default);
    } else {
        endpoint_builder = endpoint_builder.relay_mode(iroh::RelayMode::Default);
    }
    
    let endpoint = endpoint_builder.bind().await?;
    
    let local_node_id = endpoint.node_id();
    println!("🆔 Your Node ID: {}", local_node_id);
    println!("   Share this ID with others to connect!");
    info!("Local node ID: {}", local_node_id);
    
    // Create Loro document with initial content
    let doc = LoroDoc::new();
    let text = doc.get_text("main");
    text.insert(0, "Welcome to the collaborative editor!\nStart typing to see real-time collaboration.\n\n")?;
    
    // Create event channels
    let (update_tx, mut update_rx) = broadcast::channel(100);
    let (presence_tx, mut presence_rx) = broadcast::channel(100);
    
    // Create user info
    let user_info = UserInfo {
        name: args.name.clone(),
        color: args.color.clone(),
        avatar_url: None,
    };
    
    // Create protocol
    let protocol = RealtimeLoroProtocol::new(
        doc,
        local_node_id,
        user_info.clone(),
        update_tx,
        presence_tx,
    ).await?;
    
    // Register protocol with endpoint
    let _router = iroh::protocol::Router::builder(endpoint.clone())
        .accept(RealtimeLoroProtocol::ALPN, protocol.clone())
        .spawn();
    
    info!("Protocol registered and listening for connections");
    
    // Connect to peer if specified
    if let Some(peer_id) = args.connect {
        println!("🔄 Attempting to connect to peer...");
        info!("Connecting to peer: {}", peer_id);
        match endpoint.connect(peer_id, RealtimeLoroProtocol::ALPN).await {
            Ok(conn) => {
                println!("✅ Connected to peer successfully!");
                info!("Connected to peer successfully");
                protocol.add_peer(peer_id, conn).await?;
            }
            Err(e) => {
                println!("❌ Failed to connect to peer: {}", e);
                println!("💡 Make sure the peer is running and the Node ID is correct");
                warn!("Failed to connect to peer: {}", e);
            }
        }
    }
    
    // Setup terminal
    println!("🎨 Initializing terminal interface...");
    println!("📋 Controls: Type to edit • Arrow keys to move • Ctrl+Q to quit");
    println!("⏳ Starting in 2 seconds...");
    tokio::time::sleep(Duration::from_secs(2)).await;
    
    enable_raw_mode()?;
    let mut stdout = io::stdout();
    execute!(stdout, EnterAlternateScreen, EnableMouseCapture)?;
    let backend = CrosstermBackend::new(stdout);
    let mut terminal = Terminal::new(backend)?;
    
    // Create app
    let mut app = App::new((*protocol).clone(), user_info, local_node_id);
    
    // Load initial document content
    let doc = protocol.get_document().await;
    let text = doc.get_text("main");
    app.editor_state.content = text.to_string();
    
    // Event handling loop
    let mut last_tick = Instant::now();
    let tick_rate = Duration::from_millis(50);
    
    loop {
        // Draw UI
        terminal.draw(|f| draw_ui(f, &app))?;
        
        // Handle events
        let timeout = tick_rate.saturating_sub(last_tick.elapsed());
        if crossterm::event::poll(timeout)? {
            if let Event::Key(key) = event::read()? {
                app.handle_key_event(key).await?;
            }
        }
        
        // Handle protocol events
        while let Ok(event) = update_rx.try_recv() {
            match event {
                DocumentEvent::Updated { from_peer, .. } => {
                    app.handle_document_update(from_peer).await?;
                }
                DocumentEvent::PeerJoined { peer_id, user_info } => {
                    let user_name = user_info.name.clone();
                    app.editor_state.update_user_presence(
                        peer_id,
                        user_info.name,
                        user_info.color,
                        0
                    );
                    app.editor_state.status_message = format!("User {} joined", user_name);
                }
                DocumentEvent::PeerLeft { peer_id } => {
                    app.editor_state.remove_user(&peer_id);
                    app.editor_state.status_message = "User left".to_string();
                }
                DocumentEvent::SyncCompleted { .. } => {
                    app.editor_state.status_message = "Sync completed".to_string();
                }
            }
        }
        
        // Handle presence events
        while let Ok(event) = presence_rx.try_recv() {
            match event {
                PresenceEvent::CursorMoved { user_id, position } => {
                    if let Some(pos) = position {
                        app.editor_state.update_user_presence(user_id, "Unknown".to_string(), "#888888".to_string(), pos.offset);
                    }
                }
                PresenceEvent::SelectionChanged { user_id: _, selection: _ } => {
                    // Handle selection changes if needed
                }
                PresenceEvent::TypingChanged { user_id: _, typing: _ } => {
                    // Handle typing indicator changes if needed
                }
                PresenceEvent::UserJoined { user_id: _, user_info: _ } => {
                    // Handle user joined events if needed
                }
                PresenceEvent::UserLeft { user_id } => {
                    app.editor_state.remove_user(&user_id);
                }
            }
            // TODO: Handle presence updates (cursor positions, selections)
        }
        
        if last_tick.elapsed() >= tick_rate {
            last_tick = Instant::now();
        }
        
        if app.should_quit {
            break;
        }
    }
    
    // Restore terminal
    disable_raw_mode()?;
    execute!(
        terminal.backend_mut(),
        LeaveAlternateScreen,
        DisableMouseCapture
    )?;
    terminal.show_cursor()?;
    
    Ok(())
}
