use std::sync::Arc;

use anyhow::Result;
use iroh::{endpoint::RecvStream, protocol::{AcceptError, ProtocolHandler}};
use loro::{ExportMode, LoroDoc, UpdateOptions};
use n0_future::{FuturesUnorderedBounded, StreamExt};
use tokio::{select, sync::mpsc};

#[derive(Debug, Clone)]
pub struct IrohLoroProtocol {
    doc: Arc<LoroDoc>,
    sender: mpsc::Sender<String>,
}

impl IrohLoroProtocol {
    pub const ALPN: &'static [u8] = b"iroh/loro/1";

    pub fn new(doc: LoroDoc, sender: mpsc::Sender<String>) -> Self {
        Self {
            doc: Arc::new(doc),
            sender,
        }
    }

    pub fn update_doc(&self, new_doc: &str) -> Result<()> {
        println!(
            "📝 Local file changed. Updating doc... (length={})",
            new_doc.len()
        );
        let mut opts = UpdateOptions::default();
        if new_doc.len() > 50_000 {
            opts.use_refined_diff = false;
            self.doc.get_text("text").update_by_line(new_doc, opts)?;
        } else {
            self.doc.get_text("text").update(new_doc, opts)?;
        }
        self.doc.commit();
        println!("✅ Local update committed");

        Ok(())
    }

    pub async fn initiate_sync(&self, conn: iroh::endpoint::Connection) -> Result<()> {
        let (tx, rx) = async_channel::bounded(128);
        let _sub = self.doc.subscribe_local_update(Box::new(move |u| {
            tx.send_blocking(u.clone()).unwrap();
            true
        }));

        let sync = self.doc.export(ExportMode::all_updates())?;

        // Initial sync
        let mut stream = conn.open_uni().await?;
        stream.write_all(&sync).await?;
        stream.finish()?;

        const MAX_CONCURRENT_SYNCS: usize = 20;
        let mut running_syncs = FuturesUnorderedBounded::new(MAX_CONCURRENT_SYNCS);

        // Wait for changes & sync
        loop {
            select! {
                close = conn.closed() => {
                    println!("🔌 Peer disconnected: {close:?}");
                    return Ok(());
                },
                // Accept incoming messages via uni-direction streams, if we have capacities to handle them
                stream = conn.accept_uni(), if running_syncs.len() < running_syncs.capacity() => {
                    // capacity checked in precondition above
                    running_syncs.push(self.handle_sync_message(stream?));
                },
                // Work on current syncs
                Some(result) = running_syncs.next() => {
                    if let Err(e) = result {
                        eprintln!("Sync failed: {e}");
                    }
                }
                // Responses to local document changes
                msg = rx.recv() => {
                    let msg = msg?;
                    println!("📤 Sending update to peer (size={})", msg.len());
                    let mut stream = conn.open_uni().await?;
                    stream.write_all(&msg).await?;
                    stream.finish()?;
                    println!("✅ Successfully sent update to peer");
                }
            }
        }
    }

    async fn handle_sync_message(&self, mut stream: RecvStream) -> Result<()> {
        let msg = stream.read_to_end(10_000_000).await?; // 10 MB limit for now

        println!("📥 Received sync message from peer (size={})", msg.len());
        if let Err(e) = self.doc.import(&msg) {
            println!("❌ Failed to import sync message: {}", e);
        };
        println!("✅ Successfully imported sync message");

        self.sender
            .send(self.doc.get_text("text").to_string())
            .await?;

        println!("✅ Successfully sent update to local");

        Ok(())
    }
}

impl ProtocolHandler for IrohLoroProtocol {
    #[allow(refining_impl_trait)]
    fn accept(&self, conn: iroh::endpoint::Connection) -> n0_future::boxed::BoxFuture<Result<(), AcceptError>> {
        let this = self.clone();
        Box::pin(async move {
            println!("🔌 Peer connected");
            let result = this.initiate_sync(conn).await;
            println!("🔌 Peer disconnected");
            if let Err(e) = result {
                println!("❌ Error: {}", e);
                return Err(AcceptError::User { source: e.into() });
            }
            Ok(())
        })
    }
}
