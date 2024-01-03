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
use axum_server::tls_rustls::RustlsConfig;
use bytes::Bytes;
use clap::Parser;
use derive_more::Deref;
use headers::{HeaderMapExt, Range};
use iroh::bytes::{
    store::bao_tree::{ByteNum, ChunkNum},
    BlobFormat,
};
use iroh::{
    bytes::{
        format::collection::Collection,
        get::fsm::{BlobContentNext, ConnectedNext, DecodeError, EndBlobNext},
        protocol::RangeSpecSeq,
        store::bao_tree::io::fsm::BaoContentItem,
        Hash,
    },
    net::{MagicEndpoint, NodeAddr},
    ticket::BlobTicket,
};
use lru::LruCache;
use mime::Mime;
use mime_classifier::MimeClassifier;
use range_collections::{range_set::RangeSetRange, RangeSet2};
use std::{
    ops::Bound,
    result,
    sync::{Arc, Mutex},
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
            let ranges = range.satisfiable_ranges(0).collect::<Vec<_>>();
            if ranges.len() > 1 {
                anyhow::bail!("multiple ranges not supported");
            }
            let Some((start, end)) = ranges.into_iter().next() else {
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
    mime_cache: Mutex<LruCache<Hash, (u64, Mime)>>,
    /// Cache of hashes to collections
    collection_cache: Mutex<LruCache<Hash, Collection>>,
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
            .connect(self.default_node()?, iroh::bytes::protocol::ALPN)
            .await?;
        Ok(connection)
    }
}

async fn get_collection_inner(
    hash: &Hash,
    connection: &quinn::Connection,
    headers: bool,
) -> anyhow::Result<(Collection, Vec<(Hash, u64, Vec<u8>)>)> {
    let spec = if headers {
        RangeSpecSeq::from_ranges_infinite(vec![
            RangeSet2::all(),
            RangeSet2::all(),
            RangeSet2::from(..ByteNum(2048).chunks()),
        ])
    } else {
        RangeSpecSeq::from_ranges(vec![RangeSet2::all(), RangeSet2::all()])
    };
    let request = iroh::bytes::protocol::GetRequest::new(*hash, spec);
    let req = iroh::bytes::get::fsm::start(connection.clone(), request);
    let connected = req.next().await?;
    let ConnectedNext::StartRoot(at_start_root) = connected.next().await? else {
        anyhow::bail!("unexpected response");
    };
    let (mut curr, hash_seq, collection) = Collection::read_fsm(at_start_root).await?;

    let mut headers = Vec::new();
    let at_closing = loop {
        match curr {
            EndBlobNext::Closing(at_closing) => {
                break at_closing;
            }
            EndBlobNext::MoreChildren(at_start_child) => {
                let Some(hash) = hash_seq.get(at_start_child.child_offset() as usize) else {
                    break at_start_child.finish();
                };
                let at_blob_header = at_start_child.next(hash);
                let (at_blob_content, size) = at_blob_header.next().await?;
                let (at_end_blob, data) = at_blob_content.concatenate_into_vec().await?;
                curr = at_end_blob.next();
                headers.push((hash, size, data));
            }
        }
    };
    let _stats = at_closing.next().await?;

    Ok((collection, headers))
}

/// Get the collection. This will also fill the mime cache.
async fn get_collection(
    gateway: &Gateway,
    hash: &Hash,
    connection: &quinn::Connection,
) -> anyhow::Result<Collection> {
    if let Some(res) = gateway.collection_cache.lock().unwrap().get(hash) {
        return Ok(res.clone());
    }
    let (collection, headers) = get_collection_inner(hash, connection, true).await?;
    let mimes = headers
        .into_iter()
        .map(|(hash, size, header)| {
            let mime = gateway.mime_classifier.classify(
                mime_classifier::LoadContext::Browsing,
                mime_classifier::NoSniffFlag::Off,
                mime_classifier::ApacheBugFlag::On,
                &None,
                &header,
            );
            (hash, size, mime)
        })
        .collect::<Vec<_>>();
    {
        let mut cache = gateway.mime_cache.lock().unwrap();
        for (hash, size, mime) in mimes {
            cache.put(hash, (size, mime));
        }
    }

    gateway
        .collection_cache
        .lock()
        .unwrap()
        .put(*hash, collection.clone());
    Ok(collection)
}

/// Get the mime type for a hash from the remote node.
async fn get_mime_type_inner(
    hash: &Hash,
    connection: &quinn::Connection,
    mime_classifier: &MimeClassifier,
) -> anyhow::Result<(u64, Mime)> {
    // read 2 KiB.
    let range = RangeSpecSeq::from_ranges(Some(RangeSet2::from(..ByteNum(2048).chunks())));
    let request = iroh::bytes::protocol::GetRequest::new(*hash, range);
    let req = iroh::bytes::get::fsm::start(connection.clone(), request);
    let connected = req.next().await?;
    let ConnectedNext::StartRoot(x) = connected.next().await? else {
        anyhow::bail!("unexpected response");
    };
    let (at_blob_content, size) = x.next().next().await?;
    let (at_end, data) = at_blob_content.concatenate_into_vec().await?;
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
    Ok((size, mime))
}

/// Get the mime type for a hash, either from the cache or by requesting it from the node.
async fn get_mime_type(
    gateway: &Gateway,
    hash: &Hash,
    connection: &quinn::Connection,
) -> anyhow::Result<(u64, Mime)> {
    if let Some(sm) = gateway.mime_cache.lock().unwrap().get(hash) {
        return Ok(sm.clone());
    }
    let sm = get_mime_type_inner(hash, connection, &gateway.mime_classifier).await?;
    gateway.mime_cache.lock().unwrap().put(*hash, sm.clone());
    Ok(sm)
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

async fn handle_local_collection_index(
    gateway: Extension<Gateway>,
    Path(hash): Path<Hash>,
) -> std::result::Result<impl IntoResponse, AppError> {
    let connection = gateway.get_default_connection().await?;
    let link_prefix = format!("/collection/{}", hash);
    let res = collection_index(&gateway, connection, &hash, &link_prefix).await?;
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

async fn handle_ticket_index(
    gateway: Extension<Gateway>,
    Path(ticket): Path<BlobTicket>,
    req: Request<Body>,
) -> std::result::Result<impl IntoResponse, AppError> {
    tracing::info!("handle_ticket_index");
    let byte_range = parse_byte_range(req).await?;
    let connection = gateway
        .endpoint
        .connect(ticket.node_addr().clone(), iroh::bytes::protocol::ALPN)
        .await?;
    let hash = ticket.hash();
    let prefix = format!("/ticket/{}", ticket);
    let res = match ticket.format() {
        BlobFormat::Raw => forward_range(&gateway, connection, &hash, byte_range)
            .await?
            .into_response(),
        BlobFormat::HashSeq => collection_index(&gateway, connection, &hash, &prefix)
            .await?
            .into_response(),
    };
    Ok(res)
}

async fn handle_ticket_request(
    gateway: Extension<Gateway>,
    Path((ticket, suffix)): Path<(BlobTicket, String)>,
    req: Request<Body>,
) -> std::result::Result<impl IntoResponse, AppError> {
    tracing::info!("handle_ticket_request");
    let byte_range = parse_byte_range(req).await?;
    let connection = gateway
        .endpoint
        .connect(ticket.node_addr().clone(), iroh::bytes::protocol::ALPN)
        .await?;
    let hash = ticket.hash();
    let res = forward_collection_range(&gateway, connection, &hash, &suffix, byte_range).await?;
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

    let collection = get_collection(gateway, hash, &connection).await?;
    let mut res = String::new();
    res.push_str("<html>\n<head></head>\n");

    for (name, child_hash) in collection.iter() {
        let url = format!("{}/{}", link_prefix, name);
        let url = encode_relative_url(&url)?;
        let smo = gateway.mime_cache.lock().unwrap().get(child_hash).cloned();
        res.push_str(&format!("<a href=\"{}\">{}</a>", url, name,));
        if let Some((size, mime)) = smo {
            res.push_str(&format!(" ({}, {})", mime, indicatif::HumanBytes(size)));
        }
        res.push_str("<br>\n");
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
    let suffix = suffix.strip_prefix('/').unwrap_or(suffix);
    tracing::trace!("suffix {}", suffix);
    let collection = get_collection(gateway, hash, &connection).await?;
    for (name, hash) in collection.iter() {
        if name == suffix {
            let res = forward_range(gateway, connection, hash, range).await?;
            return Ok(res.into_response());
        } else {
            tracing::trace!("'{}' != '{}'", name, suffix);
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
    tracing::debug!("forward_range {:?} {:?}", start, end);

    let byte_ranges = to_byte_range(start, end);
    let chunk_ranges = to_chunk_range(start, end);
    tracing::debug!("got connection");
    let (_size, mime) = get_mime_type(gateway, hash, &connection).await?;
    tracing::debug!("mime: {}", mime);
    let chunk_ranges = RangeSpecSeq::from_ranges(vec![chunk_ranges]);
    let request = iroh::bytes::protocol::GetRequest::new(*hash, chunk_ranges.clone());
    let status_code = if byte_ranges.is_all() {
        StatusCode::OK
    } else {
        StatusCode::PARTIAL_CONTENT
    };
    tracing::debug!("status_code {}", status_code);
    let (send, recv) = flume::bounded::<result::Result<Bytes, DecodeError>>(2);

    tracing::trace!("requesting {:?}", request);
    let req = iroh::bytes::get::fsm::start(connection.clone(), request);
    let connected = req.next().await?;
    let ConnectedNext::StartRoot(x) = connected.next().await? else {
        anyhow::bail!("unexpected response");
    };
    tracing::trace!("connected");
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
    let body = Body::from_stream(recv.into_stream());
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
    tracing_subscriber::fmt::init();
    let args = args::Args::parse();
    let magic_port = args.magic_port.unwrap_or_default();
    let endpoint = MagicEndpoint::builder().bind(magic_port).await?;
    let default_node = args
        .default_node
        .map(|default_node| {
            Ok(if let Ok(node_ticket) = default_node.parse::<BlobTicket>() {
                node_ticket.node_addr().clone()
            } else if let Ok(blob_ticket) = default_node.parse::<BlobTicket>() {
                blob_ticket.node_addr().clone()
            } else {
                anyhow::bail!("invalid default node");
            })
        }).transpose()?;
    let gateway = Gateway(Arc::new(Inner {
        endpoint,
        default_node,
        mime_classifier: MimeClassifier::new(),
        mime_cache: Mutex::new(LruCache::new(100000.try_into().unwrap())),
        collection_cache: Mutex::new(LruCache::new(1000.try_into().unwrap())),
    }));

    // Build our application by composing routes
    #[rustfmt::skip]
    let app = Router::new()
        .route("/blob/:blake3_hash", get(handle_local_blob_request))
        .route("/collection/:blake3_hash", get(handle_local_collection_index))
        .route("/collection/:blake3_hash/*path",get(handle_local_collection_request))
        .route("/ticket/:ticket", get(handle_ticket_index))
        .route("/ticket/:ticket/*path", get(handle_ticket_request))
        .layer(Extension(gateway));

    if let Some(path) = args.cert_path {
        let cert_file = path.join("cert.pem");
        let key_file = path.join("key.pem");
        let config = RustlsConfig::from_pem_file(cert_file, key_file).await?;
        // Run our application with hyper
        let addr = args.addr;
        println!("listening on {}, https", addr);
        let addr = addr.parse()?;
        axum_server::bind_rustls(addr, config)
            .serve(app.into_make_service())
            .await?;
    } else {
        // Run our application with hyper
        let addr = args.addr;
        println!("listening on {}, http", addr);

        let listener = tokio::net::TcpListener::bind(addr).await?;
        axum::serve(listener, app).await?;
    }

    Ok(())
}
