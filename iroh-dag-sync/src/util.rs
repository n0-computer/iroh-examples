use std::str::FromStr;

use iroh_blobs::{store::{fs::Store, Store as _}, BlobFormat};
use iroh_net::{key::SecretKey, Endpoint};
use libipld::{cbor::DagCborCodec, Cid, codec::Codec};
use serde::{de::DeserializeOwned, Serialize};
use tokio::io::{AsyncRead, AsyncReadExt};

use crate::tables::Tables;

// Wait for the endpoint to figure out its relay address.
pub async fn wait_for_relay(endpoint: &Endpoint) -> anyhow::Result<()> {
    while endpoint.my_relay().is_none() {
        tokio::time::sleep(std::time::Duration::from_millis(50)).await;
    }
    Ok(())
}

/// Get the secret key from a file or generate a new one.
pub fn get_or_create_secret() -> anyhow::Result<SecretKey> {
    if let Ok(secret) = std::env::var("SECRET") {
        let secret = SecretKey::from_str(&secret)?;
        Ok(secret)
    } else {
        // Generate a new secret key and print it to the console.
        // DON'T DO THIS IN PRODUCTION!
        let secret = SecretKey::generate();
        println!("Using SECRET={}", secret);
        println!("To keep the node id stable, set the SECRET environment variable");
        Ok(secret)
    }
}

/// Serialize a serializable object with a varint length prefix.
pub fn to_framed<S: Serialize>(s: &S) -> anyhow::Result<Vec<u8>> {
    let mut data = postcard::to_allocvec(s)?;
    let mut header = [0u8; 9];
    let header = postcard::to_slice(&(data.len() as u64), &mut header)?;
    data.splice(0..0, header.into_iter().map(|x| *x));
    Ok(data)
}

/// Deserialize a serializable object with a varint length prefix.
///
/// Note that this relies on that the minimum size of the content is more than 8 bytes.
pub async fn read_framed<S: DeserializeOwned>(mut reader: impl AsyncRead + Unpin) -> anyhow::Result<Option<S>> {
    let mut header = [0u8; 9];
    match reader.read_exact(&mut header).await {
        Ok(_) => {}
        Err(e) if e.kind() == std::io::ErrorKind::UnexpectedEof => return Ok(None),
        Err(e) => return Err(e.into()),
    }
    let (len, rest) = postcard::take_from_bytes::<u64>(&header)?;
    let mut data = vec![0u8; len as usize];
    data[0..rest.len()].copy_from_slice(rest);
    reader.read_exact(&mut data[rest.len()..]).await?;
    let data = postcard::from_bytes(&data)?;
    Ok(Some(data))
}

pub async fn insert_data_and_links<'tx>(tables: &mut Tables<'tx>, store: &Store, cid: Cid, data: Vec<u8>) -> anyhow::Result<()> {
    let block = libipld::block::Block::<libipld::DefaultParams>::new(cid, data)?;
    let mut links = Vec::new();
    block.references(&mut links)?;
    let (cid, data) = block.into_inner();
    let tag = store.import_bytes(data.into(), BlobFormat::Raw).await?;
    let hash = tag.hash();
    if !links.is_empty() {
        let links = DagCborCodec.encode(&links)?;
        tables.data_to_links.insert((cid.codec(), *hash), links)?;
    }
    tables
        .hash_to_blake3
        .insert((cid.hash().code(), cid.hash().digest()), hash)?;
    Ok(())
}