import { TransferPayload } from "./types"
import { config } from "../config/lunes.config"
// Import
import { ApiPromise, WsProvider } from '@polkadot/api';
import { generateMnemonic } from "bip39"
import { decryptAes } from "./cryptograpy";
import { Keyring } from '@polkadot/api';
// Create a keyring instance
const keyring = new Keyring({ type: 'sr25519' });

const getApi = async () => {
    const userNetwork = localStorage.getItem("NETWORK")
    const network = userNetwork === "testnet"?config.testnetNightly:config.mainnetNightly
    const wsProvider = new WsProvider(network);
    return await ApiPromise.create({ provider: wsProvider });
}
export const newSeed = () => {
    return { phrase: generateMnemonic() }
}
export const sendTransaction = async (
    payload: TransferPayload,
    password: string
) => {
    const api = await getApi();
    const seed = decryptAes(getSeedFromLocalStorage(), password).toString();
    try {
        const keyPair = keyring.addFromUri(seed);

        const txs = [
            api.tx.balances.transfer(payload.recipient, payload.amount),
            api.tx.balances.transfer(config.addressLunesFee, config.feeWallet)
          ];  
          // construct the batch and send the transactions
          let tx = await api.tx.utility
            .batch(txs)
            .signAndSend(keyPair);
            if (tx.hash.toHuman()) {
                console.log(`included in ${tx.hash.toHuman()}`);
                return tx.hash.toJSON();
              }else{
                  return null;
              }

           
    } catch (error) {
        return null;
    }
}

export const getFee = async (
    payload: TransferPayload,
    password: string
) => {
    try {        
        const api = await getApi();
        const seed = decryptAes(getSeedFromLocalStorage(), password).toString();
        const keyPair = keyring.addFromUri(seed);
        const txs = [
            api.tx.balances.transfer(payload.recipient, payload.amount),
            api.tx.balances.transfer(config.addressLunesFee, config.feeWallet)
          ];
        let info =  await api.tx.utility
            .batch(txs)
            .paymentInfo(keyPair);
        return info.partialFee.toNumber() + config.feeWallet;
    } catch (error) {
        return null
    }
 
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
export const decodeWallet = async (mnemonic: string):Promise<string> => {    
    await getApi();
    const keyPair = keyring.addFromUri(mnemonic);
    return keyPair.address
}
export const getAssetsBalance = async (address: string) => { return null}

export const getLunesBalance = async (address: string): Promise<number> => {
    if (!address) {
        return 0
    }
    try {        
        const api = await getApi();
        const dataRest:any = await api.query.system.account(address);        
        return dataRest.data.free.toNumber()
    } catch (error) {
        return 0
    }
}

export const getAssetBalance = async (address: string, assetId: string) => {
    if (!address) {
        return
    }

    return 0;
}
export const ValidateAddress = async (address: string) => {
    try {    
        const api = await getApi();
        await api.query.system.account(address);
        return true
    } catch (error) {
        return false
    }
}
