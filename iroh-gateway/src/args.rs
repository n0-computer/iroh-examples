//! Command line arguments.
use std::path::PathBuf;

use clap::Parser;
use iroh::ticket::NodeTicket;

#[derive(Parser, Debug)]
pub struct Args {
    /// Node ticket for the default node
    #[clap(long)]
    pub default_node: Option<NodeTicket>,

    /// Http or https listen addr
    #[clap(long, default_value = "0.0.0.0:8080")]
    pub addr: String,

    /// Https certificate path.
    ///
    /// If this is specified, the server will listen on https.
    /// The path should be a directory containing `cert.pem` and `key.pem`.
    #[clap(long)]
    pub cert_path: Option<PathBuf>,

    /// Magic port for the node, random if not specified
    #[clap(long)]
    pub magic_port: Option<u16>,
}
