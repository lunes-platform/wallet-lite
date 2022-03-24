import React, { useRef, useEffect } from "react"
import QRCode from "easyqrcodejs"
import Lunes from "../../assets/images/lunes-icon.png"
import Input from "../../components/textInput"
import * as S from "./styles"
import { getAddressFromStorage } from "../../services/lunes"
import { ButtonCancelTransparent, ButtonConfirm } from "../button"

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

    return (
        <S.Container>
            <S.CloseButton onClick={() => setOperation("")}>x</S.CloseButton>
            <S.ReceiveContainer>
                <S.Title>{`Your Lunes Address`}</S.Title>

                <S.QrCodeConainer
                    ref={qrcode}
                    onClick={() =>
                        window.open(
                            `https://blockexplorer.lunes.io/address/${getAddressFromStorage()}`,
                            "_blank"
                        )
                    }
                ></S.QrCodeConainer>
                <Input
                    value={address}
                    disabled={true}
                    style={{ width: "100%", margin: "0 auto 1rem" }}
                />

                <ButtonConfirm
                    label="Close"
                    action={() => setOperation("")}
                    style={{ width: "227px", margin: "auto" }}
                />
            </S.ReceiveContainer>
        </S.Container>
    )
}

export default Receive
