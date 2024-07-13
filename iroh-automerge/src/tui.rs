use anyhow::{anyhow, Result};
use automerge::transaction::Transactable;
use automerge::{Automerge, ReadDoc};
use crossterm::event::{DisableMouseCapture, EnableMouseCapture};
use crossterm::terminal::{
    disable_raw_mode, enable_raw_mode, EnterAlternateScreen, LeaveAlternateScreen,
};
use flume::{Receiver, Sender};
use ratatui::backend::CrosstermBackend;
use ratatui::widgets::Paragraph;
use ratatui::Terminal;
use std::io;
use std::time::Duration;
use tui_textarea::{Input, Key, TextArea};

pub fn run_textarea_tui(
    mut doc: Automerge,
    receive_am: Receiver<Automerge>,
    send_am: Sender<Automerge>,
) -> Result<()> {
    let ta = &doc
        .get(automerge::ROOT, "textarea")?
        .ok_or(anyhow!("Missing 'textarea' key in Automerge document"))?
        .1;

    let mut cursor = doc.get_cursor(ta, 0, None)?;

    let stdout = io::stdout();
    let mut stdout = stdout.lock();

    enable_raw_mode()?;
    crossterm::execute!(stdout, EnterAlternateScreen, EnableMouseCapture)?;
    let backend = CrosstermBackend::new(stdout);
    let mut term = Terminal::new(backend)?;

    loop {
        let mut curr_state = doc.text(ta)?;
        let curr_state: String = curr_state.drain(0..curr_state.len() - 1).collect();
        let cursor_idx = doc.get_cursor_position(ta, &cursor, None)?;
        let (row, col) = cursor_2d(&curr_state, cursor_idx);

        term.draw(|f| {
            f.render_widget(Paragraph::new(curr_state.clone()), f.size());
            f.set_cursor(col as u16, row as u16);
        })?;

        if crossterm::event::poll(Duration::ZERO)? {
            match crossterm::event::read()?.into() {
                Input { key: Key::Esc, .. } => break,
                Input {
                    key: Key::Char(c),
                    ctrl: false,
                    alt: false,
                    ..
                } => {
                    let mut tx = doc.transaction();
                    tx.splice_text(ta, cursor_idx, 0, &c.to_string())?;
                    tx.commit();
                    send_am.send_timeout(doc.clone(), Duration::from_millis(16))?;
                    cursor = doc.get_cursor(ta, cursor_idx + 1, None)?;
                }
                Input {
                    key: Key::Enter,
                    ctrl: false,
                    alt: false,
                    ..
                } => {
                    let mut tx = doc.transaction();
                    tx.splice_text(ta, cursor_idx, 0, "\n")?;
                    tx.commit();
                    send_am.send_timeout(doc.clone(), Duration::from_millis(16))?;
                    cursor = doc.get_cursor(ta, cursor_idx + 1, None)?;
                }
                Input {
                    key: Key::Backspace,
                    ctrl: false,
                    alt: false,
                    ..
                } => {
                    if !curr_state.is_empty() {
                        let mut tx = doc.transaction();
                        tx.splice_text(ta, cursor_idx, -1, "")?;
                        tx.commit();
                        send_am.send_timeout(doc.clone(), Duration::from_millis(16))?;
                    }
                }
                Input {
                    key: Key::Right,
                    ctrl: false,
                    alt: false,
                    ..
                } => {
                    cursor =
                        doc.get_cursor(ta, std::cmp::min(cursor_idx + 1, curr_state.len()), None)?;
                }
                Input {
                    key: Key::Left,
                    ctrl: false,
                    alt: false,
                    ..
                } => {
                    cursor = doc.get_cursor(ta, std::cmp::max(cursor_idx - 1, 0), None)?;
                }
                Input {
                    ctrl: true,
                    alt: false,
                    key: Key::Char('c'),
                    ..
                } => {
                    // TODO copy paste
                }
                _input => {
                    // TODO
                }
            }
        } else if !receive_am.is_empty() {
            let mut doc_new = receive_am.recv_timeout(Duration::from_millis(16))?;
            doc.merge(&mut doc_new)?;
        }
    }

    disable_raw_mode()?;
    crossterm::execute!(
        term.backend_mut(),
        LeaveAlternateScreen,
        DisableMouseCapture
    )?;
    term.show_cursor()?;

    Ok(())
}

fn cursor_2d(string: &String, cursor_idx: usize) -> (usize, usize) {
    let (before_cursor, _) = string.split_at(cursor_idx);
    let row = before_cursor.chars().filter(|c| *c == '\n').count();
    let col = before_cursor.lines().skip(row).next().map_or(0, str::len);
    (row, col)
}

// #[test]
// fn test_textarea() -> Result<()> {
//     let mut doc = Automerge::new();
//     let mut tx = doc.transaction();
//     let ta = &tx.put_object(automerge::ROOT, "textarea", ObjType::Text)?;
//     tx.update_text(ta, "Hello, World!|")?;
//     tx.commit();

//     run_textarea_tui(doc, )?;
//     Ok(())
// }
