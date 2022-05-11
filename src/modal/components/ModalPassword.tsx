import { useState } from "react"

import { encryptSha512 } from "../../services/cryptograpy"
import Eye from "../../assets/images/icons/eye-slash.svg"
import ValidatorIcon from "../../assets/images/icons/close-square.svg"

import { IModalPassword } from "../types"

import * as Styles from "./styles"


const ModalPassword = (props: IModalPassword) => {
    const [fieldError, setFieldError] = useState("")
    const [text, setText] = useState("")
    const [hidde, setHidde] = useState(true)

    const handleConfirmAction = () => {
        if (encryptSha512(text) !== props.password) {
            setFieldError(props.options?.validationErrorMessage)
            return
        }

        props.onConfirm(text)
        handleDismiss()
    }

    const handleDismiss = () => {
        document.getElementById("modal")?.remove();
    }


    return (
        <>
            <Styles.InputBox>
                <Styles.Input type={hidde ? "password" : "text"} placeholder="Digite sua senha" hasError={fieldError ? true : false} onChange={(event) => setText(event.target.value)} />
                <Styles.VisibilitySwitch onClick={() => setHidde(!hidde)}  >
                    <img src={Eye} alt="" />
                </Styles.VisibilitySwitch>
            </Styles.InputBox>


            {fieldError && <Styles.FieldValidatorBox>
                <img src={ValidatorIcon} alt="" />
                <Styles.ValidatorText>{fieldError}</Styles.ValidatorText>
            </Styles.FieldValidatorBox>}

            <Styles.ButtonHolder>
                <Styles.Button onClick={handleDismiss}>{props.dismissButtonLabel || "Cancel"}</Styles.Button>
                <Styles.Button onClick={handleConfirmAction}>{props.confirmButtonLabel || "Confirm"}</Styles.Button>
            </Styles.ButtonHolder>
        </>
    )
}

export default ModalPassword