//! Command line arguments.
use clap::Parser;
use url::Url;

#[derive(Parser, Debug)]
pub struct Args {
    /// Derp region
    #[clap(long, default_value = "https://euw1-1.derp.iroh.network")]
    pub derp_url: Url,

    /// Listen port
    #[clap(long, default_value = "8080")]
    pub port: u16,
}
