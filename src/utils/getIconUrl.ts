import axios from "axios"
import AssetDefaultIcon from "../assets/images/asset-default.png"

import { icons } from "../assets/assetIcons"

export const getIcon = (name: string) =>
    icons[name.replace(/\ /g, "_").toLowerCase()] || icons.default
