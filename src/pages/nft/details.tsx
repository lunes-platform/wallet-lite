import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/header";
import { NFT } from "../../services/nft";
import { translate } from "../../lang/translation";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  animation: fadeIn 0.3s;
`;

const Content = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  flex: 1;
`;

const ImageContainer = styled.div`
  width: 100%;
  max-width: 320px;
  aspect-ratio: 1;
  background-color: ${({ theme }) => theme.colors.themeColors[700]};
  border-radius: 16px;
  margin-bottom: 24px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.themeColors[600]};
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CollectionName = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.themeColors[400]};
  margin-bottom: 8px;
`;

const NFTName = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.themeColors[100]};
  margin-bottom: 16px;
  text-align: center;
`;

const Description = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.themeColors[300]};
  text-align: center;
  line-height: 1.5;
  margin-bottom: 32px;
`;

const Actions = styled.div`
  width: 100%;
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Button = styled.button`
  width: 100%;
  height: 56px;
  background: ${({ theme }) => theme.colors.primary[500]};
  border-radius: 8px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const GhostButton = styled(Button)`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.themeColors[500]};
  color: ${({ theme }) => theme.colors.themeColors[100]};
`;

const NFTDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const nft = location.state as NFT;

    // Simple protection against reload without state
    if (!nft) {
        return (
            <Container>
                <Content>
                    <p>NFT not found or session lost.</p>
                    <GhostButton onClick={() => navigate("/")}>Go Back</GhostButton>
                </Content>
            </Container>
        );
    }

    return (
        <Container>
            <Header title="NFT Details" backButton={true} backRoute="/" />
            <Content>
                <ImageContainer>
                    <Image src={nft.imageUrl || "/assets/images/placeholder_nft.png"} alt={nft.name} />
                </ImageContainer>

                <CollectionName>{nft.collection}</CollectionName>
                <NFTName>{nft.name}</NFTName>

                {nft.description && <Description>{nft.description}</Description>}

                <Actions>
                    <Button onClick={() => navigate("/nft-send", { state: nft })}>
                        Enviar NFT
                    </Button>
                </Actions>
            </Content>
        </Container>
    );
};

export default NFTDetails;
