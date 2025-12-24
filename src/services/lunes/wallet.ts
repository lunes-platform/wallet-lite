const wasm = import("lunesweb")

const wallet = {
  newWallet: async () => {
    const x = (await wasm).hiddenSeed(0, "foi")
    console.warn("NOVA WALLET")
    console.warn(x)
  },
  fromSeed: (seed: string) => {
    console.warn(seed.toUpperCase())
  }
} 

export default wallet