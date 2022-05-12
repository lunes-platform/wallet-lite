import { useEffect, useRef } from "react";

import Lunes from "../../assets/images/icons/lunes-qr-code.png"
import NavigationBar from "../../components/header/navigationBar";

import QRCode from "easyqrcodejs";
import { TextInput } from "../../components/input";
import { toast } from "react-toastify";
import { translate } from "../../lang/translation";
import useSeed from "../../hooks/useSeed";

import * as Styles from "./styles"

const Receive = () => {
    const qrcode: any = useRef(null)
    const { getAddress } = useSeed()

    useEffect(() => {
        function mountQrCode() {
            const options = {
                text: getAddress(),
                colorDark: "#000000",
                colorLight: "#ffffff",
                logo: Lunes,
                width: 201,
                height: 201
            }

            new QRCode(qrcode.current, options)
            return () => {
                if (qrcode.current) {
                    qrcode.current.innerHTML = ""
                }
            }
        }

        mountQrCode()
    }, [getAddress])


    function copyToClipboard() {
        navigator.clipboard.writeText(getAddress())

        toast("Copiado", {
            closeButton: false,
            hideProgressBar: true,
            className: "toast",
            style: {
                backgroundColor: "#D3E8D3",
                color: "#0E1F12",
                fontSize: "14px",
                padding: 0,
                minHeight: "auto",
                width: "77px",
                height: "32px"
            }
        })
    }

    return (
        <>
            <NavigationBar title={translate.receive.navigationTitle} />
            <Styles.Container>
                <Styles.Hero>
                    <Styles.PageTitle>
                        {translate.receive.pageTitle}
                    </Styles.PageTitle>
                    <Styles.ReceiveInstructions>
                        {translate.receive.instructions}
                    </Styles.ReceiveInstructions>
                </Styles.Hero>

                <Styles.Hero>
                    <Styles.QrCodeConainer
                        ref={qrcode}
                        onClick={() => copyToClipboard()}
                    ></Styles.QrCodeConainer>
                </Styles.Hero>


                <Styles.InputRows>
                    <TextInput value={getAddress()} onChange={() => { }} disabled />
                    <Styles.ButtonContainer>
                        <Styles.CopyButton label={translate.receive.copy} variant="primary" onClick={() => copyToClipboard()} />
                    </Styles.ButtonContainer>
                </Styles.InputRows>
            </Styles.Container>
        </>
    )
}

export default Receive;