import assetDefault from "./asset-default.png"
import lunes_badge from "./lunes-badge.png"
import gold_mining from "./gold-mining.png"
import up_coin from "./up-coin.png"
import lbrl from "./lbrl.png"

export type IconNames =
    | "lunes_badge"
    | "gold_mining"
    | "default"
    | "up_coin"
    | "lbrl"

export interface Icons {
    lunes_badge: IconNames
    gold_mining: IconNames
    default: IconNames
    up_coin: IconNames
    lbrl: IconNames
}

export const icons: Icons = {
    lunes_badge: lunes_badge,
    gold_mining: gold_mining,
    default: assetDefault,
    up_coin: up_coin,
    lbrl: lbrl
}
