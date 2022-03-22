import styled from "styled-components"

export const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: ${({ theme }) => theme.colors.themeColors[500]};
    border-radius: 8px;
    animation: fadeIn 0.5s;
`

export const CloseButton = styled.button`
    padding: 10px 13px;
    border-radius: 50%;
    background-color: transparent;
    border: none;
    outline: none;
    color: ${({ theme }) => theme.colors.themeColors[100]};
    position: absolute;
    top: 5;
    right: 0;
    cursor: pointer;

    &:hover {
        background-color: ${({ theme }) => theme.colors.themeColors[400]};
    }
`

export const SendContainer = styled.div`
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Icon = styled.img`
    width: 3rem;
    height: 3rem;
    margin-top: 2rem;
`

export const Title = styled.h2`
    color: ${({ theme }) => theme.colors.themeColors[100]};
    text-align: center;
    font-weight: 300;
    font-family: "Noto Sans";
    font-size: 1.5rem;
    margin-top: 1rem;
`
export const TransferDetails = styled.div`
    margin-top: 1rem;
    width: 100%;
`

export const Row = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0.1rem 0;
`

export const Label = styled.span`
    color: ${({ theme }) => theme.colors.themeColors[100]};
`
