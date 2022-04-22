import 'bulma/css/bulma.min.css';
import "./styles/index.css"

import Router from './routes';

import useTheme from './hooks/useTheme';


const App = () => {
    const theme = useTheme()
    return (
        <div className={`main ${theme}`}>
            <Router />
        </div>
    )
}

export default App;