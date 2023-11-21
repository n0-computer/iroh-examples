//! Anything related to local IO, including logging, file formats, and file locations.
use std::{io::Write, path::Path};

use anyhow::Context;
use serde::{de::DeserializeOwned, Serialize};
use tracing_subscriber::{prelude::*, EnvFilter};

pub const CONFIG_DEFAULTS_FILE: &str = "config.defaults.toml";
pub const CONFIG_FILE: &str = "config.toml";
pub const SERVER_KEY_FILE: &str = "server.key";
pub const CLIENT_KEY_FILE: &str = "client.key";
pub const TRACKER_HOME_ENV_VAR: &str = "IROH_TRACKER_HOME";

pub fn save_to_file(data: impl Serialize, path: &Path) -> anyhow::Result<()> {
    let data_dir = path.parent().context("non absolute data file")?;
    let ext = path
        .extension()
        .context("no extension")?
        .to_str()
        .context("not utf8")?
        .to_ascii_lowercase();
    let mut temp = tempfile::NamedTempFile::new_in(data_dir)?;
    match ext.as_str() {
        "toml" => {
            let data = toml::to_string_pretty(&data)?;
            temp.write_all(data.as_bytes())?;
        }
        "json" => {
            let data = serde_json::to_string_pretty(&data)?;
            temp.write_all(data.as_bytes())?;
        }
        "postcard" => {
            let data = postcard::to_stdvec(&data)?;
            temp.write_all(&data)?;
        }
        _ => anyhow::bail!("unsupported extension"),
    }
    std::fs::rename(temp.into_temp_path(), path)?;
    Ok(())
}

pub fn load_from_file<T: DeserializeOwned + Default>(path: &Path) -> anyhow::Result<T> {
    anyhow::ensure!(path.is_absolute(), "non absolute data file");
    let ext = path
        .extension()
        .context("no extension")?
        .to_str()
        .context("not utf8")?
        .to_ascii_lowercase();
    if !path.exists() {
        return Ok(T::default());
    }
    match ext.as_str() {
        "toml" => {
            let data = std::fs::read_to_string(path)?;
            Ok(toml::from_str(&data)?)
        }
        "json" => {
            let data = std::fs::read_to_string(path)?;
            Ok(serde_json::from_str(&data)?)
        }
        "postcard" => {
            let data = std::fs::read(path)?;
            Ok(postcard::from_bytes(&data)?)
        }
        _ => anyhow::bail!("unsupported extension"),
    }
}

// set the RUST_LOG env var to one of {debug,info,warn} to see logging info
pub fn setup_logging() {
    tracing_subscriber::registry()
        .with(tracing_subscriber::fmt::layer().with_writer(std::io::stderr))
        .with(EnvFilter::from_default_env())
        .try_init()
        .ok();
}
