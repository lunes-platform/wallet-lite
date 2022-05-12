import FaqBox from "./faqBox"
import { translate } from "../../lang/translation"

import * as Styles from "./styles"
import NavigationBar from "../../components/header/navigationBar"

const Terms = () => {
    return (
        <>
            <NavigationBar title={translate.terms.accessAccount} />
            <Styles.Container>
                <Styles.ContainerTerms>
                    {
                        translate.terms.faq.map((question, index) => {
                            return (
                                <FaqBox
                                    key={index}
                                    headline={question.headline}
                                    explanation={question.explanation}
                                />
                            )
                        })
                    }
                </Styles.ContainerTerms>
            </Styles.Container>
        </>
    )
}

export default Terms