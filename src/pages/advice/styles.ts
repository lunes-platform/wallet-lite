import styled from "styled-components"

export const Container = styled.div`
    width: 100%;
    padding: 30px;
    button {
        margin-top: 1.5rem;
    }
`

export const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: 300;
    margin-top: 15px;
    color: ${({ theme }) => theme.colors.primary[300]};
`

export const Paragraph = styled.p`
    font-size: 1rem;
    margin-top: 1rem;
    color: ${({ theme }) => theme.colors.themeColors[100]};
    span {
        color: ${({ theme }) => theme.colors.critical[500]};
    }
`
