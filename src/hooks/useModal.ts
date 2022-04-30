import React from "react"
import ReactDOM from "react-dom"

import Modal from "../components/modal"

const useModal = () => {
    const createModal = () => {
        const containerDomNode = document.createElement("div")
        document.body.appendChild(containerDomNode)
        // render(<Modal />, containerDomNode)
        ReactDOM.render(<Modal />, containerDomNode)
    }

    const modal = () => {
        createModal()
    }

    return {
        modal
    }
}

export default useModal
