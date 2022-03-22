import styled, { createGlobalStyle } from "styled-components"

type ThemeType = {
    mainBackground: string
    fontColor: string
}

export const GlobalStyles = createGlobalStyle<{ theme: ThemeType }>`
  *{
  box-sizing: border-box;
    margin: 0;
    padding: 0;
    transition: all 0.20s linear;
  }
  body {
    font-family: 'Noto Sans', Arial, Roboto, sans-serif;
    background-color: ${(props) => props.theme.mainBackground};
    color: ${(props) => props.theme.fontColor};
    font-smooth: always;
    background-color: #333;
    font-weight: 300;
  }
`

export const MainContainer = styled.div`
    width: 358.47px;
    height: 580px;
    background-color: ${({ theme }) => theme.colors.themeColors[500]};
    color: ${({ theme }) => theme.colors.themeColors[100]};
    border-radius: 8px;
    margin: 0 auto;
    box-sizing: border-box;
    position: relative;
`
