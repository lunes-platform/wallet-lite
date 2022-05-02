
import "../index.css"
import {
    IModalConfirm
} from "../types"


const ModalConfirm = (props: IModalConfirm) => {

    const handleConfirmAction = () => {
        props.onConfirm()
    }

    return (
        <div className="modal">
            <h2 className="headline">{props.headline}</h2>
            <p className="message">
                {props.message}
            </p>

            <div className="row button-holder">
                <button className="button">Cancelar</button>
                <button className="button" onClick={handleConfirmAction}>Finalizar</button>
            </div>
        </div>
    )
}

export default ModalConfirm