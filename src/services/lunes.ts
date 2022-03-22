import { create } from "lunes-js-api"
import axios from "axios"
import { TransferPayload, TransferResponse } from "../types/assets.d"
import { decryptAes } from "./cryptograpy"
import { generateMnemonic, validateMnemonic } from "bip39"

const config = {
    coinSymbol: "LUNES",
    coinName: "Lunes",
    apiUrl: "https://lunesnode.lunes.io",
    APICONFIG: {
        minimumSeedLength: 25,
        requestOffset: 0,
        requestLimit: 100,
        logLevel: "warning",
        timeDiff: 0,
        networkByte: "1".charCodeAt(0),
        nodeAddress: "https://lunesnode.lunes.io",
        matcherAddress: "https://lunesnode.lunes.io/matcher"
    }
}

const lunes = create(config.APICONFIG)

export const newSeed = () => {
    return { phrase: generateMnemonic() }
}

export const validateSeed = (seed: string): boolean => validateMnemonic(seed)

export const decodeWallet = (mnemonic: string) =>
    lunes.Seed.fromExistingPhrase(mnemonic)

export const sendLunes = async (
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
    return axios
        .get(`https://lunesnode.lunes.io/assets/balance/${address}`)
        .then((response) => response.data.balances)
        .catch((error) => console.error(error))
}

export const getLunesBalance = async (address: string) => {
    return axios
        .get(`https://lunesnode.lunes.io/addresses/balance/${address}`)
        .then((response) => response.data.balance)
        .catch((error) => console.error(error))
}

export const getAssetBalance = (address: string, assetId: string) => {
    return axios
        .get(`https://lunesnode.lunes.io/assets/balance/${address}/${assetId}`)
        .then((response) => response.data.balance)
        .catch((error) => console.error(error))
}
