//! Options for the tracker
use std::{
    path::{Path, PathBuf},
    time::Duration,
};

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Options {
    // time after which an announce is considered stale
    #[serde(with = "serde_duration")]
    pub announce_timeout: Duration,

    // time after which a probe is considered stale
    #[serde(with = "serde_duration")]
    pub probe_timeout: Duration,

    // interval between probing peers
    #[serde(with = "serde_duration")]
    pub probe_interval: Duration,

    // max hash seq size in bytes
    pub max_hash_seq_size: u64,

    // log file for dial attempts
    pub dial_log: Option<PathBuf>,

    // log file for probe attempts
    pub probe_log: Option<PathBuf>,

    // binary database for announce data
    pub announce_data_path: PathBuf,

    /// Interval between DHT announces.
    ///
    /// The tracker will announce itself to the DHT for each hash it knows about
    /// every `dht_announce_interval` seconds. Setting this to a very low value
    /// risks getting throttled by the DHT.
    #[serde(with = "serde_duration")]
    pub dht_announce_interval: Duration,

    /// The quinn port to listen on. This is also the port that will be announced
    /// to the DHT. Set to 0 to listen on a random port.
    pub quinn_port: u16,

    /// The magic port to listen on. Set to 0 to listen on a random port.
    pub magic_port: u16,
}

impl Default for Options {
    fn default() -> Self {
        Self {
            announce_timeout: Duration::from_secs(60 * 60 * 12),
            probe_timeout: Duration::from_secs(30),
            probe_interval: Duration::from_secs(10),
            // max hash seq size is 16 * 1024 hashes of 32 bytes each
            max_hash_seq_size: 1024 * 16 * 32,
            dial_log: Some("dial.log".into()),
            probe_log: Some("probe.log".into()),
            announce_data_path: "announce.redb".into(),
            dht_announce_interval: Duration::from_secs(10),
            quinn_port: 0,
            magic_port: 0,
        }
    }
}

impl Options {
    /// Make the paths in the options relative to the given base path.
    pub fn make_paths_relative(&mut self, base: &Path) {
        if let Some(path) = &mut self.dial_log {
            *path = base.join(&path);
        }
        if let Some(path) = &mut self.probe_log {
            *path = base.join(&path);
        }
        self.announce_data_path = base.join(&self.announce_data_path);
    }
}
mod serde_duration {
    use super::*;
    use serde::de::Deserializer;
    use serde::ser::Serializer;

    pub fn serialize<S: Serializer>(duration: &Duration, serializer: S) -> Result<S::Ok, S::Error> {
        if serializer.is_human_readable() {
            serializer.serialize_str(humantime::Duration::from(*duration).to_string().as_str())
        } else {
            duration.serialize(serializer)
        }
    }

    pub fn deserialize<'de, D: Deserializer<'de>>(deserializer: D) -> Result<Duration, D::Error> {
        if deserializer.is_human_readable() {
            let s = String::deserialize(deserializer)?;
            humantime::parse_duration(&s).map_err(serde::de::Error::custom)
        } else {
            Duration::deserialize(deserializer)
        }
    }
}
