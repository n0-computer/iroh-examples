use std::str::FromStr;

use anyhow::Result;
use async_channel::Sender;
use iroh::{
    Endpoint, EndpointId,
    endpoint::Connection,
    protocol::{AcceptError, ProtocolHandler, Router},
};
use iroh_services::{
    API_SECRET_ENV_VAR_NAME, ApiSecret, CLIENT_HOST_ALPN, ClientHost, caps::NetDiagnosticsCap,
};
use n0_future::{Stream, StreamExt, boxed::BoxStream, task};
use serde::{Deserialize, Serialize};
use tokio::sync::broadcast;
use tokio_stream::wrappers::BroadcastStream;
use tracing::info;

#[derive(Debug, Clone)]
pub struct EchoNode {
    router: Router,
    accept_events: broadcast::Sender<AcceptEvent>,
    _svc_client: Option<iroh_services::Client>,
}

impl EchoNode {
    pub async fn spawn() -> Result<Self> {
        let endpoint = iroh::Endpoint::builder(iroh::endpoint::presets::N0)
            .alpns(vec![Echo::ALPN.to_vec()])
            .bind()
            .await?;
        let svc = enable_services(endpoint.clone()).await?;
        let (event_sender, _event_receiver) = broadcast::channel(128);
        let echo = Echo::new(event_sender.clone());
        let mut router_builder = Router::builder(endpoint).accept(Echo::ALPN, echo);
        let svc_client = if let Some((svc_client, svc_host)) = svc {
            router_builder = router_builder.accept(CLIENT_HOST_ALPN, svc_host);
            Some(svc_client)
        } else {
            None
        };
        let router = router_builder.spawn();
        Ok(Self {
            router,
            accept_events: event_sender,
            _svc_client: svc_client,
        })
    }

    pub fn endpoint(&self) -> &Endpoint {
        self.router.endpoint()
    }

    pub fn accept_events(&self) -> BoxStream<AcceptEvent> {
        let receiver = self.accept_events.subscribe();
        Box::pin(BroadcastStream::new(receiver).filter_map(|event| event.ok()))
    }

    pub fn connect(
        &self,
        endpoint_id: EndpointId,
        payload: String,
    ) -> impl Stream<Item = ConnectEvent> + Unpin + use<> {
        let (event_sender, event_receiver) = async_channel::bounded(16);
        let endpoint = self.router.endpoint().clone();
        task::spawn(async move {
            let res = connect(&endpoint, endpoint_id, payload, event_sender.clone()).await;
            let error = res.as_ref().err().map(|err| err.to_string());
            event_sender.send(ConnectEvent::Closed { error }).await.ok();
        });
        Box::pin(event_receiver)
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "type", rename_all = "camelCase")]
pub enum ConnectEvent {
    Connected,
    Sent { bytes_sent: u64 },
    Received { bytes_received: u64 },
    Closed { error: Option<String> },
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "type", rename_all = "camelCase")]
pub enum AcceptEvent {
    Accepted {
        endpoint_id: EndpointId,
    },
    Echoed {
        endpoint_id: EndpointId,
        bytes_sent: u64,
    },
    Closed {
        endpoint_id: EndpointId,
        error: Option<String>,
    },
}

#[derive(Debug, Clone)]
pub struct Echo {
    event_sender: broadcast::Sender<AcceptEvent>,
}

impl Echo {
    pub const ALPN: &[u8] = b"iroh/example-browser-echo/0";
    pub fn new(event_sender: broadcast::Sender<AcceptEvent>) -> Self {
        Self { event_sender }
    }
}

impl Echo {
    async fn handle_connection(
        self,
        connection: Connection,
    ) -> std::result::Result<(), AcceptError> {
        // Wait for the connection to be fully established.
        let endpoint_id = connection.remote_id();
        self.event_sender
            .send(AcceptEvent::Accepted { endpoint_id })
            .ok();
        let res = self.handle_connection_0(&connection).await;
        let error = res.as_ref().err().map(|err| err.to_string());
        self.event_sender
            .send(AcceptEvent::Closed { endpoint_id, error })
            .ok();
        res
    }
    async fn handle_connection_0(
        &self,
        connection: &Connection,
    ) -> std::result::Result<(), AcceptError> {
        // We can get the remote's endpoint id from the connection.
        let endpoint_id = connection.remote_id();
        info!("Accepted connection from {endpoint_id}");

        // Our protocol is a simple request-response protocol, so we expect the
        // connecting peer to open a single bi-directional stream.
        let (mut send, mut recv) = connection.accept_bi().await?;

        // Echo any bytes received back directly.
        let bytes_sent = tokio::io::copy(&mut recv, &mut send).await?;
        info!("Copied over {bytes_sent} byte(s)");
        self.event_sender
            .send(AcceptEvent::Echoed {
                endpoint_id,
                bytes_sent,
            })
            .ok();

        // By calling `finish` on the send stream we signal that we will not send anything
        // further, which makes the receive stream on the other end terminate.
        send.finish()?;

        // Wait until the remote closes the connection, which it does once it
        // received the response.
        connection.closed().await;
        Ok(())
    }
}

impl ProtocolHandler for Echo {
    /// The `accept` method is called for each incoming connection for our ALPN.
    ///
    /// The returned future runs on a newly spawned tokio task, so it can run as long as
    /// the connection lasts.
    async fn accept(&self, connection: Connection) -> std::result::Result<(), AcceptError> {
        self.clone().handle_connection(connection).await
    }
}

async fn connect(
    endpoint: &Endpoint,
    endpoint_id: EndpointId,
    payload: String,
    event_sender: Sender<ConnectEvent>,
) -> Result<()> {
    let connection = endpoint.connect(endpoint_id, Echo::ALPN).await?;
    event_sender.send(ConnectEvent::Connected).await?;
    let (mut send_stream, mut recv_stream) = connection.open_bi().await?;
    let send_task = task::spawn({
        let event_sender = event_sender.clone();
        async move {
            let bytes_sent = payload.len();
            send_stream.write_all(payload.as_bytes()).await?;
            event_sender
                .send(ConnectEvent::Sent {
                    bytes_sent: bytes_sent as u64,
                })
                .await?;
            anyhow::Ok(())
        }
    });
    let n = tokio::io::copy(&mut recv_stream, &mut tokio::io::sink()).await?;
    // We know we received the last data, so we close the connection.
    connection.close(1u8.into(), b"done");
    event_sender
        .send(ConnectEvent::Received {
            bytes_received: n as u64,
        })
        .await?;
    send_task.await??;
    Ok(())
}

async fn enable_services(
    endpoint: Endpoint,
) -> Result<Option<(iroh_services::Client, ClientHost)>> {
    // 2. Parse the ApiSecret separately so we can extract the remote
    //    EndpointID. Normally we'd pass it straight to the client builder.
    let secret = match ApiSecret::from_env_var(API_SECRET_ENV_VAR_NAME) {
        Ok(secret) => Some(secret),
        Err(_) => match std::option_env!("BUILD_IROH_SERVICES_API_SECRET") {
            Some(secret) => ApiSecret::from_str(secret).ok(),
            None => None,
        },
    };
    let Some(secret) = secret else {
        tracing::info!("iroh services integration disabled: IROH_SERVICES_API_SECRET is not set");
        return Ok(None);
    };
    tracing::info!("iroh services integration enabled");

    // optional: name the endpoint. Here we generate a name from the endpoint id
    // to keep name unique. in your app this would be used to connect with
    // something like a userId or machine name
    let name = format!("wasm-echo-{}", endpoint.id().fmt_short());

    // 3. Build a Client that dials iroh-services (as in all other examples).
    let client = iroh_services::Client::builder(&endpoint)
        .api_secret(secret.clone())?
        .name(name)?
        .build()
        .await?;

    // 4. grant the ability to get diagnostics to the remote EndpointID associated
    //    with our project on iroh-services. This will create a capability token, send it to
    //    the remote for storage & confirm receipt. We do this in a task to avoid
    //    blocking the local node startup in the rare case that remote endpoint is
    //    down when this process starts.
    let client2 = client.clone();
    let remote_id = secret.addr().id;
    let _task = n0_future::task::spawn(async move {
        if let Err(err) = client2
            .grant_capability(remote_id, vec![NetDiagnosticsCap::GetAny])
            .await
        {
            tracing::warn!("Failed to grant capability: {err:?}");
        } else {
            tracing::info!("Capability granted to services");
        }
    });

    // 5. Set up a ClientHost so iroh-services can dial *back* into this endpoint.
    //    Incoming connections must present an RCAN issued by this endpoint.
    let host = ClientHost::new(&endpoint);
    Ok(Some((client, host)))
}
