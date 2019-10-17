import React from 'react';
import { connect } from 'react-redux';
import history from '../history/history';
import { captchaService } from '../components/services/captchaService'
import Captcha from '../components/CaptchaPage/Captcha';


class CaptchaContainer extends React.PureComponent {

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
        const res = await captchaService.fetchEmail(this.emailEnter.value, this.props.voteId);
        alert('Confirm your email', res);
        history.replace('/');
    }

    render() {

        return (
            <div >
                <form onSubmit={this.handleClick}>
                    <input type='text' className={'xxx'} ref={ref => this.captchaEnter = ref} />
                    {this.state.statusCaptcha === true ? <div>
                        <input type='email' ref={ref => this.emailEnter = ref} />
                        <button onClick={this.submit} >To Vote!</button>
                    </div> : <div></div>}
                </form>
             <Captcha 
              result={this.result}
             />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    voteId: state.voteslist.chosenVote,
})

export default connect(mapStateToProps, null)(CaptchaContainer);