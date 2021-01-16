import './App.css';
import Upload from "./Components/Upload"
import Home from "./Components/Home"
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'

function App() {
    return (
        <div className="App">
            <Router>
                <nav>
                    <div></div>
                    <ul>
                        <li>
                            <Link to="/Upload"> Upload </Link>
                        </li>
                        <li>
                            <Link to="/"> Home </Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route component={Upload} path="/Upload" />
                    <Route component={Home} exact path="/" />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
