import React, { useState } from "react"

import { ThemeProvider } from "styled-components"
import { MainContainer, GlobalStyles } from "./styles/globalStyles"

import useTheme from "./hooks/useTheme"

import Router from "./routes"
import Navbar from "./components/navbar"
import Send from "./components/send"
import Receive from "./components/receive"

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
        </ThemeProvider>
    )
}

export default App
