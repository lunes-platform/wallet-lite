import { HashRouter, Route, Routes } from "react-router-dom"

// Routes
import Home from "../pages/home"
import Welcome from "../pages/welcome"

export default function Router() {
    return (
        <HashRouter>
            <Routes>
                <Route element={<Home />} />
                <Route index element={<Welcome />} />
            </Routes>
        </HashRouter>
    )
}
