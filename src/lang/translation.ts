import EN from "./translations/en"
import PT from "./translations/pt"

import { Translation } from "./translations/types"

export const locals = {
    PT,
    EN
}

type Locals = "EN" | "PT"

export const availabeLanguages: Locals[] = ["PT", "EN"]

const getLangFromLocalStorage = (): Locals => {
    let userLang: Locals = "EN"

    availabeLanguages.forEach((item) => {
        if (localStorage.getItem("LANGUAGE") === item) {
            userLang = item
        }
    })

    return userLang
}

export const getLanguages = (): Translation => {
    const language = locals[getLangFromLocalStorage()]

    return language
}

export const translate = getLanguages()
