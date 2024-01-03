//! Command line arguments.
use std::path::PathBuf;

use clap::Parser;

#[derive(Parser, Debug)]
pub struct Args {
    /// Ticket for the default node.
    ///
    /// This can be a node ticket or a blob ticket. If it is a blob ticket, the
    /// hash is ignored and just the node part is used.
    ///
    /// This is needed for all endpoints except `/ticket`.
    #[clap(long)]
    pub default_node: Option<String>,

    /// Http or https listen addr.
    /// 
    /// Will listen on http if cert_path is not specified, https otherwise.
    #[clap(long, default_value = "0.0.0.0:8080")]
    pub addr: String,

    /// Https certificate path.
    ///
    /// If this is specified, the server will listen on https.
    /// The path should be a directory containing `cert.pem` and `key.pem`.
    #[clap(long)]
    pub cert_path: Option<PathBuf>,

    /// Magic port for the node, random if not specified.
    #[clap(long)]
    pub magic_port: Option<u16>,
}
