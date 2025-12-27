import { translate } from "../lang/translation"
import { modalAlert } from "../modal/core/modal"
import { hashPassword, verifyPasswordHash } from "../services/secureCrypto"
import { setSecure, getSecure, STORAGE_KEYS } from "../services/secureStorage"

const usePassword = () => {
    const comparePasswords = async (password: string, confirmation: string): Promise<boolean> => {
        if (password !== confirmation) {
            modalAlert({
                headline: translate.attention,
                message: translate.password.passwordNotMatch
            })

            return false
        }
        await savePassword(password)
        return true
    }

    const savePassword = async (password: string): Promise<boolean> => {
        // Hash password using PBKDF2 before storing
        const hash = await hashPassword(password)
        await setSecure(STORAGE_KEYS.PASS, hash)
        return true
    }

    const verifyPassword = async (inputPassword: string): Promise<boolean> => {
        const storedHash = await getSecure(STORAGE_KEYS.PASS)
        if (!storedHash) return false
        return verifyPasswordHash(inputPassword, storedHash)
    }

    return {
        comparePasswords,
        verifyPassword
    }
}

export default usePassword
