import axios from "axios"

export const getCotationFromApi = async (
    coin: string
): Promise<number | null> => {
    try {
        return await (
            await axios.get(`https://your-api-cotation.example.com`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
        ).data
    } catch (error) {
        console.warn("Could not get cotation due an server error")
        return null
    }
}
