import * as Styles from "../styles"

interface TabsProps {
    activeTab: "tokens" | "nfts"
    onChange: (tab: "tokens" | "nfts") => void
}

const Tabs = ({ activeTab, onChange }: TabsProps) => {
    return (
        <Styles.TabHeadline>
            <Styles.TabBox>
                <Styles.Tab
                    active={activeTab === "tokens"}
                    onClick={() => onChange("tokens")}
                >
                    Tokens
                </Styles.Tab>
                <Styles.Tab
                    active={activeTab === "nfts"}
                    onClick={() => onChange("nfts")}
                >
                    NFT's
                </Styles.Tab>
            </Styles.TabBox>
        </Styles.TabHeadline>
    )
}

export default Tabs