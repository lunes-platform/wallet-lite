import TitleBar from "../../components/titleBar"
import FaqBox from "./faqBox"
import { translate } from "../../lang/translation"

const Terms = () => {
    return (
        <>
            <TitleBar title={translate.terms.accessAccount} />
            <div className="container" style={{ padding: "18px" }}>
                <div className="container-terms">
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


                </div>
            </div>
        </>
    )
}

export default Terms