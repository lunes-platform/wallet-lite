import styled from "styled-components"

import BackgroundImage from "../../assets/images/illustrations/girl-with-smartphone.jpg"

export const Container = styled.div`
    animation: fadeInDown;
    animation-duration: 300ms;

    &::after {
        content: "";
        width: 100%;
        background-image: url(${BackgroundImage});
        height: 184px;
        background-repeat: no-repeat;
        background-position: center;
        position: absolute;
    }
`

export const Hero = styled.div`
    width: 100%;
    padding: 24px 16px 0;
    background-color: ${({ theme }) => theme.colors.themeColors[600]};
`
export const ButtonHold = styled.div`
    width: 100%;
    padding: 16px;
    position: absolute;
    bottom: 0;
    z-index: 1;
    margin-bottom: 4px;
`
