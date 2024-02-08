import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import Balance from "../../components/header/balance"
import ButtonsContainer from "./components/buttonsContainer"
import Header from "../../components/header"
import ListItem from "./components/listItem"
import Tabs from "./components/tabs"
import useSeed from "../../hooks/useSeed"

import { AppContext } from "../../hooks/useContext"
import { getLunesBalance, getNFTs } from "../../services/lunesNightly"

import * as Styles from "./styles"
import ListNFT from "./components/listNFT"
import Button from "../../components/button"
import { TextInput } from "../../components/input"



const Home = () => {
    const navigate = useNavigate()
    const { getAddress } = useSeed()
    const userAddress = getAddress()

    const [lunesBalance, setLunesBalance] = useState(0)
    const [balances, setBalances] = useState([])
    const { selectedToken, setSelectedToken } = React.useContext(AppContext)

    const [isNFT, setIsNFT] = useState(false)

    const [newAddress, setNewAddress] = useState("")
    const [fiedNewAddress, setFielAddress] = useState(false)

    //const { NFTs, getNFTUser, setListNFT } = useNFT()
    const [NFTs, setListNFT] = useState([])

    useEffect(() => {
        if (!userAddress) {
            navigate("/welcome")
            return
        }
    }, [userAddress, navigate])

    useEffect(() => {
        getBalances()
    }, [userAddress, lunesBalance, setSelectedToken])

    async function getBalances() {
        setLunesBalance(await getLunesBalance(userAddress))
        setSelectedToken({
            balance: lunesBalance,
            issueTransaction: {
                name: "Lunes",
                decimals: 8
            }
        })
    }
    const getNftContext = async () => {
        let addres_json = localStorage.getItem("address_contract")
        if (addres_json) {
            let address = JSON.parse(addres_json)
            let nfts_ = await getNFTs(address)
            console.log('nfts_',nfts_)
            if (nfts_)
                setListNFT(nfts_)    
        }
    }
    const handleAdressNft = () => {
        if (newAddress) {
            const { decodeAddress, encodeAddress } = require('@polkadot/keyring');
            const { hexToU8a, isHex } = require('@polkadot/util');
            const isValidAddressPolkadotAddress = () => {
                try {
                    encodeAddress(
                        isHex(newAddress)
                            ? hexToU8a(newAddress)
                            : decodeAddress(newAddress)
                    );

                    return true;
                } catch (error) {
                    return false;
                }
            };
            if (isValidAddressPolkadotAddress()) {
                let addres_json = localStorage.getItem("address_contract")
                let address:any = []
                if (addres_json) {
                    address = JSON.parse(addres_json) as []
                    
                }
                let findAddress = address.find((el:string)=>el == newAddress)
                if(!findAddress){
                    address.push(newAddress)
                    console.log("salve")
                    localStorage.setItem("address_contract", JSON.stringify(address))
                }
               
            }else
            {
                console.log("erro")
            }
            setNewAddress("")
            getNftContext()
        }
        setFielAddress(!fiedNewAddress)
        
    }
    const handleGetList = (typeList: number) => {
        if (typeList == 1) {
            getBalances()
        } else {
            getNftContext()
        }
        setIsNFT(typeList != 1)
    }

    /* const hdSair = () => {
         let confirm = window.confirm("Are you sure you want to exit? All data will be lost!")
         if (!confirm) return
         localStorage.clear()
         window.location.reload()
     }*/
    const getToken = () => {
        return (
            <>
                <ListItem
                    selectedToken={selectedToken.issueTransaction?.name === "Lunes"}
                    token={{
                        balance: lunesBalance,
                        issueTransaction: {
                            name: "Lunes",
                            decimals: 8
                        }
                    }} />
                {
                    balances.map((item: Token, index) => {
                        return <ListItem key={index} token={item} selectedToken={selectedToken.issueTransaction?.name === item?.issueTransaction?.name} />
                    })
                }
            </>
        )
    }
    const getNFT = () => {
        return (
            <>
                
                {fiedNewAddress ? (
                <>
                    <Button label="Save" variant="transparent" onClick={() =>handleAdressNft() } />
                    <TextInput
                        style={{textAlign:"center"}}
                        placeholder="Address Contract NFT"
                        value={newAddress}
                        autoFocus
                        onChange={(e) => setNewAddress(e.target.value)}
                        type={"text"}
                    />
                </> 
                ) : <><Button label="ADD NFT" variant="transparent" onClick={() => setFielAddress(!fiedNewAddress)} /></>}

                { NFTs.map((item: any, index) => <ListNFT key={index} nft={item} />)          }


            </>
        )
    }
    return (
        <Styles.Container>
            <Header rightSideComponent={<Balance />} />
            <Styles.TokenContainer>
                <Tabs clickTab={handleGetList} />
                <Styles.TabContent>
                    {isNFT ? (getNFT()) : (getToken())}
                </Styles.TabContent>

            </Styles.TokenContainer>

            <ButtonsContainer />
        </Styles.Container>
    )
}

export default Home