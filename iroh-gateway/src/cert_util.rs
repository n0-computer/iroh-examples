//! Utilities for loading certificates and keys.
use anyhow::{Context, Result};
use std::path::Path;

use rustls::pki_types::{pem::PemObject, CertificateDer, PrivateKeyDer};

pub fn load_certs<'a>(filename: impl AsRef<Path>) -> Result<Vec<CertificateDer<'a>>> {
    println!("loading certs from {}", filename.as_ref().display());
    let certfile = std::fs::File::open(filename).context("cannot open certificate file")?;
    let mut reader = std::io::BufReader::new(certfile);
    let certs = CertificateDer::pem_reader_iter(&mut reader).collect::<Result<Vec<_>, _>>()?;

    Ok(certs)
}

pub fn load_secret_key<'a>(filename: impl AsRef<Path>) -> Result<PrivateKeyDer<'a>> {
    println!("loading secret key from {}", filename.as_ref().display());
    let keyfile = std::fs::File::open(filename.as_ref()).context("cannot open secret key file")?;
    let mut reader = std::io::BufReader::new(keyfile);

    let key = PrivateKeyDer::from_pem_reader(&mut reader)?;

    Ok(key)
}
