import { HashRouter, Route, Routes } from "react-router-dom"

// Routes
import Home from "../pages/home"
import Password from "../pages/password"
import Receive from "../pages/receive"
import Seed from "../pages/seed"
import Send from "../pages/send"
import Welcome from "../pages/welcome"
import Terms from "../pages/terms"
import SendConfirmation from "../pages/send/sendConfirmation"
import NFTDetails from "../pages/nft/details"
import NFTSend from "../pages/nft/send"
import ManageTokens from "../pages/tokens/manage"
import ImportToken from "../pages/tokens/import"
import ImportNFT from "../pages/nft/import"

export default function Router() {
    return (
        <HashRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/password" element={<Password />} />
                <Route path="/receive" element={<Receive />} />
                <Route path="/seed" element={<Seed />} />
                <Route path="/send" element={<Send />} />
                <Route path="/send/confirmation" element={<SendConfirmation />} />
                <Route path="/nft-details" element={<NFTDetails />} />
                <Route path="/nft-send" element={<NFTSend />} />
                <Route path="/nft/import" element={<ImportNFT />} />
                <Route path="/tokens/manage" element={<ManageTokens />} />
                <Route path="/tokens/import" element={<ImportToken />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/welcome" element={<Welcome />} />
            </Routes>
        </HashRouter>
    )
}
