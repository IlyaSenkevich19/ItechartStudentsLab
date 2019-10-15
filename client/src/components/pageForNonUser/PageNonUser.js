import React from 'react';

import history from '../../history/history';

import MainContainer from '../mainPage/MainContainer'



class PageNonUser extends React.PureComponent {

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

 

    render() {
       
        return (
            <div>
                <div>
                    <nav className='navbar'>
                        <div className='container-fluid'>
                            <div href='#' className='navbar-brad'>Online Voting System</div>
                            <div className='ml-auto buttons'>
                                <button onClick={this.onSignupPage} type="button" className="btn btn-primary">Sign Up</button>
                                <button onClick={this.onLoginPage} type="button" className="btn btn-primary">Log In</button>
                            </div>
                        </div>
                    </nav>
                </div>
                <MainContainer />
            </div>
        )
    }
}



export default PageNonUser;