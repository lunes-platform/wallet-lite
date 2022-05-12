import { useState } from "react"

import ValidatorIcon from "../../assets/images/icons/close-square.svg"

import { IModalPrompt } from "../types"

import * as Styles from "./styles"

const ModalPrompt = (props: IModalPrompt) => {
    const [fieldError, setFieldError] = useState("")
    const [text, setText] = useState("")

    const handleConfirmAction = () => {
        if (!text) {
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
                <Styles.Input hasError={fieldError ? true : false} type="text" placeholder="Digite sua senha" onChange={event => setText(event.target.value)} />
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

export default ModalPrompt