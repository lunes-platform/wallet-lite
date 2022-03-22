import styled from "styled-components"

export const ModalBackdrop = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    filter: blur(50);
    backdrop-filter: blur(5px);
    border-radius: 8px;
    animation: fadeIn 0.2s;
    overflow: hidden;
`

export const Container = styled.div`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.themeColors[400]};
    padding: 30px;
    position: absolute;
    bottom: 0;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    min-height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: fadeInUp 0.2s;

    button {
        margin-top: 1rem;
    }
`

export const TitleSuccess = styled.h1`
    font-size: 1.5rem;
    font-weight: 300;
    margin-top: 15px;
    text-align: center;
`

export const Paragraph = styled.p`
    font-size: 1rem;
    margin-top: 1rem;
    color: ${({ theme }) => theme.colors.themeColors[100]};
    text-align: center;
`

export const Row = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`
