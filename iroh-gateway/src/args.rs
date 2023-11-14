//! Command line arguments.
use clap::Parser;
use iroh::net::key::PublicKey as NodeId;

#[derive(Parser, Debug)]
pub struct Args {
    /// The node to provide a gateway for.
    ///
    /// You can also specify a node in the url, but this one will be the default.
    #[clap(long)]
    pub default_node: Option<NodeId>,

    /// Derp region
    #[clap(long, default_value = "2")]
    pub derp_region: u16,

    /// Listen port
    #[clap(long, default_value = "8080")]
    pub port: u16,
}
