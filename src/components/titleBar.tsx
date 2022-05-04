import { useNavigate } from "react-router-dom"



type TitleBarProps = {
    title: string
    disableBackNavigation?: boolean
}

const TitleBar = ({ title, disableBackNavigation }: TitleBarProps) => {
    const navigate = useNavigate()
    return (
        <nav className="titlebar">
            {
                !disableBackNavigation && <button className="previous-page-button" onClick={() => navigate(-1)} />
            }
            <div>
                <span className="container-header-title">{title}</span>
            </div>
        </nav>
    )
}


export default TitleBar