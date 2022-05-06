import { IModalAlert } from "../types"

import * as Styles from "./styles"

const ModalAlert = (props: IModalAlert) => {
    const handleDismiss = () => {
        document.getElementById("modal")?.remove();
    }

    return (
        <Styles.ButtonHolder>
            <Styles.Button onClick={handleDismiss}>{props.dismissButtonLabel || "OK"}</Styles.Button>
        </Styles.ButtonHolder>
    )
}

export default ModalAlert