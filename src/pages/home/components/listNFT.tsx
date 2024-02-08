import ArrowRight from "../../../assets/images/icons/arrow-right.png"
import * as Styles from "../styles"

type ListItemProps = {
    nft: Ntf
}

const ListNFT = (props: ListItemProps) => {
    const setSelectedToken = (nft:any) =>{

    }
    return (
        <Styles.ListItem onClick={() => setSelectedToken(props.nft)}>
            <Styles.ListItemContainer>
                <Styles.ListItemCoinInfo>
                    <Styles.ListItemNft
                        src={`https://cloudflare-ipfs.com/ipfs/${props.nft.fileUrl}`}
                        alt="icon"
                    />
                    <Styles.ListItemCoinName>
                        <Styles.CoinName>
                            ID: {props.nft?.tokenId} - {props.nft?.symbol}
                        </Styles.CoinName>
                        <Styles.CoinBalance>
                            Qtd. Mint: {Number(props.nft.balance.replaceAll(",",""))}
                        </Styles.CoinBalance>
                    </Styles.ListItemCoinName>
                </Styles.ListItemCoinInfo>

                <Styles.ListItemCoinInfo>                    
                    <Styles.ArrowRightIcon
                        src={ArrowRight}
                        alt="Select Token"
                    />
                </Styles.ListItemCoinInfo>
            </Styles.ListItemContainer>
        </Styles.ListItem>
    )
}

export default ListNFT
