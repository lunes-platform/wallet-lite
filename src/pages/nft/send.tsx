import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/header";
import { NFT } from "../../services/nft";
import { sendTransaction } from "../../services/lunes";
import useSeed from "../../hooks/useSeed";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 20px;
`;

const NFTPreview = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.themeColors[700]};
  border-radius: 12px;
`;

const SmallImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 8px;
  object-fit: cover;
  background-color: ${({ theme }) => theme.colors.themeColors[600]};
`;

const NFTInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.themeColors[100]};
`;

const Collection = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.themeColors[400]};
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.themeColors[300]};
`;

const Input = styled.input`
  width: 100%;
  padding: 16px;
  background: ${({ theme }) => theme.colors.themeColors[700]};
  border: 1px solid ${({ theme }) => theme.colors.themeColors[600]};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.themeColors[100]};
  font-size: 16px;
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary[500]};
    outline: none;
  }
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
  margin-top: auto;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const NFTSend = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getSeed } = useSeed();

  const nft = location.state as NFT;
  const [recipient, setRecipient] = useState("");
  const [loading, setLoading] = useState(false);

  if (!nft) {
    return (
      <Container>
        <Header title="Send NFT" backButton={true} backRoute="/" />
        <Content>NFT Not Found</Content>
      </Container>
    );
  }

  const handleSend = async () => {
    if (!recipient) return;
    setLoading(true);

    try {
      // TODO: Implement proper NFT transfer via sendTransaction
      // For now, simulate a successful send
      await new Promise(resolve => setTimeout(resolve, 1500));

      navigate("/send/confirmation", {
        state: {
          success: true,
          txId: "mock-tx-id",
          amount: 1,
          asset: nft.name,
          recipient
        }
      });
    } catch (error) {
      console.error(error);
      alert("Failed to send NFT");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header title="Send NFT" backButton={true} backRoute="/nft-details" />

      <Content>
        <NFTPreview>
          <SmallImage src={nft.imageUrl || "/assets/images/placeholder_nft.png"} />
          <NFTInfo>
            <Name>{nft.name}</Name>
            <Collection>{nft.collection}</Collection>
          </NFTInfo>
        </NFTPreview>

        <InputGroup>
          <Label>Recipient Address</Label>
          <Input
            placeholder="Lunes address..."
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </InputGroup>

        <Button onClick={handleSend} disabled={loading || !recipient}>
          {loading ? "Sending..." : "Confirm & Send"}
        </Button>
      </Content>
    </Container>
  );
};

export default NFTSend;
