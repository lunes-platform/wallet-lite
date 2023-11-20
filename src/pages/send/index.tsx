import NavigationBar from "../../components/header/navigationBar"
import { InputTextHolder, TextInput } from "../../components/input"
import { Label } from "../../components/text"
import Button from "../../components/button"

import { AppContext } from "../../hooks/useContext"
import useTransaction from "../../hooks/useTransaction"

import React, { useState } from "react"
import { toBiggestCoinUnit } from "../../utils/amountConverter"
import { translate } from "../../lang/translation"
import { useNavigate } from "react-router-dom"

import * as Styles from "./styles"
import { modalPassword } from "../../modal/core/modal"

const Send = () => {
    const { validateAmount, validateAddress, getEstimatedFee } = useTransaction()
    const navigate = useNavigate()
    const [amount, setAmount] = useState("")
    const [receiverAddress, setReceiverAddress] = useState("")
    const { selectedToken } = React.useContext(AppContext)

    const validateTransaction = async () => {
        if (
            !(await validateAddress(receiverAddress)) ||
            !validateAmount(selectedToken, Number(amount))
        ) {
            return
        }
        modalPassword({
            headline: translate.sendConfirm.modalPassword.headline,
            message: translate.sendConfirm.modalPassword.message,
            password: localStorage.getItem("PASS") || "",
            confirmButtonLabel: translate.modal.confirm,
            dismissButtonLabel: translate.modal.cancel,
            options: {
                validationErrorMessage:
                    translate.sendConfirm.modalPassword.errorMessage
            },
            onConfirm: async (password: string)  =>{
                let fee = await getEstimatedFee(selectedToken, Number(amount), receiverAddress, password)
                console.log(fee)
                navigate("/send/confirmation", {
                    state: {
                        selectedToken,
                        amount: Number(amount),
                        receiverAddress,
                        fee : fee
                    }
                })
            }
        })
        
    }

    return (
        <>
            <NavigationBar title={translate.send.navigationTitle} />
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
                        <TextInput
                            placeholder={
                                translate.send.receiverAddressPlaceholder
                            }
                            value={receiverAddress}
                            onChange={(event) =>
                                setReceiverAddress(event.target.value)
                            }
                        />
                    </InputTextHolder>

                    <InputTextHolder>
                        <Styles.InputRows>
                            <Label>{translate.send.amountLabel}</Label>
                            <Styles.AmountSpan style={{ display: "block" }}>{`${translate.send.available
                                }: ${toBiggestCoinUnit(
                                    selectedToken.balance,
                                    selectedToken.issueTransaction.decimals
                                )} ${selectedToken.issueTransaction?.name
                                }`}</Styles.AmountSpan>
                        </Styles.InputRows>
                        <Styles.InputRows>
                            <TextInput
                                placeholder={`${translate.send.amountPlaceholder} ${selectedToken.issueTransaction.name}`}
                                type="number"
                                min={0}
                                value={amount}
                                onChange={(event) =>
                                    setAmount(event.target.value)
                                }
                            />
                            <Styles.ButtonContainer>
                                <Button
                                    label="Max"
                                    variant="primary"
                                    onClick={() =>
                                        setAmount(
                                            (
                                                toBiggestCoinUnit(
                                                    selectedToken.balance,
                                                    selectedToken
                                                        .issueTransaction
                                                        .decimals
                                                )
                                            ).toString()
                                        )
                                    }
                                />
                            </Styles.ButtonContainer>
                        </Styles.InputRows>
                    </InputTextHolder>
                </Styles.SendContainer>

                <Styles.ConfirmButtonContainer>
                    <Button
                        label={translate.send.confirm}
                        variant="primary"
                        onClick={validateTransaction}
                    />
                </Styles.ConfirmButtonContainer>
            </Styles.Container>
        </>
    )
}

export default Send
