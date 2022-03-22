import { ButtonConfirm } from "../../components/button"
import { useNavigate } from "react-router-dom"
import * as S from "./styles"

const Advice = () => {
    const navigate = useNavigate()
    return (
        <S.Container>
            <S.Title>Leia com atenção</S.Title>
            <S.Paragraph>
                Seed é um conjunto de palavras aleatórias usadas para gerar sua
                chave privada, a qual é usada para movimentar seu saldo. Nós{" "}
                <span>não armazenamos sua seed</span> nem sua senha. Caso você
                perca sua seed, não será mais possível recuperar seus fundos e
                eles serão perdidos para sempre.
            </S.Paragraph>

            <ButtonConfirm
                label="Compreendo e quero continuar"
                action={() => navigate("/pass")}
            />
        </S.Container>
    )
}

export default Advice
