import { useState, useMemo } from "react"

import Button from "../../components/button"
import { PageTitle, Paragraph } from "../../components/text"
import { TextInput } from "../../components/input"

import { useLocation, useNavigate } from "react-router-dom"
import useSeed from "../../hooks/useSeed"
import { translate } from "../../lang/translation"

import * as Styles from "./styles"

type SeedStep = "input" | "generated" | "verify"

const Seed = () => {
    const navigate = useNavigate()
    const location: any = useLocation()
    const { password } = location.state || {}
    const { validateSeed, toString, generateSeed, toStringArray, validateIndividualWord } = useSeed()

    const [words, setWords] = useState(new Array(12).fill(""))
    const [step, setStep] = useState<SeedStep>("input")
    const [verifyInputs, setVerifyInputs] = useState<string[]>(["", "", ""])

    // Generate 3 random indices for verification (positions 1-12)
    const verifyIndices = useMemo(() => {
        const indices: number[] = []
        while (indices.length < 3) {
            const randomIndex = Math.floor(Math.random() * 12)
            if (!indices.includes(randomIndex)) {
                indices.push(randomIndex)
            }
        }
        return indices.sort((a, b) => a - b)
    }, [])

    const handleGenerateSeed = () => {
        const newSeed = toStringArray(generateSeed())
        setWords(newSeed)
        setStep("generated")
    }

    const handleProceedToVerify = () => {
        setStep("verify")
    }

    const handleVerifyBackup = () => {
        // Check if all 3 verification words match
        const isValid = verifyIndices.every((wordIndex, inputIndex) =>
            verifyInputs[inputIndex].toLowerCase().trim() === words[wordIndex].toLowerCase()
        )

        if (isValid) {
            validateSeed(toString(words), password, () => navigate("/"))
        } else {
            alert(translate.seed.backupVerifyError || "As palavras não conferem. Verifique seu backup e tente novamente.")
        }
    }

    const handleBackToSeed = () => {
        setStep("generated")
        setVerifyInputs(["", "", ""])
    }

    // Step 1: Input existing seed OR generate new one
    if (step === "input") {
        return (
            <>
                <Styles.Container>
                    <PageTitle>{translate.seed.title}</PageTitle>
                    <Paragraph>{translate.seed.instructions}</Paragraph>
                </Styles.Container>

                <Styles.SeedContainer>
                    {words.map((word, index) => (
                        <Styles.WordSlot key={index}>
                            <Styles.SeedWordLabel>
                                {`${index + 1}`}<sup>a</sup>
                            </Styles.SeedWordLabel>
                            <TextInput
                                value={word}
                                placeholder={translate.seed.typeWord}
                                hashError={word && !validateIndividualWord(word)}
                                onChange={(e) => {
                                    let arr = [...words]
                                    arr[index] = e.target.value.trim().toLowerCase()
                                    setWords(arr)
                                }}
                            />
                        </Styles.WordSlot>
                    ))}
                </Styles.SeedContainer>

                <Styles.ButtonHolder>
                    <Button
                        label={translate.seed.validate}
                        variant="primary"
                        onClick={() => validateSeed(toString(words), password, () => navigate("/"))}
                    />
                    <Button
                        label={translate.seed.generate}
                        variant="transparent"
                        onClick={handleGenerateSeed}
                    />
                </Styles.ButtonHolder>
            </>
        )
    }

    // Step 2: Show generated seed and ask user to save it
    if (step === "generated") {
        return (
            <>
                <Styles.Container>
                    <PageTitle>{translate.seed.backupTitle || "Faça o backup da sua Seed"}</PageTitle>
                    <Paragraph>
                        {translate.seed.backupInstructions || "Anote estas 12 palavras em ordem e guarde em um local seguro. Você precisará delas para recuperar sua carteira."}
                    </Paragraph>
                </Styles.Container>

                <Styles.SeedContainer>
                    {words.map((word, index) => (
                        <Styles.WordSlot key={index}>
                            <Styles.SeedWordLabel>
                                {`${index + 1}`}<sup>a</sup>
                            </Styles.SeedWordLabel>
                            <TextInput
                                value={word}
                                disabled
                                style={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
                            />
                        </Styles.WordSlot>
                    ))}
                </Styles.SeedContainer>

                <Styles.ButtonHolder>
                    <Button
                        label={translate.seed.confirmBackup || "Já anotei, verificar backup"}
                        variant="primary"
                        onClick={handleProceedToVerify}
                    />
                </Styles.ButtonHolder>
            </>
        )
    }

    // Step 3: Verify backup by asking for 3 random words
    if (step === "verify") {
        return (
            <>
                <Styles.Container>
                    <PageTitle>{translate.seed.verifyTitle || "Confirme seu backup"}</PageTitle>
                    <Paragraph>
                        {translate.seed.verifyInstructions || "Digite as palavras nas posições indicadas para confirmar que você fez o backup corretamente."}
                    </Paragraph>
                </Styles.Container>

                <Styles.SeedContainer style={{ justifyContent: "center" }}>
                    {verifyIndices.map((wordIndex, inputIndex) => (
                        <Styles.WordSlot key={wordIndex} style={{ width: "30%" }}>
                            <Styles.SeedWordLabel>
                                {`${wordIndex + 1}`}<sup>a</sup> palavra
                            </Styles.SeedWordLabel>
                            <TextInput
                                value={verifyInputs[inputIndex]}
                                placeholder="Digite aqui..."
                                onChange={(e) => {
                                    const newInputs = [...verifyInputs]
                                    newInputs[inputIndex] = e.target.value.trim().toLowerCase()
                                    setVerifyInputs(newInputs)
                                }}
                            />
                        </Styles.WordSlot>
                    ))}
                </Styles.SeedContainer>

                <Styles.ButtonHolder>
                    <Button
                        label={translate.seed.confirmAndCreate || "Confirmar e criar carteira"}
                        variant="primary"
                        onClick={handleVerifyBackup}
                    />
                    <Button
                        label={translate.seed.backToSeed || "Voltar para ver a seed"}
                        variant="transparent"
                        onClick={handleBackToSeed}
                    />
                </Styles.ButtonHolder>
            </>
        )
    }

    return null
}

export default Seed