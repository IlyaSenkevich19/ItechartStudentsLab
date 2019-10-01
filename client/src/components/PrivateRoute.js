import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authService } from './services/authService';

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authService.currentUserRole;
        if (!currentUser) {
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        if (roles && roles.indexOf(currentUser.role) === -1) {
            return <Redirect to={{ pathname: '/'}} />
        }
        return <Component {...props} />
    }} />
)

export default PrivateRoute;