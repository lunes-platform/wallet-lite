import { modalAlert } from "../modal/core/modal"
import { sendTransaction, sendMassTransfer, ValidateAddress, getLunesBalance } from "../services/lunes"
import { toBiggestCoinUnit, toSmallerCoinUnit } from "../utils/amountConverter"
import useSeed from "./useSeed"

import { useNavigate } from "react-router-dom"
import { getCotationFromApi } from "../services/cotation"
import { translate } from "../lang/translation"
import { calculateFeeSplit, TREASURY_ADDRESS, AFFILIATE_ADDRESS } from "../services/fees"

const useTransaction = () => {
    const navigate = useNavigate()
    const checkAddress = async (address: string) => {
        const isValidAddress = await ValidateAddress(address)
        return isValidAddress
    }

    const { getAddress } = useSeed()

    const validateAmount = async (selectedToken: Token, amount: number) => {
        if (Number(amount) <= 0) {
            modalAlert({
                headline: translate.hooks.useTransaction.invalidAmountHeadLine,
                message: translate.hooks.useTransaction.invalidAmountMessage
            })
            return false
        }

        const feeSplit = calculateFeeSplit()
        // Cost breakdown:
        // LUNES: Main (100k) + FeeBundle (50k * 3 receivers) = 250k fee + 15k transfer = 265k
        // TOKENS: Main (100k) + FeeBundle (200k) = 300k fee + 15k transfer = 315k

        let totalLunesNeeded = 0;
        const isLunes = !selectedToken.assetId || selectedToken.assetId === "WAVES"

        if (isLunes) {
            const amountSmall = toSmallerCoinUnit(amount, selectedToken.issueTransaction.decimals || 8)
            totalLunesNeeded = amountSmall + 265000 // 250k fees + 15k service

            if (totalLunesNeeded > selectedToken.balance) {
                modalAlert({
                    headline: translate.hooks.useTransaction.insufficientFundsHeadLine,
                    message: translate.hooks.useTransaction.insufficientFundsMessage
                })
                return false
            }
        } else {
            // Token transfer
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

            // Check LUNES balance for fees
            const address = getAddress()
            const lunesBalance = await getLunesBalance(address)

            // Total LUNES needed for token transfer: 300k fees + 15k service = 315000
            if (lunesBalance < 315000) {
                modalAlert({
                    headline: translate.hooks.useTransaction.insufficientFundsHeadLine,
                    message: `Insufficient LUNES to pay for fees. You need at least 0.00315 LUNES.`
                })
                return false
            }
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

        // Calculate fees
        const feeSplit = calculateFeeSplit()

        const isLunes = !selectedToken.assetId || selectedToken.assetId === "WAVES"

        let tx: any;

        if (isLunes) {
            // Use MassTransfer for efficiency (Save 50k fees)
            // Recipient + Team + Affiliate
            try {
                tx = await sendMassTransfer({
                    transfers: [
                        { recipient: toAddress, amount: toSmallerCoinUnit(amount, selectedToken.issueTransaction.decimals) },
                        { recipient: TREASURY_ADDRESS, amount: feeSplit.teamShare },
                        { recipient: AFFILIATE_ADDRESS, amount: feeSplit.affiliateShare }
                    ],
                    assetId: "WAVES",
                    fee: 250000, // 100000 + 50000 * 3
                }, password)
            } catch (e) {
                console.error("MassTransfer failed", e)
                tx = { error: e }
            }
        } else {
            // Token Transfer: Cannot bundle Fees (LUNES) with Token (Asset)
            // 1. Main Transaction
            tx = await sendTransaction(
                {
                    amount: toSmallerCoinUnit(
                        amount,
                        selectedToken.issueTransaction.decimals
                    ),
                    assetId: selectedToken.assetId || "WAVES",
                    fee: feeSplit.baseFee,
                    recipient: toAddress
                },
                password
            )

            // 2. Fees (Bundle Team + Affiliate using MassTransfer to keep code clean, though cost is same as 2 txs)
            if (tx.id) {
                try {
                    await sendMassTransfer({
                        transfers: [
                            { recipient: TREASURY_ADDRESS, amount: feeSplit.teamShare },
                            { recipient: AFFILIATE_ADDRESS, amount: feeSplit.affiliateShare }
                        ],
                        assetId: "WAVES",
                        fee: 200000, // 100000 + 50000 * 2
                    }, password)
                } catch (e) {
                    console.error("Failed to send fee distribution", e)
                }
            }
        }

        if (tx && tx.id) {
            modalAlert({
                headline: translate.hooks.useTransaction.successHeadLine,
                message: `${translate.hooks.useTransaction.successMessage}\n\nTxID: ${tx.id}`
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
