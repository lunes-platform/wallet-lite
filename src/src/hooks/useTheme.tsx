import Theme from "../styles/index"

const userPreferences = () => {
    return {
        theme: "dark"
    }
}

const useTheme = () => {
    const preferences = userPreferences()
    return Theme[preferences.theme === "dark" ? "dark" : "light"]
}

export default useTheme
