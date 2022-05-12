import lunesui from "lunesui"
import styled from "styled-components"

export const Paragraph = styled.p`
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 125%;
    color: ${({ theme }) => theme.colors.themeColors[200]};
`

export const QuoteParagraph = styled(Paragraph)`
    font-size: 1rem;
`

export const Headline = styled.h1`
    font-family: ${lunesui.font.family.brand.value};
    font-style: normal;
    font-weight: 700;
    font-size: 2.2rem;
    line-height: 125%;
    color: ${({ theme }) => theme.colors.themeColors[100]};
    margin-top: ${lunesui.spacing.stack.xxs.value};
    margin-bottom: ${lunesui.spacing.stack.xxs.value};
`
export const PageTitle = styled.h2`
    font-style: normal;
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 32px;
    color: ${({ theme }) => theme.colors.themeColors[100]};
    margin-bottom: 16px;
`

export const NavigationTitle = styled(PageTitle)`
    font-size: 1.375rem;
    margin-bottom: 0;
`
export const Label = styled.span`
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.themeColors[100]};
    font-weight: 500;
`
