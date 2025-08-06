use iroh::{
    Endpoint, Watcher,
    endpoint::{Connection, RecvStream, SendStream},
    protocol::{AcceptError, ProtocolHandler, Router},
};
use tokio::io::{AsyncReadExt, AsyncWriteExt};

const ALPN: &[u8] = b"iroh/smol-msgs/0";

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // create the receive side
    let recv_ep = Endpoint::builder().discovery_n0().bind().await?;
    let recv_router = Router::builder(recv_ep)
        .accept(ALPN, SmolMsgsProtocol)
        .spawn();
    let addr = recv_router.endpoint().node_addr().initialized().await;

    // create a send side & send some messages :)
    let send_ep = Endpoint::builder().discovery_n0().bind().await?;
    let conn = send_ep.connect(addr, ALPN).await?;
    let mut stream = conn.open_uni().await?;

    write_frame(&mut stream, "hi").await?;
    write_frame(&mut stream, "fren!").await?;

    // This will interrupt the loop in `read_frames`
    // once it finished reading all frames currently "in flight" to the other end.
    stream.finish()?;

    // We're done with the connection and will wait for the other end to tell us
    // when it finished reading everything :)
    conn.closed().await;

    // Close both ends gracefully:
    send_ep.close().await;
    recv_router.shutdown().await?;

    Ok(())
}

async fn write_frame(stream: &mut SendStream, message: &str) -> anyhow::Result<()> {
    assert!(message.len() <= u8::MAX as usize);

    stream.write_u8(message.len() as u8).await?;
    stream.write_all(message.as_bytes()).await?;

    Ok(())
}

async fn read_frame(stream: &mut RecvStream) -> anyhow::Result<Option<String>> {
    let Ok(frame_len) = stream.read_u8().await else {
        return Ok(None);
    };

    let mut buf = vec![0u8; frame_len as usize];
    stream.read_exact(&mut buf).await?;

    let smol_msg = String::from_utf8(buf)?;
    Ok(Some(smol_msg))
}

#[derive(Debug, Clone)]
struct SmolMsgsProtocol;

impl ProtocolHandler for SmolMsgsProtocol {
    async fn accept(&self, connection: Connection) -> Result<(), AcceptError> {
        let mut stream = connection.accept_uni().await?;

        while let Some(msg) = read_frame(&mut stream)
            .await
            .map_err(anyhow::Error::into_boxed_dyn_error)?
        {
            println!("Got a smol message! {msg}");
        }

        println!("Done reading smol messages");
        connection.close(0u32.into(), b"thx for all the msgs :)");
        Ok(())
    }
}
