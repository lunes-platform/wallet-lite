import Receive from "../../assets/images/money-recive.png";
import Send from "../../assets/images/money-send.png";
import Explorer from "../../assets/images/explorer.png";

import LunesIcon from "../../assets/images/lunes-icon.png";
import AssetDefaultIcon from "../../assets/images/asset-default.png";

import { useNavigate } from "react-router-dom";

import * as S from "./styles";

import { OperationContext } from "../../App";
import React, { useEffect, useState } from "react";

import {
  getAddressFromStorage,
  getAssetsBalance,
  getEncryptedSeedFromStorageOrNull,
  getLunesBalance,
} from "../../services/lunes";
import { toBiggestCoinUnit } from "../../utils/amountConverter";

function Home() {
  const navigate = useNavigate();
  const address = getAddressFromStorage();
  const [balance, setBalance] = useState(0);
  const { setOperation, setAsset } = React.useContext(OperationContext);
  const [assetBalances, setAssetBalances] = useState([]);

  const [selectedAsset, setSelectedAsset] = useState({
    issueTransaction: {
      name: "",
      assetId: "",
    },
  });

  useEffect(() => {
    const encrypted = getEncryptedSeedFromStorageOrNull();

    async function getAssets() {
      setAssetBalances(await getAssetsBalance(address));
    }

    getAssets();

    if (!encrypted || encrypted === null) {
      navigate("advice");
      return;
    }

    handleLunesBalance();
  }, []);

  async function handleLunesBalance() {
    setBalance(toBiggestCoinUnit(await getLunesBalance(address), 8));
  }

  return (
    <S.Container>
      <S.BoxBalance>
        <S.LunesButton>
          <img
            src={LunesIcon}
            onClick={() => {
              handleLunesBalance();
              setAsset({});
              setSelectedAsset({
                issueTransaction: {
                  name: "",
                  assetId: "",
                },
              });
            }}
          />
        </S.LunesButton>

        <S.BalanceText>{`${balance} ${
          selectedAsset.issueTransaction.name || "LUNES"
        }`}</S.BalanceText>
        {/* <S.CotationText>R$ 0,00</S.CotationText> */}
      </S.BoxBalance>

      <S.ButtonHolder>
        <S.ActionButton>
          <img src={Receive} />
          <span>Receber</span>
        </S.ActionButton>
        <S.ActionButton onClick={() => setOperation("send")}>
          <img src={Send} />
          <span>Enviar</span>
        </S.ActionButton>
        <S.ActionButton
          onClick={() =>
            window.open("https://blockexplorer.lunes.io", "_blanket")
          }
        >
          <img src={Explorer} />
          <span>Explorer</span>
        </S.ActionButton>
      </S.ButtonHolder>

      <S.AssetsBox>
        {assetBalances.length > 0 && <S.AssetsTitle>Seus tokens</S.AssetsTitle>}
        <S.AssetButtonHolder>
          {assetBalances.map((asset: any, index: number) => {
            return (
              <S.AssetButton
                key={index}
                onClick={() => {
                  setSelectedAsset(asset);
                  setAsset({
                    name: asset.issueTransaction.name,
                    assetId: asset.issueTransaction.assetId,
                  });
                  setBalance(toBiggestCoinUnit(asset.balance, 8));
                }}
              >
                <img src={asset.iconUrl || AssetDefaultIcon} />
                <span>{asset.issueTransaction.name}</span>
              </S.AssetButton>
            );
          })}
        </S.AssetButtonHolder>
      </S.AssetsBox>
    </S.Container>
  );
}

export default Home;
