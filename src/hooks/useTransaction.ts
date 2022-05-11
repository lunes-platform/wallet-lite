import { modalAlert } from "../modal/core/modal"
import { sendTransaction, ValidateAddress } from "../services/lunes"
import { toBiggestCoinUnit, toSmallerCoinUnit } from "../utils/amountConverter"

import { useNavigate } from "react-router-dom"

const useTransaction = () => {
    const navigate = useNavigate()
    const checkAddress = async (address: string) => {
        const isValidAddress = await ValidateAddress(address)
        return isValidAddress
    }

    const validateAmount = (selectedToken: Token, amount: number) => {
        if (Number(amount) <= 0) {
            modalAlert({
                headline: "Valor inválido",
                message: "O valor a ser enviado deve ser maior que zero"
            })
            return false
        }

        if (
            Number(amount) >
            toBiggestCoinUnit(
                selectedToken.balance,
                selectedToken.issueTransaction?.decimals
            )
        ) {
            modalAlert({
                headline: "Saldo insuficiente",
                message: "Você não tem saldo para completar esta transação"
            })
            return false
        }

        return true
    }

    const validateAddress = async (receiverAddress: string) => {
        if (!(await checkAddress(receiverAddress))) {
            modalAlert({
                headline: "Endereço inválido",
                message:
                    "O endereço digitado não corresponde a um endereço Lunes Válido"
            })

            return false
        }

        return true
    }

    const makeTransaction = async (
        selectedToken: Token,
        amount: number,
        toAddress: string,
        password: string
    ) => {
        const tx = await sendTransaction(
            {
                amount: toSmallerCoinUnit(
                    amount,
                    selectedToken.issueTransaction.decimals
                ),
                assetId: selectedToken.assetId || "WAVES",
                fee: 100000,
                recipient: toAddress
            },
            password
        )

        if (tx.id) {
            modalAlert({
                headline: "Sucesso!",
                message: "Sua transação foi realizada com sucesso"
            })

            navigate(-1)
        } else {
            modalAlert({
                headline: "Envio cancelado!",
                message:
                    "Falha ao fazer a transação. Verifique os dados de envio e senha."
            })
        }
    }

    return {
        validateAmount,
        validateAddress,
        makeTransaction
    }
}

export default useTransaction
