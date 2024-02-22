import { TransferPayload } from "./types"
import { config } from "../config/lunes.config"
// Import
import { ApiPromise, WsProvider } from '@polkadot/api';
import { generateMnemonic } from "bip39"
import { decryptAes } from "./cryptograpy";
import { Keyring } from '@polkadot/api';
import { ContractPromise } from '@polkadot/api-contract'
import ABI from '../artifacts/lunesnft.json'

// Create a keyring instance
const keyring = new Keyring({ type: 'sr25519' });

const getApi = async () => {
    const userNetwork = localStorage.getItem("NETWORK")
    const network = userNetwork === "testnet" ? config.testnetNightly : config.mainnetNightly
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
        } else {
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
        let info = await api.tx.utility
            .batch(txs)
            .paymentInfo(keyPair);
        return info.partialFee.toNumber() + config.feeWallet;
    } catch (error) {
        return null
    }

}
const getGasLimit = (api: any) =>
api.registry.createType(
  'WeightV2',
  api.consts.system.blockWeights['maxBlock']
)

export const getNFTs = async (addressContract: any = []) => {
    try {
        if(!addressContract)
         return;
        const api = await getApi()
        const gasLimit: any = getGasLimit(api)
        let list_nft: any = []
       for (let i =0; i<addressContract.length; i++ ){
            let address_ = addressContract[i]
            const contract = new ContractPromise(api, ABI, address_);
            let adddressUser = getAddressFromStorage();
            const { output }: any = await contract.query['payableMintImpl::tokenAccount'](
                adddressUser,
                {
                    gasLimit,
                }, {
                page: "1",
            })
            
            if (output) {
                const nfts = output.toHuman()
                console.log(nfts)
                if(nfts?.Ok?.Ok){
                    for(let j=0; j<nfts?.Ok?.Ok.length;j++){
                        let nf = nfts?.Ok?.Ok[j]
                        let n = await getDetaisNFT(contract,nf.tokenId, api) as Ntf
                        if(n){
                            n.balance = nf.balance
                            n.addressContract = address_
                            console.log(n)
                            list_nft.push(n)
                        }                        
                    }
                }          
              }             
        };
        return list_nft
    } catch(error) {
        
        return []
    }
}
const getDetaisNFT = async (contract:any, tokenId:string, api:any) =>{
    try{
        const gasLimit: any = getGasLimit(api)
        const { output }: any = await contract.query['payableMintImpl::tokenDetails'](
            getAddressFromStorage(),
            {
              gasLimit,
            }, {
            tokenId,
            })
        const nft = output.toHuman()
        return nft?.Ok?.Ok    
    }catch{
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
export const decodeWallet = async (mnemonic: string): Promise<string> => {
    await getApi();
    const keyPair = keyring.addFromUri(mnemonic);
    return keyPair.address
}
export const getAssetsBalance = async (address: string) => { return null }

export const getLunesBalance = async (address: string): Promise<number> => {
    if (!address) {
        return 0
    }
    try {
        const api = await getApi();
        const dataRest: any = await api.query.system.account(address);
        return convertAmountLunes(dataRest.data.free.toHuman()) - convertAmountLunes(dataRest.data.feeFrozen.toHuman())
    } catch (error) {
        console.log(error)
        return 0
    }
}
const convertAmountLunes = (value: string) => {
    console.log(value)
    if(!value)
        return 0
    return Number(value.replaceAll(",", "").toString())
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
