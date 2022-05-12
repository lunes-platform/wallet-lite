import ModalAlert from "./ModalAlert"
import ModalConfirm from "./ModalConfirm"
import ModalPrompt from "./ModalPrompt"
import ModalPassword from "./ModalPassword"

import * as Styles from "./styles"

const ModalContainer = (props: any) => {
    return (
        <Styles.Container>
            <Styles.Modal>
                <Styles.Headline>
                    {props.headline}
                </Styles.Headline>
                <Styles.Message>
                    {props.message}
                </Styles.Message>

                {
                    props.appearance === "alert" ?
                        <ModalAlert {...props} /> :
                        props.appearance === "confirm" ?
                            <ModalConfirm {...props} /> :
                            props.appearance === "password" ?
                                <ModalPassword {...props} /> :
                                <ModalPrompt {...props} />
                }



            </Styles.Modal>
        </Styles.Container>
    )
}

export default ModalContainer