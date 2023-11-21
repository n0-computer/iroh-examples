//! Command line arguments.
use clap::{Parser, Subcommand};
use std::path::PathBuf;

#[derive(Parser, Debug)]
pub struct Args {
    #[clap(subcommand)]
    pub command: Commands,
}

#[derive(Subcommand, Debug)]
pub enum Commands {
    Watch(WatchArgs),
}

#[derive(Parser, Debug)]
pub struct WatchArgs {
    #[clap(long)]
    pub path: PathBuf,
}
