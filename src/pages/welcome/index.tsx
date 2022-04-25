
import LangSelector from "../../components/langSelector"
import Logo from "../../assets/images/logo.svg"

const Welcome = () => {
    return (

        <div className="header">
            <img src={Logo} alt="" />

            <LangSelector />
        </div>

    )
}

export default Welcome