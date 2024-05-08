use iroh_bytes::{Hash, HashAndFormat};
use iroh::ticket::BlobTicket;
use iroh_pkarr_naming_system::{Record, IPNS};
use std::{fmt::Display, process, str::FromStr};

/// Various ways to specify content.
#[derive(Debug, Clone, derive_more::From)]
pub enum ContentArg {
    Hash(Hash),
    HashAndFormat(HashAndFormat),
    Ticket(BlobTicket),
}

impl ContentArg {
    /// Get the hash and format of the content.
    pub fn hash_and_format(&self) -> HashAndFormat {
        match self {
            ContentArg::Hash(hash) => HashAndFormat::raw(*hash),
            ContentArg::HashAndFormat(haf) => *haf,
            ContentArg::Ticket(ticket) => HashAndFormat {
                hash: ticket.hash(),
                format: ticket.format(),
            },
        }
    }
}

impl Display for ContentArg {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            ContentArg::Hash(hash) => Display::fmt(hash, f),
            ContentArg::HashAndFormat(haf) => Display::fmt(haf, f),
            ContentArg::Ticket(ticket) => Display::fmt(ticket, f),
        }
    }
}

impl FromStr for ContentArg {
    type Err = anyhow::Error;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        if let Ok(hash) = Hash::from_str(s) {
            Ok(hash.into())
        } else if let Ok(haf) = HashAndFormat::from_str(s) {
            Ok(haf.into())
        } else if let Ok(ticket) = BlobTicket::from_str(s) {
            Ok(ticket.into())
        } else {
            anyhow::bail!("invalid hash and format")
        }
    }
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    tracing_subscriber::fmt::init();
    let args = std::env::args();
    let args = args.into_iter().skip(1).collect::<Vec<_>>();
    match args.len() {
        // resolve a record
        1 => {
            let public_key = iroh_net::key::PublicKey::from_str(&args[0])?;
            let ipns = IPNS::default();
            let record = ipns.resolve(public_key).await?;
            if let Some(Record::Content { content }) = record {
                println!("Found content {}", content);
            } else {
                println!("No record found");
            }
        }
        // publish a record
        2 => {
            let secret_key = iroh_net::key::SecretKey::from_str(&args[0])?;
            let public_key = secret_key.public();
            let zid = pkarr::PublicKey::try_from(*public_key.as_bytes())?.to_z32();
            let content = ContentArg::from_str(&args[1])?.hash_and_format();
            let record = Record::Content { content };
            let ipns = IPNS::default();
            println!("Publishing record to: {}", public_key);
            println!("pkarr z32: {}", zid);
            println!("see https://app.pkarr.org/?pk={}", zid);
            ipns.publish(secret_key, Some(record)).await?;
            tokio::time::sleep(tokio::time::Duration::from_secs(1)).await;
        }
        _ => {
            println!("Usage: cli <secret_key> <content> # publish a record");
            println!("Usage: cli <public_key> # resolve a record");
            process::exit(1);
        }
    }
    Ok(())
}
