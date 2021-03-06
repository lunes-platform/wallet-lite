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

export const sendTransaction = async (
    payload: TransferPayload,
    password: string
): Promise<TransferResponse> => {
    return await lunes.API.Node.v1.assets.transfer(
        payload,
        decodeWallet(decryptAes(getSeedFromLocalStorage(), password)).keyPair
    )
}

export const getSeedFromLocalStorage = (): string => {
    const seed = localStorage.getItem("SEED")
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

export const getAssetsBalance = async (address: string) => {
    if (!address) {
        return
    }
    return axios
        .get(`https://lunesnode.lunes.io/assets/balance/${address}`)
        .then((response) => response.data.balances)
        .catch((error) => null)
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
