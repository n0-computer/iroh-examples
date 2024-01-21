//! Command line arguments.
use clap::{Parser, Subcommand};

#[derive(Parser, Debug)]
pub struct Args {
    #[clap(subcommand)]
    pub command: Commands,
}

#[derive(Subcommand, Debug)]
pub enum Commands {
    Server(ServerArgs),
}

#[derive(Parser, Debug)]
pub struct ServerArgs {
    /// The port to listen on.
    #[clap(long, default_value_t = 0xacacu16)]
    pub magic_port: u16,

    /// The quinn port to listen on.
    ///
    /// The server must be reachable under this port from the internet, via
    /// UDP for QUIC connections.
    #[clap(long, default_value_t = 0xbcbcu16)]
    pub quinn_port: u16,

    #[clap(long)]
    pub quiet: bool,
}
