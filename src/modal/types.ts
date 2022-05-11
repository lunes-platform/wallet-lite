export interface IOptions {
    validationErrorMessage: string
}

export interface IModalAlert {
    headline: string
    message: string
    dismissButtonLabel?: string
}

export interface IModalConfirm {
    headline: string
    message: string
    dismissButtonLabel?: string
    confirmButtonLabel?: string
    onConfirm: () => void
}

export interface IModalPrompt {
    headline: string
    message: string
    dismissButtonLabel?: string
    confirmButtonLabel?: string
    onConfirm: (enteredValue: string) => void
    options: IOptions
}

export interface IModalPassword {
    headline: string
    message: string
    dismissButtonLabel?: string
    confirmButtonLabel?: string
    /**
     * SHA512 encrypted
     */
    password: string
    onConfirm: (typedPassword: string) => void
    options: IOptions
}
