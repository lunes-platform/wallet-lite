import { useNavigate } from "react-router-dom"

import * as S from "./styles"
import { ButtonConfirm } from "../../components/button"

function Welcome() {
    const navigate = useNavigate()
    return (
        <S.Container>
            <S.CenterBox>
                <S.Title>Bem vindo!</S.Title>
                <S.Paragraph>
                    Clique em Continuar para adicionar sua <span>seed</span>
                </S.Paragraph>

                <ButtonConfirm
                    label="Continuar"
                    action={() => navigate("/advice")}
                />
            </S.CenterBox>
        </S.Container>
    )
}

export default Welcome
