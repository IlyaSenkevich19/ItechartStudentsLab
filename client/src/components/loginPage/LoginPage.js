import React from 'react';

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const LoginPage = props => {
    const { email, onInputChange, password, confirmEmail, onSignUpPage, onMainPage } = props;
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
                    value={email}
                    onChange={onInputChange}
                    placeholder='Email' />
            </FormGroup>
            <FormGroup>
                <Label>Password</Label>
                <Input
                    type='password'
                    onChange={onInputChange}
                    value={password}
                    name='password'
                    placeholder='Password' />
            </FormGroup>
            <Button onClick={confirmEmail} className='btn-lg btn-dark btn-block'>
                Log in
                    </Button>
            <div className='text-center'>
                <a className='login__links' onClick={onSignUpPage} href='/sign-up'>Sign up</a>
            </div>
            <div className='text-center'>
                <a className='login__links' onClick={onMainPage} href='/'>Back to Main Page</a>
            </div>
        </Form>

    );
}

export default LoginPage;