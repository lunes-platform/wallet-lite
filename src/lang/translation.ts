import en from "./translations/en"
import pt from "./translations/pt"

export const locals = {
    pt,
    en
}

export const getLanguages = () => {
    const userLang = localStorage.getItem("LANGUAGE") || "en"
    const language = locals[userLang]
    return language
}

export const translate = getLanguages()

export const availabeLanguages = ["PT", "EN"]
