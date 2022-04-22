import { icons } from "../assets/assetIcons"

export const getIcon = (name: string) =>
    icons[name.replace(/\ /g, "_").toLowerCase()] || icons.default
