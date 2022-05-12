import styled from "styled-components"

export const Container = styled.div`
    width: 100%;
    height: 450px;
    animation: fadeInUp 0.2s;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`
export const SendConfirmContainer = styled(Container)`
    animation: fadeInRight 0.2s;
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

export const SendInstructions = styled.p`
    font-style: normal;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 150%;
    color: ${({ theme }) => theme.colors.themeColors[200]};
`

export const SendContainer = styled.div`
    width: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
`

export const InputRows = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const AmountSpan = styled.span`
    font-style: normal;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 100%;
    display: flex;
    align-items: center;
    text-align: right;
    color: ${({ theme }) => theme.colors.themeColors[200]};
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

export const FeeRow = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
`
export const ButtonContainer = styled.div`
    width: 77px;
    margin-left: 8px;
    padding-top: 8px;
`

export const ConfirmButtonContainer = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 16px;
`

export const ConfirmationRows = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 8px 0;
`

export const TotalLabel = styled.span`
    font-style: normal;
    font-weight: 700;
    font-size: 0.875rem;
    line-height: 148%;
    text-transform: uppercase;
    color: #1a1a1a;
`

export const TotalValueLabel = styled(TotalLabel)`
    font-size: 1.125rem;
`
