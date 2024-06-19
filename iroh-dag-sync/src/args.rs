use std::path::PathBuf;

use clap::Parser;
use iroh_net::NodeId;
use libipld::Cid;

#[derive(Debug, Parser)]
pub struct Args {
    #[clap(subcommand)]
    pub cmd: SubCommand,
}

#[derive(Debug, Parser)]
pub enum SubCommand {
    Import(ImportArgs),
    Export(ExportArgs),
    Node(NodeArgs),
    Sync(SyncArgs),
}

#[derive(Debug, Parser)]
pub struct ImportArgs {
    #[clap(help = "The path to the CAR file to import")]
    pub path: PathBuf,
}

#[derive(Debug, Parser)]
pub struct ExportArgs {
    #[clap(help = "The root cid to traverse")]
    pub cid: Cid,

    #[clap(long, help = "Traversal method to use, full if omitted")]
    pub method: Option<String>,

    #[clap(long, help = "The path to the CAR file to export to")]
    pub target: Option<PathBuf>,
}

#[derive(Debug, Parser)]
pub struct NodeArgs {
    #[clap(flatten)]
    pub net: NetArgs,
}

#[derive(Debug, Parser)]
pub struct NetArgs {
    /// The port to listen on.
    #[clap(long, help = "The port to listen on")]
    pub iroh_port: Option<u16>,
}

#[derive(Debug, Parser)]
pub struct SyncArgs {
    #[clap(flatten)]
    pub net: NetArgs,
    #[clap(long, help = "The root cid to sync")]
    pub cid: String,
    #[clap(long, help = "The node to sync from")]
    pub from: NodeId,
    #[clap(long, help = "Traversal method to use, full if omitted")]
    pub traversal: Option<String>,
    #[clap(long, help = "Which data to send inline")]
    pub inline: Option<String>,
}
