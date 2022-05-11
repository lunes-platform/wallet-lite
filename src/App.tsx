import Router from './routes';
import useTheme from './hooks/useTheme';

import { ThemeProvider } from "styled-components"

import { AppContext } from "./hooks/useContext"
import { useState } from 'react';

const App = () => {
    const theme = useTheme()
    const [selectedToken,
        setSelectedToken] = useState({
            balance: 0,
            issueTransaction: {
                name: "",
                decimals: 8
            }
        })

    return (
        <ThemeProvider theme={theme}>
            <AppContext.Provider value={{
                selectedToken,
                setSelectedToken
            }}>
                <Router />
            </AppContext.Provider>
        </ThemeProvider>
    )
}

export default App;