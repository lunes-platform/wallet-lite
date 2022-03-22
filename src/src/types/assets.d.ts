export interface Asset {
    name: string
    symbol: string
    assetId: string
    iconUrl?: string
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
