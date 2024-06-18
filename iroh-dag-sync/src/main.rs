use std::pin::Pin;
use std::str::FromStr;
use std::sync::atomic::AtomicU64;
use std::sync::Arc;

use clap::Parser;
use futures_lite::{future, Future, StreamExt};
use iroh_blobs::Hash;
use iroh_blobs::{store::Store, BlobFormat};
use iroh_car::CarReader;
use iroh_net::discovery::{dns::DnsDiscovery, pkarr_publish::PkarrPublisher, ConcurrentDiscovery};
use iroh_net::ticket::NodeTicket;
use iroh_net::NodeAddr;
use libipld::{
    block,
    cbor::{DagCbor, DagCborCodec},
    codec::{Codec, Encode},
    Cid, DefaultParams,
};
use redb::TableDefinition;
use sync::{handle_request, handle_sync_request, handle_sync_response};
use tables::{ReadOnlyTables, Tables};
use tokio_util::task::LocalPoolHandle;
use traversal::{FullTraversal, Traversal};
use util::wait_for_relay;

mod args;
mod protocol;
mod tables;
mod util;
mod sync;
mod traversal;

use args::Args;

const SYNC_ALPN: &[u8] = b"DAG_SYNC/1";

async fn create_endpoint(port: Option<u16>) -> anyhow::Result<iroh_net::Endpoint> {
    let secret_key = util::get_or_create_secret()?;
    let discovery = Box::new(ConcurrentDiscovery::from_services(vec![
        Box::new(DnsDiscovery::n0_dns()),
        Box::new(PkarrPublisher::n0_dns(secret_key.clone())),
    ]));

    let endpoint = iroh_net::Endpoint::builder()
        .secret_key(secret_key)
        .alpns(vec![SYNC_ALPN.to_vec()])
        .discovery(discovery)
        .bind(port.unwrap_or_default())
        .await?;

    Ok(endpoint)
}

fn init_mapping_db(db: &redb::Database) -> anyhow::Result<()> {
    let tx = db.begin_write()?;
    tables::Tables::new(&tx)?;
    tx.commit()?;
    Ok(())
}

type BoxedFuture<'a, T> = Pin<Box<dyn Future<Output = T> + Send + 'a>>;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    tracing_subscriber::fmt::init();
    let args = Args::parse();
    let store = iroh_blobs::store::fs::Store::load("blobs.db").await?;
    let mapping_store = redb::Database::create("dag.db")?;
    init_mapping_db(&mapping_store)?;
    let rt = LocalPoolHandle::new(1);

    match args.cmd {
        args::SubCommand::Import(import_args) => {
            let tx = mapping_store.begin_write()?;
            let mut tables = tables::Tables::new(&tx)?;
            let file = tokio::fs::File::open(import_args.path).await?;
            let reader = CarReader::new(file).await?;
            let stream = reader.stream().enumerate();
            tokio::pin!(stream);
            while let Some((i, block)) = stream.next().await {
                let (cid, data) = block?;
                let block = block::Block::<DefaultParams>::new(cid, data)?;
                let mut links = Vec::new();
                block.references(&mut links)?;
                let (cid, data) = block.into_inner();
                let tag = store.import_bytes(data.into(), BlobFormat::Raw).await?;
                let hash = tag.hash();
                if !links.is_empty() {
                    println!("{} {} {}", i, cid, links.len());
                    let links = DagCborCodec.encode(&links)?;
                    tables.data_to_links.insert((cid.codec(), *hash), links)?;
                } else {
                    println!("{} {}", i, cid);
                }
                tables
                    .hash_to_blake3
                    .insert((cid.hash().code(), cid.hash().digest()), hash)?;
            }
            drop(tables);
            tx.commit()?;
            store.sync().await?;
        }
        args::SubCommand::Traverse(args) => {
            let cid = Cid::from_str(&args.cid)?;
            let tx = mapping_store.begin_read()?;
            let tables = tables::ReadOnlyTables::new(&tx)?;
            match &args.method {
                _ => {
                    let mut traversal = FullTraversal::new(&tables, cid);
                    let mut first = None;
                    while let Some(cid) = traversal.next().await? {
                        if first.is_none() {
                            first = Some(cid);
                        }
                        println!("{}", cid);
                    }

                    if let Some(first) = first {
                        println!("root: {}", first);
                    }
                }
            }
        }
        args::SubCommand::Node(args) => {
            let endpoint = create_endpoint(args.net.iroh_port).await?;
            wait_for_relay(&endpoint).await?;
            let addr = endpoint.my_addr().await?;
            println!("I am {}", addr.node_id);
            println!("Listening on {:#?}", addr.info);
            println!("ticket: {}", NodeTicket::new(addr.clone())?);
            while let Some(mut connecting) = endpoint.accept().await {
                let alpn = connecting.alpn().await?;
                match alpn.as_bytes() {
                    SYNC_ALPN => {
                        let tx = mapping_store.begin_read()?;
                        let tables = ReadOnlyTables::new(&tx)?;
                        let store = store.clone();
                        rt.spawn_pinned(move || async move {
                            handle_request(connecting, &tables, &store).await?;
                            anyhow::Ok(())
                        });
                    }
                    _ => {
                        eprintln!("Unknown ALPN: {:?}", alpn);
                    }
                }
            }
        }
        args::SubCommand::Sync(args) => {
            let endpoint = create_endpoint(args.net.iroh_port).await?;
            wait_for_relay(&endpoint).await?;
            let tx = mapping_store.begin_write()?;
            let mut tables = Tables::new(&tx)?;
            let store = store.clone();
            let endpoint = Arc::new(endpoint);
            let node = NodeAddr::from(args.from);
            let connection = endpoint.connect(node, SYNC_ALPN).await?;
            let cid = Cid::from_str(&args.cid)?;
            let request = protocol::Request::Sync(protocol::SyncRequest {
                root: protocol::MiniCid::from(cid),
                method: "full".to_string(),
                args: Vec::new(),
            });
            let request = postcard::to_allocvec(&request)?;
            let (mut send, recv) = connection.open_bi().await?;
            send.write_all(&request).await?;
            send.finish().await?;
            handle_sync_response(cid, recv, &mut tables, &store).await?;
            drop(tables);
            tx.commit()?;
        }
    }

    Ok(())
}
