import Router from './routes';
import useTheme from './hooks/useTheme';

import "./styles/index.css"

// import "bulma"
import BasicModal from './components/modal';


const App = () => {
    const theme = useTheme()

    return (
        <div id="main" className={`main ${theme}`}>
            <Router />
            <span className="gesture-button"></span>
        </div>
    )
}

export default App;