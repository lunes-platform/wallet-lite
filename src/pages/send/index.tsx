import NavigationBar from "../../components/header/navigationBar";
import { InputTextHolder, TextInput } from "../../components/input"
import { Label } from "../../components/text";
import Button from "../../components/button"

import { AppContext } from "../../hooks/useContext"
import useTransaction from "../../hooks/useTransaction";

import * as Styles from "./styles"
import React, { useState } from "react";
import { modalPassword } from "../../modal/core/modal";
import { toBiggestCoinUnit } from "../../utils/amountConverter";
import { translate } from "../../lang/translation";

const Send = () => {
    const { validateAmount,
        validateAddress,
        makeTransaction
    } = useTransaction()
    const [amount, setAmount] = useState("")
    const [receiverAddress, setReceiverAddress] = useState("")
    const { selectedToken } = React.useContext(AppContext)

    const sendTransaction = (password: string) => makeTransaction(selectedToken, Number(amount), receiverAddress, password)

    const validateTransaction = async () => {
        if (!await validateAddress(receiverAddress) || !validateAmount(selectedToken, Number(amount))) {
            return
        }

        modalPassword({
            headline: "Digite sua senha",
            message: "Para realizar esta transação precisamos que você digite sua senha",
            password: localStorage.getItem("PASS") || "",
            options: {
                validationErrorMessage: "Senha inválida"
            },
            onConfirm: sendTransaction
        })
    }



    return (
        <>
            <NavigationBar title="Enviar" />
            <Styles.Container>
                <Styles.Hero>
                    <Styles.PageTitle>
                        {translate.send.pageTitle}
                    </Styles.PageTitle>
                    <Styles.SendInstructions>
                        {translate.send.instructions}
                    </Styles.SendInstructions>
                </Styles.Hero>

                <Styles.SendContainer>
                    <InputTextHolder>
                        <Label>{translate.send.receiverAddressLabel}</Label>
                        <TextInput placeholder={translate.send.receiverAddressPlaceholder} value={receiverAddress} onChange={event => setReceiverAddress(event.target.value)} />
                    </InputTextHolder>

                    <InputTextHolder>
                        <Styles.InputRows>
                            <Label>{translate.send.amountLabel}</Label>
                            <Styles.AmountSpan>{`${translate.send.available}: ${toBiggestCoinUnit(selectedToken.balance, selectedToken.issueTransaction.decimals)} ${selectedToken.issueTransaction?.name}`}</Styles.AmountSpan>
                        </Styles.InputRows>
                        <Styles.InputRows>
                            <TextInput placeholder={translate.send.amountPlaceholder} value={amount} onChange={event => setAmount(event.target.value)} />
                            <Styles.ButtonContainer>
                                <Button label="Max" variant="primary" onClick={() => setAmount((toBiggestCoinUnit(selectedToken.balance, selectedToken.issueTransaction.decimals) - 0.001).toString())} />
                            </Styles.ButtonContainer>
                        </Styles.InputRows>
                    </InputTextHolder>

                    <InputTextHolder>
                        <Styles.InputRows>
                            <Label>{translate.send.fee}</Label>
                            <Label>Lunes</Label>
                        </Styles.InputRows>
                        <Styles.FeeRow>
                            <Styles.AmountSpan>{translate.send.feeDescription}</Styles.AmountSpan>
                            <Styles.AmountSpan>0.001 Lunes</Styles.AmountSpan>
                        </Styles.FeeRow>
                    </InputTextHolder>
                </Styles.SendContainer>

                <Styles.ConfirmButtonContainer>
                    <Button label={translate.send.confirm} variant="primary" onClick={validateTransaction} />
                </Styles.ConfirmButtonContainer>
            </Styles.Container>
        </>
    )
}

export default Send;