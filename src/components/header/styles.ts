import lunesui from "lunesui"
import styled from "styled-components"

import BackButtonIcon from "../../assets/images/icons/back.svg"

export const Header = styled.div`
    width: 100%;
    height: 72px;
    padding: ${lunesui.spacing.squish.nano.value};
    position: relative;
    top: 0;
    left: 0;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.02);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

export const Nav = styled.nav`
    width: 100%;
    padding: 18.82px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const PreviousPageButton = styled.button`
    width: 16px;
    height: 16px;
    border: none;
    outline: none;
    background-color: transparent;
    border-radius: 16px;
    background-image: url(${BackButtonIcon});
    background-repeat: no-repeat;
    background-position: center left;
    background-size: 16px;
    cursor: pointer;
    margin-right: 18px;
`

export const ContainerHeaderTitle = styled.span`
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    line-height: 28px;
    color: #1a1a1a;
`

export const NavigationBar = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 18px;
`

export const BalanceHeadline = styled.span`
    font-family: ${lunesui.font.family.base.value};
    font-style: normal;
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 150%;
    color: ${({ theme }) => theme.colors.themeColors[100]};
`

export const BalanceAmount = styled.span`
    font-family: ${lunesui.font.family.base.value};
    font-style: normal;
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 100%;
    color: ${({ theme }) => theme.colors.themeColors[200]};
    margin-top: 4px;
`

export const BalanceGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`
