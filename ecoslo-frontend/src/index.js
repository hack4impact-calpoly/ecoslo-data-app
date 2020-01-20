import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import Home from './Pages/Home';
import AddEvent from './Pages/AddEvent';
import Update from './Pages/Update';
import View from './Pages/View';
import {
    Redirect,
    Route,
    BrowserRouter as Router,
    Switch
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

/*const routing = (
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route path="/Home" component={Home} />
            <Route path="/AddEvent" component={AddEvent} />
        </div>
    </Router>
);*/
const routing = (
    <Router>
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/login">
                <App />
            </Route>
            <Route path="/register">

            </Route>
            <Route path="/home">
                <Home />
            </Route>

            
            <Route path="/add">
                <AddEvent />
            </Route>
            <Route path="/view">
                <View />
            </Route>
            <Route path="/update">
                <Update />
            </Route>
        </Switch>
    </Router>  
);

ReactDOM.render(routing, document.getElementById('root'));
