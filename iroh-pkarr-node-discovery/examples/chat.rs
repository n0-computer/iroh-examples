async fn chat_server() -> anyhow::Result<()> {

}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let mut args = std::env::args();
    if args.len() == 0 {
        chat_server().await?;
    } else {
        todo!()
    }
    Ok(())
}