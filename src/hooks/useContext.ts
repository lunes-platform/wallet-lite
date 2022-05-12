import React from "react"

const initialContext: { selectedToken: Token; setSelectedToken: any } = {
    selectedToken: {
        balance: 0,
        issueTransaction: {
            decimals: 8
        }
    },
    setSelectedToken: () => {}
}

export const AppContext = React.createContext(initialContext)
