// a program that creates two endpoints & sends a ping between them
use iroh::{Endpoint, Watcher, protocol::Router};

use framed_messages::{ALPN as ChessMovesALPN, ChessProtocol, Move, framed::FramedBiStream};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // create the receive side
    let recv_ep = Endpoint::builder().discovery_n0().bind().await?;
    let recv_router = Router::builder(recv_ep)
        .accept(ChessMovesALPN, ChessProtocol)
        .spawn();
    let addr = recv_router.endpoint().node_addr().initialized().await;

    // create a send side & send a ping
    let send_ep = Endpoint::builder().discovery_n0().bind().await?;
    let conn = send_ep.connect(addr, ChessMovesALPN).await?;
    let bi_stream = conn.open_bi().await?;
    // We use the `FramedBiStream` to provide us message framing
    let mut stream = FramedBiStream::new(bi_stream);

    // make some moves
    white_moves(&mut stream).await?;

    // We're done with the connection:
    conn.close(0u32.into(), b"bye!");

    // Close gracefully:
    send_ep.close().await;
    recv_router.shutdown().await?;

    Ok(())
}

async fn white_moves(stream: &mut FramedBiStream) -> anyhow::Result<()> {
    let mv = Move {
        from: (4, 2),
        to: (4, 4),
    };
    mv.send(stream).await?;

    let mv = Move::recv(stream).await?;
    println!("received move: {mv:?}");

    let mv = Move {
        from: (3, 2),
        to: (3, 3),
    };
    mv.send(stream).await?;

    let mv = Move::recv(stream).await?;
    println!("received move: {mv:?}");

    Ok(())
}
