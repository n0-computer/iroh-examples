mod args;
use anyhow::Context;
use axum::{
    body::Body,
    extract::Path,
    http::{header, Request, StatusCode},
    response::{IntoResponse, Response},
    routing::get,
    Extension, Router,
};
use bytes::Bytes;
use clap::Parser;
use derive_more::Deref;
use headers::{HeaderMapExt, Range};
use iroh::{
    bytes::store::bao_tree::{ByteNum, ChunkNum},
    collection::{Blob, Collection},
};
use iroh::{
    bytes::{
        get::fsm::{BlobContentNext, ConnectedNext, DecodeError, EndBlobNext},
        protocol::RangeSpecSeq,
        store::bao_tree::io::fsm::BaoContentItem,
        Hash,
    },
    net::{key::PublicKey, AddrInfo, MagicEndpoint, NodeAddr},
};
use mime::Mime;
use mime_classifier::MimeClassifier;
use range_collections::{range_set::RangeSetRange, RangeSet2};
use std::{
    collections::BTreeMap,
    net::SocketAddr,
    ops::Bound,
    result,
    sync::{Arc, RwLock},
};
use url::Url;

// Make our own error that wraps `anyhow::Error`.
struct AppError(anyhow::Error);

// Tell axum how to convert `AppError` into a response.
impl IntoResponse for AppError {
    fn into_response(self) -> Response {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            format!("Something went wrong: {}", self.0),
        )
            .into_response()
    }
}

// This enables using `?` on functions that return `Result<_, anyhow::Error>` to turn them into
// `Result<_, AppError>`. That way you don't need to do that manually.
impl<E> From<E> for AppError
where
    E: Into<anyhow::Error>,
{
    fn from(err: E) -> Self {
        Self(err.into())
    }
}

/// Given a range specified as arbitrary range bounds, normalize it into a range
/// that has inclusive start and exclusive end.
fn normalize_range(start: Bound<u64>, end: Bound<u64>) -> (Option<u64>, Option<u64>) {
    match (start, end) {
        (Bound::Included(start), Bound::Included(end)) => (Some(start), end.checked_add(1)),
        (Bound::Included(start), Bound::Excluded(end)) => (Some(start), Some(end)),
        (Bound::Included(start), Bound::Unbounded) => (Some(start), None),
        (Bound::Excluded(start), Bound::Included(end)) => {
            (start.checked_add(1), end.checked_add(1))
        }
        (Bound::Excluded(start), Bound::Excluded(end)) => (start.checked_add(1), Some(end)),
        (Bound::Excluded(start), Bound::Unbounded) => (start.checked_add(1), None),
        (Bound::Unbounded, Bound::Included(end)) => (None, end.checked_add(1)),
        (Bound::Unbounded, Bound::Excluded(end)) => (None, Some(end)),
        (Bound::Unbounded, Bound::Unbounded) => (None, None),
    }
}

/// Convert a normalized range into a `RangeSet2<u64>` that represents the byte range.
fn to_byte_range(start: Option<u64>, end: Option<u64>) -> RangeSet2<u64> {
    match (start, end) {
        (Some(start), Some(end)) => RangeSet2::from(start..end),
        (Some(start), None) => RangeSet2::from(start..),
        (None, Some(end)) => RangeSet2::from(..end),
        (None, None) => RangeSet2::all(),
    }
}

/// Convert a normalized range into a `RangeSet2<ChunkNum>` that represents the chunk range.
///
/// Ranges are rounded up so that the given byte range is completely covered by the chunk range.
fn to_chunk_range(start: Option<u64>, end: Option<u64>) -> RangeSet2<ChunkNum> {
    let start = start.map(ByteNum);
    let end = end.map(ByteNum);
    match (start, end) {
        (Some(start), Some(end)) => RangeSet2::from(start.full_chunks()..end.chunks()),
        (Some(start), None) => RangeSet2::from(start.full_chunks()..),
        (None, Some(end)) => RangeSet2::from(..end.chunks()),
        (None, None) => RangeSet2::all(),
    }
}

/// Given an incoming piece of data at an offset, and a set of ranges that are being requested,
/// split the data into parts that cover only requested ranges
fn slice(offset: u64, data: Bytes, ranges: RangeSet2<u64>) -> Vec<Bytes> {
    let len = data.len() as u64;
    let data_range = to_byte_range(Some(offset), offset.checked_add(len));
    let relevant = ranges & data_range;
    relevant
        .iter()
        .map(|range| match range {
            RangeSetRange::Range(range) => {
                let start = (range.start - offset) as usize;
                let end = (range.end - offset) as usize;
                data.slice(start..end)
            }
            RangeSetRange::RangeFrom(range) => {
                let start = (range.start - offset) as usize;
                data.slice(start..)
            }
        })
        .collect()
}

/// Parse the byte range from the request headers.
async fn parse_byte_range(req: Request<Body>) -> anyhow::Result<(Option<u64>, Option<u64>)> {
    Ok(match req.headers().typed_get::<Range>() {
        Some(range) => {
            println!("got range request {:?}", range);
            if range.iter().count() > 1 {
                anyhow::bail!("multiple ranges not supported");
            }
            let Some((start, end)) = range.iter().next() else {
                anyhow::bail!("empty range");
            };
            normalize_range(start, end)
        }
        None => (None, None),
    })
}

#[derive(Debug, Clone)]
struct Gateway(Arc<Inner>);

impl Deref for Gateway {
    type Target = Inner;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

#[derive(derive_more::Debug)]
struct Inner {
    /// Endpoint to connect to nodes
    endpoint: MagicEndpoint,
    /// Default node to connect to when not specified in the url
    default_node: Option<NodeAddr>,
    /// Mime classifier
    #[debug("MimeClassifier")]
    mime_classifier: MimeClassifier,
    /// Cache of hashes to mime types
    ///
    /// TODO: maybe use a TTL cache for this
    mime_cache: RwLock<BTreeMap<Hash, Mime>>,
    /// Cache of hashes to collections
    collection_cache: RwLock<BTreeMap<Hash, Collection>>,
}

impl Inner {
    /// Get the default node to connect to when not specified in the url
    fn default_node(&self) -> anyhow::Result<NodeAddr> {
        let node_addr = self
            .default_node
            .clone()
            .context("default node not configured")?;
        Ok(node_addr)
    }

    /// Get the mime type for a hash from the remote node.
    async fn get_default_connection(&self) -> anyhow::Result<quinn::Connection> {
        let connection = self
            .endpoint
            .connect(self.default_node()?, &iroh::bytes::protocol::ALPN)
            .await?;
        Ok(connection)
    }

    /// Get a connection to a remote node by node id.
    async fn get_connection(&self, remote_node_id: PublicKey) -> anyhow::Result<quinn::Connection> {
        let connection = self
            .endpoint
            .connect_by_node_id(&remote_node_id, &iroh::bytes::protocol::ALPN)
            .await?;
        Ok(connection)
    }
}

async fn get_collection_inner(
    hash: &Hash,
    connection: &quinn::Connection,
) -> anyhow::Result<Collection> {
    let spec = RangeSpecSeq::from_ranges(vec![RangeSet2::all(), RangeSet2::all()]);
    let request = iroh::bytes::protocol::GetRequest::new(*hash, spec);
    let req = iroh::bytes::get::fsm::start(connection.clone(), request);
    let connected = req.next().await?;
    let ConnectedNext::StartRoot(at_start_root) = connected.next().await? else {
        anyhow::bail!("unexpected response");
    };
    let (end_blob_next, _hash_seq, collection) =
        iroh::collection::Collection::read_fsm(at_start_root).await?;
    let EndBlobNext::Closing(at_closing) = end_blob_next else {
        anyhow::bail!("unexpected response");
    };
    let _stats = at_closing.next().await?;
    Ok(collection)
}

/// Get the mime type for a hash, either from the cache or by requesting it from the node.
async fn get_collection(
    gateway: &Gateway,
    hash: &Hash,
    connection: &quinn::Connection,
) -> anyhow::Result<Collection> {
    if let Some(res) = gateway.collection_cache.read().unwrap().get(hash) {
        return Ok(res.clone());
    }
    let collection = get_collection_inner(hash, connection).await?;
    gateway
        .collection_cache
        .write()
        .unwrap()
        .insert(*hash, collection.clone());
    Ok(collection)
}

/// Get the mime type for a hash from the remote node.
async fn get_mime_type_inner(
    hash: &Hash,
    connection: &quinn::Connection,
    mime_classifier: &MimeClassifier,
) -> anyhow::Result<Mime> {
    // read 2 KiB.
    let range = RangeSpecSeq::from_ranges(Some(RangeSet2::from(..ByteNum(2048).chunks())));
    let request = iroh::bytes::protocol::GetRequest::new(*hash, range);
    let req = iroh::bytes::get::fsm::start(connection.clone(), request);
    let connected = req.next().await?;
    let ConnectedNext::StartRoot(x) = connected.next().await? else {
        anyhow::bail!("unexpected response");
    };
    let (at_end, data) = x.next().concatenate_into_vec().await?;
    let EndBlobNext::Closing(at_closing) = at_end.next() else {
        anyhow::bail!("unexpected response");
    };
    let _stats = at_closing.next().await?;
    let context = mime_classifier::LoadContext::Browsing;
    let no_sniff_flag = mime_classifier::NoSniffFlag::Off;
    let apache_bug_flag = mime_classifier::ApacheBugFlag::On;
    let supplied_type = None;
    let mime = mime_classifier.classify(
        context,
        no_sniff_flag,
        apache_bug_flag,
        &supplied_type,
        &data,
    );
    Ok(mime)
}

/// Get the mime type for a hash, either from the cache or by requesting it from the node.
async fn get_mime_type(
    gateway: &Gateway,
    hash: &Hash,
    connection: &quinn::Connection,
) -> anyhow::Result<Mime> {
    if let Some(mime) = gateway.mime_cache.read().unwrap().get(hash) {
        return Ok(mime.clone());
    }
    let mime = get_mime_type_inner(hash, connection, &gateway.mime_classifier).await?;
    gateway
        .mime_cache
        .write()
        .unwrap()
        .insert(*hash, mime.clone());
    Ok(mime)
}

/// Handle a request for a range of bytes from an explicitly specified node.
async fn handle_remote_blob_request(
    gateway: Extension<Gateway>,
    path: Path<(PublicKey, Hash)>,
    req: Request<Body>,
) -> std::result::Result<Response<Body>, AppError> {
    let Path((node_id, hash)) = path;
    let node_addr = NodeAddr {
        node_id,
        info: AddrInfo {
            derp_region: Some(2),
            direct_addresses: Default::default(),
        },
    };
    let connection = gateway
        .endpoint
        .connect(node_addr, &iroh::bytes::protocol::ALPN)
        .await?;
    let byte_range = parse_byte_range(req).await?;
    let res = forward_range(&gateway, connection, &hash, byte_range).await?;
    Ok(res)
}

/// Handle a request for a range of bytes from the default node.
async fn handle_local_blob_request(
    gateway: Extension<Gateway>,
    Path(blake3_hash): Path<Hash>,
    req: Request<Body>,
) -> std::result::Result<Response<Body>, AppError> {
    let connection = gateway.get_default_connection().await?;
    let byte_range = parse_byte_range(req).await?;
    let res = forward_range(&gateway, connection, &blake3_hash, byte_range).await?;
    Ok(res)
}

/// Handle a request for a range of bytes from the default node.
async fn handle_local_collection_request(
    gateway: Extension<Gateway>,
    Path((hash, suffix)): Path<(Hash, String)>,
    req: Request<Body>,
) -> std::result::Result<impl IntoResponse, AppError> {
    let connection = gateway.get_default_connection().await?;
    let byte_range = parse_byte_range(req).await?;
    let res = forward_collection_range(&gateway, connection, &hash, &suffix, byte_range).await?;
    Ok(res)
}

async fn handle_remote_collection_request(
    gateway: Extension<Gateway>,
    Path((node_id, hash, suffix)): Path<(PublicKey, Hash, String)>,
    req: Request<Body>,
) -> std::result::Result<impl IntoResponse, AppError> {
    println!("handle_remote_collection_request");
    let byte_range = parse_byte_range(req).await?;
    let connection = gateway.get_connection(node_id).await?;
    let res = forward_collection_range(&gateway, connection, &hash, &suffix, byte_range).await?;
    Ok(res)
}

async fn handle_local_collection_index(
    gateway: Extension<Gateway>,
    Path(hash): Path<Hash>,
) -> std::result::Result<impl IntoResponse, AppError> {
    let connection = gateway.get_default_connection().await?;
    let res = collection_index(&gateway, connection, &hash, "").await?;
    Ok(res)
}

async fn handle_remote_collection_index(
    gateway: Extension<Gateway>,
    Path((node_id, hash)): Path<(PublicKey, Hash)>,
) -> std::result::Result<impl IntoResponse, AppError> {
    let connection = gateway.get_connection(node_id).await?;
    let prefix = format!("/node/{}", node_id);
    let res = collection_index(&gateway, connection, &hash, &prefix).await?;
    Ok(res)
}

async fn collection_index(
    gateway: &Gateway,
    connection: quinn::Connection,
    hash: &Hash,
    link_prefix: &str,
) -> anyhow::Result<impl IntoResponse> {
    fn encode_relative_url(relative_url: &str) -> anyhow::Result<String> {
        let base = Url::parse("http://example.com")?;
        let joined_url = base.join(relative_url)?;

        Ok(joined_url[url::Position::BeforePath..].to_string())
    }

    let collection = get_collection(gateway, &hash, &connection).await?;
    let mut res = String::new();
    res.push_str("<html>\n<head></head>\n");
    // for Blob { name, hash } in collection.blobs() {
    //     res.push_str(&format!(
    //         "<a href=\"{}/blob/{}\">{}</a><br>\n",
    //         link_prefix, hash, name
    //     ));
    // }

    for Blob { name, .. } in collection.blobs() {
        let url = format!("{}/collection/{}/{}", link_prefix, hash, name);
        println!("url={}", url);
        let url = encode_relative_url(&url)?;
        println!("url={}", url);
        res.push_str(&format!("<a href=\"{}\">{}</a><br>\n", url, name,));
    }
    res.push_str("</body>\n</html>\n");
    let response = Response::builder()
        .status(StatusCode::OK)
        .header(header::CONTENT_TYPE, "text/html")
        .header(header::CACHE_CONTROL, "max-age=3600")
        .body(res)?;
    Ok((StatusCode::OK, response).into_response())
}

async fn forward_collection_range(
    gateway: &Gateway,
    connection: quinn::Connection,
    hash: &Hash,
    suffix: &str,
    range: (Option<u64>, Option<u64>),
) -> anyhow::Result<impl IntoResponse> {
    let suffix = suffix.strip_prefix("/").unwrap_or(suffix);
    println!("suffix {}", suffix);
    let collection = get_collection(gateway, &hash, &connection).await?;
    for Blob { name, hash } in collection.blobs() {
        if name == suffix {
            let res = forward_range(gateway, connection, hash, range).await?;
            return Ok(res.into_response());
        } else {
            println!("'{}' != '{}'", name, suffix);
        }
    }
    Ok((
        StatusCode::NOT_FOUND,
        format!("entry '{}' not found in collection '{}'", suffix, hash),
    )
        .into_response())
}

fn format_content_range(start: Option<u64>, end: Option<u64>, size: u64) -> String {
    format!(
        "bytes {}-{}/{}",
        start.map(|x| x.to_string()).unwrap_or_default(),
        end.map(|x| (x + 1).to_string())
            .unwrap_or_else(|| size.to_string()),
        size
    )
}

async fn forward_range(
    gateway: &Gateway,
    connection: quinn::Connection,
    hash: &Hash,
    (start, end): (Option<u64>, Option<u64>),
) -> anyhow::Result<Response<Body>> {
    // we need both byte ranges and chunk ranges.
    // chunk ranges to request data, and byte ranges to return the data.
    println!("{:?} {:?}", start, end);

    let byte_ranges = to_byte_range(start, end);
    let chunk_ranges = to_chunk_range(start, end);
    println!("got connection");
    let mime = get_mime_type(gateway, &hash, &connection).await?;
    println!("mime: {}", mime);
    let chunk_ranges = RangeSpecSeq::from_ranges(vec![chunk_ranges]);
    let request = iroh::bytes::protocol::GetRequest::new(*hash, chunk_ranges.clone());
    let status_code = if byte_ranges.is_all() {
        StatusCode::OK
    } else {
        StatusCode::PARTIAL_CONTENT
    };
    println!("status_code {}", status_code);
    let (send, recv) = flume::bounded::<result::Result<Bytes, DecodeError>>(2);

    println!("requesting {:?}", request);
    let req = iroh::bytes::get::fsm::start(connection.clone(), request);
    let connected = req.next().await?;
    let ConnectedNext::StartRoot(x) = connected.next().await? else {
        anyhow::bail!("unexpected response");
    };
    println!("connected");
    let (mut current, size) = x.next().next().await?;
    tokio::spawn(async move {
        let end = loop {
            match current.next().await {
                BlobContentNext::More((next, Ok(item))) => {
                    match item {
                        BaoContentItem::Leaf(leaf) => {
                            tracing::trace!("got leaf {} {}", leaf.offset, leaf.data.len());
                            for item in slice(leaf.offset.0, leaf.data, byte_ranges.clone()) {
                                send.send_async(Ok(item)).await?;
                            }
                        }
                        BaoContentItem::Parent(parent) => {
                            tracing::trace!("got parent {:?}", parent);
                        }
                    }
                    current = next;
                }
                BlobContentNext::More((_, Err(err))) => {
                    send.send_async(Err(err)).await?;
                    anyhow::bail!("error");
                }
                BlobContentNext::Done(end) => break end,
            }
        };
        let EndBlobNext::Closing(at_closing) = end.next() else {
            anyhow::bail!("unexpected response");
        };
        let _stats = at_closing.next().await?;
        Ok(())
    });
    let body = Body::wrap_stream(recv.into_stream());
    let builder = Response::builder()
        .status(status_code)
        .header(header::ACCEPT_RANGES, "bytes")
        .header(header::CACHE_CONTROL, "public,max-age=31536000,immutable")
        .header(header::CONTENT_TYPE, mime.to_string());
    let builder = if start.is_some() || end.is_some() {
        builder.header(
            header::CONTENT_RANGE,
            format_content_range(start, end, size),
        )
    } else {
        builder
    };
    let response = builder.body(body).unwrap();
    Ok(response)
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let args = args::Args::parse();
    let endpoint = MagicEndpoint::builder().bind(0).await?;
    let default_node = args.default_node.map(|default_node| NodeAddr {
        node_id: default_node,
        info: AddrInfo {
            derp_region: Some(args.derp_region),
            direct_addresses: Default::default(),
        },
    });
    let gateway = Gateway(Arc::new(Inner {
        endpoint,
        default_node,
        mime_classifier: MimeClassifier::new(),
        mime_cache: RwLock::new(BTreeMap::new()),
        collection_cache: RwLock::new(BTreeMap::new()),
    }));

    // Build our application by composing routes
    #[rustfmt::skip]
    let app = Router::new()
        .route("/blob/:blake3_hash", get(handle_local_blob_request))
        .route("/collection/:blake3_hash", get(handle_local_collection_index))
        .route("/collection/:blake3_hash/*path",get(handle_local_collection_request))
        .route("/node/:node_id/blob/:blake3_hash", get(handle_remote_blob_request))
        .route("/node/:node_id/collection/:blake3_hash", get(handle_remote_collection_index))
        .route("/node/:node_id/collection/:blake3_hash/*path",get(handle_remote_collection_request))
        .layer(Extension(gateway));

    // Run our application with hyper
    // We'll bind to 127.0.0.1:3000
    let addr = SocketAddr::from(([127, 0, 0, 1], args.port));
    println!("listening on {}", addr);

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await?;

    Ok(())
}
