import React from 'react';

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import history from '../../history'

class SignUpPage extends React.PureComponent {

    onLoginPage = () => {
        history.push('/log-in');
    }

    render() {

        return (
            <Form className='login-form'>
                <h1 className='text-center'>
                    <span className='font-weight-bold'>Online Voting System</span>
                </h1>
                <h2 className='text-center'>Welcom</h2>
                <hr />
                <FormGroup>
                    <Label>Email</Label>
                    <Input type='email' placeholder='Email' />
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input type='password' placeholder='Password' />
                </FormGroup>
                <FormGroup>
                    <Label>Confirm Password</Label>
                    <Input type='password' placeholder='Password' />
                </FormGroup>
                <FormGroup>
                    <Label>Date of Birth</Label>
                    <Input type='date' placeholder='Date of bitrh' />
                </FormGroup>
                <Button className='btn-lg btn-dark btn-block'>
                    Sign Up
        </Button>
                <div className='text-center'>
                    <a onClick={this.onLoginPage} href='/log-in'>Log In</a>
                </div>
            </Form>
        );
    }
}

export default SignUpPage;