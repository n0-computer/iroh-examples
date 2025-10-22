use extism::*;

fn main() -> anyhow::Result<()> {
    let tokio_rt = tokio::runtime::Builder::new_multi_thread()
        .thread_name("main-runtime")
        .worker_threads(2)
        .enable_all()
        .build()?;
    let rt = tokio_rt.handle().clone();

    let ticket = std::env::args().nth(1).expect("missing ticket");

    let iroh = rt.block_on(async {
        let iroh_path = iroh_extism_host_functions::default_iroh_extism_data_root().await?;
        iroh_extism_host_functions::Iroh::new(iroh_path).await
    })?;
    println!("iroh endpoint id: {:?}", iroh.endpoint_id());

    let file = Wasm::file("../plugin/target/wasm32-unknown-unknown/debug/plugin.wasm");
    let manifest = Manifest::new([file]);

    let plugin = PluginBuilder::new(manifest).with_wasi(true);

    let mut plugin =
        iroh_extism_host_functions::add_all_host_functions(rt, plugin, iroh).build()?;

    let res = plugin
        .call::<&str, &str>("print_hai_and_get_ticket", &ticket)
        .unwrap();

    println!("Received iroh data:\n\n{res}");

    Ok(())
}
