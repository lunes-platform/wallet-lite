import * as S from "./styles"

type ButtonProps = {
    label: string
    action: Function
    style?: {
        width: string
        margin: string
    }
}

export const ButtonNeutral = (props: ButtonProps) => {
    return (
        <S.ButtonNeutral onClick={() => props.action()}>
            {props.label}
        </S.ButtonNeutral>
    )
}

export const ButtonConfirm = (props: ButtonProps) => {
    return (
        <S.ButtonConfirm onClick={() => props.action()} style={props.style}>
            {props.label}
        </S.ButtonConfirm>
    )
}

export const ButtonCancel = (props: ButtonProps) => {
    return (
        <S.ButtonCancel onClick={() => props.action()}>
            {props.label}
        </S.ButtonCancel>
    )
}

export const ButtonCancelTransparent = (props: ButtonProps) => {
    return (
        <S.ButtonCancelTransparent onClick={() => props.action()}>
            {props.label}
        </S.ButtonCancelTransparent>
    )
}
