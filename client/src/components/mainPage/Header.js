import React from 'react';

const Header = () => {
    return (
        <div>
            <nav className='navbar navbar-expand-md navbar-light bg-light sticky-top'>
                <div className='container-fluid'>
                    <div href='#' className='navbar-brad'>Online Voting System</div>
                    <div className='ml-auto buttons'>
                        <button type="button" className="btn btn-primary">Sign Up</button>
                        <button type="button" className="btn btn-primary">Log In</button>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;