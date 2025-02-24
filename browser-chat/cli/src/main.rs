use std::collections::HashMap;

use anyhow::{Context, Result};
use chat_shared::{ChatNode, ChatTicket, Event};
use clap::Parser;
use iroh::SecretKey;
use n0_future::StreamExt;
use tokio::io::{AsyncBufReadExt, BufReader};

#[derive(Parser, Debug)]
struct Args {
    #[clap(subcommand)]
    command: Command,
    /// Set your name for this chat session
    #[clap(short, long)]
    nickname: String,
}

#[derive(Parser, Debug)]
pub enum Command {
    /// Create a new chat channel
    Create,
    /// Join a chat channel
    Join {
        /// Ticket for the channel
        ticket: String,
    },
}

#[tokio::main]
async fn main() -> Result<()> {
    tracing_subscriber::fmt::init();
    let args = Args::parse();

    let secret_key = match std::env::var("IROH_SECRET") {
        Err(_) => {
            let secret_key = SecretKey::generate(rand::rngs::OsRng);
            println!("* using new secret. to reuse, set this environment variable:");
            println!("IROH_SECRET={secret_key}");
            secret_key
        }
        Ok(s) => s
            .parse()
            .context("failed to parse secret key from IROH_SECRET environment variable")?,
    };

    let node = ChatNode::spawn(Some(secret_key)).await?;
    println!("node id: {}", node.node_id());

    let ticket = match args.command {
        Command::Create => ChatTicket::new_random(),
        Command::Join { ticket } => ChatTicket::deserialize(&ticket)?,
    };

    let mut our_ticket = ticket.clone();
    our_ticket.bootstrap = [node.node_id()].into_iter().collect();
    println!("* ticket to join this chat:");
    println!("{}", our_ticket.serialize());

    println!("* waiting for peers ...");
    let (sender, mut receiver) = node.join(&ticket, args.nickname)?;

    let receive = tokio::task::spawn(async move {
        let mut names = HashMap::new();
        while let Some(event) = receiver.try_next().await? {
            match event {
                Event::Joined { neighbors } => {
                    println!("* swarm joined");
                    for node_id in neighbors {
                        println!("* neighbor up: {node_id}")
                    }
                }
                Event::Presence {
                    from,
                    nickname,
                    sent_timestamp: _,
                } => {
                    let from_short = from.fmt_short();
                    if !nickname.is_empty() {
                        let old_name = names.get(&from);
                        if old_name != Some(&nickname) {
                            println!("* {from_short} is now known as {nickname}")
                        }
                    }
                    names.insert(from, nickname.clone());
                }
                Event::MessageReceived {
                    from,
                    text,
                    nickname,
                    sent_timestamp: _,
                } => {
                    let from_short = from.fmt_short();
                    if !nickname.is_empty() {
                        let old_name = names.get(&from);
                        if old_name != Some(&nickname) {
                            println!("* {from_short} is now known as {nickname}")
                        }
                    }
                    println!("<{from_short}> {nickname}: {text}");
                }
                Event::NeighborUp { node_id } => {
                    println!("* neighbor up: {node_id}")
                }
                Event::NeighborDown { node_id } => {
                    println!("* neighbor down: {node_id}")
                }
                Event::Lagged => {
                    println!("* warn: gossip stream lagged")
                }
            }
        }
        println!("* closed");
        anyhow::Ok(())
    });

    let send = tokio::task::spawn(async move {
        let mut input = BufReader::new(tokio::io::stdin()).lines();
        while let Some(line) = input.next_line().await? {
            let line = line.trim();
            if line.is_empty() {
                continue;
            }
            println!("* sending message: {line}");
            sender.send(line.to_string()).await?;
        }
        anyhow::Ok(())
    });

    // TODO: Clean shutown.
    receive.await??;
    send.await??;
    Ok(())
}
