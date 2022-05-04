import { render } from "react-dom";
import ModalContainer from "../components/modalContainer"

import {
    IModalAlert,
    IModalConfirm,
    IModalPassword,
    IModalPrompt,
} from "../types"

import "../index.css"

let containerDomNode: HTMLElement;

function dispatchModal(props: any) {
    containerDomNode = document.createElement('div')
    containerDomNode.id = "modal"
    document.body.appendChild(containerDomNode);

    render(<ModalContainer {...props} />, containerDomNode);
}

function modalAlert(props: IModalAlert) {
    return dispatchModal({ ...props, appearance: "alert" })
}

function modalConfirm(props: IModalConfirm) {
    return dispatchModal({ ...props, appearance: "confirm" })
}

function modalPrompt(props: IModalPrompt) {
    dispatchModal({ ...props, appearance: "prompt" })
}

function modalPassword(props: IModalPassword) {
    return dispatchModal({ ...props, appearance: "password" })
}

export { modalAlert, modalConfirm, modalPrompt, modalPassword }