import * as S from "./styles"

type InputProps = {
    labelText?: string
    placeholderText?: string
    inputType?: string
    value?: string | number
    onChange: any
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
            />
        </S.InputBox>
    )
}

export default TextInput
