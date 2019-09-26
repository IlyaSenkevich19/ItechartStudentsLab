import React from 'react';

import history from '../../history/history';
import { getRole } from '../../actions/actions';
import { connect } from 'react-redux'; 

class Header extends React.PureComponent {

    onLoginPage = () => {
        history.push('/log-in');
    }

    onSignupPage = () => {
        history.push('/sign-up');
    }

    logout = () => {
        localStorage.removeItem('currentUser');
        this.props.setRoles('non-user');
        history.push('/log-in');
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

const mapDispatchToProps = dispatch => ({
    setRoles: role => dispatch(getRole(role))
})

export default connect(null, mapDispatchToProps)(Header);