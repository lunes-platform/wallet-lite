import Router from './routes';
import useTheme from './hooks/useTheme';

import "./styles/index.css"

import "bulma"
import Modal from './components/modal';

const App = () => {
    const theme = useTheme()
    return (
        <div className={`main ${theme}`}>
            <Modal />
            <Router />
            <span className="gesture-button"></span>


        </div>
    )
}

export default App;