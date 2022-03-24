import styled from "styled-components"

export const Container = styled.div`
    width: 100%;
    padding: 30px;
    display: flex;
    flex-direction: column;
    button {
        margin-top: 1.5rem;
    }
`

export const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.success[500]};
    text-align: center;
`

export const Paragraph = styled.p`
    font-size: 1.2rem;
    margin-top: 1rem;
    color: ${({ theme }) => theme.colors.themeColors[100]};
    text-align: center;
    span {
        color: ${({ theme }) => theme.colors.success[500]};
    }
`

export const CenterBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 5rem;
`
