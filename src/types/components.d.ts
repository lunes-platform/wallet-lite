export interface IButton {
    variant: "primary" | "secondary" | "success" | "cancel"
    label: string
    onClick?: () => void
}

export interface ITextInput {
    label: string
    onChange: (string) => void
    value: string
    placeholder: string
    isPassword?: boolean
}
