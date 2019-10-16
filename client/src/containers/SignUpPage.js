import React from 'react';
import Notifications from 'react-notify-toast';

import { notify } from 'react-notify-toast';
import history from '../history/history'

import FormSignUp from '../components/signUpPage/FormSignUp';
import { host } from '../constants/constants'

class SignUpPage extends React.PureComponent {

    handleSubmit = async (values) => {
        try {
            const rawResponse = await fetch(`${host}/api/user/register`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: values.email, password: values.password, date: values.date })
            });
            const content = await rawResponse.json();
            
            if (!content.error) {
                const fetchEmail = await fetch(`${host}/api/user/email`, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: values.email })
                })
                const res = await fetchEmail.json();
                notify.show(res.msg)
                setTimeout(()=>history.push('/log-in'), 4000);
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