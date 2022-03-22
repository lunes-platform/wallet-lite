import styled from "styled-components"

export const Container = styled.nav`
    width: 100%;
    height: 58px;
    background-color: ${({ theme }) => theme.colors.themeColors[600]};
    border-radius: 8px 8px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
`
