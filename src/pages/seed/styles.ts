import styled from "styled-components"

export const Container = styled.div`
    width: 100%;
    overflow-y: scroll;
    height: calc(100% - 58px);
    padding: 20px;
    &::-webkit-scrollbar {
        display: none;
    }
`

export const InputSeedTitle = styled.h1`
    font-size: 1rem;
    text-align: center;
    margin-top: 20px;
`

export const InputSeed = styled.textarea`
    width: 100%;
    border: solid 1px ${({ theme }) => theme.colors.primary[400]};
    resize: none;
    border-radius: 8px;
    background-color: transparent;
    outline: none;
    color: ${({ theme }) => theme.colors.themeColors[100]};
    padding: 20px;
    text-align: center;
    vertical-align: middle;
    margin-top: 15px;
    font-family: "Noto Sans";
    font-size: 1.3rem;
`

export const ButtonHolder = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 12px;

    button {
        margin: 0 5px;
    }
`
