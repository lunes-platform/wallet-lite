import IconSend from "../../../assets/images/icons/send.svg"
import IconReceive from "../../../assets/images/icons/receive.svg"
import IconExplorer from "../../../assets/images/icons/explorer.svg"
import IconSupport from "../../../assets/images/icons/support.svg"

import { useNavigate } from "react-router-dom"

import { translate } from "../../../lang/translation"
import useSeed from "../../../hooks/useSeed"

import * as Styles from "../styles"
import { useEffect, useState } from "react"

const ButtonsContainer = () => {
    const { getAddress } = useSeed()
    const navigate = useNavigate()
    const [isTestNet, setIsTestNet] = useState(false)
    useEffect(() => {
        const userNetwork = localStorage.getItem("NETWORK")  
        if(userNetwork === "testnet"){
            setIsTestNet(true)
        }
        console.log(userNetwork)
    },[])
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
                            `https://explorer.lunes.io/${isTestNet?"Lunes-testnet":"Lunes-mainet"}/account/${getAddress()}`,
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
                        window.open(`mailto:support@lunes.io`, "_blank")
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
