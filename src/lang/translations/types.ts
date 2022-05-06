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
}
