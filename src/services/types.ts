export interface Asset {
    assetId: string
    balance: number
    issueTransaction: {
        assetId: string
        decimals: number
        description: string
        fee: number
        id: string
        name: string
        quantity: number
        reissuable: boolean
        sender: string
        senderPublicKey: string
        signature: string
        timestamp: number
        type: number
    }
    quantity: number
    reissuable: boolean
}

export interface TransferPayload {
    assetId: string
    amount: number
    fee: number
    recipient: string
}

export interface TransferResponse {
    type: number
    id: string
    sender: string
    senderPublicKey: string
    fee: number
    timestamp: number
    signature: string
    recipient: string
    assetId?: string
    amount: number
    feeAsset?: number
}
