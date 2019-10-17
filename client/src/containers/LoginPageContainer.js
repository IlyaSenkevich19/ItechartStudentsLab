import React from 'react';

import history from '../history/history'
import { Redirect } from 'react-router-dom';
import { authService } from '../components/services/authService';
import { Role } from '../components/role'


import LoginPage from '../components/loginPage/LoginPage'

class LoginPageContainer extends React.PureComponent {

    state = {
        email: '',
        password: ''
    };

    onInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value })
    };

    onSignUpPage = () => {
        history.push('/sign-up');
    };

    onMainPage = () => {
        history.push('/');
    };

    login = async user => {
        try {
            await authService.login(user.email, user.pass);
            window.location.reload();
        } catch (err) {
            console.log(err)
        }
    }

    confirmEmail = async () => {
        const email = this.state.email;
        const password = this.state.password;
        const user = { email: email, pass: password }
        await this.login(user);
    }

    render() {
        const currentUser = authService.currentUser;
        const { email, password } = this.state;
        if (currentUser.blockStatus === true) {
            localStorage.removeItem('currentUser');
            alert("You are blocked")

            return <Redirect to='/log-in' />;
        }
        else if (currentUser.role === Role.Admin) {
            return <Redirect to='/admin' />
        } else if (currentUser.role === Role.Moderator) {
            return <Redirect to='/moderator' />
        } else if (currentUser.role === Role.User) {
            return <Redirect to='/main' />
        } else {
            return (

                <div>
                    <LoginPage
                        onInputChange={this.onInputChange}
                        confirmEmail={this.confirmEmail}
                        onSignUpPage={this.onSignUpPage}
                        onMainPage={this.onMainPage}
                        email={email}
                        password={password}
                    />
                </div>

            );
        }
    }
}

export default LoginPageContainer;