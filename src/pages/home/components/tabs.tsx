import * as Styles from "../styles"

const Tabs = () => {
    return (
        <Styles.TabHeadline>
            <Styles.TabBox>
                <Styles.Tab active={true}>Tokens</Styles.Tab>
                <Styles.Tab disabled style={{ cursor: "default" }}>NFT's'</Styles.Tab>
            </Styles.TabBox>
        </Styles.TabHeadline>
    )
}


export default Tabs