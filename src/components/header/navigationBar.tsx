


import * as Styles from "./styles"

import { useNavigate } from "react-router-dom"

type Props = {
    title: string
    disableBackNavigation?: boolean
}

const NavigationBar = (props: Props) => {
    const navigate = useNavigate()
    return (
        <Styles.NavigationBar>
            {
                !props.disableBackNavigation && <Styles.PreviousPageButton className="previous-page-button" onClick={() => navigate(-1)} />
            }
            <Styles.ContainerHeaderTitle className="container-header-title">{props.title}</Styles.ContainerHeaderTitle>
        </Styles.NavigationBar>
    )
}


export default NavigationBar