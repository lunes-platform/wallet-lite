import { OperationContext } from "../../App"
import React, { useEffect, useState } from "react"
import { ButtonConfirm, ButtonCancelTransparent } from "../button/index"
import LunesIcon from "../../assets/images/lunes-icon.png"
import Input from "../textInput/index"
import * as S from "./styles"
import {
    toBiggestCoinUnit,
    toSmallerCoinUnit
} from "../../utils/amountConverter"

import {
    ModalAlert,
    ModalPassword,
    ModalTransferSucessful
} from "../modal/index"
import {
    getAddressFromStorage,
    getAssetBalance,
    getLunesBalance,
    sendLunes
} from "../../services/lunes"

type SendProps = {
    asset?: {
        assetId: string
        name: string
    }
    assetSymbol?: string
}

function Send(props: SendProps) {
    const { setOperation } = React.useContext(OperationContext)
    const [balance, setBalance] = useState(0)
    const [receiver, setReceiver] = useState("")
    const [amount, setAmount] = useState("")
    const [total, setTotal] = useState("")
    const [modal, setModal] = useState("")
    const fee = 100000

    const [txId, setTxId] = useState("")
    const [hasSendError, setHashSendError] = useState(false)
    const [errorText, setErrorText] = useState("")

    useEffect(() => {
        async function getBalance() {
            if (props.asset?.assetId) {
                setBalance(
                    toBiggestCoinUnit(
                        await getAssetBalance(
                            getAddressFromStorage(),
                            props.asset?.assetId
                        ),
                        8
                    )
                )
            } else {
                setBalance(
                    toBiggestCoinUnit(
                        await getLunesBalance(getAddressFromStorage()),
                        8
                    )
                )
            }
        }

        getBalance()
    }, [])

    useEffect(() => {
        if (props.asset?.assetId) {
            setTotal(Number(amount).toString())
        } else {
            setTotal((Number(amount) + toBiggestCoinUnit(fee, 8)).toString())
        }
    }, [amount])

    async function handleTransfer(password: string) {
        setModal("")
        const payload = {
            assetId: props?.asset?.assetId || "WAVES",
            amount: toSmallerCoinUnit(Number(amount), 8),
            fee,
            recipient: receiver
        }

        if (Number(amount) <= 0) {
            setHashSendError(true)
            setErrorText("O valor a enviar deve ser maior que 0")
            return
        }

        if (!receiver) {
            setHashSendError(true)
            setErrorText("Insira o endereço do destinatário")
            return
        }

        await sendLunes(payload, password)
            .then((response) => {
                setTxId(response.id)
            })
            .catch((error) => {
                setHashSendError(true)
                setErrorText(
                    "Erro ao efetuar transação. Verifique seu saldo e sua conexão de rede e tente novamente."
                )
            })
    }

    return (
        <S.Container>
            <S.CloseButton onClick={() => setOperation("")}>x</S.CloseButton>

            <S.SendContainer>
                <S.Icon src={LunesIcon} alt="Icon" />
                <S.Title>{`Send ${props?.asset?.name || "Lunes"}`}</S.Title>

                <Input
                    placeholderText="Receiver address"
                    value={receiver}
                    onChange={(event: any) => setReceiver(event.target.value)}
                />
                <Input
                    inputType="number"
                    placeholderText="Amount"
                    value={amount}
                    onChange={(event: any) => setAmount(event.target.value)}
                />

                <S.TransferDetails>
                    <S.Row>
                        <S.Label>Available balance</S.Label>
                        <S.Label>{`${balance} ${
                            props.asset?.name || "Lunes"
                        }`}</S.Label>
                    </S.Row>

                    <S.Row>
                        <S.Label>Fee</S.Label>
                        <S.Label>{`${toBiggestCoinUnit(
                            fee,
                            8
                        )} Lunes`}</S.Label>
                    </S.Row>

                    <S.Row>
                        <S.Label>Total: </S.Label>
                        <S.Label>{total}</S.Label>
                    </S.Row>
                </S.TransferDetails>

                <ButtonConfirm
                    action={() => setModal("password")}
                    label="Confirm"
                    style={{ width: "100%", margin: "1rem 0 0.5rem" }}
                />
                <ButtonCancelTransparent
                    action={() => setOperation("")}
                    label="Cancel"
                />
            </S.SendContainer>
            {txId && (
                <ModalTransferSucessful
                    onClose={() => {
                        setTxId("")
                        setOperation("")
                    }}
                    txId={txId}
                />
            )}

            {hasSendError && (
                <ModalAlert
                    buttonLabel="OK"
                    onClose={() => {
                        setHashSendError(false)
                        setErrorText("")
                    }}
                    text={errorText}
                    type={"error"}
                />
            )}

            {modal === "password" && (
                <ModalPassword
                    onClose={() => setModal("")}
                    onSuccess={(password: string) => handleTransfer(password)}
                />
            )}
        </S.Container>
    )
}

export default Send
