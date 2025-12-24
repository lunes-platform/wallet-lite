// Copyright 2022 Developers of the Lunes Platform.
//
// Licensed under the Apache License, Version 2.0 <LICENSE-APACHE or
// https://www.apache.org/licenses/LICENSE-2.0> or the MIT license
// <LICENSE-MIT or https://opensource.org/licenses/MIT>, at your
// option. This file may not be copied, modified, or distributed
// except according to those terms.
//
//! # 📦 Lunes Web
//!
//! This crate is implemetations for manage Lunes Wallet with WebAssembly.
//! LunesWeb is one of the libraries that make up the Lunes SDK.
//!
//! ## ⚠️ Caution
//!
//! This repository is full of cryptography functions with some abstraction, be sure what you are doing
//!
//! ## 🔭 Telescope
//!
//! For the user guide and further documentation, please read
//! [Telescope](https://lunes-platform.github.io/telescope/)
//!
//! ## 🏗 Archtecture
//!
//! - **Wallet**
//!      - Wallet
//!


/// Struct Wallet - of Lunes Blockchain
pub mod wallet;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
