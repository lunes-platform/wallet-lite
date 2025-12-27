import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { PageTitle } from "../../../components/text"
import Button from "../../../components/button"
import { getAssetsBalance, getHiddenTokens, toggleHiddenToken } from "../../../services/lunes"
import useSeed from "../../../hooks/useSeed"
import { HeaderBack } from "../../../components/header"

const ManageTokens = () => {
    const navigate = useNavigate()
    const { getAddress } = useSeed()
    const [tokens, setTokens] = useState<any[]>([])
    const [hiddenTokens, setHiddenTokens] = useState<string[]>([])

    const [error, setError] = useState("")

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        setError("")
        const address = getAddress()

        try {
            const currentHidden = getHiddenTokens()
            setHiddenTokens(currentHidden)

            const balances = await getAssetsBalance(address)
            setTokens(balances || [])
        } catch (e) {
            console.error(e)
            setError("Failed to load tokens. Please try again.")
        }
    }

    const handleToggle = (assetId: string) => {
        toggleHiddenToken(assetId)
        // Update local state to reflect change immediately if we want strictly responsive UI
        setHiddenTokens(getHiddenTokens())
    }

    return (
        <Container>
            <HeaderBack title="Manage Tokens" onBack={() => navigate("/")} />

            <PaddingContainer>
                <TokenList isEmpty={!error && tokens.length === 0}>
                    {error ? (
                        <EmptyState style={{ color: "red" }}>{error}</EmptyState>
                    ) : tokens.length === 0 ? (
                        <EmptyState>No tokens found</EmptyState>
                    ) : (
                        tokens.map((token: any) => (
                            <TokenItem key={token.assetId}>
                                <TokenInfo>
                                    <TokenName>{token.issueTransaction.name}</TokenName>
                                    <TokenId>{token.assetId.substring(0, 8)}...</TokenId>
                                </TokenInfo>
                                <Toggle
                                    active={!hiddenTokens.includes(token.assetId)}
                                    onClick={() => handleToggle(token.assetId)}
                                >
                                    {!hiddenTokens.includes(token.assetId) ? "Visible" : "Hidden"}
                                </Toggle>
                            </TokenItem>
                        ))
                    )}
                </TokenList>

                <ButtonHolder>
                    <Button
                        label="Import Token"
                        variant="primary"
                        onClick={() => navigate("/tokens/import")}
                    />
                </ButtonHolder>
            </PaddingContainer>
        </Container>
    )
}

export default ManageTokens

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
    overflow: hidden; 
`

const TokenList = styled.div<{ isEmpty?: boolean }>`
    flex: 1;
    overflow-y: auto;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    min-height: 0;
    ${({ isEmpty }) => isEmpty && `
        justify-content: center;
        align-items: center;
    `}
`

const EmptyState = styled.div`
    text-align: center;
    color: ${({ theme }) => theme.colors.neutral[500]};
    font-size: 14px;
`

const TokenItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background: ${({ theme }) => theme.colors.themeColors[600]};
    border-radius: 12px;
    margin-bottom: 10px;
`

const TokenInfo = styled.div`
    display: flex;
    flex-direction: column;
`

const TokenName = styled.span`
    font-weight: bold;
    color: ${({ theme }) => theme.colors.themeColors[100]};
`

const TokenId = styled.span`
    font-size: 12px;
    color: ${({ theme }) => theme.colors.neutral[500]};
`

const Toggle = styled.button<{ active: boolean }>`
    background: ${({ active, theme }) => active ? theme.colors.primary[500] : theme.colors.neutral[500]};
    color: white;
    border: none;
    padding: 5px 12px;
    border-radius: 16px;
    font-size: 12px;
    cursor: pointer;
`

const ButtonHolder = styled.div`
    padding: 20px 0;
    margin-bottom: 20px;
    flex-shrink: 0;
`
