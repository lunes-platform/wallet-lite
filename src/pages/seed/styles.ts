import styled from "styled-components"

export const Container = styled.div`
    width: 100%;
    padding: 24px 16px;
    animation: fadeInRight 0.2s;
`

export const SeedContainer = styled(Container)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    height: 300px;
    overflow: auto;
    gap: 10px; 
    & > div {
        padding: 4px;

        & > div {
            margin: 0;
        }
    }
    &::-webkit-scrollbar {
        display: none;
    }
`

export const WordSlot = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`

export const SeedWordLabel = styled.span`
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 148%;
    text-align: center;
    color: ${({ theme }) => theme.colors.neutral[400]};
    margin-bottom: 4px;
`

export const ButtonHolder = styled(Container)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const SeedInput = styled.input`
    width: 100%;
    padding: 8px 12px;
    background-color: ${({ theme }) => theme.colors.themeColors[600]};
    border-radius: 16px;
    border: none;
    color: ${({ theme }) => theme.colors.themeColors[200]};
    font-size: 0.89rem;
    text-align: center;
    
    &:focus {
        outline: none;
        border: none;
        box-shadow: none;
        background-color: ${({ theme }) => theme.colors.themeColors[700]};
    }

    &::placeholder {
        color: ${({ theme }) => theme.colors.themeColors[400]};
        font-size: 0.8rem;
    }
`
