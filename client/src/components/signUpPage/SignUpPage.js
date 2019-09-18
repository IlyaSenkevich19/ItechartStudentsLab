import React from 'react';

import FormSignUp from './FormSignUp'

class SignUpPage extends React.PureComponent {

    handleSubmit = values => {
       console.log(JSON.stringify(values));
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