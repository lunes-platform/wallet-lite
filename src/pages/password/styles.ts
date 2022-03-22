import styled from "styled-components"

export const Container = styled.div`
    width: 100%;
    padding: 30px;
`

export const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: 300;
    margin-top: 15px;
    color: ${({ theme }) => theme.colors.primary[300]};
    text-align: center;
`

export const InputHolder = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    button {
        margin-top: 1rem;
    }
`
