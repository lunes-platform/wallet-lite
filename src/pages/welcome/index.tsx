import Button from "../../components/button"
import Header from "../../components/header"
import { Paragraph, QuoteParagraph, Headline } from "../../components/text"

import { translate } from "../../lang/translation"
import { useNavigate } from "react-router-dom"

import * as Styles from "./styles"

const Welcome = () => {
    const navigate = useNavigate()

    return (
        <Styles.Container>
            <Header />

            <Styles.Hero>
                <QuoteParagraph>
                    {translate.lunesWallet}
                </QuoteParagraph>

                <Headline>
                    {translate.welcome.hero.title}
                </Headline>

                <Paragraph>
                    {translate.welcome.hero.subtitle}
                </Paragraph>
            </Styles.Hero>

            <Styles.ButtonHold>
                <Button variant="primary" label={translate.welcome.button} onClick={() => navigate("/password")} />
            </Styles.ButtonHold>
        </Styles.Container>
    )
}

export default Welcome