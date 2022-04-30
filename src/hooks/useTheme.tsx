const useTheme = () => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    if (darkThemeMq.matches || localStorage.getItem("useDarkTheme")) {
        return "dark"
    }
    return "light"
}

export default useTheme