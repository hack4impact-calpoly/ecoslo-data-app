
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import Home from './Pages/Home';
import AddEvent from './Pages/AddEvent';
import Update from './Pages/Update';
import View from './Pages/View';
import Login from './Pages/Login';
import { Provider } from "react-redux";
import store from "./redux/reducers/store";
import {
    Redirect,
    Route,
    BrowserRouter as Router,
    Switch
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

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
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <App />
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
    </Provider>
);

ReactDOM.render(routing, document.getElementById('root'));
