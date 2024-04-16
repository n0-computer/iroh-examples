use extism_pdk::*;

#[host_fn]
extern "ExtismHost" {
    fn iroh_blob_get_ticket(ticket: String) -> Vec<u8>;
}

#[plugin_fn]
pub fn print_hai_and_get_ticket(ticket: String) -> FnResult<Vec<u8>> {
    println!("Hai from a wasm plugin!");
    let v = unsafe { iroh_blob_get_ticket(ticket) }?;
    Ok(v)
}
