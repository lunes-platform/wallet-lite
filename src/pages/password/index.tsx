import { useState } from "react"
import TextInput from "../../components/textInput"
import Logo from "../../assets/images/logo.svg"
import Button from "../../components/button"
import { translate } from "../../lang/translation"

import { modalAlert, modalConfirm, modalPrompt } from "../../modal/core/modal"



export default function Password() {
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")






    return (
        <div className="container-main d-flex flex-column align-center">
            <img src={Logo} alt="" className="password-logo " />

            <div className="password-input-box">
                <TextInput isPassword label={translate.password.enterPassword.label} value={password} onChange={value => setPassword(value)} placeholder={translate.password.enterPassword.placeholder} />
                <TextInput isPassword label={translate.password.confirmPassword.label} value={confirm} onChange={value => setConfirm(value)} placeholder={translate.password.confirmPassword.placeholder} />

                <Button label={translate.password.button} variant="primary" onClick={() => {


                    const teste = modalPrompt(
                        {
                            headline: "teste",
                            message: "123",
                            options: {
                                validationErrorMessage: "Campo obrigatório"
                            },
                            onConfirm: texo => console.log(texo)
                        }

                    )

                    console.log(teste);





                }} />
            </div>


            <p className="text-center terms-advice">
                {translate.password.termsAdvice} <a href="/#">{translate.password.terms}</a>
            </p>

        </div>
    )
}