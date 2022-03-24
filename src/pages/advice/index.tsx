import { ButtonConfirm } from "../../components/button"
import { useNavigate } from "react-router-dom"
import * as S from "./styles"

const Advice = () => {
    const navigate = useNavigate()
    return (
        <S.Container>
            <S.Title>Read with attention</S.Title>
            <S.Paragraph>
                Seed is a set of random words used to generate your private key,
                which is used to move your balance. We{" "}
                <span>do not storage your seed</span> or your password. If you
                lose your seed, it will no longer be possible to recover your
                funds and they will be lost forever.
            </S.Paragraph>

            <ButtonConfirm
                label="I understand and I want to continue"
                action={() => navigate("/pass")}
            />
        </S.Container>
    )
}

export default Advice
