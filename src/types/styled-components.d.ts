import "styled-components"

type Neutral = {
    0: string
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
}

type Primary = {
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
}

type Success = {
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
}

type Warning = {
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
}

type Critical = {
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
    900: string
}

type ThemeColors = {
    100: string
    200: string
    300: string
    400: string
    500: string
    600: string
    700: string
    800: string
}

type Theme = {
    neutral: Neutral
    primary: Primary
    success: Success
    warning: Warning
    critical: Critical
    themeColors: ThemeColors
}

declare module "styled-components" {
    export interface DefaultTheme {
        colors: Theme
    }
}
