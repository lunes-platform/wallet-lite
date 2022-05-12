import styled, { css } from "styled-components"
import Button from "../../components/button"

export const Container = styled.div`
    width: 100%;
    animation: fadeInUp 0.2s;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`

export const Hero = styled.div`
    width: 100%;
    padding: 24px 16px;
`

export const PageTitle = styled.h2`
    font-style: normal;
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 32px;
    margin: 0 0 16px 0;
    color: ${({ theme }) => theme.colors.themeColors[100]};
`

export const ReceiveInstructions = styled.p`
    font-style: normal;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 150%;
    color: ${({ theme }) => theme.colors.themeColors[200]};
`

export const QrCodeConainer = styled.div`
    ${() => css`
        display: flex;
        align-items: center;
        justify-content: center;
        border: solid 1px #ffffff;
        cursor: pointer;
        /* width: 210px;
        height: 210px; */
    `}
`

export const InputRows = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    margin-top: 14px;
`

export const ButtonContainer = styled.div`
    width: 120px;
    margin-left: 8px;
    padding-top: 8px;
`

export const CoppiedToast = styled.span`
    font-family: "Roboto";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.1px;
    color: #0e1f12;
    padding: 6px 12px;
    position: absolute;
    bottom: 80;
    left: 16;
    background-color: #d3e8d3;
    border-radius: 8px;
    animation: fadeInUp 0.5s;
    visibility: ${({ showCopyToast }: { showCopyToast: boolean }) =>
        showCopyToast ? "visible" : "hidden"};
`

export const CopyButton = styled(Button)`
    padding-top: 16px;
    padding-bottom: 16px;
`
