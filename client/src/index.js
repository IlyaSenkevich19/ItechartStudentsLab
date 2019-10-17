import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import history from './history/history';
import { Provider } from 'react-redux';
import store from './store/store';
import './App.css';

import AdminContainer from './components/adminPage/AdminContainer'
import App from './components/mainPage/App';
import LoginPageContainer from './containers/LoginPageContainer';
import SignUpPage from './containers/SignUpPage';
import ModeratorPageContainer from './containers/ModeratorPageContainer';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { Role } from './components/role';
import PageNonUser from './components/pageForNonUser/PageNonUser';
import CaptchaContainer from './containers/CaptchaContainer';

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Switch>
                <Route path='/captcha' component={CaptchaContainer} />
                <Route path='/log-in' component={LoginPageContainer} />
                <Route path='/sign-up' component={SignUpPage} />
                <Route path='/' component={PageNonUser} exact  />
                <PrivateRoute path='/main' roles={[Role.User, Role.Admin, Role.Moderator]} component={App}  />
                <PrivateRoute path='/admin' roles={Role.Admin} component={AdminContainer} />
                <PrivateRoute path='/moderator' roles={Role.Moderator} component={ModeratorPageContainer} />
            </Switch>
        </Router>
    </Provider>
    , document.getElementById('root'));



