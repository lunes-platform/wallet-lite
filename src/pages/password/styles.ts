import styled from "styled-components"

export const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 16px;
    position: relative;
`

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Logo = styled.img`
    margin-top: 78px;
    width: 100px;
`

export const PasswordInputBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;

    & > :nth-child(3) {
        margin-top: 15px;
    }
`

export const TermsAdvice = styled.span`
    margin-top: 70px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 0.89rem;
    line-height: 150%;
    letter-spacing: 0.05em;
    color: #1a1a1a;
    opacity: 0.8;
    text-align: center;
`

export const Link = styled.button`
    color: #6c38ff;
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 0.89rem;
`
