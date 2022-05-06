import styled from "styled-components"

export const Container = styled.div`
    width: 100%;
    padding: 18px;
`
export const ContainerTerms = styled.div`
    width: 100%;
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 24px 16px;
    height: 477px;
    overflow: scroll;
    & > div {
        margin-bottom: 70px;

        & > h2 {
            font-family: "Inter";
            font-style: normal;
            font-weight: 500;
            font-size: 1.1rem;
            line-height: 120%;
            color: #1a1a1a;
            text-align: center;
        }

        & > p {
            font-family: "Inter";
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 150%;
            color: #8a8a8e;
            margin-top: 6px;
            text-align: center;
        }
    }
    &::-webkit-scrollbar {
        display: none;
    }
`
