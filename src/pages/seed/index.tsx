import { useState } from "react"

import Button from "../../components/button"
import { PageTitle, Paragraph } from "../../components/text"
import { TextInput } from "../../components/input"

import { useLocation, useNavigate } from "react-router-dom"
import useSeed from "../../hooks/useSeed"
import { translate } from "../../lang/translation"

import * as Styles from "./styles"

const Seed = () => {
    const navigate = useNavigate()
    const location: any = useLocation()
    const { password } = location.state
    const { validateSeed, toString, generateSeed, toStringArray, validateIndividualWord } = useSeed()
    const [words, setWords] = useState(new Array(12).fill(""))
    const handleGenerateSeed = () => {
        setWords(toStringArray(generateSeed()))
    }

    return (
        <>
            <Styles.Container>
                <PageTitle>
                    {translate.seed.title}
                </PageTitle>
                <Paragraph>
                    {translate.seed.instructions}
                </Paragraph>
            </Styles.Container>

            <Styles.SeedContainer>
                {
                    words.map((word, index) => {
                        return (
                            <Styles.WordSlot key={index}>
                                <Styles.SeedWordLabel>
                                    {`${index + 1}`}
                                    <sup>a</sup>
                                </Styles.SeedWordLabel>
                                <TextInput
                                    value={word}
                                    placeholder={translate.seed.typeWord}
                                    hashError={word && !validateIndividualWord(word)}
                                    onChange={(e) => {
                                        let arr = [...words];
                                        arr[index] = e.target.value.trim().toLowerCase();
                                        setWords(arr);
                                    }}
                                />
                            </Styles.WordSlot>
                        )
                    }
                    )
                }
            </Styles.SeedContainer>

            <Styles.ButtonHolder>
                <Button label={translate.seed.validate} variant="primary" onClick={() => validateSeed(toString(words), password, () => navigate("/"))} />
                <Button label={translate.seed.generate} variant="transparent" onClick={handleGenerateSeed} />
            </Styles.ButtonHolder>
        </>
    )
}


export default Seed