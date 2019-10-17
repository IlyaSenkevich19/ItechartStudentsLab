import React from 'react';

import { Button, Form, FormGroup, Label } from 'reactstrap';

import { Field, reduxForm } from 'redux-form';
import history from '../../history/history';
import { myInput } from './Field/index';
import { validate } from '../../validation/index';

class FormSignUp extends React.PureComponent {

    onLoginPage = () => {
        history.push('/log-in');
    }

    render() {
        const { handleSubmit } = this.props
        return (
            <Form className='login-form'  onSubmit={handleSubmit}>
                <h1 className='text-center'>
                    <span className='font-weight-bold'>Online Voting System</span>
                </h1>
                <h2 className='text-center'>Welcom</h2>
                <hr />
                <FormGroup>
                    <Label>Email</Label>
                    <br />
                    <Field
                        name='email'
                        component={myInput}
                        type='email'
                        placeholder='Enter your email address'
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <br />
                    <Field
                        name='password'
                        component={myInput}
                        type='password'
                        placeholder='Enter your password'

                    />
                </FormGroup>
                <FormGroup>
                    <Label>Confirm Password</Label>
                    <br />
                    <Field
                        name='confirmPassword'
                        component={myInput}
                        type='password'
                        placeholder='Confirm Password'
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Date of Birth</Label>
                    <br />
                    <Field
                        name='date'
                        component={myInput}
                        type='date'
                        dateFormat="DD-MM-YYYY"
                        placeholder='Enter your date of birth'
                    />
                </FormGroup>
                <Button type='submit' label='submit' className='btn-lg btn-dark btn-block'>
                    Sign Up
                </Button>
                <div className='text-center'>
                    <div className='links' onClick={this.onLoginPage} href='/log-in'>Log In</div>
                </div>
            </Form>
        );
    }
}

FormSignUp = reduxForm({
    form: 'login',
    validate
})(FormSignUp)

export default FormSignUp;