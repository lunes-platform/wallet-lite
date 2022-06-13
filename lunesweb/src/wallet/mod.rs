use wasm_bindgen::prelude::wasm_bindgen;

pub mod assembly;

pub mod constants;

/// # Wallet Model
#[derive(Debug)]
#[wasm_bindgen(getter_with_clone)]
pub struct Wallet {
    pub seed: String,
    pub seed_len: u8,
    pub nonce: u32,
    pub chain: u8,
    pub private_key: String,
    pub public_key: String,
    pub address: String,
}
