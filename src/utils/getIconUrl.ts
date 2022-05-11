import { icons } from "../assets/assetIcons"

export const getIcon = (name: any) =>
    icons[name.replace(/ /g, "_").toLowerCase()] || icons.default
