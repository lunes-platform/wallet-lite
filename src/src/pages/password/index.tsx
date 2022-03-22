import TextInput from "../../components/textInput"
import { ButtonConfirm } from "../../components/button/index"

import * as S from "./styles"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { ModalAlert } from "../../components/modal"
import { encryptSha512 } from "../../services/cryptograpy"

const Pass = () => {
    const navigate = useNavigate()

    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [hasError, setHasError] = useState(false)

    function handlePassword() {
        if (!newPassword || !confirmPassword) {
            setHasError(true)
            return
        }
        if (newPassword !== confirmPassword) {
            setHasError(true)
            return
        }

        localStorage.setItem("wallet_key", encryptSha512(newPassword))
        navigate("/seed", {
            state: {
                password: newPassword
            }
        })
    }

    return (
        <S.Container>
            <S.Title>Senha</S.Title>
            <S.InputHolder>
                <TextInput
                    labelText="Escolha uma senha"
                    inputType="password"
                    onChange={(event: any) =>
                        setNewPassword(event.target.value)
                    }
                />
                <TextInput
                    labelText="Redigite sua senha"
                    inputType="password"
                    onChange={(event: any) =>
                        setConfirmPassword(event.target.value)
                    }
                />
                <ButtonConfirm
                    label="Continuar"
                    action={() => handlePassword()}
                />
            </S.InputHolder>

            {hasError && (
                <ModalAlert
                    text="As senhas não coincidem"
                    type="error"
                    buttonLabel="OK"
                    onClose={() => setHasError(false)}
                />
            )}
        </S.Container>
    )
}

export default Pass
