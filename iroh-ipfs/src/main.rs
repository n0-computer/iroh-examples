use std::time::Duration;

use dotenv::dotenv;

use anyhow::{Context, Result};
use iroh::client::mem::Iroh;
use tokio::sync::oneshot;
use tracing::{error, info_span, Instrument};
use tracing_subscriber::layer::SubscriberExt;
use tracing_subscriber::util::SubscriberInitExt;

use iroh_ipfs::node::{self, get_author, IROH_IPFS_DEFAULT_RPC_PORT};
use iroh_ipfs::AppState;

fn main() -> Result<()> {
    dotenv().ok();

    let rt = tokio::runtime::Builder::new_multi_thread()
        .thread_name("main-runtime")
        .worker_threads(2)
        .enable_all()
        .build()?;
    rt.block_on(main_impl())?;
    // give the runtime some time to finish, but do not wait indefinitely.
    // there are cases where the a runtime thread is blocked doing io.
    // e.g. reading from stdin.
    rt.shutdown_timeout(Duration::from_millis(500));
    Ok(())
}

async fn main_impl() -> Result<()> {
    let tokio = tokio::runtime::Handle::current();
    let tpc = tokio_util::task::LocalPoolHandle::new(num_cpus::get());
    let rt = iroh::bytes::util::runtime::Handle::new(tokio, tpc);

    tracing_subscriber::registry()
        .with(tracing_subscriber::EnvFilter::from_default_env())
        .with(tracing_subscriber::fmt::layer())
        .init();

    // provision app state
    let mut state = AppState::new().await?;

    // create a oneshot channel to return the rpc client
    let (rpc_client_tx, rpc_client_rx) = oneshot::channel();

    // start iroh node
    let iroh_addr = state.provider_addr();
    {
        let state = state.clone();
        tokio::spawn(
            async move {
                if let Err(err) =
                    node::start_node(state, iroh_addr, IROH_IPFS_DEFAULT_RPC_PORT, rpc_client_tx)
                        .await
                {
                    error!("Iroh node failed: {err:#}")
                }
            }
            .instrument(info_span!("node")),
        );
    }

    // wait for the rpc client to be ready
    let rpc_client = rpc_client_rx
        .await
        .context("did not receive rpc client from node")?;
    let iroh = Iroh::new(rpc_client, rt);
    let author_id = get_author(&iroh).await?;
    state.set_iroh_client(Some(iroh));
    state.set_author_id(author_id);
    state.start_kubo_replication()?;

    let addr = state.listen_addr();

    let app = state.create_app().await?;

    let version = env!("IROH_IPFS_GIT_HASH")
        .chars()
        .take(7)
        .collect::<String>();
    println!(
        r#"
iroh-kubo version:           {}
HTTP API listening address:  {}
provider listening address:  {}
provider NodeId:             {}"#,
        version,
        &addr,
        &iroh_addr,
        state.provider_node_id(),
    );

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await?;

    Ok(())
}
