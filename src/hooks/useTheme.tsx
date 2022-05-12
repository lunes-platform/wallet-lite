import Theme from "../theme"

const useTheme = () => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    if (darkThemeMq.matches || localStorage.getItem("useDarkTheme")) {
        // return Theme.dark
        return Theme.light
    }
    return Theme.light
}

export default useTheme