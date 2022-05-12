import Router from './routes';
import useTheme from './hooks/useTheme';

import { ThemeProvider } from "styled-components"

import { AppContext } from "./hooks/useContext"
import { useState } from 'react';

import { ToastContainer, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    const fadeInUp = cssTransition({
        enter: "animate__animated animate__fadeInUp",
        exit: "animate__animated animate__fadeInDown"
    });

    return (
        <ThemeProvider theme={theme}>
            <AppContext.Provider value={{
                selectedToken,
                setSelectedToken
            }}>
                <Router />
            </AppContext.Provider>
            <ToastContainer
                transition={fadeInUp}
                style={{
                    position: "absolute",
                    top: 450,
                    left: 0
                }} />
        </ThemeProvider>
    )
}

export default App;