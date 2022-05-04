import { useState } from "react"
import Button from "../../components/button"

import { translate } from "../../lang/translation"

import useSeed from "../../hooks/useSeed"
import { useLocation, useNavigate } from "react-router-dom"

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
            <div className="container">
                <h1 className="page-title">{translate.seed.title}</h1>
                <p className="page-instructions">{translate.seed.instructions}</p>
            </div>

            <div className="container seed-container" style={{ paddingTop: 0 }}>
                {
                    words.map((word, index) => {
                        const errorClass = word && !validateIndividualWord(word) ? "has-error" : ""
                        return (
                            <div key={index} className="d-flex flex-column justify-center align-center">
                                <span className="type-seed-word">
                                    {`${index + 1}`}
                                    <sup>a</sup>
                                </span>
                                <input
                                    className={`input-text ${errorClass}`}
                                    value={word}
                                    placeholder={translate.seed.typeWord}
                                    onChange={(e) => {
                                        let arr = [...words];
                                        arr[index] = e.target.value.trim().toLowerCase();
                                        setWords(arr);
                                    }}
                                />
                            </div>
                        )
                    }
                    )
                }
            </div>

            <div className="container d-flex flex-column justify-center align-center">
                <Button label={translate.seed.validate} variant="primary" onClick={() => validateSeed(toString(words), password, () => navigate("/"))} />
                <Button label={translate.seed.generate} variant="transparent" onClick={handleGenerateSeed} />
            </div>
        </>
    )
}


export default Seed