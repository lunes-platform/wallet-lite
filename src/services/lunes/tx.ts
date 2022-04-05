import { transferTokenFactory } from "lunesjs/dist/client/transactions/transfer/service.transfer"


const tx = {
    signedAndSendTransferLunes: (senderPrivateKey: string,senderPublicKey: string, recipient: string, amount: number) => {
        const tx = transferTokenFactory(
            senderPublicKey,
            recipient,
            amount
        )
        tx.sign(senderPrivateKey)
        return tx.send()
    },
    signedAndSendTransferToken: (token: string, senderPrivateKey: string,senderPublicKey: string, recipient: string, amount: number) => {
        const tx = transferTokenFactory(
            senderPublicKey,
            recipient,
            amount,
            token
        )
        tx.sign(senderPrivateKey)
        return tx.send()
    },
}