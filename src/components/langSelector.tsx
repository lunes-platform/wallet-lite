import { availabeLanguages } from "../lang/translation"

const LangSelector = () => {
    return (
        <select
            name="select-lang"
            id="lang"
            className="select"
            onChange={(event) => {
                localStorage.setItem("LANGUAGE", event.target.value.toLowerCase())
                window.location.reload()
            }}
            defaultValue={localStorage.getItem("LANGUAGE")?.toUpperCase() || "EN"}
        >
            {
                availabeLanguages.map((lang, index) => <option key={index}>{lang}</option>)
            }
        </select>
    )
}

export default LangSelector