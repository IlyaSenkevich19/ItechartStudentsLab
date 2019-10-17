import React from 'react';
import Notifications from 'react-notify-toast';

import { notify } from 'react-notify-toast';
import history from '../history/history';
import { authService } from '../components/services/authService'

import FormSignUp from '../components/signUpPage/FormSignUp';


class SignUpPage extends React.PureComponent {

    handleSubmit = async values => {
        try {
            const content = await authService.register(values);
            if (!content.error) {
                const res = await authService.fetchEmail(values.email);
                notify.show(res.msg)
                setTimeout(() => history.push('/log-in'), 4000);
            } else {
                notify.show(content.error);
            }
        } catch (error) {
            console.log(error)
        }
    }


    render() {
        return (
            <div>
                <FormSignUp onSubmit={this.handleSubmit} />
                <Notifications />
            </div>
        );
    }
}

export default SignUpPage;