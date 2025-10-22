use anyhow::Result;
use browser_echo::node::EchoNode;
use clap::Parser;
use iroh::EndpointId;
use n0_future::StreamExt;

#[derive(Debug, Parser)]
struct Args {
    #[clap(subcommand)]
    command: Command,
}

#[derive(Debug, Parser)]
enum Command {
    Connect {
        endpoint_id: EndpointId,
        payload: String,
    },
    Accept,
}

#[tokio::main]
async fn main() -> Result<()> {
    tracing_subscriber::fmt::init();
    let args = Args::parse();
    let node = EchoNode::spawn().await?;
    match args.command {
        Command::Connect {
            endpoint_id,
            payload,
        } => {
            let mut events = node.connect(endpoint_id, payload);
            while let Some(event) = events.next().await {
                println!("event {event:?}");
            }
        }
        Command::Accept => {
            println!("connect to this node:");
            println!(
                "cargo run -- connect {} hello-please-echo-back",
                node.endpoint().id()
            );
            let mut events = node.accept_events();
            while let Some(event) = events.next().await {
                println!("event {event:?}");
            }
        }
    }

    Ok(())
}
