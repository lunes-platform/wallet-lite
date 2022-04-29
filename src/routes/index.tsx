import { HashRouter, Route, Routes } from "react-router-dom"

// Routes
import Home from "../pages/home"
import Password from "../pages/password"
import Welcome from "../pages/welcome"

export default function Router() {
    return (
        <HashRouter>
            <Routes>
                <Route element={<Home />} />
                <Route index element={<Password />} />
                <Route element={<Welcome />} />
            </Routes>
        </HashRouter>
    )
}
