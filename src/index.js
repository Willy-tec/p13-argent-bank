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
import Signup from './page/Signup';
import { store } from './script/store';
import { Provider } from 'react-redux';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
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
                    <Route path="/signup">
                        <Signup />
                    </Route>
                </Switch>
                <Footer />
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
