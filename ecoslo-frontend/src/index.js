
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import Home from './Pages/Home';
import AddEvent from './Pages/AddEvent';
import Update from './Pages/Update';
import View from './Pages/View';
import Login from './Pages/Login';
import AlterTable from './Pages/AlterTable'; 
import { Provider } from "react-redux";
import store from "./redux/reducers/store";
import APIWrapper from "./APIs/APIWrapper";
import {
    Route,
    BrowserRouter as Router,
    Switch
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Header from "./Components/header.js";
import "./styles/header.css";

const apiWrapper = new APIWrapper(store);

const routing = (
    
    <Provider store={store}>
        <Router>
            <Header />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/login">
                    <Login apiWrapper={apiWrapper} />
                </Route>
                <Route path="/register">
                    <App />
                </Route>
                <Route path="/home">
                    <Home />
                </Route>
                <Route path="/add">
                    <AddEvent apiWrapper={apiWrapper} />
                </Route>
                <Route path="/view">
                    <View apiWrapper={apiWrapper} />
                </Route>
                <Route path="/update">
                    <Update apiWrapper={apiWrapper} />
                </Route>
                <Route path="/alter">
                    <AlterTable apiWrapper={apiWrapper}/>
                </Route>
            </Switch>
        </Router>  
    </Provider>
);

ReactDOM.render(routing, document.getElementById('root'));
