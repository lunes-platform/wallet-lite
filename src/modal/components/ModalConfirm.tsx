import { IModalConfirm } from "../types"

import * as Styles from "./styles"

const ModalConfirm = (props: IModalConfirm) => {
    const handleConfirmAction = () => {
        props.onConfirm()
        handleDismiss()
    }

    const handleDismiss = () => {
        document.getElementById("modal")?.remove();
    }

    return (
        <Styles.ButtonHolder>
            <Styles.Button className="button" onClick={handleDismiss}>{props.dismissButtonLabel || "Cancel"}</Styles.Button>
            <Styles.Button className="button" onClick={handleConfirmAction}>{props.confirmButtonLabel || "Confirm"}</Styles.Button>
        </Styles.ButtonHolder>
    )
}

export default ModalConfirm