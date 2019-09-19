import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import history from './history/history';
import { Provider } from 'react-redux';
import store from './store/store'

import App from './components/mainPage/App';
import './App.css'
import LoginPage from './components/loginPage/LoginPage';
import SignUpPage from './components/signUpPage/SignUpPage';
import AdminPage from './components/adminPage/AdminPage'

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route path='/log-in' component={LoginPage} />
                <Route path='/sign-up' component={SignUpPage} />
                <Route path='/' component={App} exact />
                <Route path='/admin' component={AdminPage} />
            </Switch>
        </Router>
    </Provider>
    , document.getElementById('root'));



