use std::str::FromStr;
use std::sync::Arc;

use anyhow::Context;
use clap::Parser;
use futures_lite::StreamExt;
use iroh_blobs::store::{Map, MapEntry};
use iroh_blobs::{store::Store, BlobFormat};
use iroh_car::CarReader;
use iroh_net::discovery::{dns::DnsDiscovery, pkarr_publish::PkarrPublisher, ConcurrentDiscovery};
use iroh_net::ticket::NodeTicket;
use iroh_net::NodeAddr;
use libipld::{cbor::DagCborCodec, codec::Codec, Cid};
use libipld::{Ipld, IpldCodec};
use sync::{handle_request, handle_sync_response};
use tables::{ReadOnlyTables, ReadableTables, Tables};
use tokio_util::task::LocalPoolHandle;
use traversal::{get_traversal, Traversal};
use util::wait_for_relay;

mod args;
mod protocol;
mod sync;
mod tables;
mod traversal;
mod util;

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
            let mut first = None;
            while let Some((i, block)) = stream.next().await {
                let (cid, data) = block?;
                if first.is_none() {
                    first = Some(cid);
                }
                let mut links = Vec::new();
                IpldCodec::try_from(cid.codec())?.references::<Ipld, _>(&data, &mut links)?;
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
            if let Some(first) = first {
                println!("root: {}", first);
            }
        }
        args::SubCommand::Traverse(args) => {
            let cid = args.cid;
            let tx = mapping_store.begin_read()?;
            let tables = tables::ReadOnlyTables::new(&tx)?;
            let method = args.method.unwrap_or("full".to_owned());
            let traversal = get_traversal(cid, method.as_str(), &tables)?;
            print_traversal(traversal, &store).await?;
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
            let traversal = args.traversal.unwrap_or("full".to_owned());
            let inline = args.inline.unwrap_or("always".to_owned());
            let tx = mapping_store.begin_write()?;
            let mut tables = Tables::new(&tx)?;
            let store = store.clone();
            let endpoint = Arc::new(endpoint);
            let node = NodeAddr::from(args.from);
            let connection = endpoint.connect(node, SYNC_ALPN).await?;
            let cid = Cid::from_str(&args.cid)?;
            let request = protocol::Request::Sync(protocol::SyncRequest {
                root: protocol::MiniCid::from(cid),
                traversal: traversal.clone(),
                inline,
            });
            let request = postcard::to_allocvec(&request)?;
            let (mut send, recv) = connection.open_bi().await?;
            send.write_all(&request).await?;
            send.finish().await?;
            handle_sync_response(cid, recv, &mut tables, &store, &traversal).await?;
            drop(tables);
            tx.commit()?;
        }
    }

    Ok(())
}

async fn print_traversal<T>(
    traversal: T,
    store: &iroh_blobs::store::fs::Store,
) -> anyhow::Result<()>
where
    T: Traversal,
    T::Db: ReadableTables,
{
    let mut traversal = traversal;
    let mut first = None;
    let mut n = 0;
    while let Some(cid) = traversal.next().await? {
        if first.is_none() {
            first = Some(cid);
        }
        let blake3_hash = traversal
            .db_mut()
            .blake3_hash(cid.hash())?
            .context("blake3 hash not found")?;
        let data = store.get(&blake3_hash).await?.context("data not found")?;
        println!("{} {:x} {} {}", cid, cid.codec(), data.size().value(), n);
        n += 1;
    }

    if let Some(first) = first {
        println!("root: {}", first);
    }
    Ok(())
}
