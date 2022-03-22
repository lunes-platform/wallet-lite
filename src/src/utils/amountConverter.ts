export const toSmallerCoinUnit = (amount: number, decimals: number) =>
    amount * 10 ** decimals

export const toBiggestCoinUnit = (amount: number, decimals: number) =>
    amount / 10 ** decimals
