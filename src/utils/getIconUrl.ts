import { icons, IconNames } from "../assets/assetIcons"

const getName = (name: string): IconNames => {
    const newName = name.replace(/\ /g, "_").toLowerCase()

    Object.keys(icons).map((icon) => {
        if (newName === icon) {
            return newName
        }
    })

    return icons.default
}

export const getIcon = (name: string) => getName(name)
