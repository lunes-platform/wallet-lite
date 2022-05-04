import { Translation } from "./types"

const PT: Translation = {
    attention: "Atenção",
    welcome: {
        hero: {
            title: "Aqui, você é a única pessoa no controle das suas finanças.",
            subtitle:
                "Acesse sua conta digital Lunes e simplifique seu dia a dia."
        },
        button: "Acessar"
    },
    password: {
        enterPassword: {
            label: "Senha",
            placeholder: "Digite sua senha"
        },
        confirmPassword: {
            label: "Confirmar Senha",
            placeholder: "Digite sua senha novamente"
        },
        button: "Próximo",
        termsAdvice: "Ao acessar a Lunes Wallet, você concorda com os ",
        terms: "Termos de Serviço",
        passwordNotMatch: "Senhas não coincidem",
        passwordSavedSuccess: "Senha salva com sucesso"
    },
    terms: {
        accessAccount: "Acessar Conta",
        faq: [
            {
                headline: "Atenção",
                explanation:
                    "O armazenamento de suas criptomoedas na carteira LunesWallet é descentralizada."
            },
            {
                headline: "O que isso significa?",
                explanation:
                    "Significa que seus ativos não estão sob custódia da Lunes Wallet, não armazenamos suas moedas em nossos servidores. A Seed estará na sua posse."
            },
            {
                headline: "O que é Seed?",
                explanation:
                    'São 12 palavras em inglês que dão acesso aos seus fundos na sua carteira no Blockchain de sua moeda predileta. "Anote e faça backup da Seed, e guarde em local seguro, se você perder a Seed perderá seus fundos".'
            },
            {
                headline: "Estou ciente!",
                explanation:
                    "Que devo anotar e fazer backup de minha Seed e guardar em local seguro, tanto físico ou digital.  Também estou instruído que os meus fundos em criptomoeda não são armazenadas ou custodiadas  pela Lunes não guarda backup das minhas Seeds. Sei que no caso da perda de minha Seed, ou anotação errada das palavras não é possivel recuperar. "
            }
        ]
    },
    seed: {
        title: "Sua Seed",
        instructions:
            "Digite sua seed de 12 palavras em inglês, minúsculas que você tem anotado.",
        typeWord: "Digitar palavra",
        generate: "Gerar nova",
        validate: "Validar seed",
        invalidSeed: "Seed inválida!",
        invalidSeedMessage:
            "Verifique a ortografia e a ordem das palavras e tente novamente."
    }
}

export default PT
