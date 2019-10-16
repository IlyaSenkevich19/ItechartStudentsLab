import React from 'react';
import RCG from 'react-captcha-generator';
import { connect } from 'react-redux';
import history from '../../history/history';
import { host } from '../../constants/constants'

class Captcha extends React.PureComponent {

    state = {
        captcha: '',
        email: '',
        statusCaptcha: false
    }


    result = text => {
        this.setState({
            captcha: text
        })
    }

    check = () => {
        if (this.state.captcha === this.captchaEnter.value) {
            this.setState({
                statusCaptcha: true
            })
        }
    }

    handleClick = e => {
        e.preventDefault();
        this.check()
    }

    submit = async () => {
        const fetchEmail = await fetch(`${host}/api/user/email/captcha`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: this.emailEnter.value, voteId: this.props.voteId })
        });
        const res = await fetchEmail.json();
        alert('Confirm your email', res);
        history.replace('/');
    }

    render() {

        return (
            <div className="captcha">
                <form onSubmit={this.handleClick}>
                    <input type='text' className={'xxx'} ref={ref => this.captchaEnter = ref} />
                    {this.state.statusCaptcha === true ? <div>
                        <input type='email' ref={ref => this.emailEnter = ref} />
                        <button onClick={this.submit} >Проголосовать!</button>
                    </div> : <div></div>}
                </form>
                <RCG result={this.result} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    voteId: state.voteslist.chosenVote,
})

export default connect(mapStateToProps, null)(Captcha);