import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import wallet from "../../services/lunes/wallet"

import Balance from "../../components/header/balance"
import ButtonsContainer from "./components/buttonsContainer"
import Header from "../../components/header"
import ListItem from "./components/listItem"
import Tabs from "./components/tabs"
import useSeed from "../../hooks/useSeed"

import { AppContext } from "../../hooks/useContext"
import { getAssetsBalance, getLunesBalance } from "../../services/lunes"

import * as Styles from "./styles"


const Home = () => {
    const navigate = useNavigate()
    const { getAddress } = useSeed()
    const userAddress = getAddress()

    const [lunesBalance, setLunesBalance] = useState(0)
    const [balances, setBalances] = useState([])
    const { selectedToken, setSelectedToken } = React.useContext(AppContext)

    useEffect(() => {
        if (!userAddress) {
            navigate("/welcome")
            return
        }
    }, [userAddress, navigate])

    useEffect(() => {
        async function getBalances() {
            setBalances(await getAssetsBalance(userAddress))
            setLunesBalance(await getLunesBalance(userAddress))
            setSelectedToken({
                balance: lunesBalance,
                issueTransaction: {
                    name: "Lunes",
                    decimals: 8
                }
            })
        }
        getBalances()
    }, [userAddress, lunesBalance, setSelectedToken])


    wallet.newWallet()
    wallet.fromSeed("foi mesmo")
    return (
        <Styles.Container>
            <Header rightSideComponent={<Balance />} />

            <Styles.TokenContainer>
                <Tabs />
                <Styles.TabContent>
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
                </Styles.TabContent>

            </Styles.TokenContainer>

            <ButtonsContainer />
        </Styles.Container>
    )
}

export default Home