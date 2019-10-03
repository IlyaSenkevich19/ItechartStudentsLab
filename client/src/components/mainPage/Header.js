import React from 'react';
import history from '../../history/history';

class Header extends React.PureComponent {

    onLoginPage = () => {
        localStorage.removeItem('currentUser');
        history.push('/log-in');
        window.location.reload();
    }

    onSignupPage = () => {
        localStorage.removeItem('currentUser');
        history.push('/sign-up');
        window.location.reload();
    }

    logout = () => {
        localStorage.removeItem('currentUser');
        history.push('/log-in');
        window.location.reload();
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
                            <button onClick={this.logout} type="button" className="btn btn-primary">Log Out</button>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header;