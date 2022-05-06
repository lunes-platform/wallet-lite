import styled, { css } from "styled-components"
import lunesui from "lunesui"

export const Primary = styled.button`
    ${({ theme }) => css`
        width: 100%;
        padding-top: 16px;
        padding-bottom: 16px;
        font-family: ${lunesui.font.family.base.value};
        font-weight: bold;
        background-color: ${theme.colors.themeColors[800]};
        color: ${theme.colors.themeColors[500]};
        border: none;
        outline: none;
        font-size: 0.9rem;
        border-radius: 16px;
        position: relative;
        cursor: pointer;
        transition: linear 0.2s;

        &:active {
            transform: translateY(2px);
            transition: linear 0.2s;
        }

        &:hover {
            background-color: ${({ theme }) => theme.colors.primary[600]};
        }
    `}
`

export const Transparent = styled(Primary)`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.themeColors[100]};
    &:hover {
        background-color: ${({ theme }) => theme.colors.themeColors[600]};
    }
`
