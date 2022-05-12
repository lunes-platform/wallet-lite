
import LangSelector from "../../components/langSelector/index"
import Logo from "../../assets/images/logo.svg"

import * as Styles from "./styles"
import { ReactChild } from "react"

type HeaderProps = {
    rightSideComponent?: ReactChild
}

const Header = (props: HeaderProps) => {
    return (
        <Styles.Header>
            <Styles.Nav>
                <img src={Logo} alt="" />
                {props.rightSideComponent || <LangSelector />}
            </Styles.Nav>
        </Styles.Header>
    )
}


export default Header