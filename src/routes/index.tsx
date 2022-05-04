import { HashRouter, Route, Routes } from "react-router-dom"

// Routes
import Home from "../pages/home"
import Password from "../pages/password"
import Seed from "../pages/seed"
import Welcome from "../pages/welcome"
import Terms from "../pages/terms"

export default function Router() {
    return (
        <HashRouter>
            <Routes>
                <Route element={<Home />} />
                <Route path="/password" element={<Password />} />
                <Route index element={<Welcome />} />
                <Route path="/seed" element={<Seed />} />
                <Route path="/terms" element={<Terms />} />
            </Routes>
        </HashRouter>
    )
}
