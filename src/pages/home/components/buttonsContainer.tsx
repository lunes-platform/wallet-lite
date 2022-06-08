import IconSend from "../../../assets/images/icons/send.svg"
import IconReceive from "../../../assets/images/icons/receive.svg"
import IconExplorer from "../../../assets/images/icons/explorer.svg"
import IconSupport from "../../../assets/images/icons/support.svg"

import { useNavigate } from "react-router-dom"

import { translate } from "../../../lang/translation"
import useSeed from "../../../hooks/useSeed"

import * as Styles from "../styles"

const ButtonsContainer = () => {
    const { getAddress } = useSeed()
    const navigate = useNavigate()
    return (
        <Styles.ButtonsHolder>
            <Styles.Column>
                <Styles.Button onClick={() => navigate("/send")}>
                    <img src={IconSend} alt="Send" />
                </Styles.Button>
                <Styles.Label>{translate.home.send}</Styles.Label>
            </Styles.Column>

            <Styles.Column>
                <Styles.Button onClick={() => navigate("/receive")}>
                    <img src={IconReceive} alt="Send" />
                </Styles.Button>
                <Styles.Label>{translate.home.receive}</Styles.Label>
            </Styles.Column>

            <Styles.Column>
                <Styles.Button
                    onClick={() => {
                        window.open(
                            `https://blockexplorer.lunes.io/address/${getAddress()}`,
                            "_blank"
                        )
                    }}
                >
                    <img src={IconExplorer} alt="Send" />
                </Styles.Button>
                <Styles.Label>{translate.home.explorer}</Styles.Label>
            </Styles.Column>

            <Styles.Column>
                <Styles.Button
                    onClick={() => {
                        window.open(`mailto:suporte@lunes.io`, "_blank")
                    }}
                >
                    <img src={IconSupport} alt="Send" />
                </Styles.Button>
                <Styles.Label>{translate.home.support}</Styles.Label>
            </Styles.Column>
        </Styles.ButtonsHolder>
    )
}

export default ButtonsContainer
