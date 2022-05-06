
import LangSelector from "../../components/langSelector/index"
import Logo from "../../assets/images/logo.svg"

import * as Styles from "./styles"

const Header = () => {
    return (
        <Styles.Header>
            <Styles.Nav>
                <img src={Logo} alt="" />
                <LangSelector />
            </Styles.Nav>
        </Styles.Header>
    )
}


export default Header