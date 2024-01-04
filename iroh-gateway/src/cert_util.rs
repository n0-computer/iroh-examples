//! Utilities for loading certificates and keys.
use anyhow::{Context, Result};
use std::path::Path;

pub fn load_certs(filename: impl AsRef<Path>) -> Result<Vec<rustls::Certificate>> {
    println!("loading certs from {}", filename.as_ref().display());
    let certfile = std::fs::File::open(filename).context("cannot open certificate file")?;
    let mut reader = std::io::BufReader::new(certfile);

    let certs = rustls_pemfile::certs(&mut reader)?
        .iter()
        .map(|v| rustls::Certificate(v.clone()))
        .collect();

    Ok(certs)
}

pub fn load_secret_key(filename: impl AsRef<Path>) -> Result<rustls::PrivateKey> {
    println!("loading secret key from {}", filename.as_ref().display());
    let keyfile = std::fs::File::open(filename.as_ref()).context("cannot open secret key file")?;
    let mut reader = std::io::BufReader::new(keyfile);

    loop {
        match rustls_pemfile::read_one(&mut reader).context("cannot parse secret key .pem file")? {
            Some(rustls_pemfile::Item::RSAKey(key)) => return Ok(rustls::PrivateKey(key)),
            Some(rustls_pemfile::Item::PKCS8Key(key)) => return Ok(rustls::PrivateKey(key)),
            Some(rustls_pemfile::Item::ECKey(key)) => return Ok(rustls::PrivateKey(key)),
            None => break,
            _ => {}
        }
    }

    anyhow::bail!(
        "no keys found in {} (encrypted keys not supported)",
        filename.as_ref().display()
    );
}
