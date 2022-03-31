import Receive from "../../assets/images/money-recive.png"
import Send from "../../assets/images/money-send.png"
import Explorer from "../../assets/images/explorer.png"

import LunesIcon from "../../assets/images/lunes-icon.png"

import { useNavigate } from "react-router-dom"

import * as S from "./styles"

import { OperationContext } from "../../App"
import React, { useEffect, useState } from "react"

import {
    getAddressFromStorage,
    getAssetsBalance,
    getEncryptedSeedFromStorageOrNull,
    getLunesBalance
} from "../../services/lunes"
import { toBiggestCoinUnit } from "../../utils/amountConverter"
import { getIcon } from "../../utils/getIconUrl"

// types
import { Asset } from "../../types/assets"

function Home() {
    const navigate = useNavigate()
    const address = getAddressFromStorage()
    const [balance, setBalance] = useState(0)
    const { setOperation, setAsset } = React.useContext(OperationContext)
    const [assetBalances, setAssetBalances] = useState([])

    const [selectedAsset, setSelectedAsset] = useState({
        issueTransaction: {
            name: "",
            assetId: ""
        }
    })

    useEffect(() => {
        const encrypted = getEncryptedSeedFromStorageOrNull()

        if (!encrypted || encrypted === null) {
            navigate("/welcome")
            return
        }

        async function getAssets() {
            setAssetBalances(await getAssetsBalance(address))
        }

        getAssets()

        handleLunesBalance()
    }, [])

    async function handleLunesBalance() {
        setBalance(toBiggestCoinUnit(await getLunesBalance(address), 8))
    }

    return (
        <S.Container>
            <S.BoxBalance>
                <S.LunesButton>
                    <img
                        src={
                            selectedAsset.issueTransaction.name
                                ? getIcon(selectedAsset.issueTransaction.name)
                                : LunesIcon
                        }
                        onClick={() => {
                            handleLunesBalance()
                            setAsset({})
                            setSelectedAsset({
                                issueTransaction: {
                                    name: "",
                                    assetId: ""
                                }
                            })
                        }}
                    />
                </S.LunesButton>

                <S.BalanceText>{`${balance} ${
                    selectedAsset.issueTransaction.name || "LUNES"
                }`}</S.BalanceText>
                {/* <S.CotationText>R$ 0,00</S.CotationText> */}
            </S.BoxBalance>

            <S.ButtonHolder>
                <S.ActionButton onClick={() => setOperation("receive")}>
                    <img src={Receive} alt="receive" />
                    <span>Receive</span>
                </S.ActionButton>
                <S.ActionButton onClick={() => setOperation("send")}>
                    <img src={Send} />
                    <span>Send</span>
                </S.ActionButton>
                <S.ActionButton
                    onClick={() =>
                        window.open(
                            "https://blockexplorer.lunes.io",
                            "_blanket"
                        )
                    }
                >
                    <img src={Explorer} />
                    <span>Explorer</span>
                </S.ActionButton>
            </S.ButtonHolder>

            <S.AssetsBox>
                {assetBalances.length > 0 && (
                    <S.AssetsTitle>Your tokens</S.AssetsTitle>
                )}
                <S.AssetButtonHolder>
                    {assetBalances.map((asset: Asset, index: number) => {
                        return (
                            <S.AssetButton
                                key={index}
                                onClick={() => {
                                    setSelectedAsset(asset)
                                    setAsset({
                                        name: asset.issueTransaction.name,
                                        assetId: asset.issueTransaction.assetId
                                    })
                                    setBalance(
                                        toBiggestCoinUnit(asset.balance, 8)
                                    )
                                }}
                            >
                                <img
                                    src={getIcon(asset.issueTransaction.name)}
                                />
                                <span>{asset.issueTransaction.name}</span>
                            </S.AssetButton>
                        )
                    })}
                </S.AssetButtonHolder>
            </S.AssetsBox>
        </S.Container>
    )
}

export default Home
