mod args;
use anyhow::Context;
use args::CertMode;
use axum::{
    body::Body,
    extract::Path,
    http::{header, Method, Request, StatusCode},
    response::{IntoResponse, Response},
    routing::get,
    Extension, Router,
};
use bytes::Bytes;
use clap::Parser;
use derive_more::Deref;
use futures::{pin_mut, StreamExt};
use hyper::body::Incoming;
use hyper_util::rt::{TokioExecutor, TokioIo};
use iroh::{discovery::dns::DnsDiscovery, endpoint::Connection, Endpoint, NodeAddr, NodeId};
use iroh_base::ticket::NodeTicket;
use iroh_blobs::{
    format::collection::Collection,
    get::fsm::{BlobContentNext, ConnectedNext, DecodeError, EndBlobNext},
    protocol::{RangeSpecSeq, ALPN},
    store::bao_tree::{io::fsm::BaoContentItem, ChunkNum},
    ticket::BlobTicket,
    BlobFormat, Hash,
};
use lru::LruCache;
use mime::Mime;
use mime_classifier::MimeClassifier;
use range_collections::RangeSet2;
use ranges::parse_byte_range;
use std::{
    result,
    sync::{Arc, Mutex},
};
use tokio::net::TcpListener;
use tokio_rustls_acme::{caches::DirCache, tokio_rustls::TlsAcceptor, AcmeConfig};
use tower_http::cors::{AllowHeaders, AllowOrigin, CorsLayer};
use tower_service::Service;
use url::Url;

use crate::{
    cert_util::{load_certs, load_secret_key},
    ranges::{slice, to_byte_range, to_chunk_range},
};
mod cert_util;
mod ranges;

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

#[derive(Debug, Clone)]
struct Gateway(Arc<Inner>);

impl Deref for Gateway {
    type Target = Inner;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

type MimeCache = LruCache<(Hash, Option<String>), (u64, Mime)>;

#[derive(derive_more::Debug)]
struct Inner {
    /// Endpoint to connect to nodes
    endpoint: Endpoint,
    /// Default node to connect to when not specified in the url
    default_node: Option<NodeAddr>,
    /// Mime classifier
    #[debug("MimeClassifier")]
    mime_classifier: MimeClassifier,
    /// Cache of hashes to mime types
    mime_cache: Mutex<MimeCache>,
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
    async fn get_default_connection(&self) -> anyhow::Result<Connection> {
        let connection = self.endpoint.connect(self.default_node()?, ALPN).await?;
        Ok(connection)
    }
}

async fn get_collection_inner(
    hash: &Hash,
    connection: &iroh::endpoint::Connection,
    headers: bool,
) -> anyhow::Result<(Collection, Vec<(Hash, u64, Vec<u8>)>)> {
    let spec = if headers {
        RangeSpecSeq::from_ranges_infinite(vec![
            RangeSet2::all(),
            RangeSet2::all(),
            RangeSet2::from(..ChunkNum::chunks(2048)),
        ])
    } else {
        RangeSpecSeq::from_ranges(vec![RangeSet2::all(), RangeSet2::all()])
    };
    let request = iroh_blobs::protocol::GetRequest::new(*hash, spec);
    let req = iroh_blobs::get::fsm::start(connection.clone(), request);
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
    connection: &Connection,
) -> anyhow::Result<Collection> {
    if let Some(res) = gateway.collection_cache.lock().unwrap().get(hash) {
        return Ok(res.clone());
    }
    let (collection, headers) = get_collection_inner(hash, connection, true).await?;

    let mut cache = gateway.mime_cache.lock().unwrap();
    for (name, hash) in collection.iter() {
        let ext = get_extension(name);
        let Some((hash, size, data)) = headers.iter().find(|(h, _, _)| h == hash) else {
            tracing::debug!("hash {hash:?} for name {name:?} not found in headers");
            continue;
        };
        let mime = get_mime_from_ext_and_data(ext.as_deref(), data, &gateway.mime_classifier);
        let key = (*hash, ext);
        cache.put(key, (*size, mime));
    }
    drop(cache);

    gateway
        .collection_cache
        .lock()
        .unwrap()
        .put(*hash, collection.clone());
    Ok(collection)
}

fn get_extension(name: &str) -> Option<String> {
    std::path::Path::new(name)
        .extension()
        .map(|s| s.to_string_lossy().to_string())
}

/// Get the mime type for a hash from the remote node.
async fn get_mime_type_inner(
    hash: &Hash,
    ext: Option<&str>,
    connection: &Connection,
    mime_classifier: &MimeClassifier,
) -> anyhow::Result<(u64, Mime)> {
    // read 2 KiB.
    let range = RangeSpecSeq::from_ranges(Some(RangeSet2::from(..ChunkNum::chunks(2048))));
    let request = iroh_blobs::protocol::GetRequest::new(*hash, range);
    let req = iroh_blobs::get::fsm::start(connection.clone(), request);
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
    let mime = get_mime_from_ext_and_data(ext, &data, mime_classifier);
    Ok((size, mime))
}

fn get_mime_from_ext_and_data(
    ext: Option<&str>,
    data: &[u8],
    mime_classifier: &MimeClassifier,
) -> Mime {
    let context = mime_classifier::LoadContext::Browsing;
    let no_sniff_flag = mime_classifier::NoSniffFlag::On;
    let apache_bug_flag = mime_classifier::ApacheBugFlag::On;
    let supplied_type = match ext {
        None => None,
        Some(ext) => mime_guess::from_ext(ext).first(),
    };
    mime_classifier.classify(
        context,
        no_sniff_flag,
        apache_bug_flag,
        &supplied_type,
        data,
    )
}

/// Get the mime type for a hash, either from the cache or by requesting it from the node.
async fn get_mime_type(
    gateway: &Gateway,
    hash: &Hash,
    name: Option<&str>,
    connection: &Connection,
) -> anyhow::Result<(u64, Mime)> {
    let ext = name.and_then(get_extension);
    let key = (*hash, ext.clone());
    if let Some(sm) = gateway.mime_cache.lock().unwrap().get(&key) {
        return Ok(sm.clone());
    }
    let sm =
        get_mime_type_inner(hash, ext.as_deref(), connection, &gateway.mime_classifier).await?;
    gateway.mime_cache.lock().unwrap().put(key, sm.clone());
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
    let res = forward_range(&gateway, connection, &blake3_hash, None, byte_range).await?;
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
        .connect(ticket.node_addr().clone(), ALPN)
        .await?;
    let hash = ticket.hash();
    let prefix = format!("/ticket/{}", ticket);
    let res = match ticket.format() {
        BlobFormat::Raw => forward_range(&gateway, connection, &hash, None, byte_range)
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
        .connect(ticket.node_addr().clone(), ALPN)
        .await?;
    let hash = ticket.hash();
    let res = forward_collection_range(&gateway, connection, &hash, &suffix, byte_range).await?;
    Ok(res)
}

async fn collection_index(
    gateway: &Gateway,
    connection: Connection,
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
        let key = (*child_hash, get_extension(name));
        let smo = gateway.mime_cache.lock().unwrap().get(&key).cloned();
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
    connection: Connection,
    hash: &Hash,
    suffix: &str,
    range: (Option<u64>, Option<u64>),
) -> anyhow::Result<impl IntoResponse> {
    let suffix = suffix.strip_prefix('/').unwrap_or(suffix);
    tracing::trace!("suffix {}", suffix);
    let collection = get_collection(gateway, hash, &connection).await?;
    for (name, hash) in collection.iter() {
        if name == suffix {
            let res = forward_range(gateway, connection, hash, Some(suffix), range).await?;
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
    connection: Connection,
    hash: &Hash,
    name: Option<&str>,
    (start, end): (Option<u64>, Option<u64>),
) -> anyhow::Result<Response<Body>> {
    // we need both byte ranges and chunk ranges.
    // chunk ranges to request data, and byte ranges to return the data.
    tracing::debug!("forward_range {:?} {:?} (name {name:?})", start, end);

    let byte_ranges = to_byte_range(start, end);
    let chunk_ranges = to_chunk_range(start, end);
    tracing::debug!("got connection");
    let (_size, mime) = get_mime_type(gateway, hash, name, &connection).await?;
    tracing::debug!("mime: {}", mime);
    let chunk_ranges = RangeSpecSeq::from_ranges(vec![chunk_ranges]);
    let request = iroh_blobs::protocol::GetRequest::new(*hash, chunk_ranges.clone());
    let status_code = if byte_ranges.is_all() {
        StatusCode::OK
    } else {
        StatusCode::PARTIAL_CONTENT
    };
    tracing::debug!("status_code {}", status_code);
    let (send, recv) = flume::bounded::<result::Result<Bytes, DecodeError>>(2);

    tracing::trace!("requesting {:?}", request);
    let req = iroh_blobs::get::fsm::start(connection.clone(), request);
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
                            for item in slice(leaf.offset, leaf.data, byte_ranges.clone()) {
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
    // content-length needs to be the actual repsonse size
    let transfer_size = match (start, end) {
        (Some(start), Some(end)) => end - start,
        (Some(start), None) => size - start,
        (None, Some(end)) => end,
        (None, None) => size,
    };
    let builder = builder.header(header::CONTENT_LENGTH, transfer_size);

    let builder = if start.is_some() || end.is_some() {
        builder
            .header(
                header::CONTENT_RANGE,
                format_content_range(start, end, size),
            )
            .status(StatusCode::PARTIAL_CONTENT)
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
    let mut builder = Endpoint::builder().discovery(Box::new(DnsDiscovery::n0_dns()));
    if let Some(addr) = args.iroh_ipv4_addr {
        builder = builder.bind_addr_v4(addr);
    }
    if let Some(addr) = args.iroh_ipv6_addr {
        builder = builder.bind_addr_v6(addr);
    }
    let endpoint = builder.bind().await?;
    let default_node = args
        .default_node
        .map(|default_node| {
            Ok(if let Ok(node_id) = default_node.parse::<NodeId>() {
                node_id.into()
            } else if let Ok(node_ticket) = default_node.parse::<NodeTicket>() {
                node_ticket.node_addr().clone()
            } else if let Ok(blob_ticket) = default_node.parse::<BlobTicket>() {
                blob_ticket.node_addr().clone()
            } else {
                anyhow::bail!("invalid default node");
            })
        })
        .transpose()?;
    let gateway = Gateway(Arc::new(Inner {
        endpoint,
        default_node,
        mime_classifier: MimeClassifier::new(),
        mime_cache: Mutex::new(LruCache::new(100000.try_into().unwrap())),
        collection_cache: Mutex::new(LruCache::new(1000.try_into().unwrap())),
    }));

    let cors = CorsLayer::new()
        .allow_headers(AllowHeaders::mirror_request())
        .allow_methods([Method::GET, Method::HEAD, Method::OPTIONS])
        .allow_origin(AllowOrigin::mirror_request());

    #[rustfmt::skip]
    let app = Router::new()
        .route("/blob/:blake3_hash", get(handle_local_blob_request))
        .route("/collection/:blake3_hash", get(handle_local_collection_index))
        .route("/collection/:blake3_hash/*path",get(handle_local_collection_request))
        .route("/ticket/:ticket", get(handle_ticket_index))
        .route("/ticket/:ticket/*path", get(handle_ticket_request))
        .layer(cors)
        .layer(Extension(gateway));

    match args.cert_mode {
        CertMode::None => {
            // Run our application as just http
            let addr = args.addr;
            println!("listening on {}, http", addr);

            let listener = tokio::net::TcpListener::bind(addr).await?;
            axum::serve(listener, app).await?;
        }
        CertMode::Manual => {
            // Run with manual certificates
            //
            // Code copied from https://github.com/tokio-rs/axum/tree/main/examples/low-level-rustls/src
            //
            // TODO: use axum_server maybe, once tokio-rustls-acme is on the latest
            // rustls.
            let cert_path = args
                .cert_path
                .context("cert_path not specified")?
                .canonicalize()?;
            let cert_file = cert_path.join("cert.pem");
            let key_file = cert_path.join("key.pem");
            let certs = load_certs(cert_file)?;
            let secret_key = load_secret_key(key_file)?;
            let config = rustls::ServerConfig::builder()
                .with_safe_defaults()
                .with_no_client_auth()
                .with_single_cert(certs, secret_key)?;
            // Run our application with hyper
            let addr = args.addr;
            println!("listening on {}", addr);
            println!("https with manual certificates");
            let tls_acceptor = TlsAcceptor::from(Arc::new(config));
            let tcp_listener = TcpListener::bind(addr).await?;

            pin_mut!(tcp_listener);

            loop {
                let tower_service = app.clone();
                let tls_acceptor = tls_acceptor.clone();

                // Wait for new tcp connection
                let (cnx, addr) = tcp_listener.accept().await?;

                tokio::spawn(async move {
                    // Wait for tls handshake to happen
                    let Ok(stream) = tls_acceptor.accept(cnx).await else {
                        tracing::error!("error during tls handshake connection from {}", addr);
                        return;
                    };

                    // Hyper has its own `AsyncRead` and `AsyncWrite` traits and doesn't use tokio.
                    // `TokioIo` converts between them.
                    let stream = TokioIo::new(stream);

                    // Hyper has also its own `Service` trait and doesn't use tower. We can use
                    // `hyper::service::service_fn` to create a hyper `Service` that calls our app through
                    // `tower::Service::call`.
                    let hyper_service =
                        hyper::service::service_fn(move |request: Request<Incoming>| {
                            // We have to clone `tower_service` because hyper's `Service` uses `&self` whereas
                            // tower's `Service` requires `&mut self`.
                            //
                            // We don't need to call `poll_ready` since `Router` is always ready.
                            tower_service.clone().call(request)
                        });

                    let ret = hyper_util::server::conn::auto::Builder::new(TokioExecutor::new())
                        .serve_connection_with_upgrades(stream, hyper_service)
                        .await;

                    if let Err(err) = ret {
                        tracing::warn!("error serving connection from {}: {}", addr, err);
                    }
                });
            }
        }
        CertMode::LetsEncryptStaging | CertMode::LetsEncrypt => {
            // Run with letsencrypt certificates
            //
            // Code copied from https://github.com/tokio-rs/axum/tree/main/examples/low-level-rustls/src and adapted
            //
            // TODO: use axum_server with the axum acceptor maybe, once tokio-rustls-acme is on the latest
            // rustls.
            let is_production = args.cert_mode == CertMode::LetsEncrypt;
            let hostnames = args.hostname;
            let contact = args.contact.context("contact not specified")?;
            let dir = args.cert_path.context("cert_path not specified")?;
            let state = AcmeConfig::new(hostnames)
                .contact([format!("mailto:{contact}")])
                .cache_option(Some(DirCache::new(dir)))
                .directory_lets_encrypt(is_production)
                .state();
            let config = rustls::ServerConfig::builder()
                .with_safe_defaults()
                .with_no_client_auth()
                .with_cert_resolver(state.resolver());
            // config.alpn_protocols.extend([b"h2".to_vec(), b"http/1.1".to_vec()]);
            let config = Arc::new(config);
            let acme_acceptor = state.acceptor();
            // drive the acme state machine
            //
            // this drives the cert renewal process.
            tokio::spawn(async move {
                let mut state = state;
                while let Some(event) = state.next().await {
                    match event {
                        Ok(ok) => tracing::debug!("acme event: {:?}", ok),
                        Err(err) => tracing::error!("error: {:?}", err),
                    }
                }
            });
            // Run our application with hyper
            let addr = args.addr;
            println!("listening on {}", addr);
            println!(
                "https with letsencrypt certificates, production = {}",
                is_production
            );
            let tcp_listener = TcpListener::bind(addr).await?;

            pin_mut!(tcp_listener);

            loop {
                let tower_service = app.clone();
                let acme_acceptor = acme_acceptor.clone();
                let config = config.clone();

                // Wait for new tcp connection
                let (cnx, addr) = tcp_listener.accept().await?;
                println!("got connection from {}", addr);

                tokio::spawn(async move {
                    // Wait for tls handshake to happen
                    let handshake = match acme_acceptor.accept(cnx).await {
                        Ok(Some(handshake)) => {
                            tracing::info!("got tls handshake from {}", addr);
                            handshake
                        }
                        Ok(None) => {
                            tracing::info!("got acme tls challenge from {}", addr);
                            return Ok(());
                        }
                        Err(cause) => {
                            tracing::error!(
                                "error during tls handshake connection from {}: {}",
                                addr,
                                cause
                            );
                            return Ok(());
                        }
                    };
                    let stream = match handshake.into_stream(config.clone()).await {
                        Ok(stream) => stream,
                        Err(cause) => {
                            tracing::error!(
                                "error during tls handshake connection from {}: {}",
                                addr,
                                cause
                            );
                            return Ok(());
                        }
                    };

                    // Hyper has its own `AsyncRead` and `AsyncWrite` traits and doesn't use tokio.
                    // `TokioIo` converts between them.
                    let stream = TokioIo::new(stream);

                    // Hyper has also its own `Service` trait and doesn't use tower. We can use
                    // `hyper::service::service_fn` to create a hyper `Service` that calls our app through
                    // `tower::Service::call`.
                    let hyper_service =
                        hyper::service::service_fn(move |request: Request<Incoming>| {
                            // We have to clone `tower_service` because hyper's `Service` uses `&self` whereas
                            // tower's `Service` requires `&mut self`.
                            //
                            // We don't need to call `poll_ready` since `Router` is always ready.
                            tower_service.clone().call(request)
                        });

                    let ret = hyper_util::server::conn::auto::Builder::new(TokioExecutor::new())
                        .serve_connection_with_upgrades(stream, hyper_service)
                        .await;

                    if let Err(err) = ret {
                        tracing::warn!("error serving connection from {}: {}", addr, err);
                    }
                    anyhow::Ok(())
                });
            }
        }
    }

    Ok(())
}
