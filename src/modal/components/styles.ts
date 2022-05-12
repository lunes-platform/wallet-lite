import styled from "styled-components"

export const Container = styled.div`
    width: 100%;
    height: 580px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Modal = styled.div`
    width: 312px;
    padding: 24px 16px 0;
    border-radius: 16px;
    background-color: #ffffff;
    filter: blur(0);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
    animation: fadeInUp 0.3s;
`

export const Headline = styled.h2`
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 32px;
    color: #1a1a1a;
`

export const Message = styled.p`
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
    color: #8a8a8e;
    margin: 16px 0;
`

export const ButtonHolder = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 24px;
`
export const Button = styled.button`
    width: 100%;
    height: 48px;
    background-color: #ffffff;
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 16px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 100%;
    color: #1a1a1a;
    transition: all 0.2s;

    &:hover {
        background-color: #f9f9f9;
    }
`

export const InputBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;
`

export const Input = styled.input`
    width: 100%;
    padding: 17px 16px;
    border: none;
    background-color: #f9f9f9;
    border-radius: 16px;
    &::placeholder {
        font-family: "Inter";
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 100%;
        font-feature-settings: "tnum" on, "lnum" on;
        color: #8a8a8e;
    }
    &:focus {
        border: 1px solid #6c38ff;
        box-shadow: 0px 0px 0px 1px rgba(255, 255, 255, 0.6),
            0px 0px 0px 4px rgba(108, 56, 255, 0.3);
        outline: none;
    }

    border-color: ${({ hasError }: { hasError: boolean }) =>
        hasError && "#ff284c"};
    box-shadow: ${({ hasError }: { hasError: boolean }) => hasError && "none"};
`

export const FieldValidatorBox = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const ValidatorText = styled.small`
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 100%;
    color: #ff284c;
    margin-left: 8px;
`

export const VisibilitySwitch = styled.button`
    padding: 2px 3px;
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
    position: absolute;
    right: 12px;
    top: 10px;
    border-radius: 50%;
`
