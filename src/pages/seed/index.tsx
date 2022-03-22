import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { encryptAes } from "../../services/cryptograpy";

import { ButtonNeutral, ButtonConfirm } from "../../components/button/index";
import { ModalAlert } from "../../components/modal/index";

import { decodeWallet, newSeed } from "../../services/lunes";

import * as S from "./styles";

const Seed = () => {
  const navigate = useNavigate();
  const location: any = useLocation();
  const { password } = location.state;
  const [modal, setModal] = useState("");
  const [seed, setSeed] = useState("");

  return (
    <S.Container>
      <S.InputSeedTitle>Digite sua seed</S.InputSeedTitle>
      <S.InputSeed
        value={seed}
        onChange={(event) => setSeed(event.target.value)}
      />

      <S.ButtonHolder>
        <ButtonNeutral
          action={() => {
            const generated = newSeed();
            setSeed(generated.phrase);
          }}
          label="Gerar nova"
        />
        <ButtonConfirm
          action={() => {
            if (!seed) {
              return;
            }
            localStorage.setItem("SEED", encryptAes(seed, password));
            localStorage.setItem("ADDRESS", decodeWallet(seed).address);
            setModal("confirm");
          }}
          label="Validar"
        />
      </S.ButtonHolder>

      {modal === "confirm" && (
        <ModalAlert
          text="Sua seed foi adicionada com sucesso!"
          type="success"
          buttonLabel="Continuar"
          onClose={() => {
            setModal("");
            navigate("/");
          }}
        />
      )}
    </S.Container>
  );
};

export default Seed;
