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
use tui_textarea::{Input, Key};

pub fn run_textarea_tui(
    mut doc: Automerge,
    receive_am: Receiver<Automerge>,
    send_am: Sender<Automerge>,
) -> Result<()> {
    initialize_panic_handler();
    in_crossterm_alt_screen(move || {
        let stdout = io::stdout();
        let backend = CrosstermBackend::new(stdout.lock());
        let mut term = Terminal::new(backend)?;

        let ta = &doc
            .get(automerge::ROOT, "textarea")?
            .ok_or(anyhow!("Missing 'textarea' key in Automerge document"))?
            .1;

        let mut cursor = doc.get_cursor(ta, 0, None)?;

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
                        cursor = doc.get_cursor(
                            ta,
                            std::cmp::min(cursor_idx + 1, curr_state.len()),
                            None,
                        )?;
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
            } else if let Ok(mut new_doc) = receive_am.recv_timeout(Duration::from_millis(8)) {
                tracing::debug!("Got remote automerge update. merging in");
                doc.merge(&mut new_doc)?;
            }
        }

        Ok(())
    })
}

fn cursor_2d(string: &String, cursor_idx: usize) -> (usize, usize) {
    let before_cursor: String = string.chars().take(cursor_idx).collect();
    let row = before_cursor.chars().filter(|c| *c == '\n').count();
    let col = before_cursor.lines().skip(row).next().map_or(0, str::len);
    (row, col)
}

fn in_crossterm_alt_screen<T>(f: impl FnOnce() -> Result<T> + std::panic::UnwindSafe) -> Result<T> {
    enable_raw_mode()?;
    crossterm::execute!(
        io::stdout().lock(),
        EnterAlternateScreen,
        EnableMouseCapture
    )?;

    let unwound = std::panic::catch_unwind(f);

    disable_raw_mode()?;
    crossterm::execute!(
        io::stdout().lock(),
        LeaveAlternateScreen,
        DisableMouseCapture
    )?;

    match unwound {
        Ok(result) => result,
        Err(e) => std::panic::resume_unwind(e),
    }
}

pub fn initialize_panic_handler() {
    std::panic::set_hook(Box::new(|panic_info| {
        disable_raw_mode().ok(); // ignore failures
        crossterm::execute!(
            io::stdout().lock(),
            LeaveAlternateScreen,
            DisableMouseCapture
        )
        .ok(); // ignore failures
        better_panic::Settings::auto()
            .most_recent_first(false)
            .lineno_suffix(true)
            .create_panic_handler()(panic_info);
    }));
}
