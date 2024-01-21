//! A library for discovering content using the mainline DHT.
//!
//! This library contains the protocol for announcing and querying content, as
//! well as the client side implementation and a few helpers for p2p quinn
//! connections.
#[cfg(feature = "client")]
mod client;
pub mod protocol;
#[cfg(feature = "client")]
pub use client::*;
