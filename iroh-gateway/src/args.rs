//! Command line arguments.
use std::{
    net::{SocketAddrV4, SocketAddrV6},
    path::PathBuf,
};

use clap::Parser;

#[derive(clap::ValueEnum, Debug, Clone, Copy, PartialEq, Eq)]
pub enum CertMode {
    /// No certificates at all, we serve http.
    None,
    /// Use a self-signed certificate in the cert_path directory.
    Manual,
    /// Use a letsencrypt certificate, in staging mode.
    LetsEncryptStaging,
    /// Use a letsencrypt certificate, in production mode.
    LetsEncrypt,
}

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

    /// The address to use for the ipv4 iroh socket. Random by default.
    #[clap(long, default_value = None)]
    pub iroh_ipv4_addr: Option<SocketAddrV4>,

    /// The address to use for the ipv6 iroh socket. Random by default.
    #[clap(long, default_value = None)]
    pub iroh_ipv6_addr: Option<SocketAddrV6>,

    /// Certificate mode, default is none.
    #[clap(long, default_value = "none")]
    pub cert_mode: CertMode,

    /// Hostnames for letsencrypt.
    #[clap(long, required_if_eq_any([("cert_mode", "LetsEncryptStaging"), ("cert_mode", "LetsEncrypt")]))]
    pub hostname: Vec<String>,

    /// Contact email for letsencrypt.
    #[clap(long, required_if_eq_any([("cert_mode", "LetsEncryptStaging"), ("cert_mode", "LetsEncrypt")]))]
    pub contact: Option<String>,

    /// Certificate path.
    ///
    /// Not needed if cert_mode is None.
    /// In manual mode, this is the directory containing the cert.pem and key.pem files.
    /// In letsencrypt mode, this is the directory used by the acme acceptor.
    #[clap(long, required_if_eq_any([("cert_mode", "LetsEncryptStaging"), ("cert_mode", "LetsEncrypt"), ("cert_mode", "Manual")]))]
    pub cert_path: Option<PathBuf>,
}
