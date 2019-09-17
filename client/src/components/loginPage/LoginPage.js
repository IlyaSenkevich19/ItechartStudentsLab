import React from 'react';

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const LoginPage = () => {
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
            <Button className='btn-lg btn-dark btn-block'>
                Log in
            </Button>
            <div className='text-center'>
                <a href='/sign-up'>Sign up</a>
            </div>
        </Form>
    );
}

export default LoginPage;