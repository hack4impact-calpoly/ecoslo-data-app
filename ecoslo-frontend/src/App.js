import React from 'react';
import logo from './logo.svg';
import './styles/App.css';
import {
    Redirect,
    Route,
    BrowserRouter as Router,
    Switch
} from "react-router-dom";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    
                </Route>
                <Route path="/login">
                    
                </Route>
                <Route path="/register">

                </Route>
                <Route path="/home">

                </Route>
            </Switch>
        </Router>
    );
}

export default App;
