import { MainContainer, GlobalStyles } from "./styles/globalStyles"
import { ThemeProvider } from "styled-components"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Receive from "./components/receive"
import Navbar from "./components/navbar"
import React, { useState } from "react"
import useTheme from "./hooks/useTheme"
import Send from "./components/send"
import Router from "./routes"

const initialvalue: { setOperation: any; setAsset: any } = {
    setAsset: () => {},
    setOperation: () => {}
}

export const OperationContext = React.createContext(initialvalue)

function App() {
    const theme = useTheme()
    const [operation, setOperation] = useState("")
    const [asset, setAsset] = useState({
        name: "",
        assetId: ""
    })
    return (
        <ThemeProvider theme={theme}>
            <OperationContext.Provider
                value={{
                    setOperation,
                    setAsset
                }}
            >
                <MainContainer>
                    {operation === "send" && <Send asset={asset} />}
                    {operation === "receive" && <Receive />}
                    <Navbar />
                    <Router />
                    <GlobalStyles />
                </MainContainer>
            </OperationContext.Provider>
            <ToastContainer />
        </ThemeProvider>
    )
}

export default App
