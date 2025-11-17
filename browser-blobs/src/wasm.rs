use anyhow::Result;
use bytes::Bytes;
use iroh_blobs::{ticket::BlobTicket, Hash};
use js_sys::Uint8Array;
use tracing::level_filters::LevelFilter;
use tracing_subscriber_wasm::MakeConsoleWriter;
use wasm_bindgen::{prelude::wasm_bindgen, JsError};

#[wasm_bindgen(start)]
fn start() {
    console_error_panic_hook::set_once();

    tracing_subscriber::fmt()
        .with_max_level(LevelFilter::TRACE)
        .with_writer(
            // To avoide trace events in the browser from showing their JS backtrace
            MakeConsoleWriter::default().map_trace_level_to(tracing::Level::DEBUG),
        )
        // If we don't do this in the browser, we get a runtime error.
        .without_time()
        .with_ansi(false)
        .init();

    tracing::info!("(testing logging) Logging setup");
}

#[wasm_bindgen]
pub struct BlobsNode(crate::BlobsNode);

#[wasm_bindgen]
impl BlobsNode {
    pub async fn spawn() -> Result<Self, JsError> {
        Ok(Self(crate::BlobsNode::spawn().await.map_err(to_js_err)?))
    }

    pub fn endpoint_id(&self) -> String {
        self.0.endpoint_id().to_string()
    }

    pub async fn import(&self, data: Uint8Array) -> Result<String, JsError> {
        let data = uint8array_to_bytes(&data);
        tracing::info!("importing data of len {}", data.len());
        let ticket = self.0.import(data).await.map_err(to_js_err)?;
        Ok(ticket.to_string())
    }

    pub async fn download(&self, ticket: String) -> Result<String, JsError> {
        let ticket: BlobTicket = ticket.parse().map_err(to_js_err)?;
        let hash = self.0.download(ticket).await.map_err(to_js_err)?;
        Ok(hash.to_string())
    }

    pub async fn complete_size(&self, hash: String) -> Result<u64, JsError> {
        let hash: Hash = hash.parse().map_err(to_js_err)?;
        let size = self.0.complete_size(hash).await.map_err(to_js_err)?;
        Ok(size)
    }

    pub async fn get(&self, hash: String) -> Result<Uint8Array, JsError> {
        let hash: Hash = hash.parse().map_err(to_js_err)?;
        let bytes = self.0.blobs.get_bytes(hash).await?;
        Ok(bytes_to_uint8array(&bytes))
    }
}

fn to_js_err(err: impl Into<anyhow::Error>) -> JsError {
    let err: anyhow::Error = err.into();
    JsError::new(&err.to_string())
}

pub fn uint8array_to_bytes(data: &Uint8Array) -> Bytes {
    let mut buffer = vec![0u8; data.length() as usize];
    data.copy_to(&mut buffer[..]);
    Bytes::from(buffer)
}

pub fn bytes_to_uint8array(bytes: &[u8]) -> Uint8Array {
    // Create a Uint8Array with the same length
    let array = Uint8Array::new_with_length(bytes.len() as u32);
    // Copy the bytes into the JS Uint8Array
    array.copy_from(bytes);
    array
}
