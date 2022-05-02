import ModalAlert from "./ModalAlert"
import ModalConfirm from "./ModalConfirm"
import ModalPrompt from "./ModalPrompt"
import ModalPassword from "./ModalPassword"

const ModalContainer = (props: any) => {

    return (
        <div id="modal-container" className="modal-container">
            {
                props.appearance === "alert" ?
                    <ModalAlert {...props} /> :
                    props.appearance === "confirm" ?
                        <ModalConfirm {...props} /> :
                        props.appearance === "password" ?
                            <ModalPassword {...props} /> :
                            <ModalPrompt {...props} />
            }
        </div>
    )
}

export default ModalContainer