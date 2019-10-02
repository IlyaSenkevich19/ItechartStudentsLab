import React from 'react';

import FormSignUp from './FormSignUp'

class SignUpPage extends React.PureComponent {

    handleSubmit = async (values) => {
        try {
            const rawResponse = await fetch('http://localhost:8000/api/user/register', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: values.email, password: values.password, date: values.date })
            });
            const content = await rawResponse.json();
            window.alert(content.details[0].message);
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <div>
                <FormSignUp onSubmit={this.handleSubmit} />
            </div>
        );
    }
}

export default SignUpPage;