import React from 'react';

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { notify } from 'react-notify-toast';
import Notifications from 'react-notify-toast';

import history from '../../history/history'
// import { connect } from 'react-redux';
// import { setAuthor } from '../../actions/actions';
import { Redirect } from 'react-router-dom';
import { authService } from '../services/authService';
import { Role } from '../role'
// import jwt_decode from 'jwt-decode';

class LoginPage extends React.PureComponent {

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
        const rawResponse = await fetch('http://localhost:8000/api/user/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: user.email, password: user.pass })
        });
        const content = await rawResponse.json();
        console.log(content);
        // if (content.error) {
        //     // notify.show("Confirm your email please");
        //     alert("Confirm your email please");
        //     localStorage.clear();
        // } else {
            localStorage.setItem('currentUser', JSON.stringify(content));
            window.location.reload();
         } catch(err) {
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
       if(currentUser.blockStatus === true) {  
        localStorage.removeItem('currentUser'); 
        return  <Redirect to='/' />; } 
       else if (currentUser.role === Role.Admin) {
            return <Redirect to='/admin' />
        } else if (currentUser.role === Role.Moderator) {
            return <Redirect to='/moderator' />
        } else if (currentUser.role === Role.User) {
            return <Redirect to='/main' />
        } else {
            return (
                <Form className='login-form'>
                   
                    <h1 className='text-center'>
                        <span className='font-weight-bold'>Online Voting System</span>
                    </h1>
                    <h2 className='text-center'>Welcom</h2>
                    <hr />
                    <FormGroup>
                        <Label>Email</Label>
                        <Input
                            type='email'
                            name='email'
                            value={this.state.email}
                            onChange={this.onInputChange}
                            placeholder='Email' />
                    </FormGroup>
                    <FormGroup>
                        <Label>Password</Label>
                        <Input
                            type='password'
                            onChange={this.onInputChange}
                            value={this.state.password}
                            name='password'
                            placeholder='Password' />
                    </FormGroup>
                    <Button onClick={this.confirmEmail} className='btn-lg btn-dark btn-block'>
                        Log in
                    </Button>
                    <div className='text-center'>
                        <a onClick={this.onSignUpPage} href='/sign-up'>Sign up</a>
                    </div>
                    <div className='text-center'>
                        <a onClick={this.onMainPage} href='/'>Back to Main Page</a>
                    </div>
                </Form>
            );
        }
    }
}

export default LoginPage;