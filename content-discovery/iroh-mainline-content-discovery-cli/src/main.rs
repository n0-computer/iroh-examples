pub mod args;

use std::{
    net::{Ipv4Addr, SocketAddr, SocketAddrV4},
    str::FromStr,
};

use anyhow::Context;
use args::QueryDhtArgs;
use clap::Parser;
use futures::StreamExt;
use iroh_mainline_content_discovery::{
    create_quinn_client,
    protocol::{AbsoluteTime, Announce, AnnounceKind, Query, QueryFlags, SignedAnnounce},
    to_infohash, UdpDiscovery,
};
use iroh_net::endpoint;
use tokio::io::AsyncWriteExt;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt, EnvFilter};

use crate::args::{AnnounceArgs, Args, Commands, QueryArgs};

async fn announce(args: AnnounceArgs) -> anyhow::Result<()> {
    // todo: uncomment once the connection problems are fixed
    let Ok(key) = std::env::var("ANNOUNCE_SECRET") else {
        eprintln!("ANNOUNCE_SECRET environment variable must be set to a valid secret key");
        anyhow::bail!("ANNOUNCE_SECRET env var not set");
    };
    let Ok(key) = iroh_net::key::SecretKey::from_str(&key) else {
        anyhow::bail!("ANNOUNCE_SECRET env var is not a valid secret key");
    };
    let content = args.content.hash_and_format();
    let bind_addr = SocketAddr::V4(SocketAddrV4::new(
        Ipv4Addr::UNSPECIFIED,
        args.udp_port.unwrap_or_default(),
    ));
    let kind = if args.partial {
        AnnounceKind::Partial
    } else {
        AnnounceKind::Complete
    };
    let timestamp = AbsoluteTime::now();
    let announce = Announce {
        host: key.public(),
        kind,
        content,
        timestamp,
    };
    let signed_announce = SignedAnnounce::new(announce, &key)?;
    if !args.udp_tracker.is_empty() {
        let discovery = UdpDiscovery::new(bind_addr).await?;
        for tracker in args.udp_tracker {
            println!("announcing via udp to {:?}: {}", tracker, content);
            discovery.add_tracker(tracker).await?;
        }
        discovery.announce_once(signed_announce).await?;
    }
    if !args.magicsock_tracker.is_empty() {
        let iroh_endpoint = endpoint::Endpoint::builder()
            .bind(args.iroh_port.unwrap_or_default())
            .await?;
        for tracker in args.magicsock_tracker {
            println!("announcing via magicsock to {:?}: {}", tracker, content);
            let connection = iroh_endpoint
                .connect_by_node_id(&tracker, iroh_mainline_content_discovery::protocol::ALPN)
                .await?;
            iroh_mainline_content_discovery::announce(connection, signed_announce).await?;
        }
    }
    if !args.quic_tracker.is_empty() {
        let bind_addr = SocketAddr::V4(SocketAddrV4::new(
            Ipv4Addr::UNSPECIFIED,
            args.quic_port.unwrap_or_default(),
        ));
        let quinn_endpoint = create_quinn_client(
            bind_addr,
            vec![iroh_mainline_content_discovery::protocol::ALPN.to_vec()],
            false,
        )?;
        for tracker in args.quic_tracker {
            println!("announcing via quic to {:?}: {}", tracker, content);
            let connection = quinn_endpoint.connect(tracker, "localhost")?.await?;
            iroh_mainline_content_discovery::announce(connection, signed_announce).await?;
        }
    }

    println!("done");
    Ok(())
}

async fn query(args: QueryArgs) -> anyhow::Result<()> {
    let bind_addr = SocketAddr::V4(SocketAddrV4::new(
        Ipv4Addr::UNSPECIFIED,
        args.udp_port.unwrap_or_default(),
    ));
    let discovery = iroh_mainline_content_discovery::UdpDiscovery::new(bind_addr).await?;
    for tracker in args.tracker {
        discovery.add_tracker(tracker).await?;
    }
    let q = Query {
        content: args.content.hash_and_format(),
        flags: QueryFlags {
            complete: !args.partial,
            verified: args.verified,
        },
    };
    let res = discovery.query(q).await?;
    for sa in res {
        if sa.verify().is_ok() {
            println!("{}: {:?}", sa.announce.host, sa.announce.kind);
        } else {
            println!("invalid announce");
        }
    }
    Ok(())
}

async fn query_dht(args: QueryDhtArgs) -> anyhow::Result<()> {
    let bind_addr = SocketAddr::V4(SocketAddrV4::new(
        Ipv4Addr::UNSPECIFIED,
        args.udp_port.unwrap_or_default(),
    ));
    let discovery = UdpDiscovery::new(bind_addr).await?;
    let dht = mainline::Dht::client()?;
    let q = Query {
        content: args.content.hash_and_format(),
        flags: QueryFlags {
            complete: !args.partial,
            verified: args.verified,
        },
    };
    println!("content corresponds to infohash {}", to_infohash(q.content));

    let mut stream = discovery.query_dht(dht, q).await?;
    while let Some(announce) = stream.next().await {
        if announce.verify().is_ok() {
            println!("found verified provider {}", announce.host);
        } else {
            println!("got wrong signed announce!");
        }
    }
    Ok(())
}

// set the RUST_LOG env var to one of {debug,info,warn} to see logging info
pub fn setup_logging() {
    tracing_subscriber::registry()
        .with(tracing_subscriber::fmt::layer().with_writer(std::io::stderr))
        .with(EnvFilter::from_default_env())
        .try_init()
        .ok();
}

#[tokio::main(flavor = "multi_thread")]
async fn main() -> anyhow::Result<()> {
    setup_logging();
    let args = Args::parse();
    match args.command {
        Commands::Announce(args) => announce(args).await,
        Commands::Query(args) => query(args).await,
        Commands::QueryDht(args) => query_dht(args).await,
    }
}

/// Loads a [`SecretKey`] from the provided file.
pub async fn load_secret_key(
    key_path: std::path::PathBuf,
) -> anyhow::Result<iroh_net::key::SecretKey> {
    if key_path.exists() {
        let keystr = tokio::fs::read(key_path).await?;
        let secret_key =
            iroh_net::key::SecretKey::try_from_openssh(keystr).context("invalid keyfile")?;
        Ok(secret_key)
    } else {
        let secret_key = iroh_net::key::SecretKey::generate();
        let ser_key = secret_key.to_openssh()?;

        // Try to canoncialize if possible
        let key_path = key_path.canonicalize().unwrap_or(key_path);
        let key_path_parent = key_path.parent().ok_or_else(|| {
            anyhow::anyhow!("no parent directory found for '{}'", key_path.display())
        })?;
        tokio::fs::create_dir_all(&key_path_parent).await?;

        // write to tempfile
        let (file, temp_file_path) = tempfile::NamedTempFile::new_in(key_path_parent)
            .context("unable to create tempfile")?
            .into_parts();
        let mut file = tokio::fs::File::from_std(file);
        file.write_all(ser_key.as_bytes())
            .await
            .context("unable to write keyfile")?;
        file.flush().await?;
        drop(file);

        // move file
        tokio::fs::rename(temp_file_path, key_path)
            .await
            .context("failed to rename keyfile")?;

        Ok(secret_key)
    }
}
