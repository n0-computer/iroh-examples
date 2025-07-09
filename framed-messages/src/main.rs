// a program that creates two endpoints & sends a ping between them
use anyhow::Result;
use iroh::{Endpoint, protocol::Router};
use n0_watcher::Watcher;

use framed_messages::{ALPN as ChessMovesALPN, ChessMoves, Move};

#[tokio::main]
async fn main() -> Result<()> {
    // create the receive side
    let recv_ep = Endpoint::builder().discovery_n0().bind().await?;
    let recv_router = Router::builder(recv_ep)
        .accept(ChessMovesALPN, ChessMoves::new())
        .spawn();
    let addr = recv_router.endpoint().node_addr().initialized().await?;

    // create a send side & send a ping
    let send_ep = Endpoint::builder().discovery_n0().bind().await?;
    let move_sender = ChessMoves::new();
    let mv = Move {
        from: (4, 2),
        to: (4, 4),
    };
    move_sender.send_move(&send_ep, addr, mv).await?;
    Ok(())
}
