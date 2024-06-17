use std::str::FromStr;

use iroh_net::{key::SecretKey, Endpoint};

// Wait for the endpoint to figure out its relay address.
pub async fn wait_for_relay(endpoint: &Endpoint) -> anyhow::Result<()> {
    while endpoint.my_relay().is_none() {
        tokio::time::sleep(std::time::Duration::from_millis(50)).await;
    }
    Ok(())
}

/// Get the secret key from a file or generate a new one.
pub fn get_or_create_secret() -> anyhow::Result<SecretKey> {
    if let Ok(secret) = std::env::var("SECRET") {
        let secret = SecretKey::from_str(&secret)?;
        Ok(secret)
    } else {
        // Generate a new secret key and print it to the console.
        // DON'T DO THIS IN PRODUCTION!
        let secret = SecretKey::generate();
        println!("Using SECRET={}", secret);
        println!("To keep the node id stable, set the SECRET environment variable");
        Ok(secret)
    }
}
