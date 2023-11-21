import { modalPassword } from "../../modal/core/modal"
import Button from "../../components/button"
import { useLocation } from "react-router-dom"

import * as Styles from "./styles"
import NavigationBar from "../../components/header/navigationBar"
import { translate } from "../../lang/translation"

import useTransaction from "../../hooks/useTransaction"
import { useEffect, useState } from "react"

const SendConfirmation = () => {
    const { makeTransaction, getCotation } = useTransaction()
    const location = useLocation()
    const state: any = location.state
    const [cotation, setCotation] = useState(0)

    const sendTransaction = (password: string) =>
        makeTransaction(
            state.selectedToken,
            Number(state.amount),
            state.receiverAddress,
            password
        )

    const confirmTransaction = () => {
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
            onConfirm: sendTransaction
        })
    }

    useEffect(() => {
        async function handleCotation() {
            const cotationFromApi = await getCotation(
                state.selectedToken?.assetId || "lunes"
            )
            if (typeof cotationFromApi === "number") {
                setCotation(cotationFromApi)
            }
        }

        handleCotation()
        // eslint-disable-next-line
    }, [getCotation])

    return (
        <Styles.SendConfirmContainer>
            <NavigationBar title={translate.send.navigationTitle} />
            <Styles.Hero>
                <Styles.PageTitle>
                    {translate.sendConfirm.pageTitle}
                </Styles.PageTitle>
                <Styles.SendInstructions>
                    {translate.sendConfirm.pageInstructions}
                </Styles.SendInstructions>
            </Styles.Hero>

            <Styles.SendContainer>
                <Styles.ConfirmationRows>
                    <Styles.AmountSpan>{`${translate.sendConfirm.amountOf} ${state.selectedToken.issueTransaction?.name}`}</Styles.AmountSpan>
                    <Styles.AmountSpan>{state.amount}</Styles.AmountSpan>
                </Styles.ConfirmationRows>

                {cotation > 0 && (
                    <Styles.ConfirmationRows>
                        <Styles.AmountSpan>Cotação</Styles.AmountSpan>
                        <Styles.AmountSpan>
                            {cotation.toFixed(2)}
                        </Styles.AmountSpan>
                    </Styles.ConfirmationRows>
                )}

                <Styles.ConfirmationRows>
                    <Styles.AmountSpan>{translate.send.fee}</Styles.AmountSpan>
                    <Styles.AmountSpan>{state.fee/100000000}</Styles.AmountSpan>
                </Styles.ConfirmationRows>

                <Styles.ConfirmationRows>
                    <Styles.AmountSpan>
                        {translate.send.receiver}
                    </Styles.AmountSpan>
                    <Styles.AmountSpan
                        style={{
                            display: "block" // Corrects text overflow
                        }}
                    >
                        {state.receiverAddress}
                    </Styles.AmountSpan>
                </Styles.ConfirmationRows>
            </Styles.SendContainer>

            <Styles.Hero>
                <Styles.InputRows>
                    <Styles.TotalLabel>{`${translate.sendConfirm.totalAmount}:`}</Styles.TotalLabel>
                    <Styles.TotalLabel>
                        {cotation > 0
                            ? (state.amount * cotation).toLocaleString(
                                  "pt-BR",
                                  { style: "currency", currency: "BRL" }
                              )
                            : (state.amount + (state.fee/100000000))}
                    </Styles.TotalLabel>
                </Styles.InputRows>
            </Styles.Hero>

            <Styles.ConfirmButtonContainer>
                <Button
                    label={translate.send.confirm}
                    variant="primary"
                    onClick={confirmTransaction}
                />
            </Styles.ConfirmButtonContainer>
        </Styles.SendConfirmContainer>
    )
}

export default SendConfirmation
