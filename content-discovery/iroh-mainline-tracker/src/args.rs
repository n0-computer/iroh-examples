//! Command line arguments.
use clap::Parser;

#[derive(Parser, Debug)]
pub struct Args {
    /// The magic port to listen on.
    #[clap(long)]
    pub magic_port: Option<u16>,

    /// The quinn port to listen on.
    ///
    /// The server must be reachable under this port from the internet, via
    /// UDP for QUIC connections.
    #[clap(long)]
    pub quinn_port: Option<u16>,

    /// The raw udp port to listen on.
    #[clap(long)]
    pub udp_port: Option<u16>,

    #[clap(long)]
    pub quiet: bool,
}
