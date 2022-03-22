import Input from "../textInput"
import { ReactChild, useState } from "react"
import {
    ButtonConfirm,
    ButtonCancel,
    ButtonNeutral,
    ButtonCancelTransparent
} from "../button/index"

import * as S from "./styles"
import { encryptSha512 } from "../../services/cryptograpy"

type ModalProps = {
    children: ReactChild
}

type ModalAlertProps = {
    onClose: Function
    type: "success" | "error"
    text: string
    buttonLabel: string
}

type ModalPasswordProps = {
    onClose: Function
    onSuccess: Function
}

type ModalTransferProps = {
    onClose: Function
    txId: string
}

const Modal = (props: ModalProps) => {
    return (
        <S.ModalBackdrop>
            <S.Container>{props.children}</S.Container>
        </S.ModalBackdrop>
    )
}

const colors = {
    success: "#4CD074",
    error: "#AC2940"
}

export const ModalAlert = (props: ModalAlertProps) => {
    return (
        <Modal>
            <>
                <S.TitleSuccess
                    style={{
                        color: colors[props.type]
                    }}
                >
                    Atenção
                </S.TitleSuccess>
                <S.Paragraph>{props.text}</S.Paragraph>

                {props.type === "success" ? (
                    <ButtonConfirm
                        label={props.buttonLabel}
                        action={() => props.onClose()}
                    />
                ) : props.type === "error" ? (
                    <ButtonCancel
                        label={props.buttonLabel}
                        action={() => props.onClose()}
                    />
                ) : (
                    <ButtonNeutral
                        label={props.buttonLabel}
                        action={() => props.onClose()}
                    />
                )}
            </>
        </Modal>
    )
}

export const ModalPassword = (props: ModalPasswordProps) => {
    const [password, setPassword] = useState("")
    const [hasError, setHasError] = useState(false)

    function comparePassword() {
        if (encryptSha512(password) !== localStorage.getItem("wallet_key")) {
            setHasError(true)
            return
        }

        props.onSuccess(password)
    }

    return (
        <Modal>
            <>
                {hasError &&
                    ModalAlert({
                        buttonLabel: "OK",
                        onClose: () => setHasError(false),
                        text: "Senha incorreta",
                        type: "error"
                    })}
                <S.TitleSuccess>Atenção</S.TitleSuccess>
                <S.Paragraph>Digite sua senha para continuar</S.Paragraph>
                <Input
                    inputType="password"
                    onChange={(event: any) => setPassword(event.target.value)}
                />
                <S.Row>
                    <ButtonCancelTransparent
                        label="Cancelar"
                        action={props.onClose}
                    />
                    <ButtonConfirm
                        label="Confirmar"
                        action={() => comparePassword()}
                    />
                </S.Row>
            </>
        </Modal>
    )
}

export const ModalTransferSucessful = (props: ModalTransferProps) => {
    return (
        <Modal>
            <>
                <S.TitleSuccess
                    style={{
                        color: "success"
                    }}
                >
                    Atenção
                </S.TitleSuccess>

                <S.Paragraph>Transação enviada com sucesso!</S.Paragraph>
                <S.Paragraph>
                    <S.Link
                        href={`https://blockexplorer.lunes.io/tx/${props.txId}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Clique aqui
                    </S.Link>{" "}
                    para ver os detalhes
                </S.Paragraph>

                <ButtonConfirm label="Fechar" action={() => props.onClose()} />
            </>
        </Modal>
    )
}
