import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import Button from "../../../components/button"
import { HeaderBack } from "../../../components/header"
import { TextInput } from "../../../components/input"
import { addCustomToken, getAssetDetails } from "../../../services/lunes"
import { ErrorMessage } from "../../../components/text"

const ImportToken = () => {
    const navigate = useNavigate()
    const [assetId, setAssetId] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [assetDetails, setAssetDetails] = useState<any>(null)

    const handleCheck = async () => {
        setLoading(true)
        setError("")
        setAssetDetails(null)

        if (!assetId) {
            setError("Please enter an Asset ID")
            setLoading(false)
            return
        }

        const details = await getAssetDetails(assetId)
        if (details) {
            setAssetDetails(details)
        } else {
            setError("Asset not found or invalid ID")
        }
        setLoading(false)
    }

    const handleImport = () => {
        if (assetDetails) {
            addCustomToken(assetDetails.assetId)
            navigate("/tokens/manage")
        }
    }

    return (
        <Container>
            <HeaderBack title="Import Token" onBack={() => navigate("/tokens/manage")} />

            <PaddingContainer>
                <Content>
                    <Label>Asset ID / Contract Address</Label>
                    <TextInput
                        placeholder="Enter Asset ID or Contract Address"
                        value={assetId}
                        onChange={(e: any) => setAssetId(e.target.value)}
                    />
                    <HelperText>
                        For Lunes assets, enter the Asset ID. For custom tokens, enter the Contract Address.
                    </HelperText>

                    {error && <ErrorMessage>{error}</ErrorMessage>}

                    {assetDetails && (
                        <DetailsBox>
                            <DetailRow>
                                <span>Name:</span>
                                <DetailValue>{assetDetails.name}</DetailValue>
                            </DetailRow>
                            <DetailRow>
                                <span>Decimals:</span>
                                <DetailValue>{assetDetails.decimals}</DetailValue>
                            </DetailRow>
                            <DetailRow>
                                <span>Description:</span>
                                <DetailValue>{assetDetails.description}</DetailValue>
                            </DetailRow>
                        </DetailsBox>
                    )}
                </Content>

                <ButtonHolder>
                    {!assetDetails ? (
                        <Button
                            label={loading ? "Checking..." : "Check Asset"}
                            variant="primary"
                            onClick={handleCheck}
                        />
                    ) : (
                        <Button
                            label="Add Token"
                            variant="primary"
                            onClick={handleImport}
                        />
                    )}
                </ButtonHolder>
            </PaddingContainer>
        </Container>
    )
}

export default ImportToken

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
    
    &:last-child {
        margin-bottom: 0;
    }
`

const DetailValue = styled.span`
    font-weight: bold;
    color: ${({ theme }) => theme.colors.themeColors[100]};
    text-align: right;
    max-width: 70%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

const HelperText = styled.p`
    font-size: 12px;
    color: ${({ theme }) => theme.colors.neutral[500]};
    margin-top: 4px;
    margin-bottom: 12px;
`

const ButtonHolder = styled.div`
    padding: 20px 0;
    margin-bottom: 20px; /* Ensure space from bottom edge */
    flex-shrink: 0; /* Prevent shrinking if content is large */
`
