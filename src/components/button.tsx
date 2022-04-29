
import { IButton } from "../types/components"

const Button = (props: IButton) => {
    return (
        <button onClick={props.onClick} className={`button-component ${props.variant}`}>
            {props.label}
        </button>
    )
}

export default Button