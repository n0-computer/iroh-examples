use iroh_bytes::HashAndFormat;
use iroh_pkarr_naming_system::{Record, IPNS};
use std::{process, str::FromStr};

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
            let content = HashAndFormat::from_str(&args[1])?;
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
