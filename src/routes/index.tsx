import { HashRouter, Route, Routes } from "react-router-dom"
import React from "react"

// Routes
import Password from "../pages/password"
import Welcome from "../pages/welcome"
import Advice from "../pages/advice"
import Home from "../pages/home"
import Seed from "../pages/seed"

export default function Router() {
    return (
        <HashRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/seed" element={<Seed />} />
                <Route path="/pass" element={<Password />} />
                <Route path="/advice" element={<Advice />} />
                <Route path="/welcome" element={<Welcome />} />
            </Routes>
        </HashRouter>
    )
}
