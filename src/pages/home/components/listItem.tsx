import { toBiggestCoinUnit } from "../../../utils/amountConverter"
import { getIcon } from "../../../utils/getIconUrl"

import ArrowRight from "../../../assets/images/icons/arrow-right.png"
import * as Styles from "../styles"

import { AppContext } from "../../../hooks/useContext"
import React from "react"
import { translate } from "../../../lang/translation"

type ListItemProps = {
    token: Token
    selectedToken?: boolean
}

const ListItem = (props: ListItemProps) => {
    const { setSelectedToken } = React.useContext(AppContext)
    return (
        <Styles.ListItem onClick={() => setSelectedToken({ ...props.token })}>
            <Styles.ListItemContainer>
                <Styles.ListItemCoinInfo>
                    <Styles.ListItemIcon
                        src={getIcon(props.token.issueTransaction?.name)}
                        alt="icon"
                    />
                    <Styles.ListItemCoinName>
                        <Styles.CoinName>
                            {props.token.issueTransaction?.name}
                        </Styles.CoinName>
                        <Styles.CoinBalance>
                            {toBiggestCoinUnit(
                                props.token.balance || 0,
                                props.token.issueTransaction?.decimals || 8
                            )}
                        </Styles.CoinBalance>
                    </Styles.ListItemCoinName>
                </Styles.ListItemCoinInfo>

                <Styles.ListItemCoinInfo>
                    <Styles.DefaultIcon
                        displayItem={props.selectedToken || false}
                    >
                        {translate.home.defaultIcon}
                    </Styles.DefaultIcon>
                    <Styles.ArrowRightIcon
                        src={ArrowRight}
                        alt="Select Token"
                    />
                </Styles.ListItemCoinInfo>
            </Styles.ListItemContainer>
        </Styles.ListItem>
    )
}

export default ListItem
