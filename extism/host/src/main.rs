use extism::*;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let tokio_rt = tokio::runtime::Builder::new_multi_thread()
        .thread_name("main-runtime")
        .worker_threads(2)
        .enable_all()
        .build()?;
    let rt = tokio_rt.handle().clone();

    let iroh = rt.block_on(async {
        let iroh_path = iroh_extism_host_functions::default_iroh_extism_data_root().await?;
        iroh_extism_host_functions::create_iroh(iroh_path).await
    })?;
    println!("iroh node id: {:?}", iroh.node_id());

    let file = Wasm::file("../plugin/target/wasm32-unknown-unknown/debug/plugin.wasm");
    let manifest = Manifest::new([file]);

    let plugin = PluginBuilder::new(manifest)
        .with_wasi(true);

    let mut plugin = iroh_extism_host_functions::add_all_host_functions(rt, plugin, iroh)
        .build()?;

    let res = plugin
        .call::<&str, &str>("print_hai_and_get_ticket", "blobaaa54kekl2oa7yd5ro3u65kynwolq3h2msu65c3jfj44ja23fstmcajcnb2hi4dthixs65ltmuys2mjomrsxe4bonfzg62bonzsxi53pojvs4lydabefsibbyrlqbqfiirdmivybeyaeaqktotuaaaaaaaaaaaaqb7cvoah75ql4x2hvxaxxlgje2d7qy2avizyjb25pd4anc6c5ulvgpth5xq")
        .unwrap();

    println!("{}", res);

    Ok(())
}