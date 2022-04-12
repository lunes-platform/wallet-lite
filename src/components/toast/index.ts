import { toast } from "react-toastify"

const toastMessage = (
    message: string,
    type: "info" | "success" | "warning" | "error" | "default"
) => {
    return toast[type](message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    })
}

export default toastMessage
