use anyhow::Result;
use blobs_wasm::BlobsNode;
use clap::Parser;
use iroh_blobs::ticket::BlobTicket;

#[derive(Debug, Parser)]
struct Args {
    #[clap(subcommand)]
    command: Command,
}

#[derive(Debug, Parser)]
enum Command {
    Provide { data: String },
    Download { ticket: BlobTicket },
}

#[tokio::main]
async fn main() -> Result<()> {
    tracing_subscriber::fmt::init();
    let args = Args::parse();
    let node = BlobsNode::spawn().await?;
    match args.command {
        Command::Provide { data } => {
            let data = data.as_bytes().to_vec();
            let ticket = node.import(data.into()).await?;
            println!("ticket:");
            println!("{ticket}");
            println!();
            println!("providing... press Ctrl-C to abort");
            tokio::signal::ctrl_c().await?;
        }
        Command::Download { ticket } => {
            let hash = ticket.hash();
            println!(
                "downloading blob {hash} from {}",
                ticket.addr().id.fmt_short()
            );
            node.download(ticket).await?;
            println!("download finished");
            let size = node.complete_size(hash).await?;
            println!("size: {size}");
            if size < 1024 * 1024 {
                let data = node.blobs.get_bytes(hash).await?;
                match std::str::from_utf8(&data) {
                    Ok(s) => println!("content: {s}"),
                    Err(_) => println!("(invalid utf-8)"),
                }
            }
        }
    }

    Ok(())
}
