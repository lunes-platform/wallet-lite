

import { useState } from "react"
import { getNFTs } from "../services/lunesNightly"

const useNFT = () => {    
    const [NFTs, setListNFT] = useState<Array<Ntf>>([])
    const getNFTUser = async (listAddress:any = []) =>{
        setListNFT([])
        let ntfs = await getNFTs(listAddress)
    
        console.log("nftyuser", ntfs)
        setListNFT(ntfs)  
    } 
    return {       
        getNFTUser,
        NFTs,
        setListNFT
    }
}

export default useNFT
