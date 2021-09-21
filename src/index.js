import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './page/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './component/NavBar';
import Footer from './component/Footer';
import Transaction from './page/Transaction';
import Profile from './page/Profile';
import Login from './page/Login';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <NavBar />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/profile">
                    <Profile />
                </Route>
                <Route path="/transaction">
                    <Transaction />
                </Route>
            </Switch>
            <Footer />
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
