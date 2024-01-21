//! An example chat application using the iroh-net magic endpoint and
//! pkarr node discovery.
//!
//! Starting the example without args creates a server that publishes its
//! address to the DHT. Starting the example with a node id as argument
//! looks up the address of the node id in the DHT and connects to it.
//!
//! You can look at the published pkarr DNS record using <https://app.pkarr.org/>.
//!
//! To see what is going on, run with `RUST_LOG=iroh_pkarr_node_discovery=debug`.
use std::str::FromStr;

use anyhow::Context;
use iroh_net::{magic_endpoint::get_remote_node_id, MagicEndpoint, NodeId};
use pkarr::PkarrClient;

const CHAT_ALPN: &[u8] = b"pkarr-discovery-demo-chat";

async fn chat_server() -> anyhow::Result<()> {
    let pkarr = PkarrClient::new();
    let secret_key = iroh_net::key::SecretKey::generate();
    let node_id = secret_key.public();
    let discovery = iroh_pkarr_node_discovery::PkarrNodeDiscovery::new(pkarr, Some(&secret_key));
    let endpoint = MagicEndpoint::builder()
        .alpns(vec![CHAT_ALPN.to_vec()])
        .secret_key(secret_key)
        .discovery(Box::new(discovery))
        .bind(0)
        .await?;
    let zid = pkarr::PublicKey::try_from(*node_id.as_bytes())?.to_z32();
    println!("Listening on {}", node_id);
    println!("pkarr z32: {}", zid);
    while let Some(connecting) = endpoint.accept().await {
        tokio::spawn(async move {
            let connection = connecting.await?;
            let remote_node_id = get_remote_node_id(&connection)?;
            println!("got connection from {}", remote_node_id);
            // just leave the tasks hanging. this is just an example.
            let (mut writer, mut reader) = connection.accept_bi().await?;
            let _copy_to_stdout = tokio::spawn(async move {
                tokio::io::copy(&mut reader, &mut tokio::io::stdout()).await
            });
            let _copy_from_stdin =
                tokio::spawn(
                    async move { tokio::io::copy(&mut tokio::io::stdin(), &mut writer).await },
                );
            anyhow::Ok(())
        });
    }
    Ok(())
}

async fn chat_client(remote_node_id: NodeId) -> anyhow::Result<()> {
    let pkarr = PkarrClient::new();
    let secret_key = iroh_net::key::SecretKey::generate();
    let node_id = secret_key.public();
    // note: we don't pass a secret key here, because we don't need to publish our address, don't spam the DHT
    let discovery = iroh_pkarr_node_discovery::PkarrNodeDiscovery::new(pkarr, None);
    // we do not need to specify the alpn here, because we are not going to accept connections
    let endpoint = MagicEndpoint::builder()
        .secret_key(secret_key)
        .discovery(Box::new(discovery))
        .bind(0)
        .await?;
    println!("We are {} and connecting to {}", node_id, remote_node_id);
    let connection = endpoint
        .connect_by_node_id(&remote_node_id, CHAT_ALPN)
        .await?;
    let (mut writer, mut reader) = connection.open_bi().await?;
    let _copy_to_stdout =
        tokio::spawn(async move { tokio::io::copy(&mut reader, &mut tokio::io::stdout()).await });
    let _copy_from_stdin =
        tokio::spawn(async move { tokio::io::copy(&mut tokio::io::stdin(), &mut writer).await });
    _copy_to_stdout.await??;
    _copy_from_stdin.await??;
    Ok(())
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    tracing_subscriber::fmt::init();
    let args = std::env::args();
    let first = args.into_iter().skip(1).next();
    match first {
        Some(node_id) => {
            let node_id = NodeId::from_str(&node_id).context("invalid node id")?;
            chat_client(node_id).await?;
        }
        None => {
            chat_server().await?;
        }
    }
    Ok(())
}
