import { create } from "lunes-js-api"
import axios from "axios"
import { TransferPayload, TransferResponse } from "./types"
import { decryptAes } from "./cryptograpy"
import { generateMnemonic, validateMnemonic } from "bip39"

import { config } from "../config/lunes.config"

const network = (): "mainnet" | "testnet" => {
    const userNetwork = localStorage.getItem("NETWORK")
    if (userNetwork === "testnet") {
        return userNetwork
    }

    return "mainnet"
}

const lunes = create(config[network()])

export const newSeed = () => {
    return { phrase: generateMnemonic() }
}

export const validateSeed = (seed: string): boolean => validateMnemonic(seed)

export const decodeWallet = (mnemonic: string) =>
    lunes.Seed.fromExistingPhrase(mnemonic)

export interface MassTransferPayload {
    transfers: Array<{ recipient: string; amount: number }>;
    assetId?: string;
    fee?: number;
    attachment?: string;
}

export const sendTransaction = async (
    payload: TransferPayload,
    password: string
): Promise<TransferResponse> => {
    return await lunes.API.Node.v1.assets.transfer(
        payload,
        decodeWallet(decryptAes(getSeedFromLocalStorage(), password)).keyPair
    )
}

export const sendMassTransfer = async (
    payload: MassTransferPayload,
    password: string
): Promise<TransferResponse> => {
    // @ts-ignore: massTransfer exists in runtime but might be missing in types
    return await lunes.API.Node.v1.assets.massTransfer(
        payload,
        decodeWallet(decryptAes(getSeedFromLocalStorage(), password)).keyPair
    )
}

export const getSeedFromLocalStorage = (): string => {
    // Synchronous access for compatibility - in future, refactor callers to be async
    const seed = localStorage.getItem("SEED")
    if (!seed) {
        throw new Error("User has not a seed")
    }
    return seed
}

export const getSeedFromSecureStorage = async (): Promise<string> => {
    const { getSecure, STORAGE_KEYS } = await import('./secureStorage')
    const seed = await getSecure(STORAGE_KEYS.SEED)
    if (!seed) {
        throw new Error("User has not a seed")
    }
    return seed
}

export const getEncryptedSeedFromStorageOrNull = (): string | null => {
    return localStorage.getItem("SEED")
}

export const getAddressFromStorage = () => {
    return localStorage.getItem("ADDRESS") || ""
}

export const getAddressFromSecureStorage = async (): Promise<string> => {
    const { getSecure, STORAGE_KEYS } = await import('./secureStorage')
    return await getSecure(STORAGE_KEYS.ADDRESS) || ""
}

export const getAssetsBalance = async (address: string) => {
    if (!address) {
        return
    }

    // 1. Fetch Standard Balances
    const balancesResponse = await axios
        .get(`https://lunesnode.lunes.io/assets/balance/${address}`)
        .then((response) => response.data.balances)
        .catch((error) => [])

    const apiBalances = balancesResponse || []

    // 2. Fetch Custom Tokens (that show up with 0 balance if not in apiBalances)
    const customTokens = getCustomTokens()
    const hiddenTokens = getHiddenTokens()

    const finalBalances = [...apiBalances]

    for (const assetId of customTokens) {
        // If not already in balances list, fetch details and add with 0 balance
        const exists = finalBalances.find((b: any) => b.assetId === assetId)
        if (!exists) {
            const details = await getAssetDetails(assetId)
            if (details) {
                finalBalances.push({
                    assetId: assetId,
                    balance: 0,
                    issueTransaction: {
                        name: details.name,
                        decimals: details.decimals,
                        description: details.description
                    }
                })
            }
        }
    }

    // 3. Filter Hidden Tokens
    return finalBalances.filter((t: any) => !hiddenTokens.includes(t.assetId))
}

export const getLunesBalance = async (address: string): Promise<number> => {
    if (!address) {
        return 0
    }
    return axios
        .get(`https://lunesnode.lunes.io/addresses/balance/${address}`)
        .then((response) => response.data.balance)
        .catch((error) => null)
}

export const getAssetBalance = async (address: string, assetId: string) => {
    if (!address) {
        return
    }

    try {
        const response = await axios.get(
            `https://lunesnode.lunes.io/assets/balance/${address}/${assetId}`
        )
        return response.data.balance
    } catch (error) {
        return null
    }
}
export const ValidateAddress = async (address: string) => {
    try {
        const response = await axios.get(
            `https://lunesnode.lunes.io/addresses/validate/${address}`
        )
        return response.data.valid
    } catch (error) {
        return error
    }
}

// Token Persistence Logic
export const getCustomTokens = (): string[] => {
    try {
        const stored = localStorage.getItem("CUSTOM_TOKENS")
        return stored ? JSON.parse(stored) : []
    } catch (e) {
        return []
    }
}

export const addCustomToken = (assetId: string) => {
    const tokens = getCustomTokens()
    if (!tokens.includes(assetId)) {
        tokens.push(assetId)
        localStorage.setItem("CUSTOM_TOKENS", JSON.stringify(tokens))
    }
}

export const removeCustomToken = (assetId: string) => {
    const tokens = getCustomTokens()
    const newTokens = tokens.filter(id => id !== assetId)
    localStorage.setItem("CUSTOM_TOKENS", JSON.stringify(newTokens))
}

export const getHiddenTokens = (): string[] => {
    try {
        const stored = localStorage.getItem("HIDDEN_TOKENS")
        return stored ? JSON.parse(stored) : []
    } catch (e) {
        return []
    }
}

export const toggleHiddenToken = (assetId: string) => {
    const hidden = getHiddenTokens()
    if (hidden.includes(assetId)) {
        // Unhide
        const newHidden = hidden.filter(id => id !== assetId)
        localStorage.setItem("HIDDEN_TOKENS", JSON.stringify(newHidden))
    } else {
        // Hide
        hidden.push(assetId)
        localStorage.setItem("HIDDEN_TOKENS", JSON.stringify(hidden))
    }
}

export const getAssetDetails = async (assetId: string) => {
    try {
        const response = await axios.get(
            `https://lunesnode.lunes.io/assets/details/${assetId}`
        )
        return response.data
    } catch (error) {
        return null
    }
}
