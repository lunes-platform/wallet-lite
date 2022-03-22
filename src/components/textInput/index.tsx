import * as S from "./styles"

type InputProps = {
    labelText?: string
    placeholderText?: string
    inputType?: string
    value?: string | number
    onChange?: any
    disabled?: boolean
    style?: {
        width: string
        margin: string
    }
}

const TextInput = (props: InputProps) => {
    return (
        <S.InputBox>
            <label>{props.labelText}</label>
            <S.Input
                type={props.inputType}
                placeholder={props.placeholderText}
                value={props.value}
                onChange={props.onChange}
                disabled={props.disabled}
                style={props.style}
            />
        </S.InputBox>
    )
}

export default TextInput
