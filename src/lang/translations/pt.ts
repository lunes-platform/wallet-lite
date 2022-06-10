import { Translation } from "./types"

const PT: Translation = {
    lunesWallet: "Lunes Wallet",
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
    },
    balance: {
        title: "Saldo da carteira"
    },
    home: {
        defaultIcon: "Ativo",
        explorer: "Explorer",
        receive: "Receber",
        send: "Enviar",
        support: "Suporte"
    },
    send: {
        navigationTitle: "Enviar",
        pageTitle: "Insira o endereço da carteira Lunes",
        instructions:
            "Envie apenas Lunes para o endereço. O envio de outras moedas pode resultar em perda permanente.",
        receiverAddressLabel: "Endereço do destinatário",
        receiverAddressPlaceholder: "Digite o endereço do destinatário",
        amountLabel: "Quantidade",
        amountPlaceholder: "Valor em ",
        available: "Disponível: ",
        fee: "Taxa",
        confirm: "Continuar",
        feeDescription: "Taxa cobrada pelo serviço",
        receiver: "Destinatário"
    },
    sendConfirm: {
        modalPassword: {
            headline: "Digite sua senha",
            message:
                "Para realizar esta transação precisamos que você digite sua senha",
            errorMessage: "Senha inválida"
        },
        pageTitle: "Confira se está tudo correto!",
        pageInstructions:
            "Antes de realizar esta transação, confira se todos os dados estão corretos. Essa ação não poderá ser desfeita.",
        amountOf: "Quantidade de ",
        totalAmount: "Valor Total"
    },

    hooks: {
        useTransaction: {
            invalidAmountHeadLine: "Valor inválido",
            invalidAmountMessage:
                "O valor a ser enviado deve ser maior que zero",
            insufficientFundsHeadLine: "Saldo insuficiente",
            insufficientFundsMessage:
                "Você não tem saldo para completar esta transação",
            invalidAddressHeadLine: "Endereço inválido",
            invalidAddressMessage:
                "O endereço digitado não corresponde a um endereço Lunes Válido",
            successHeadLine: "Sucesso!",
            successMessage: "Sua transação foi realizada com sucesso",
            failureHeadLine: "Envio cancelado!",
            failureMessage:
                "Falha ao fazer a transação. Verifique os dados de envio e senha."
        }
    },
    modal: {
        confirm: "Confirmar",
        cancel: "Cancelar"
    },
    receive: {
        navigationTitle: "Receber",
        pageTitle: "Copie o código!",
        instructions:
            "Envie apenas Lunes para esse endereço. O envio de outras moedas pode resultar em perda permanente.",
        copy: "Copiar",
        copied: "Copiado"
    }
}

export default PT
