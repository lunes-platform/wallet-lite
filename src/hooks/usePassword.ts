const usePassword = () => {
    const comparePasswords = (password: string, confirmation: string) => {
        return password === confirmation
    }

    const savePassword = (password: string) => {
        localStorage.setItem("PASS", password)
        return true
    }

    return {
        comparePasswords,
        savePassword
    }
}

export default usePassword
