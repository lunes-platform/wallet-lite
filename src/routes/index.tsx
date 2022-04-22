import { HashRouter, Route, Routes } from "react-router-dom"

// Routes
import Home from "../pages/home"

export default function Router() {
    return (
        <HashRouter>
            <Routes>
                <Route index element={<Home />} />
            </Routes>
        </HashRouter>
    )
}
