
use crate::node;

#[wasm_bindgen(start)]
fn start(){

    console_error_panic_hook::set_once();

    tracing_subscriber::fmt()
        .with_max_level(LevelFilter::TRACE)
        .with_writer(

            MakeConsoleWriter::default().map_trace_level_to(tracing::Level::DEBUG),

        )
        .without_time()
        .with_ansi(false)
        .init();
    
    tracing::info!("(testing logging) Logging setup");

}

#[wasm_bindgen]
pub struct EchoNode(node::EchoNode);


#[wasm_bindgen]
impl EchoNode {
    
    pub async fn spawn() -> Result<Self, JsError> {
        
        Ok(Self(node::EchoNode::s))
        
    }
    
}