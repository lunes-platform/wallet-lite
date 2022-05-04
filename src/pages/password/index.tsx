import { useState } from "react"
import TextInput from "../../components/textInput"
import Logo from "../../assets/images/logo.svg"
import Button from "../../components/button"
import { translate } from "../../lang/translation"

import usePassword from "../../hooks/usePassword"

import { encryptSha512 } from "../../services/cryptograpy"
import { useNavigate } from "react-router-dom"

export default function Password() {
    const { comparePasswords } = usePassword()
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")

    const navigate = useNavigate()

    return (
        <div className="container-main d-flex flex-column align-center">
            <img src={Logo} alt="" className="password-logo " />

            <div className="password-input-box">
                <TextInput isPassword label={translate.password.enterPassword.label} value={password} onChange={value => setPassword(value)} placeholder={translate.password.enterPassword.placeholder} />
                <TextInput isPassword label={translate.password.confirmPassword.label} value={confirm} onChange={value => setConfirm(value)} placeholder={translate.password.confirmPassword.placeholder} />

                <Button
                    label={translate.password.button}
                    variant="primary"
                    onClick={() => {
                        if (!password || !confirm) {
                            return
                        }
                        if (comparePasswords(encryptSha512(password), encryptSha512(confirm))) {
                            navigate("/seed", {
                                state: {
                                    password: password
                                }
                            })
                        }
                    }
                    }
                />
            </div>

            <p className="text-center terms-advice">
                {translate.password.termsAdvice} <button onClick={() => navigate("/terms")}>{translate.password.terms}</button>
            </p>

        </div>
    )
}