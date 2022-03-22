import styled, { css } from "styled-components"

export const ButtonComponent = styled.button`
    ${({ theme }) => css`
        padding: 10px 15px;
        cursor: pointer;
        outline: none;
        border: none;
        border-radius: 6px;
        color ${theme.colors.themeColors[100]};
        font-size: 1rem;
        &:active{
            transform: translateY(2px)
        }
    `}
`

export const ButtonNeutral = styled(ButtonComponent)`
    ${({ theme }) => css`
        background-color: ${theme.colors.themeColors[400]};
    `}
`

export const ButtonConfirm = styled(ButtonComponent)`
    ${({ theme }) => css`
        background-color: ${theme.colors.success[600]};
    `}
`

export const ButtonCancel = styled(ButtonComponent)`
    ${({ theme }) => css`
        background-color: ${theme.colors.critical[600]};
    `}
`

export const ButtonCancelTransparent = styled(ButtonCancel)`
    ${({ theme }) => css`
        color: ${theme.colors.critical[600]};
        background-color: transparent;
        font-weight: bold;
    `}
`
