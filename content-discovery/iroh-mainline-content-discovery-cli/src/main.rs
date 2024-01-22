pub mod args;

use std::{
    net::{Ipv4Addr, SocketAddr, SocketAddrV4},
    str::FromStr,
    time::{SystemTime, UNIX_EPOCH},
};

use anyhow::Context;
use args::QueryDhtArgs;
use clap::Parser;
use futures::StreamExt;
use iroh_mainline_content_discovery::{
    create_quinn_client,
    protocol::{Announce, AnnounceKind, Query, QueryFlags, ALPN},
    to_infohash,
};
use iroh_net::{
    magic_endpoint::{get_alpn, get_remote_node_id},
    MagicEndpoint, NodeId,
};
use iroh_pkarr_node_discovery::PkarrNodeDiscovery;
use tokio::io::AsyncWriteExt;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt, EnvFilter};

use crate::args::{AnnounceArgs, Args, Commands, QueryArgs};

async fn create_endpoint(
    key: iroh_net::key::SecretKey,
    port: u16,
    publish: bool,
) -> anyhow::Result<MagicEndpoint> {
    let mainline_discovery = if publish {
        PkarrNodeDiscovery::builder().secret_key(&key).build()
    } else {
        PkarrNodeDiscovery::default()
    };
    iroh_net::MagicEndpoint::builder()
        .secret_key(key)
        .discovery(Box::new(mainline_discovery))
        .alpns(vec![ALPN.to_vec()])
        .bind(port)
        .await
}

/// Accept an incoming connection and extract the client-provided [`NodeId`] and ALPN protocol.
pub async fn accept_conn(
    mut conn: quinn::Connecting,
) -> anyhow::Result<(NodeId, String, quinn::Connection)> {
    let alpn = get_alpn(&mut conn).await?;
    let conn = conn.await?;
    let peer_id = get_remote_node_id(&conn)?;
    Ok((peer_id, alpn, conn))
}

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
    println!("announcing to {}: {}", args.tracker, content);
    let endpoint = create_endpoint(key.clone(), args.magic_port.unwrap_or_default(), false).await?;
    let connection = endpoint.connect_by_node_id(&args.tracker, ALPN).await?;
    println!("connected to {:?}", connection.remote_address());
    let kind = if args.partial {
        AnnounceKind::Partial
    } else {
        AnnounceKind::Complete
    };
    let timestamp = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .expect("Time went backwards")
        .as_secs();
    let announce = Announce {
        host: key.public(),
        kind,
        content,
        timestamp,
    };
    iroh_mainline_content_discovery::announce(connection, announce, &key).await?;
    println!("done");
    Ok(())
}

async fn query(args: QueryArgs) -> anyhow::Result<()> {
    let connection = iroh_mainline_content_discovery::connect(
        &args.tracker,
        args.magic_port.unwrap_or_default(),
    )
    .await?;
    let q = Query {
        content: args.content.hash_and_format(),
        flags: QueryFlags {
            complete: !args.partial,
            verified: args.verified,
        },
    };
    let res = iroh_mainline_content_discovery::query(connection, q).await?;
    println!(
        "querying tracker {} for content {}",
        args.tracker, args.content
    );
    for peer in res.hosts {
        if let Ok(announce) = peer.verify() {
            println!("{}: {:?}", announce.host, announce.kind);
        } else {
            println!("invalid announce");
        }
    }
    Ok(())
}

async fn query_dht(args: QueryDhtArgs) -> anyhow::Result<()> {
    let bind_addr = SocketAddr::V4(SocketAddrV4::new(
        Ipv4Addr::UNSPECIFIED,
        args.quinn_port.unwrap_or_default(),
    ));
    let endpoint = create_quinn_client(bind_addr, vec![ALPN.to_vec()], false)?;
    let dht = mainline::Dht::default();
    let q = Query {
        content: args.content.hash_and_format(),
        flags: QueryFlags {
            complete: !args.partial,
            verified: args.verified,
        },
    };
    println!("content corresponds to infohash {}", to_infohash(q.content));
    let mut stream = iroh_mainline_content_discovery::query_dht(
        endpoint,
        dht,
        q,
        args.query_parallelism.unwrap_or(4),
    );
    while let Some(item) = stream.next().await {
        match item {
            Ok(signed_announce) => {
                if let Ok(announce) = signed_announce.verify() {
                    println!("found verified provider {}", announce.host);
                } else {
                    println!("found unverified provider");
                }
            }
            Err(e) => println!("error: {}", e),
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
