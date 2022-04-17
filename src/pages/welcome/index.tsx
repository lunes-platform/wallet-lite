import { ButtonConfirm } from "../../components/button"
import { useNavigate } from "react-router-dom"
import * as S from "./styles"

function Welcome() {
    const navigate = useNavigate()
    return (
        <S.Container>
            <S.CenterBox>
                <S.Title>Welcome!</S.Title>
                <S.Paragraph>
                    Click continue to add your <span>seed</span>
                </S.Paragraph>

                <ButtonConfirm
                    label="Continue"
                    action={() => navigate("/advice")}
                />
            </S.CenterBox>
        </S.Container>
    )
}

export default Welcome
