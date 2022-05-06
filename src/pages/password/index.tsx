import { useState } from "react"

import Button from "../../components/button"
import Logo from "../../assets/images/logo.svg"
import { InputTextHolder, TextInput } from "../../components/input"

import { encryptSha512 } from "../../services/cryptograpy"
import { translate } from "../../lang/translation"
import { useNavigate } from "react-router-dom"
import usePassword from "../../hooks/usePassword"

import * as Styles from "./styles"
import { Label } from "../../components/text"


export default function Password() {
    const { comparePasswords } = usePassword()
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")

    const navigate = useNavigate()

    const handlePassword = () => {
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

    return (
        <Styles.Container>
            <Styles.Column>
                <Styles.Logo src={Logo} alt="Logo" />
                <Styles.PasswordInputBox>
                    <InputTextHolder>
                        <Label>{translate.password.enterPassword.label}</Label>
                        <TextInput type={"password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder={translate.password.enterPassword.placeholder} />
                    </InputTextHolder>

                    <InputTextHolder>
                        <Label>{translate.password.confirmPassword.label}</Label>
                        <TextInput type={"password"} value={confirm} onChange={(event) => setConfirm(event.target.value)} placeholder={translate.password.confirmPassword.placeholder} />
                    </InputTextHolder>

                    <Button
                        label={translate.password.button}
                        variant="primary"
                        onClick={handlePassword}
                    />
                </Styles.PasswordInputBox>

                <Styles.TermsAdvice>
                    {translate.password.termsAdvice} <Styles.Link onClick={() => navigate("/terms")}>{translate.password.terms}</Styles.Link>
                </Styles.TermsAdvice>
            </Styles.Column>
        </Styles.Container>
    )
}