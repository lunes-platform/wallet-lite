import "../index.css"
import { IModalAlert } from "../types"


const ModalAlert = (props: IModalAlert) => {
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
                <button className="button" onClick={handleDismiss}>{props.dismissButtonLabel || "OK"}</button>
            </div>
        </div>
    )
}

export default ModalAlert