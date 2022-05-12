import axios from "axios"

export const getCotationFromApi = async (
    coin: string
): Promise<number | null> => {
    try {
        return await (
            await axios.get(
                `https://lunes-prod.api-lunes.com/api-lunes/token/price/?coin=${coin}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": "YH1E5V0WSFXJ84LJGJAW0OX"
                    }
                }
            )
        ).data
    } catch (error) {
        return null
    }
}
