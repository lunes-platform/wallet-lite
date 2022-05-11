import styled, { css } from "styled-components"

export const Container = styled.div`
    width: 100%;
    height: 100%;
    animation: fadeIn 0.3s;
`

export const TokenContainer = styled.div`
    width: 100%;
    position: relative;
`

export const TabHeadline = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const TabBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px 0px 0px;
    position: static;
    flex: none;
    order: 0;
    flex-grow: 0;
`
export const Tab = styled.button`
    ${({ theme }) => css`
        width: 160px;
        height: 46px;
        background-color: transparent;
        border: none;
        outline: none;
        font-family: "Inter";
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 100%;
        cursor: pointer;
        color: ${({ active }: { active?: boolean }) =>
            active
                ? theme.colors.themeColors[100]
                : theme.colors.themeColors[400]};

        border-bottom: ${({ active }: { active?: boolean }) =>
            active ? `solid 1px ${theme.colors.themeColors[800]}` : "none"};
    `}
`

export const TabContent = styled.div`
    width: 100%;
    height: 320px;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    padding: 8px 0px 0px;
    &::-webkit-scrollbar {
        display: none;
    }
`

// Listitem

export const ListItem = styled.div`
    width: 100%;
    padding: 16px;
    border-bottom: solid 1px ${({ theme }) => theme.colors.themeColors[400]};
    cursor: pointer;
    &:hover {
        background-color: ${({ theme }) => theme.colors.themeColors[600]};
    }
`

export const ListItemContainer = styled.div`
    width: 328px;
    height: 37px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const ListItemCoinInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const ListItemCoinName = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 8px;
`

export const ListItemIcon = styled.img`
    width: 32.5px;
    height: 32.5px;
    animation: fadeInLeft 0.2s;
`

export const CoinName = styled.span`
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 120%;
    color: ${({ theme }) => theme.colors.themeColors[100]};
    opacity: 0.8;
`

export const CoinBalance = styled.span`
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 120%;
    color: ${({ theme }) => theme.colors.themeColors[200]};
    opacity: 0.8;
`
export const DefaultIcon = styled.span`
    background-color: ${({ theme }) => theme.colors.success[600]};
    padding: 6px;
    border-radius: 500px;
    font-family: "Open Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 100%;
    color: #ffffff;
    margin-right: 10px;
    animation: fadeInRight 0.2s;
    display: ${({ displayItem }: { displayItem: boolean }) =>
        displayItem ? "auto" : "none"};
`

export const ArrowRightIcon = styled.img`
    width: 16px;
    height: 16px;
`

// List item

export const ButtonsHolder = styled.div`
    width: 100%;
    padding: 24px 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 0;
    left: 0;
    box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.02);
`

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Button = styled.button`
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: none;
    outline: none;
    background-color: ${({ theme }) => theme.colors.themeColors[600]};
    cursor: pointer;

    &img {
        width: 24px;
        height: 24px;
    }
`

export const Label = styled.div`
    font-style: normal;
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 100%;
    color: ${({ theme }) => theme.colors.themeColors[100]};
    opacity: 0.8;
    margin-top: 16px;
`
