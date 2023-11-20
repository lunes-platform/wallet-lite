import React from "react"
import { AppContext } from "../../hooks/useContext"
import { translate } from "../../lang/translation"
import { toBiggestCoinUnit } from "../../utils/amountConverter"
import * as Styles from "./styles"

const Balance = () => {
    const { selectedToken } = React.useContext(AppContext)
    
    return (
        <Styles.BalanceGroup>
            <Styles.BalanceHeadline>{translate.balance.title}</Styles.BalanceHeadline>
            <Styles.BalanceAmount>{`${toBiggestCoinUnit(selectedToken.balance || 0, selectedToken.issueTransaction?.decimals || 8)} ${selectedToken.issueTransaction?.name?.toUpperCase()}`}</Styles.BalanceAmount>
        </Styles.BalanceGroup>
    )
}

export default Balance