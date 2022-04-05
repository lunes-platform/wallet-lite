import { accountFactory } from "lunesjs/dist/client/wallet/service.account"
import { IAccount } from "lunesjs/dist/client/wallet/wallet.types"


const wallet = {
    fromSeed: (seed: string): IAccount => {
        return accountFactory({
            seed: seed
        })
    },
    new: (): IAccount => accountFactory()
}

export default wallet
