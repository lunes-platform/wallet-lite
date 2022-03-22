import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { encryptAes } from "../../services/cryptograpy"

import { ButtonNeutral, ButtonConfirm } from "../../components/button/index"
import { ModalAlert } from "../../components/modal/index"

import { decodeWallet, newSeed, validateSeed } from "../../services/lunes"

import * as S from "./styles"

const Seed = () => {
    const navigate = useNavigate()
    const location: any = useLocation()
    const { password } = location.state
    const [modal, setModal] = useState("")
    const [seed, setSeed] = useState("")

    return (
        <S.Container>
            <S.InputSeedTitle>Digite sua seed</S.InputSeedTitle>
            <S.InputSeed
                rows={5}
                value={seed}
                onChange={(event) => setSeed(event.target.value)}
            />

            <S.ButtonHolder>
                <ButtonNeutral
                    action={() => {
                        const generated = newSeed()
                        setSeed(generated.phrase)
                    }}
                    label="Gerar nova"
                />
                <ButtonConfirm
                    action={() => {
                        if (!validateSeed(seed.trim())) {
                            setModal("seed-invalid")
                            return
                        }
                        localStorage.setItem(
                            "SEED",
                            encryptAes(seed.trim(), password)
                        )
                        localStorage.setItem(
                            "ADDRESS",
                            decodeWallet(seed.trim()).address
                        )
                        setModal("confirm")
                    }}
                    label="Validar"
                />
            </S.ButtonHolder>

            {modal === "confirm" && (
                <ModalAlert
                    text="Sua seed foi adicionada com sucesso!"
                    type="success"
                    buttonLabel="Continuar"
                    onClose={() => {
                        setModal("")
                        navigate("/")
                    }}
                />
            )}

            {modal === "seed-invalid" && (
                <ModalAlert
                    text="A seed digitada é inválida"
                    type="error"
                    buttonLabel="Tentar de novo"
                    onClose={() => {
                        setModal("")
                    }}
                />
            )}
        </S.Container>
    )
}

export default Seed
