import styled from "styled-components"

export const Container = styled.div`
    width: 100%;
    padding: 24px 16px;
    animation: fadeInRight 0.2s;
`

export const SeedContainer = styled(Container)`
    display: grid;
    grid-template-columns: auto auto auto;
    height: 300px;
    overflow: auto;
    & > div {
        padding: 8px;

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
`

export const SeedWordLabel = styled.span`
    font-family: "Inter";
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 148%;
    text-align: center;
    color: ${({ theme }) => theme.colors.neutral[400]};
`

export const ButtonHolder = styled(Container)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
