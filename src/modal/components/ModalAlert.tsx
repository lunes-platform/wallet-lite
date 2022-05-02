import "../index.css"
import { IModalAlert } from "../types"


const ModalAlert = (props: IModalAlert) => {
    return (
        <div className="modal">
            <h2 className="headline">{props.headline}</h2>
            <p className="message">
                {props.message}
            </p>
            <div className="row button-holder">
                <button className="button" onClick={() => console.log("dismiss")}>OK</button>
            </div>
        </div>
    )
}

export default ModalAlert