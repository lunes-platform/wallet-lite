declare module "*.png"
declare module "*.jpg"
declare module "*.jpeg"
declare module "*.svg"
declare module "*.json"

type Token = {
    assetId?: string
    balance: number
    reissuable?: boolean
    quantity?: number
    issueTransaction: {
        type?: number
        id?: string
        sender?: string
        senderPublicKey?: string
        fee?: number
        timestamp?: number
        signature?: string
        assetId?: string
        name?: string
        description?: string
        quantity?: number
        decimals: number
        reissuable?: boolean
    }
}

declare module "token" {
    export interface IToken {
        token: Token
    }
}
