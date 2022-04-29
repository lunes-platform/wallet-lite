
import LangSelector from "../../components/langSelector"
import Logo from "../../assets/images/logo.svg"
import Button from "../../components/button"

import { translate } from "../../lang/translation"

const Welcome = () => {

    return (
        <div className="welcome">
            <nav className="header">
                <div className="container-header">
                    <img src={Logo} alt="" />
                    <LangSelector />
                </div>
            </nav>

            <section className="hero">
                <p className="paragraph">
                    Lunes Wallet
                </p>
                <h1 className="title-h1">
                    {translate.welcome.hero.title}
                </h1>
                <p className="paragraph">
                    {translate.welcome.hero.subtitle}
                </p>
            </section>

            <div className="button-hold">
                <Button label={translate.welcome.button} variant="primary" onClick={() => console.log("click")} />
            </div>
        </div>

    )
}

export default Welcome