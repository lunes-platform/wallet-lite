import Router from './routes';
import useTheme from './hooks/useTheme';

import { ThemeProvider } from "styled-components"

const App = () => {
    const theme = useTheme()

    return (
        <ThemeProvider theme={theme}>
            <Router />
        </ThemeProvider>
    )
}

export default App;