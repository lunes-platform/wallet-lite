import React from "react"

import { BrowserRouter, Route, Routes } from "react-router-dom"

// Routes
import Home from "../pages/home"
import Seed from "../pages/seed"
import Password from "../pages/password"
import Advice from "../pages/advice"

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/seed" element={<Seed />} />
                <Route path="/pass" element={<Password />} />
                <Route path="/advice" element={<Advice />} />
            </Routes>
        </BrowserRouter>
    )
}
