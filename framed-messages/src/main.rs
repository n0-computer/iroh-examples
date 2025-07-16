// a program that creates two endpoints & sends a ping between them
use anyhow::Result;
use iroh::{Endpoint, protocol::Router};
use n0_watcher::Watcher;

use framed_messages::{ALPN as ChessMovesALPN, ChessProtocol, Move, framed::FramedBiStream};

#[tokio::main]
async fn main() -> Result<()> {
    // create the receive side
    let recv_ep = Endpoint::builder().discovery_n0().bind().await?;
    let recv_router = Router::builder(recv_ep)
        .accept(ChessMovesALPN, ChessProtocol)
        .spawn();
    let addr = recv_router.endpoint().node_addr().initialized().await?;

    // create a send side & send a ping
    let send_ep = Endpoint::builder().discovery_n0().bind().await?;
    let conn = send_ep.connect(addr, ChessMovesALPN).await?;
    let bi_stream = conn.open_bi().await?;
    // We use the `FramedBiStream` to provide us message framing
    let mut stream = FramedBiStream::new(bi_stream);
    let mv = Move {
        from: (4, 2),
        to: (4, 4),
    };
    mv.send(&mut stream).await?;

    let mv = Move::recv(&mut stream).await?;
    println!("received move: {mv:?}");

    // We're done with the connection:
    conn.close(0u32.into(), b"bye!");

    // Close gracefully:
    send_ep.close().await;
    recv_router.shutdown().await?;

    Ok(())
}
