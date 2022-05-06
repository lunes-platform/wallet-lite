import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import useSeed from "../../hooks/useSeed"



const Home = () => {
    const [userAddress, setUserAddress] = useState("")
    const navigate = useNavigate()
    const { getAddress } = useSeed()

    useEffect(() => {
        if (!getAddress()) {
            navigate("/welcome")
        } else {
            setUserAddress(getAddress())
        }
    }, [getAddress, navigate])


    console.log(userAddress);


    return (
        <h1>Ola mundo</h1>
    )
}

export default Home