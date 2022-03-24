import React from "react"

import { HashRouter, Route, Routes } from "react-router-dom"

// Routes
import Home from "../pages/home"
import Seed from "../pages/seed"
import Password from "../pages/password"
import Advice from "../pages/advice"
import Welcome from "../pages/welcome"

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
