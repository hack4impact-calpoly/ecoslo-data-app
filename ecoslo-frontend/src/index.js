import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import Home from './Pages/Home';
import AddEvent from './Pages/AddEvent';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const routing = (
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route path="/Home" component={Home} />
            <Route path="/AddEvent" component={AddEvent} />
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));