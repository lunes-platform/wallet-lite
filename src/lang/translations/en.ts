import { Translation } from "./types"

const EN: Translation = {
    lunesWallet: "Lunes Wallet",
    attention: "Attention",
    welcome: {
        hero: {
            title: "Here, you are the only person in control of your finances.",
            subtitle:
                "Access your Lunes digital account and simplify your day to day."
        },
        button: "Access"
    },
    password: {
        enterPassword: {
            label: "Password",
            placeholder: "Enter you password"
        },
        confirmPassword: {
            label: "Confirm password",
            placeholder: "Enter you password again"
        },
        button: "Next",
        termsAdvice: "By accessing Lunes Wallet, you agree to the ",
        terms: "Terms of Service",
        passwordNotMatch: "Passwords didn't match",
        passwordSavedSuccess: "Password saved successfully"
    },
    terms: {
        accessAccount: "Access Account",
        faq: [
            {
                headline: "Attention!",
                explanation:
                    "The storage of your cryptocurrencies in the LunesWallet wallet is decentralized."
            },
            {
                headline: "What does that mean?",
                explanation:
                    "It means that your assets are not in the custody of Lunes Wallet, we do not store your coins on our servers. The Seed will be in your possession."
            },
            {
                headline: "What is Seed?",
                explanation:
                    'There are 12 words in English that give you access to your funds in your Blockchain wallet of your favorite currency. "Write down and backup the Seed, and keep it in a safe place, if you lose the Seed you will lose your funds."'
            },
            {
                headline: "I know!",
                explanation:
                    "That I should write down and backup my Seed and keep it in a safe place, either physical or digital. I am also instructed that my cryptocurrency funds are not stored or held in custody by Lunes does not back up my Seeds. I know that in case of loss of my Seed, or wrong notation of words, it is not possible to recover."
            }
        ]
    },
    seed: {
        title: "Your Seed",
        instructions: "Enter your 12 english words seed in lowercase.",
        typeWord: "Enter word",
        generate: "Generate",
        validate: "Validate",
        invalidSeed: "Invalid Seed!",
        invalidSeedMessage: "Check orthography and word order and try again."
    },
    balance: {
        title: "Account balance"
    }
}

export default EN
