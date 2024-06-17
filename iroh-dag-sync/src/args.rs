use std::path::PathBuf;

use clap::Parser;

#[derive(Debug, Parser)]
pub struct Args {
    #[clap(subcommand)]
    pub cmd: SubCommand,
}

#[derive(Debug, Parser)]
pub enum SubCommand {
    Import(ImportArgs),
    Traverse(TraverseArgs),
}

#[derive(Debug, Parser)]
pub struct ImportArgs {
    #[clap(long, help = "The path to the CAR file to import")]
    pub path: PathBuf,
}

#[derive(Debug, Parser)]
pub struct TraverseArgs {
    #[clap(long, help = "The root cid to traverse")]
    pub cid: String,

    #[clap(long, help = "Traversal method to use, full if omitted")]
    pub method: Option<String>,
}

#[derive(Debug, Parser)]
struct NetArgs {
    /// The port to listen on.
    #[clap(long)]
    pub iroh_port: Option<u16>,
}
