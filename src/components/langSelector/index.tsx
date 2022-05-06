import { availabeLanguages } from "../../lang/translation"
import * as Styles from "./styles"

const LangSelector = () => {
    return (
        <Styles.Select
            name="select-lang"
            id="lang"
            className="select"
            onChange={(event) => {
                localStorage.setItem("LANGUAGE", event.target.value.toUpperCase())
                window.location.reload()
            }}
            defaultValue={localStorage.getItem("LANGUAGE")?.toUpperCase() || "EN"}
        >
            {
                availabeLanguages.map((lang, index) => <option key={index}>{lang}</option>)
            }
        </Styles.Select>
    )
}

export default LangSelector