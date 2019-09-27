import React from 'react';

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import history from '../../history/history'
import { connect } from 'react-redux';
import { getRole, setAuthor } from '../../actions/actions';
import { Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

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

    login = async () => {
        const rawResponse = await fetch('http://localhost:8000/api/user/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: this.state.email, password: this.state.password })
        });
        const content = await rawResponse.json();
        localStorage.setItem('currentUser', JSON.stringify(content));
        const token = jwt_decode(content);
        this.props.setRoles(token.role);
        this.props.setAuthor(token.email)
    };

    render() {
        const { roles } = this.props;
        if (roles && roles === 'admin') { return <Redirect to='/admin' /> }
        else if (roles === 'user') { return <Redirect to='/' /> } else
            if (roles === 'moderator') { return <Redirect to='/moderator' /> }
            else {
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
                        <Button onClick={this.login} className='btn-lg btn-dark btn-block'>
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

const mapStateToProps = state => ({
    roles: state.roles.role
})

const mapDispatchToProps = dispatch => ({
    setRoles: role => dispatch(getRole(role)),
    setAuthor: email => dispatch(setAuthor(email))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);