import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import Button from "../../../components/button"
import { HeaderBack } from "../../../components/header"
import { TextInput } from "../../../components/input"
import { addCustomNFT, getNativeNFTs } from "../../../services/nft"
import { ErrorMessage } from "../../../components/text"
import { getAssetDetails } from "../../../services/lunes"

const ImportNFT = () => {
    const navigate = useNavigate()
    const [assetId, setAssetId] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [nftDetails, setNftDetails] = useState<any>(null)
    const [type, setType] = useState<"native" | "ink">("native")

    const handleCheck = async () => {
        setLoading(true)
        setError("")
        setNftDetails(null)

        if (!assetId) {
            setError("Please enter an Asset ID")
            setLoading(false)
            return
        }

        // Only validating Native for now as Ink! requires ABI/Contract checks not fully mocked
        const details = await getAssetDetails(assetId)
        if (details && details.decimals === 0) { // Naive check for NFT
            setNftDetails({
                id: details.assetId,
                name: details.name,
                description: details.description,
                collection: "Custom Import",
                type: "native"
            })
        } else {
            setError("Asset not found or not an NFT (decimals must be 0)")
        }
        setLoading(false)
    }

    const handleImport = () => {
        if (nftDetails) {
            addCustomNFT(nftDetails)
            navigate("/") // Go back home to see NFT
        }
    }

    return (
        <Container>
            <HeaderBack title="Import NFT" onBack={() => navigate("/")} />

            <PaddingContainer>
                <Content>
                    {/* Future: Toggle for Ink! vs Native */}
                    {/* <TypeToggle>...</TypeToggle> */}

                    <Label>NFT Asset ID</Label>
                    <TextInput
                        placeholder="Enter Asset ID"
                        value={assetId}
                        onChange={(e: any) => setAssetId(e.target.value)}
                    />

                    {error && <ErrorMessage>{error}</ErrorMessage>}

                    {nftDetails && (
                        <DetailsBox>
                            <DetailRow>
                                <span>Name:</span>
                                <DetailValue>{nftDetails.name}</DetailValue>
                            </DetailRow>
                            <DetailRow>
                                <span>Collection:</span>
                                <DetailValue>{nftDetails.collection}</DetailValue>
                            </DetailRow>
                        </DetailsBox>
                    )}
                </Content>

                <ButtonHolder>
                    {!nftDetails ? (
                        <Button
                            label={loading ? "Checking..." : "Check NFT"}
                            variant="primary"
                            onClick={handleCheck}
                        />
                    ) : (
                        <Button
                            label="Add NFT"
                            variant="primary"
                            onClick={handleImport}
                        />
                    )}
                </ButtonHolder>
            </PaddingContainer>
        </Container>
    )
}

export default ImportNFT

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.background};
`

const PaddingContainer = styled.div`
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
`

const Content = styled.div`
    flex: 1;
    margin-top: 20px;
`

const Label = styled.label`
    display: block;
    color: ${({ theme }) => theme.colors.themeColors[100]};
    margin-bottom: 8px;
    font-size: 14px;
`

const DetailsBox = styled.div`
    margin-top: 20px;
    padding: 15px;
    background: ${({ theme }) => theme.colors.themeColors[600]};
    border-radius: 12px;
`

const DetailRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.themeColors[200]};
`

const DetailValue = styled.span`
    font-weight: bold;
    color: ${({ theme }) => theme.colors.themeColors[100]};
`

const ButtonHolder = styled.div`
    padding: 20px 0;
    margin-bottom: 20px;
    flex-shrink: 0;
`
