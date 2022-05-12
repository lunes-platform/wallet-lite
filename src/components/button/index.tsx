
import { IButton } from "../types"

import * as Styles from "./styles"


const Button = (props: IButton) => {
    switch (props.variant) {
        case "primary":
            return <Styles.Primary onClick={props.onClick} >
                {props.label}
            </Styles.Primary>

        case "transparent":
            return <Styles.Transparent onClick={props.onClick} >
                {props.label}
            </Styles.Transparent>

        default:
            return <Styles.Primary onClick={props.onClick} >
                {props.label}
            </Styles.Primary>
    }
}

export default Button

