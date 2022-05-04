import { useState } from "react"
import ValidatorIcon from "../../assets/images/icons/close-square.svg"
import Eye from "../../assets/images/icons/eye-slash.svg"
import { encryptSha512 } from "../../services/cryptograpy"
import "../index.css"
import { IModalPassword } from "../types"


const ModalPassword = (props: IModalPassword) => {
    const [fieldError, setFieldError] = useState("")
    const errorClass = fieldError ? "has-error" : ""
    const [text, setText] = useState("")
    const [hidde, setHidde] = useState(true)

    const handleConfirmAction = () => {
        if (encryptSha512(text) !== props.password) {
            setFieldError(props.options?.validationErrorMessage)
            return
        }

        props.onConfirm()
        handleDismiss()
    }

    const handleDismiss = () => {
        document.getElementById("modal")?.remove();
    }


    return (
        <div className="modal">
            <h2 className="headline">{props.headline}</h2>
            <p className="message">
                {props.message}
            </p>

            <div className="input-box">
                <input type={hidde ? "password" : "text"} placeholder="Digite sua senha" className={`input ${errorClass}`} onChange={(event) => setText(event.target.value)} />
                <button className="visibility-switch" onClick={() => setHidde(!hidde)}  >
                    <img src={Eye} alt="" />
                </button>
            </div>


            {fieldError && <div className="row field-validator">
                <img src={ValidatorIcon} alt="" />
                <small className="validator-text">{fieldError}</small>
            </div>}

            <div className="row button-holder">
                <button className="button" onClick={handleDismiss}>{props.dismissButtonLabel || "Cancel"}</button>
                <button className="button" onClick={handleConfirmAction}>{props.confirmButtonLabel || "Confirm"}</button>
            </div>
        </div>
    )
}

export default ModalPassword