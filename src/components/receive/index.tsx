import React, { useRef, useEffect } from "react"
import QRCode from "easyqrcodejs"
import Lunes from "../../assets/images/lunes-icon.png"
import Input from "../../components/textInput"
import * as Styles from "./styles"
import { getAddressFromStorage } from "../../services/lunes"
import { ButtonCancelTransparent, ButtonConfirm } from "../button"

import toastMessage from "../toast"

import { OperationContext } from "../../App"

function Receive() {
    const qrcode = useRef(null)
    const address = getAddressFromStorage()

    const { setOperation } = React.useContext(OperationContext)

    useEffect(() => {
        const options = {
            text: address,
            colorDark: "#000000",
            colorLight: "#ffffff",
            logo: Lunes
        }

        new QRCode(qrcode.current, options)
        return () => {
            if (qrcode.current) {
                qrcode.current.innerHTML = ""
            }
        }
    }, [address])

    function copyToClipboard() {
        toastMessage("Address copied to clipboard", "success")
        navigator.clipboard.writeText(address)
    }

    return (
        <Styles.Container>
            <Styles.CloseButton onClick={() => setOperation("")}>
                x
            </Styles.CloseButton>
            <Styles.ReceiveContainer>
                <Styles.Title>{`Your Lunes Address`}</Styles.Title>

                <Styles.QrCodeConainer
                    ref={qrcode}
                    onClick={() => copyToClipboard()}
                ></Styles.QrCodeConainer>
                <Input
                    value={address}
                    disabled={true}
                    style={{ width: "265px", margin: "0 auto 1rem" }}
                />

                <ButtonConfirm
                    label="Copy"
                    action={() => copyToClipboard()}
                    style={{ width: "263px", margin: "auto" }}
                />

                <ButtonCancelTransparent
                    label="Back"
                    action={() => setOperation("")}
                    style={{ margin: "0", width: "auto" }}
                />
            </Styles.ReceiveContainer>
        </Styles.Container>
    )
}

export default Receive
