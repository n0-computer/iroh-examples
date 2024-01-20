use std::{net::SocketAddr, sync::Arc, time::Duration};

use anyhow::Context;
use iroh_net::{
    magic_endpoint::{get_alpn, get_remote_node_id},
    MagicEndpoint, NodeId,
};
use iroh_pkarr_node_discovery::PkarrNodeDiscovery;
use pkarr::PkarrClient;
use protocol::QueryResponse;
use tokio::io::AsyncWriteExt;

use crate::protocol::{Announce, Query, Request, Response, REQUEST_SIZE_LIMIT, TRACKER_ALPN};

pub mod io;
pub mod iroh_bytes_util;
pub mod options;
pub mod protocol;
pub mod tracker;

/// A tracker id for queries - either a node id or an address.
#[derive(Debug, Clone, PartialEq, Eq, Hash, PartialOrd, Ord)]
pub enum TrackerId {
    NodeId(NodeId),
    Addr(std::net::SocketAddr),
}

impl std::fmt::Display for TrackerId {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            TrackerId::NodeId(node_id) => write!(f, "{}", node_id),
            TrackerId::Addr(addr) => write!(f, "{}", addr),
        }
    }
}

impl std::str::FromStr for TrackerId {
    type Err = anyhow::Error;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        if let Ok(node_id) = s.parse() {
            return Ok(TrackerId::NodeId(node_id));
        }
        if let Ok(addr) = s.parse() {
            return Ok(TrackerId::Addr(addr));
        }
        anyhow::bail!("invalid tracker id")
    }
}

/// Accept an incoming connection and extract the client-provided [`NodeId`] and ALPN protocol.
pub(crate) async fn accept_conn(
    mut conn: quinn::Connecting,
) -> anyhow::Result<(NodeId, String, quinn::Connection)> {
    let alpn = get_alpn(&mut conn).await?;
    let conn = conn.await?;
    let peer_id = get_remote_node_id(&conn)?;
    Ok((peer_id, alpn, conn))
}

/// Announce to a tracker.
///
/// You can only announce content you yourself claim to have, to avoid spamming other nodes.
///
/// `endpoint` is the magic endpoint to use for announcing.
/// `tracker` is the node id of the tracker to announce to. It must understand the [TRACKER_ALPN] protocol.
/// `content` is the content to announce.
/// `kind` is the kind of the announcement. We can claim to have the complete data or only some of it.
pub async fn announce(connection: quinn::Connection, args: Announce) -> anyhow::Result<()> {
    let (mut send, mut recv) = connection.open_bi().await?;
    tracing::debug!("opened bi stream");
    let request = Request::Announce(args);
    let request = postcard::to_stdvec(&request)?;
    tracing::debug!("sending announce");
    send.write_all(&request).await?;
    send.finish().await?;
    let _response = recv.read_to_end(REQUEST_SIZE_LIMIT).await?;
    Ok(())
}

/// Assume an existing connection to a tracker and query it for peers for some content.
pub async fn query(connection: quinn::Connection, args: Query) -> anyhow::Result<QueryResponse> {
    tracing::info!("connected to {:?}", connection.remote_address());
    let (mut send, mut recv) = connection.open_bi().await?;
    tracing::info!("opened bi stream");
    let request = Request::Query(args);
    let request = postcard::to_stdvec(&request)?;
    tracing::info!("sending query");
    send.write_all(&request).await?;
    send.finish().await?;
    let response = recv.read_to_end(REQUEST_SIZE_LIMIT).await?;
    let response = postcard::from_bytes::<Response>(&response)?;
    Ok(match response {
        Response::QueryResponse(response) => response,
    })
}

/// Returns default server configuration along with its certificate.
#[allow(clippy::field_reassign_with_default)] // https://github.com/rust-lang/rust-clippy/issues/6527
fn configure_server(secret_key: &iroh_net::key::SecretKey) -> anyhow::Result<quinn::ServerConfig> {
    make_server_config(secret_key, 8, 1024, vec![TRACKER_ALPN.to_vec()])
}

fn create_quinn_client(
    bind_addr: SocketAddr,
    alpn_protocols: Vec<Vec<u8>>,
    keylog: bool,
) -> anyhow::Result<quinn::Endpoint> {
    let secret_key = iroh_net::key::SecretKey::generate();
    let tls_client_config =
        iroh_net::tls::make_client_config(&secret_key, None, alpn_protocols, keylog)?;
    let mut client_config = quinn::ClientConfig::new(Arc::new(tls_client_config));
    let mut endpoint = quinn::Endpoint::client(bind_addr)?;
    let mut transport_config = quinn::TransportConfig::default();
    transport_config.keep_alive_interval(Some(Duration::from_secs(1)));
    client_config.transport_config(Arc::new(transport_config));
    endpoint.set_default_client_config(client_config);
    Ok(endpoint)
}

/// Create a [`quinn::ServerConfig`] with the given secret key and limits.
pub fn make_server_config(
    secret_key: &iroh_net::key::SecretKey,
    max_streams: u64,
    max_connections: u32,
    alpn_protocols: Vec<Vec<u8>>,
) -> anyhow::Result<quinn::ServerConfig> {
    let tls_server_config = iroh_net::tls::make_server_config(secret_key, alpn_protocols, false)?;
    let mut server_config = quinn::ServerConfig::with_crypto(Arc::new(tls_server_config));
    let mut transport_config = quinn::TransportConfig::default();
    transport_config
        .max_concurrent_bidi_streams(max_streams.try_into()?)
        .max_concurrent_uni_streams(0u32.into());

    server_config
        .transport_config(Arc::new(transport_config))
        .concurrent_connections(max_connections);
    Ok(server_config)
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

async fn create_endpoint(
    key: iroh_net::key::SecretKey,
    port: u16,
    publish: bool,
) -> anyhow::Result<MagicEndpoint> {
    let pkarr = PkarrClient::new();
    let discovery_key = if publish { Some(&key) } else { None };
    let mainline_discovery = PkarrNodeDiscovery::new(pkarr, discovery_key);
    iroh_net::MagicEndpoint::builder()
        .secret_key(key)
        .discovery(Box::new(mainline_discovery))
        .alpns(vec![TRACKER_ALPN.to_vec()])
        .bind(port)
        .await
}
