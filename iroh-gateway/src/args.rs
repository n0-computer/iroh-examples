//! Command line arguments.
use clap::Parser;
use iroh::net::key::PublicKey as NodeId;
use url::Url;

#[derive(Parser, Debug)]
pub struct Args {
    /// The node to provide a gateway for.
    ///
    /// You can also specify a node in the url, but this one will be the default.
    #[clap(long)]
    pub default_node: Option<NodeId>,

    /// Derp region
    #[clap(long, default_value = "https://euw1-1.derp.iroh.network")]
    pub derp_url: Url,

    /// Listen port
    #[clap(long, default_value = "8080")]
    pub port: u16,
}
