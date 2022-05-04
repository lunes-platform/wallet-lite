import { translate } from "../lang/translation"
import { modalAlert } from "../modal/core/modal"

const usePassword = () => {
    const comparePasswords = (password: string, confirmation: string) => {
        if (password !== confirmation) {
            modalAlert({
                headline: translate.attention,
                message: translate.password.passwordNotMatch
            })

            return false
        }
        savePassword(password)
        return true
    }

    const savePassword = (password: string) => {
        localStorage.setItem("PASS", password)
        return true
    }

    return {
        comparePasswords
    }
}

export default usePassword
