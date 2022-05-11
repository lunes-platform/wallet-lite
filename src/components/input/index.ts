import styled, { css } from "styled-components"

type InputProps = {
    hashError?: boolean
}

export const TextInput = styled.input`
    ${({ theme }) => css`
        width: 100%;
        padding: 17px 16px;
        background-color: ${theme.colors.themeColors[600]};
        border-radius: 16px;
        border: none;
        color: ${theme.colors.themeColors[200]};
        margin-top: 8px;
        font-size: 0.89rem;
        line-height: 100%;
        outline: ${(props: InputProps) =>
            props.hashError ? `solid 1px ${theme.colors.critical[500]}` : ""};

        &::placeholder {
            color: ${theme.colors.themeColors[200]};
        }

        &:focus {
            border: 1px solid ${theme.colors.themeColors[800]};
            box-shadow: 0px 0px 0px 1px rgba(255, 255, 255, 0.6),
                0px 0px 0px 4px rgba(108, 56, 255, 0.3);
            outline: none;
        }
    `}
`

export const InputTextHolder = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 15px 0;
    position: relative;
`
