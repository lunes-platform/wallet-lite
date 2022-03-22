import { useRef, useEffect } from "react"
import QRCode from "easyqrcodejs"
import Lunes from "../../assets/images/lunes-icon.png"
import Input from "../../components/textInput"
import * as S from "./styles"
import { getAddressFromStorage } from "../../services/lunes"
import { ButtonConfirm } from "../button"

function Receive() {
    const qrcode = useRef(null)
    const address = getAddressFromStorage()

    useEffect(() => {
        const options = {
            text: address,
            width: 210,
            height: 210,
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
            <S.CloseButton>x</S.CloseButton>
            <S.ReceiveContainer>
                <S.Title>{`Seu endereço Lunes`}</S.Title>

                <S.QrCodeConainer ref={qrcode}></S.QrCodeConainer>
                <Input
                    value={address}
                    disabled={true}
                    style={{ width: "227px", margin: "0 auto 1rem" }}
                />

                <ButtonConfirm
                    label="Fechar"
                    action={() => console.log("fecha")}
                    style={{ width: "227px", margin: "auto" }}
                />
            </S.ReceiveContainer>
        </S.Container>
    )
}

export default Receive
