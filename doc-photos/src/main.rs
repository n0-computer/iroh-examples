use std::sync::Arc;
use std::time::Duration;

use dotenv::dotenv;

use anyhow::{Context, Result};
use iroh::client::mem::Iroh;
use tokio::sync::oneshot;
use tracing::{error, info_span, Instrument};
use tracing_subscriber::layer::SubscriberExt;
use tracing_subscriber::util::SubscriberInitExt;

use doc_photos::node::{self, get_author, Event, DOC_PHOTOS_DEFAULT_RPC_PORT};
use doc_photos::{routes::load_config, AppState};

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

    let config = load_config();

    // create a oneshot channel to return the rpc client
    let (rpc_client_tx, rpc_client_rx) = oneshot::channel();
    // Create a broadcast channel of provider events
    let (sender, _) = tokio::sync::broadcast::channel::<Event>(16);
    let sender = Arc::new(sender);
    let sender_2 = sender.clone();

    // start iroh node
    let iroh_port = config.provider_port;
    let _node_handle = tokio::spawn(
        async move {
            if let Err(err) = node::start_node(
                iroh_port,
                DOC_PHOTOS_DEFAULT_RPC_PORT,
                rpc_client_tx,
                sender_2,
            )
            .await
            {
                error!("Iroh node failed: {err:#}")
            }
        }
        .instrument(info_span!("node")),
    );

    // wait for the rpc client to be ready
    let rpc_client = rpc_client_rx
        .await
        .context("did not receive rpc client from node")?;
    let iroh = Iroh::new(rpc_client, rt);
    let author_id = get_author(&iroh).await?;

    // provision app state
    let state = AppState::new(config, iroh, author_id, sender).await?;

    let app = state.create_app().await?;
    let addr = state.listen_addr();

    println!(
        r#"
Webapp listening address:    {}
provider NodeId:             {}"#,
        &addr,
        state.provider_node_id(),
    );

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await?;

    Ok(())
}
