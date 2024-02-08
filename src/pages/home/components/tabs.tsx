import { useState } from "react"
import * as Styles from "../styles"
type TabProps = {
    clickTab: any
}
const Tabs = (props:TabProps) => {
    const [istoken, setIsToken] = useState(true)
    const [isNFT, setNFT] = useState(!istoken)
    //1 - Token and 2 - NFT
    const setTabProp = (type:number) =>{
        setIsToken(type==1)
        setNFT(type==2)
        props.clickTab(type)
    }
    return (
        <Styles.TabHeadline>
            <Styles.TabBox>
                <Styles.Tab active={istoken} onClick={()=>setTabProp(1)}>Tokens</Styles.Tab>
                <Styles.Tab active={isNFT} onClick={()=>setTabProp(2)}>NFT's'</Styles.Tab>
            </Styles.TabBox>
        </Styles.TabHeadline>
    )
}


export default Tabs