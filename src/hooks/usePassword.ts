import { translate } from "../lang/translation"
import { modalAlert } from "../modal/core/modal"
import { encryptSha512 } from "../services/cryptograpy"

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
        // Hash password before storing for security
        localStorage.setItem("PASS", encryptSha512(password))
        return true
    }

    const verifyPassword = (inputPassword: string): boolean => {
        const storedHash = localStorage.getItem("PASS")
        if (!storedHash) return false
        return encryptSha512(inputPassword) === storedHash
    }

    return {
        comparePasswords,
        verifyPassword
    }
}

export default usePassword

