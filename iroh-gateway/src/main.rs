mod args;
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
use iroh::bytes::store::bao_tree::{ByteNum, ChunkNum};
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
use std::{net::SocketAddr, ops::Bound, result, sync::{Arc, RwLock}, collections::BTreeMap};

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
    mime_cache: RwLock<BTreeMap<Hash, Mime>>,
}

/// Handle a request for a range of bytes from an explicitly specified node.
async fn handle_remote_range_request(
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
    let byte_range = parse_byte_range(req).await?;
    let res = forward_range(&gateway, node_addr, hash, byte_range).await?;
    Ok(res)
}

/// Handle a request for a range of bytes from the default node.
async fn handle_local_range_request(
    gateway: Extension<Gateway>,
    Path(blake3_hash): Path<Hash>,
    req: Request<Body>,
) -> std::result::Result<Response<Body>, AppError> {
    let Some(node_addr) = gateway.default_node.clone() else {
        return Err(anyhow::anyhow!("no default node").into());
    };
    let byte_range = parse_byte_range(req).await?;
    let res = forward_range(&gateway, node_addr, blake3_hash, byte_range).await?;
    Ok(res)
}

/// Get the mime type for a hash, either from the cache or by requesting it from the node.
async fn get_mime_type(gateway: &Gateway, hash: &Hash, connection: &quinn::Connection) -> anyhow::Result<Mime> {
    if let Some(mime) = gateway.mime_cache.read().unwrap().get(hash) {
        return Ok(mime.clone());
    }
    let range = RangeSpecSeq::from_ranges(Some(RangeSet2::from(..ChunkNum(16))));
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
    let mime = gateway.mime_classifier.classify(context, no_sniff_flag, apache_bug_flag, &supplied_type, &data);
    gateway.mime_cache.write().unwrap().insert(*hash, mime.clone());
    Ok(mime)
}

async fn forward_range(
    gateway: &Gateway,
    node_addr: NodeAddr,
    hash: Hash,
    (start, end): (Option<u64>, Option<u64>),
) -> anyhow::Result<Response<Body>> {
    // we need both byte ranges and chunk ranges.
    // chunk ranges to request data, and byte ranges to return the data.
    println!("{:?} {:?}", start, end);

    let byte_ranges = to_byte_range(start, end);
    let chunk_ranges = to_chunk_range(start, end);
    let connection = gateway.endpoint
        .connect(node_addr, &iroh::bytes::protocol::ALPN)
        .await?;
    let mime = get_mime_type(gateway, &hash, &connection).await?;
    println!("mime: {}", mime);
    let chunk_ranges = RangeSpecSeq::from_ranges(vec![chunk_ranges]);
    let request = iroh::bytes::protocol::GetRequest::new(hash, chunk_ranges.clone());
    let status_code = if byte_ranges.is_all() {
        StatusCode::OK
    } else {
        StatusCode::PARTIAL_CONTENT
    };
    println!("status_code {}", status_code);
    let (send, recv) = flume::bounded::<result::Result<Bytes, DecodeError>>(2);

    println!("requesting {:?}", request);
    let req = iroh::bytes::get::fsm::start(connection, request);
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
        .header(header::CONTENT_TYPE, mime.to_string());
    let builder = if start.is_some() || end.is_some() {
        let content_range_value = format!(
            "bytes {}-{}/{}",
            start.map(|x| x.to_string()).unwrap_or_default(),
            end.map(|x| (x + 1).to_string())
                .unwrap_or_else(|| size.to_string()),
            size
        );
        tracing::info!("content range: {}", content_range_value);
        builder.header(header::CONTENT_RANGE, content_range_value)
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
        }
    });
    let gateway = Gateway(Arc::new(Inner {
        endpoint,
        default_node,
        mime_classifier: MimeClassifier::new(),
        mime_cache: RwLock::new(BTreeMap::new()),
    }));

    // Build our application by composing routes
    let app = Router::new()
        .route(
            "/node/:node_id/blob/:blake3_hash",
            get(handle_remote_range_request),
        )
        .route("/blob/:blake3_hash", get(handle_local_range_request))
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
