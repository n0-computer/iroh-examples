//! Utilities related to HTTP range requests.
use std::ops::Bound;

use axum::body::Body;
use bytes::Bytes;
use headers::{HeaderMapExt, Range};
use hyper::Request;
use iroh_blobs::store::bao_tree::ChunkNum;
use range_collections::{range_set::RangeSetRange, RangeSet2};

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
pub fn to_byte_range(start: Option<u64>, end: Option<u64>) -> RangeSet2<u64> {
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
pub fn to_chunk_range(start: Option<u64>, end: Option<u64>) -> RangeSet2<ChunkNum> {
    match (start, end) {
        (Some(start), Some(end)) => {
            RangeSet2::from(ChunkNum::full_chunks(start)..ChunkNum::chunks(end))
        }
        (Some(start), None) => RangeSet2::from(ChunkNum::full_chunks(start)..),
        (None, Some(end)) => RangeSet2::from(..ChunkNum::chunks(end)),
        (None, None) => RangeSet2::all(),
    }
}

/// Given an incoming piece of data at an offset, and a set of ranges that are being requested,
/// split the data into parts that cover only requested ranges
pub fn slice(offset: u64, data: Bytes, ranges: RangeSet2<u64>) -> Vec<Bytes> {
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
pub async fn parse_byte_range(req: Request<Body>) -> anyhow::Result<(Option<u64>, Option<u64>)> {
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
