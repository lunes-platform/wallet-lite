use std::vec;

use super::Wallet;
use crate::wallet::constants::word_list;
use wasm_bindgen::prelude::wasm_bindgen;
use lunesrs::wallet::assembly::{hidden_seed, to_private_key, to_public_key, to_address};
use lunesrs::utils::base58::{b58_to_vec, vec_to_b58};
use lunesrs::utils::random::random_triple_number;

#[wasm_bindgen]
impl Wallet {
    #[wasm_bindgen(js_name = "fromSeed")]
    pub fn from_seed(seed: String, nonce: Option<u32>, chain: Option<u8>) -> Wallet {
        let seed_len: u8 = seed.split(" ").collect::<Vec<&str>>().len() as u8;
        let nonce = nonce.unwrap_or(0);
        let chain = chain.unwrap_or(1);
        let seed_vec = hidden_seed(nonce, seed.clone());
        let private_key = to_private_key(seed_vec.clone());
        let public_key = to_public_key(private_key.clone());
        let address = to_address(1, chain, public_key.clone());

        Wallet {
            seed,
            seed_len,
            nonce,
            chain,
            private_key: vec_to_b58(private_key),
            public_key: vec_to_b58(public_key),
            address: vec_to_b58(address),
        }
    }

    #[wasm_bindgen(js_name = "newSeed")]
    pub fn new_seed(n_words: Option<u8>, nonce: Option<u32>, chain: Option<u8>) -> Wallet {
        let nonce = nonce.unwrap_or(0);
        let chain = chain.unwrap_or(1);
        let n_words = match n_words {
            Some(n) => n,
            None => 4,
        };
        let mut seed: Vec<String> = vec![];

        for _ in 0..=n_words {
            for n in random_triple_number() {
                seed.push(word_list()[n as usize].clone())
            }
        }

        Wallet::from_seed(seed.join(" "), Some(nonce), Some(chain))
    }

    #[wasm_bindgen(js_name = "fromPrivateKey")]
    pub fn from_private_key(private_key: String, chain: Option<u8>) -> Wallet {
        let chain = chain.unwrap_or(1);
        let public_key = to_public_key(b58_to_vec(private_key.clone()));
        let address = to_address(1, chain, public_key.clone());
        Wallet {
            seed: "".to_string(),
            seed_len: 0,
            nonce: 0,
            chain: chain,
            private_key: private_key,
            public_key: vec_to_b58(public_key),
            address: vec_to_b58(address),
        }
    }
}
