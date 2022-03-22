import styled from "styled-components"

export const InputBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
`

export const Input = styled.input`
    width: 100%;
    background-color: transparent;
    border: solid 1px ${({ theme }) => theme.colors.themeColors[300]};
    border-radius: 5px;
    color: ${({ theme }) => theme.colors.themeColors[100]};
    padding: 5px 10px;
    font-size: 1rem;
    margin-top: 0.5rem;
`
