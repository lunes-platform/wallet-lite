import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import Balance from "../../components/header/balance"
import ButtonsContainer from "./components/buttonsContainer"
import Header from "../../components/header"
import ListItem from "./components/listItem"
import Tabs from "./components/tabs"
import NFTList from "./components/nftList"
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
        // Check if user has both ADDRESS and SEED (both are required for a valid wallet)
        const hasSeed = localStorage.getItem("SEED");
        const hasAddress = localStorage.getItem("ADDRESS");

        if (!userAddress || !hasSeed || !hasAddress) {
            navigate("/welcome")
            return
        }
    }, [userAddress, navigate])


    useEffect(() => {
        async function getBalances() {
            if (!userAddress) return;

            const assetsResult = await getAssetsBalance(userAddress);
            const lunesResult = await getLunesBalance(userAddress);

            setBalances(assetsResult || []);
            setLunesBalance(lunesResult || 0);
            setSelectedToken({
                balance: lunesResult || 0,
                issueTransaction: {
                    name: "Lunes",
                    decimals: 8
                }
            });
        }
        getBalances();
    }, [userAddress, setSelectedToken])



    const [activeTab, setActiveTab] = useState<"tokens" | "nfts">("tokens")

    return (
        <Styles.Container>
            <Header rightSideComponent={<Balance />} />

            <Styles.TokenContainer>
                <Tabs activeTab={activeTab} onChange={setActiveTab} />
                <Styles.TabContent>
                    {activeTab === "tokens" ? (
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
                                (balances || []).map((item: Token, index) => {
                                    return <ListItem key={index} token={item} selectedToken={selectedToken.issueTransaction?.name === item?.issueTransaction?.name} />
                                })
                            }
                        </>
                    ) : (
                        <NFTList />
                    )}
                </Styles.TabContent>

            </Styles.TokenContainer>

            <ButtonsContainer />
        </Styles.Container>
    )
}

export default Home