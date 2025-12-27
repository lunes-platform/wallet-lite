import styled from "styled-components"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllNFTs, NFT } from "../../../services/nft"
import useSeed from "../../../hooks/useSeed"

const Container = styled.div`
  width: 100%;
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  overflow-y: auto;
  max-height: 400px;
  
  /* Hide scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }
`

const NFTCard = styled.div`
  background: ${({ theme }) => theme.colors.themeColors[700]};
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border: 1px solid transparent;

  &:hover {
     border-color: ${({ theme }) => theme.colors.themeColors[600]};
  }
`

const NFTImage = styled.div<{ src?: string }>`
  width: 100%;
  height: 140px;
  background-color: ${({ theme }) => theme.colors.themeColors[600]};
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
`

const NFTInfo = styled.div`
  padding: 12px;
`

const NFTName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.themeColors[100]};
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const NFTCollection = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.themeColors[400]};
`

const LoadingText = styled.div`
    color: ${({ theme }) => theme.colors.themeColors[400]};
    text-align: center;
    grid-column: span 2;
    margin-top: 20px;
`

const NFTList = () => {
  const { getAddress } = useSeed()
  const address = getAddress()
  const [nfts, setNfts] = useState<NFT[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!address) return
      setLoading(true)
      try {
        const data = await getAllNFTs(address)
        setNfts(data)
      } catch (error) {
        console.error("Error fetching NFTs", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNFTs()
  }, [address])

  if (loading) {
    return (
      <Container>
        <LoadingText>Carregando NFTs...</LoadingText>
      </Container>
    )
  }

  if (nfts.length === 0) {
    return (
      <Container>
        <LoadingText>Nenhum NFT encontrado.</LoadingText>
      </Container>
    )
  }

  return (
    <Container>
      {nfts.map((nft) => (
        <NFTCard key={nft.id}>
          <NFTImage src={nft.imageUrl || "/assets/images/placeholder_nft.png"} />
          <NFTInfo>
            <NFTName>{nft.name}</NFTName>
            <NFTCollection>{nft.collection}</NFTCollection>
          </NFTInfo>
        </NFTCard>
      ))}
    </Container>
  )
}

export default NFTList
