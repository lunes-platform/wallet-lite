import styled from "styled-components"

export const Container = styled.div`
    width: 100%;
    overflow-y: scroll;
    height: calc(100% - 58px);
    &::-webkit-scrollbar {
        display: none;
    }
`

export const BoxBalance = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 46px;
`

export const LunesButton = styled.button`
    background-color: transparent;
    border: none;
    outline: none;
    border-radius: 50px;
    cursor: pointer;
    img {
        width: 64px;
        height: 64px;
    }
`

export const BalanceText = styled.h1`
    font-size: 1.5rem;
    font-weight: 300;
    margin-top: 15px;
`
export const CotationText = styled.h2`
    font-size: 1rem;
    font-weight: 300;
`

export const ButtonHolder = styled.div`
    width: 100%;
    height: 72px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`

export const ActionButton = styled.button`
    width: 72px;
    height: 72px;
    border: none;
    outline: none;
    background-color: ${({ theme }) => theme.colors.themeColors[600]};
    cursor: pointer;
    border-radius: 8px;
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
        width: 40px;
    }

    span {
        color: ${({ theme }) => theme.colors.themeColors[100]};
    }

    &:hover {
        border: solid 1px ${({ theme }) => theme.colors.primary[400]};
    }
`

export const AssetsBox = styled.div`
    width: 100%;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const AssetsTitle = styled.h3`
    font-size: 1rem;
    margin: 0;
`

export const AssetButtonHolder = styled.div`
    width: 100%;
    padding: 0 30px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
`

export const AssetButton = styled(ActionButton)`
    width: 56px;
    height: 56px;
    margin: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1px;

    img {
        width: 22px;
        border-radius: 4px;
    }

    span {
        font-size: 0.8rem;
        margin-top: 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 80%;
    }
`
