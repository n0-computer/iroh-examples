use axum::{
    routing::get,
    Router,
    body::{Body, HttpBody},
    response::{Response, IntoResponse},
    extract::{Path, RequestParts},
    http::{StatusCode, Request, header, status}, Extension,
};
use headers::{ContentRange, HeaderMapExt, AcceptRanges, Range};
use iroh::{bytes::{Hash, protocol::RangeSpecSeq, get::fsm::{ConnectedNext, BlobContentNext, EndBlobNext, DecodeError}, store::bao_tree::io::fsm::BaoContentItem}, net::{key::PublicKey, AddrInfo, NodeAddr, MagicEndpoint}};
use iroh::bytes::store::bao_tree::{ByteNum, ChunkNum};
use range_collections::{RangeSet2, range_set::RangeSetRange};
use std::{net::SocketAddr, ops::Bound, sync::Arc, io, result};
use tokio::fs;
use bytes::Bytes;

/// Given a range specified as arbitrary range bounds, normalize it into a range
/// that has inclusive start and exclusive end.
fn normalize_range(start: Bound<u64>, end: Bound<u64>) -> (Option<u64>, Option<u64>) {
    match (start, end) {
        (Bound::Included(start), Bound::Included(end)) => (Some(start), end.checked_add(1)),
        (Bound::Included(start), Bound::Excluded(end)) => (Some(start), Some(end)),
        (Bound::Included(start), Bound::Unbounded) => (Some(start), None),
        (Bound::Excluded(start), Bound::Included(end)) => (start.checked_add(1), end.checked_add(1)),
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
    relevant.iter().map(|range| {
        match range {
            RangeSetRange::Range(range) => {
                let start = (range.start - offset) as usize;
                let end = (range.end - offset) as usize;
                data.slice(start..end)
            },
            RangeSetRange::RangeFrom(range) => {
                let start = (range.start - offset) as usize;
                data.slice(start..)
            },
        }
    }).collect()
}

fn anyhow_error_to_response(err: anyhow::Error) -> impl IntoResponse {
    let text = format!("{:?}", err);
    (StatusCode::INTERNAL_SERVER_ERROR, text).into_response()
}

async fn handle_remote_range_request(
    endpoint: Extension<MagicEndpoint>,
    path: Path<(PublicKey, Hash)>,
    req: Request<Body>,
) -> impl IntoResponse {
    handle_remote_range_request_inner(endpoint, path, req).await.map_err(anyhow_error_to_response).into_response()
}

async fn handle_remote_range_request_inner(
    endpoint: Extension<MagicEndpoint>,
    path: Path<(PublicKey, Hash)>,
    req: Request<Body>,
) -> anyhow::Result<Response<Body>> {
    let Path((node_id, blake3_hash)) = path;
    // we need both byte ranges and chunk ranges.
    // chunk ranges to request data, and byte ranges to return the data.

    let (start, end) = match req.headers().typed_get::<Range>() {
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
    };
    println!("{:?} {:?}", start, end);

    let byte_ranges = to_byte_range(start, end);
    let chunk_ranges = to_chunk_range(start, end);
    let node_addr = NodeAddr {
        node_id,
        info: AddrInfo {
            derp_region: Some(2),
            direct_addresses: Default::default(),
        },
    };
    let connection = endpoint.connect(node_addr, &iroh::bytes::protocol::ALPN).await?;
    let chunk_ranges = RangeSpecSeq::from_ranges(vec![chunk_ranges]);
    let request = iroh::bytes::protocol::GetRequest::new(
        blake3_hash,
        chunk_ranges.clone(),
    );
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
                        },
                        BaoContentItem::Parent(parent) => {
                            tracing::trace!("got parent {:?}", parent);
                        }
                    }
                    current = next;
                },
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
        let stats = at_closing.next().await?;
        Ok(())
    });
    let body = Body::wrap_stream(recv.into_stream());
    let builder = Response::builder()
        .status(status_code)
        .header(header::ACCEPT_RANGES, "bytes")
        .header(header::CONTENT_TYPE, "video/mp4");
    let builder = if start.is_some() || end.is_some() {
        println!("calculating content range");
        let content_range_value = format!("bytes {}-{}/{}", start.map(|x| x.to_string()).unwrap_or_default(), end.map(|x| (x+1).to_string()).unwrap_or_else(|| size.to_string()), size);
        println!("content range: {}", content_range_value);
        builder.header(header::CONTENT_RANGE, content_range_value)
    } else {
        builder
    };
    let response = builder
        .body(body)
        .unwrap();
    Ok(response)
}

async fn handle_local_range_request(
    Path(blake3_hash): Path<Hash>,
    req: Request<Body>,
) -> impl IntoResponse {

    let (byte_ranges, chunk_ranges) = match req.headers().typed_get::<Range>() {
        Some(range) => {
            let mut byte_ranges = RangeSet2::empty();
            let mut chunk_ranges = RangeSet2::empty();
            for (start, end) in range.iter() {
                let (start, end) = normalize_range(start, end);
                byte_ranges |= to_byte_range(start, end);
                chunk_ranges |= to_chunk_range(start, end);
            }
            (byte_ranges, chunk_ranges)
        },
        None => (RangeSet2::all(), RangeSet2::all()),
    };
    let text = format!("{:?} {:?} {}", byte_ranges, chunk_ranges, blake3_hash);
    (StatusCode::OK, text).into_response()
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {

    let endpoint = MagicEndpoint::builder()
        .bind(0)
        .await?;

    // Build our application by composing routes
    let app = Router::new()
        .route("/node/:node_id/blob/:blake3_hash", get(handle_remote_range_request))
        .route("/blob/:blake3_hash", get(handle_local_range_request))
        .layer(Extension(endpoint));

    // Run our application with hyper
    // We'll bind to 127.0.0.1:3000
    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    println!("listening on {}", addr);

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await?;

    Ok(())
}
