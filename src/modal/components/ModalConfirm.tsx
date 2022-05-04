
import "../index.css"
import {
    IModalConfirm
} from "../types"


const ModalConfirm = (props: IModalConfirm) => {
    const handleConfirmAction = () => {
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

            <div className="row button-holder">
                <button className="button" onClick={handleDismiss}>{props.dismissButtonLabel || "Cancel"}</button>
                <button className="button" onClick={handleConfirmAction}>{props.confirmButtonLabel || "Confirm"}</button>
            </div>
        </div>
    )
}

export default ModalConfirm