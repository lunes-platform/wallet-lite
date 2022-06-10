export interface Translation {
    lunesWallet: string
    attention: string
    welcome: {
        hero: {
            title: string
            subtitle: string
        }
        button: string
    }
    password: {
        enterPassword: {
            label: string
            placeholder: string
        }
        confirmPassword: {
            label: string
            placeholder: string
        }
        button: string
        termsAdvice: string
        terms: string
        passwordNotMatch: string
        passwordSavedSuccess: string
    }
    terms: {
        accessAccount: string
        faq: {
            headline: string
            explanation: string
        }[]
    }
    seed: {
        title: string
        instructions: string
        typeWord: string
        validate: string
        generate: string
        invalidSeed: string
        invalidSeedMessage: string
    }
    balance: {
        title: string
    }
    home: {
        defaultIcon: string
        send: string
        receive: string
        explorer: string
        support: string
    }
    send: {
        navigationTitle: string
        pageTitle: string
        instructions: string
        receiverAddressLabel: string
        receiverAddressPlaceholder: string
        amountLabel: string
        amountPlaceholder: string
        available: string
        fee: string
        confirm: string
        feeDescription: string
        receiver: string
    }
    sendConfirm: {
        modalPassword: {
            headline: string
            message: string
            errorMessage: string
        }

        pageTitle: string
        pageInstructions: string
        amountOf: string
        totalAmount: string
    }
    hooks: {
        useTransaction: {
            invalidAmountHeadLine: string
            invalidAmountMessage: string
            insufficientFundsHeadLine: string
            insufficientFundsMessage: string
            invalidAddressHeadLine: string
            invalidAddressMessage: string
            successHeadLine: string
            successMessage: string
            failureHeadLine: string
            failureMessage: string
        }
    }
    modal: {
        confirm: string
        cancel: string
    }
    receive: {
        navigationTitle: string
        pageTitle: string
        instructions: string
        copy: string
        copied: string
    }
}
