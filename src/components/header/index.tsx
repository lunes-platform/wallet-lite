
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



export const HeaderBack = ({ title, onBack }: { title: string; onBack: () => void }) => {
    return (
        <Styles.Header>
            <Styles.Nav>
                <Styles.BackButton onClick={onBack}>
                    &larr;
                </Styles.BackButton>
                <Styles.Title>{title}</Styles.Title>
                <div style={{ width: 24 }}></div> {/* Spacer for alignment */}
            </Styles.Nav>
        </Styles.Header>
    )
}

export default Header