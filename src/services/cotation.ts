import axios from "axios"

export const getCotationFromApi = async (
    coin: string
): Promise<number | null> => {
    return null
    try {
        return await (
            await axios.get(`http://yout-service-cotation-api.xyz`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
        ).data
    } catch (error) {
        return null
    }
}
