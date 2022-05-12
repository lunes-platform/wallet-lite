
type FaqProps = {
    headline: string
    explanation: string
}

const FaqBox = (props: FaqProps) => {
    return (
        <div>
            <h2>{props.headline}</h2>
            <p>{props.explanation}</p>
        </div>
    )
}

export default FaqBox