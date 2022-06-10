import { modalAlert } from "../modal/core/modal"
import { sendTransaction, ValidateAddress } from "../services/lunes"
import { toBiggestCoinUnit, toSmallerCoinUnit } from "../utils/amountConverter"

import { useNavigate } from "react-router-dom"
import { getCotationFromApi } from "../services/cotation"
import { translate } from "../lang/translation"

const useTransaction = () => {
    const navigate = useNavigate()
    const checkAddress = async (address: string) => {
        const isValidAddress = await ValidateAddress(address)
        return isValidAddress
    }

    const validateAmount = (selectedToken: Token, amount: number) => {
        if (Number(amount) <= 0) {
            modalAlert({
                headline: translate.hooks.useTransaction.invalidAmountHeadLine,
                message: translate.hooks.useTransaction.invalidAmountMessage
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
                headline:
                    translate.hooks.useTransaction.insufficientFundsHeadLine,
                message: translate.hooks.useTransaction.insufficientFundsMessage
            })
            return false
        }

        return true
    }

    const validateAddress = async (receiverAddress: string) => {
        if (!receiverAddress) {
            modalAlert({
                headline: translate.hooks.useTransaction.invalidAddressHeadLine,
                message: translate.hooks.useTransaction.invalidAddressMessage
            })
            return false
        }
        if (!(await checkAddress(receiverAddress))) {
            modalAlert({
                headline: translate.hooks.useTransaction.invalidAddressHeadLine,
                message: translate.hooks.useTransaction.invalidAddressMessage
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
        console.log(
            toSmallerCoinUnit(amount, selectedToken.issueTransaction.decimals)
        )

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
                headline: translate.hooks.useTransaction.successHeadLine,
                message: translate.hooks.useTransaction.successMessage
            })

            navigate("/")
        } else {
            modalAlert({
                headline: translate.hooks.useTransaction.failureHeadLine,
                message: translate.hooks.useTransaction.failureMessage
            })
        }
    }

    const getCotation = async (coin: string): Promise<number | null> => {
        return await getCotationFromApi(coin)
    }

    return {
        validateAmount,
        validateAddress,
        makeTransaction,
        getCotation
    }
}

export default useTransaction
