mod args;
use anyhow::Context;
use axum::{
    body::Body,
    extract::Path,
    http::{header, Request, StatusCode},
    response::{IntoResponse, Response},
    routing::{delete, get, put},
    Extension, Router,
};
use bytes::Bytes;
use clap::Parser;
use derive_more::Deref;
use futures::{
    future::{self, BoxFuture},
    FutureExt,
};
use headers::{HeaderMapExt, Range};
use iroh::bytes::store::bao_tree::{ByteNum, ChunkNum};
use iroh::{
    bytes::{
        format::collection::Collection,
        get::fsm::{BlobContentNext, ConnectedNext, DecodeError, EndBlobNext},
        protocol::RangeSpecSeq,
        store::bao_tree::io::fsm::BaoContentItem,
        Hash,
    },
    net::{key::PublicKey, AddrInfo, MagicEndpoint},
    ticket::BlobTicket,
};
use mime::Mime;
use mime_classifier::MimeClassifier;
use range_collections::{range_set::RangeSetRange, RangeSet2};
use std::{
    collections::BTreeMap,
    net::{Ipv4Addr, Ipv6Addr, SocketAddr},
    ops::Bound,
    result,
    str::FromStr,
    sync::{Arc, RwLock},
};
use tower::ServiceExt;
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
fn parse_byte_range(req: &Request<Body>) -> anyhow::Result<(Option<u64>, Option<u64>)> {
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
    /// Mime classifier
    #[debug("MimeClassifier")]
    mime_classifier: MimeClassifier,
    /// Cache of hashes to mime types
    ///
    /// TODO: maybe use a TTL cache for this
    mime_cache: RwLock<BTreeMap<Hash, Mime>>,
    /// Cache of hashes to collections
    collection_cache: RwLock<BTreeMap<Hash, Collection>>,
    /// Subdomains
    subdomains: RwLock<BTreeMap<String, BlobTicket>>,
}

impl Gateway {
    async fn ticket_for_alias(&self, alias: &str) -> anyhow::Result<(quinn::Connection, Hash)> {
        let endpoint = self.endpoint.clone();
        let ticket = {
            let subdomains = self.subdomains.read().unwrap();
            subdomains.get(alias).context("alias not found")?.clone()
        };
        let node_addr = ticket.node_addr().clone();
        let hash = ticket.hash();
        let connection = endpoint
            .connect(node_addr, &iroh::bytes::protocol::ALPN)
            .await?;
        Ok((connection, hash))
    }
}

async fn get_collection_inner(
    hash: &Hash,
    connection: &quinn::Connection,
    headers: bool,
) -> anyhow::Result<(Collection, Vec<(Hash, Vec<u8>)>)> {
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
                let (at_end_blob, data) = at_blob_header.concatenate_into_vec().await?;
                curr = at_end_blob.next();
                headers.push((hash, data));
            }
        }
    };
    let _stats = at_closing.next().await?;

    Ok((collection, headers))
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
    let (collection, headers) = get_collection_inner(hash, connection, true).await?;
    let mimes = headers
        .into_iter()
        .map(|(hash, header)| {
            let mime = gateway.mime_classifier.classify(
                mime_classifier::LoadContext::Browsing,
                mime_classifier::NoSniffFlag::Off,
                mime_classifier::ApacheBugFlag::On,
                &None,
                &header,
            );
            (hash, mime)
        })
        .collect::<Vec<_>>();
    gateway.mime_cache.write().unwrap().extend(mimes);

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

async fn collection_index(
    gateway: &Gateway,
    connection: quinn::Connection,
    hash: &Hash,
    link_prefix: &str,
) -> anyhow::Result<Response> {
    fn encode_relative_url(relative_url: &str) -> anyhow::Result<String> {
        let base = Url::parse("http://example.com")?;
        let joined_url = base.join(relative_url)?;

        Ok(joined_url[url::Position::BeforePath..].to_string())
    }

    let collection = get_collection(gateway, hash, &connection).await?;
    let mut res = String::new();
    res.push_str("<html>\n<head></head>\n");
    // for Blob { name, hash } in collection.blobs() {
    //     res.push_str(&format!(
    //         "<a href=\"{}/blob/{}\">{}</a><br>\n",
    //         link_prefix, hash, name
    //     ));
    // }

    for (name, child_hash) in collection.iter() {
        let url = format!("{}/collection/{}/{}", link_prefix, hash, name);
        let url = encode_relative_url(&url)?;
        let mime = gateway
            .mime_cache
            .read()
            .unwrap()
            .get(child_hash)
            .map(|x| x.to_string());
        res.push_str(&format!("<a href=\"{}\">{}</a>", url, name,));
        if let Some(mime) = mime {
            res.push_str(&format!(" ({})", mime));
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
) -> anyhow::Result<Response> {
    let suffix = suffix.strip_prefix('/').unwrap_or(suffix);
    println!("suffix {}", suffix);
    let collection = get_collection(gateway, hash, &connection).await?;
    for (name, hash) in collection.iter() {
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
    let mime = get_mime_type(gateway, hash, &connection).await?;
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

/// A discovery method that just uses a hardcoded region.
#[derive(Debug)]
pub struct HardcodedRegionDiscovery {
    url: Url,
}

impl HardcodedRegionDiscovery {
    /// Create a new discovery method that always returns the given region.
    pub fn new(url: Url) -> Self {
        Self { url }
    }
}

impl iroh::net::magicsock::Discovery for HardcodedRegionDiscovery {
    fn publish(&self, _info: &AddrInfo) {}

    fn resolve<'a>(&'a self, _node_id: &'a PublicKey) -> BoxFuture<'a, anyhow::Result<AddrInfo>> {
        future::ok(AddrInfo {
            derp_url: Some(self.url.clone()),
            direct_addresses: Default::default(),
        })
        .boxed()
    }
}

async fn create_subdomain(
    gateway: Extension<Gateway>,
    Path(name): Path<String>,
    ticket: String,
) -> std::result::Result<impl IntoResponse, AppError> {
    println!("create_subdomain {} {}", name, ticket);
    if let Ok(ticket) = BlobTicket::from_str(&ticket) {
        println!("{:?}", ticket);
        gateway
            .subdomains
            .write()
            .unwrap()
            .insert(name, ticket.clone());
        Ok(StatusCode::OK)
    } else {
        Ok(StatusCode::BAD_REQUEST)
    }
}

async fn delete_subdomain(
    gateway: Extension<Gateway>,
    Path(name): Path<String>,
) -> std::result::Result<impl IntoResponse, AppError> {
    println!("delete_subdomain {}", name);
    gateway.subdomains.write().unwrap().remove(&name);
    Ok(StatusCode::OK)
}

async fn handle_alias(
    gateway: Extension<Gateway>,
    Path((alias, suffix)): Path<(String, String)>,
    req: Request<Body>,
) -> std::result::Result<Response, AppError> {
    println!("handle_alias {} {}", alias, suffix);
    let byte_range = parse_byte_range(&req)?;
    let (connection, hash) = gateway.ticket_for_alias(&alias).await?;
    let res = forward_collection_range(&gateway, connection, &hash, &suffix, byte_range).await?;
    Ok(res)
}

async fn handle_alias_index(
    gateway: Extension<Gateway>,
    Path(alias): Path<String>,
) -> std::result::Result<Response, AppError> {
    println!("handle_alias_index {}", alias);
    let (connection, hash) = gateway.ticket_for_alias(&alias).await?;
    let res = collection_index(&gateway, connection, &hash, "").await?;
    Ok(res)
}

async fn handle_subdomain(
    gateway: Extension<Gateway>,
    Path(suffix): Path<String>,
    req: Request<Body>,
) -> std::result::Result<Response, AppError> {
    println!("handle_subdomain {}", suffix);
    let Some(hostname) = get_hostname(&req) else {
        return Ok(StatusCode::BAD_REQUEST.into_response());
    };
    let Some(alias) = hostname.split('.').next() else {
        return Ok(StatusCode::BAD_REQUEST.into_response());
    };
    let byte_range = parse_byte_range(&req)?;
    let (connection, hash) = gateway.ticket_for_alias(alias).await?;
    let res = forward_collection_range(&gateway, connection, &hash, &suffix, byte_range).await?;
    Ok(res)
}

async fn handle_subdomain_index(
    gateway: Extension<Gateway>,
    req: Request<Body>,
) -> std::result::Result<Response, AppError> {
    let Some(hostname) = get_hostname(&req) else {
        return Ok(StatusCode::BAD_REQUEST.into_response());
    };
    let Some(alias) = hostname.split('.').next() else {
        return Ok(StatusCode::BAD_REQUEST.into_response());
    };
    let (connection, hash) = gateway.ticket_for_alias(alias).await?;
    let res = collection_index(&gateway, connection, &hash, "").await?;
    Ok(res)
}

/// Get the hostname from the request headers.
fn get_hostname(req: &Request<Body>) -> Option<&str> {
    let (_, hostname) = req
        .headers()
        .iter()
        .find(|(name, _value)| name.as_str() == "host")?;
    let hostname = hostname.to_str().ok()?;
    Some(hostname)
}

fn combinator(
    with_subdomain: Router,
    without_subdomain: Router,
) -> impl FnOnce(Request<Body>) -> BoxFuture<'static, Response> + Clone + Send + 'static {
    |req| {
        println!("got request {:?}", req);
        if let Some(hostname) = get_hostname(&req) {
            if let Ok(url) = hostname.parse::<Url>() {
                if let Some(hostname) = get_hostname_2(&url) {
                    let parts = hostname.split('.').collect::<Vec<_>>();
                    if parts.len() > 1 {
                        return with_subdomain.oneshot(req).map(|x| x.unwrap()).boxed();
                    }
                }
            }
        }
        without_subdomain.oneshot(req).map(|x| x.unwrap()).boxed()
    }
}

fn get_hostname_2(url: &Url) -> Option<&str> {
    match url.host_str() {
        Some(host) => {
            if host.parse::<Ipv4Addr>().is_ok() {
                None
            } else if host.parse::<Ipv6Addr>().is_ok() {
                None
            } else {
                Some(host)
            }
        }
        None => None,
    }
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let args = args::Args::parse();
    let discovery = HardcodedRegionDiscovery::new(args.derp_url.clone());
    let endpoint = MagicEndpoint::builder()
        .discovery(Box::new(discovery))
        .bind(0)
        .await?;
    let gateway = Gateway(Arc::new(Inner {
        endpoint,
        mime_classifier: MimeClassifier::new(),
        mime_cache: RwLock::new(BTreeMap::new()),
        collection_cache: RwLock::new(BTreeMap::new()),
        subdomains: RwLock::new(BTreeMap::new()),
    }));

    // Build our application by composing routes
    #[rustfmt::skip]
    let app = Router::new()
        .route("/subdomain/:name", put(create_subdomain))
        .route("/subdomain/:name", delete(delete_subdomain))
        .route("/alias/:alias", get(handle_alias_index))
        .route("/alias/:alias/*path", get(handle_alias))
        .layer(Extension(gateway.clone()));

    let sd = Router::new()
        .route("/*path", get(handle_subdomain))
        .route("/", get(handle_subdomain_index))
        .layer(Extension(gateway));

    let main_app = Router::new().fallback(axum::routing::any(combinator(sd, app)));

    // Run our application with hyper
    // We'll bind to 127.0.0.1:3000
    let addr = SocketAddr::from(([0, 0, 0, 0], args.port));
    println!("listening on {}", addr);

    let listener = tokio::net::TcpListener::bind(addr).await?;
    axum::serve(listener, main_app).await?;

    Ok(())
}
