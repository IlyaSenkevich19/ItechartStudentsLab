import React from 'react';

import history from '../../history/history'

class Header extends React.PureComponent {

    onLoginPage = () => {
        history.push('/log-in');
    }

    onSignupPage = () => {
        history.push('/sign-up');
    }

    render() {
        return (
            <div>
                <nav className='navbar navbar-expand-md navbar-light bg-light sticky-top'>
                    <div className='container-fluid'>
                        <div href='#' className='navbar-brad'>Online Voting System</div>
                        <div className='ml-auto buttons'>
                            <button onClick={this.onSignupPage}  type="button" className="btn btn-primary">Sign Up</button>
                            <button onClick={this.onLoginPage} type="button" className="btn btn-primary">Log In</button>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;