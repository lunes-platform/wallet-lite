import Logo from "../../assets/images/logo.png"
import * as S from "./styles"

const Navbar = () => {
    return (
        <S.Container>
            <img src={Logo} alt="logo" />
        </S.Container>
    )
}

export default Navbar
