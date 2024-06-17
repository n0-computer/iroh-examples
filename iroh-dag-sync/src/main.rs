use std::str::FromStr;

use clap::Parser;
use futures_lite::StreamExt;
use iroh_blobs::Hash;
use iroh_blobs::{store::Store, BlobFormat};
use iroh_car::CarReader;
use iroh_net::discovery::{dns::DnsDiscovery, pkarr_publish::PkarrPublisher, ConcurrentDiscovery};
use libipld::{
    block,
    cbor::{DagCbor, DagCborCodec},
    codec::{Codec, Encode},
    Cid, DefaultParams,
};
use redb::TableDefinition;
use tables::ReadOnlyTables;
use util::wait_for_relay;

mod args;
mod protocol;
mod tables;
mod util;

use args::Args;

const SYNC_ALPN: &[u8] = b"DAG_SYNC/1";

async fn create_endpoint() -> anyhow::Result<iroh_net::Endpoint> {
    let secret_key = util::get_or_create_secret()?;
    let discovery = Box::new(ConcurrentDiscovery::from_services(vec![
        Box::new(DnsDiscovery::n0_dns()),
        Box::new(PkarrPublisher::n0_dns(secret_key.clone())),
    ]));

    let endpoint = iroh_net::Endpoint::builder()
        .secret_key(secret_key)
        .alpns(vec![SYNC_ALPN.to_vec()])
        .discovery(discovery)
        .bind(0)
        .await?;

    Ok(endpoint)
}

fn init_mapping_db(db: &redb::Database) -> anyhow::Result<()> {
    let tx = db.begin_write()?;
    tables::Tables::new(&tx)?;
    tx.commit()?;
    Ok(())
}

fn full_ignore_missing(tables: &ReadOnlyTables, cid: Cid) -> anyhow::Result<()> {
    let mut stack = vec![cid];
    let mut visited = std::collections::HashSet::new();
    let mut n = 0u64;
    while let Some(cid) = stack.pop() {
        println!("{} {}", n, cid);
        n += 1;
        if visited.contains(&cid) {
            continue;
        }
        visited.insert(cid);
        let Some(hash) = tables
            .hash_to_blake3
            .get((cid.hash().code(), cid.hash().digest()))?
        else {
            // we don't have a mapping for this hash
            continue;
        };

        let Some(links) = tables.data_to_links.get((cid.codec(), hash.value()))? else {
            // we don't have any links for this hash, maybe it's a leaf
            continue;
        };

        let links = links.value();
        let links: Vec<Cid> = DagCborCodec.decode(&links).unwrap();
        for link in links.into_iter().rev() {
            stack.push(link);
        }
    }
    Ok(())
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    tracing_subscriber::fmt::init();
    let args = Args::parse();
    let store = iroh_blobs::store::fs::Store::load("dag.db").await?;
    let mapping_store = redb::Database::create("mapping.db")?;
    init_mapping_db(&mapping_store)?;

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
                    full_ignore_missing(&tables, cid)?;
                }
            }
        }
    }

    Ok(())
}
