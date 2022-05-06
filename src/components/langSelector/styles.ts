import lunesui from "lunesui"
import styled from "styled-components"

import ArrowIcon from "../../assets/images/icons/arrow-down.svg"

export const Select = styled.select`
    border: none;
    outline: none;
    font-size: ${lunesui.font.size.xs.value};
    background-color: transparent;
    width: 50px;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background-image: url(${ArrowIcon});
    background-repeat: no-repeat;
    background-position: right center;
    color: inherit;
    cursor: pointer;

    & option {
        color: #000000;
    }
`
