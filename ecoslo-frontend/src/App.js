import React from 'react';
import logo from './logo.svg';
import Home from "./Pages/Home";
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
                    <Home />
                </Route>
                <Route path="/login">
                    
                </Route>
                <Route path="/register">

                </Route>
                <Route path="/home">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
