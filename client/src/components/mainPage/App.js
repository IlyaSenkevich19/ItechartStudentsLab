import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import { connect } from 'react-redux';


class App extends React.PureComponent {
  render() {
    const { roles } = this.props;
    console.log(roles)
    if (roles && roles === 'admin') {
       return <Redirect to='/admin' />
    } else {
      return (
        <div>
          <Header />
          <Main />
          <Footer />
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  roles: state.roles.role
})


export default connect(mapStateToProps, null)(App);