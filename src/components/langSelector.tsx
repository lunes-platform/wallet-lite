import { availabeLanguages } from "../lang/locals"

const LangSelector = () => {
    return (
        <select name="select-lang" id="lang" className="select">
            {
                availabeLanguages.map((lang, index) => <option key={index}>{lang}</option>)
            }
        </select>
    )
}

export default LangSelector