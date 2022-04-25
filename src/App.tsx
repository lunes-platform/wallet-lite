import Router from './routes';
import useTheme from './hooks/useTheme';

import "./styles/index.css"

import "bulma"

const App = () => {
    const theme = useTheme()
    return (
        <div className={`main ${theme}`}>
            <Router />

            <span className="gesture-button"></span>
        </div>
    )
}

export default App;