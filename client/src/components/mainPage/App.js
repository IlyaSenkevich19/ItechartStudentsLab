import React from 'react';

import Header from './Header';
import MainContainer from './MainContainer';
import Footer from './Footer';




class App extends React.PureComponent {
  render() {
      return (
        <div>
          <Header />
          <MainContainer />
          <Footer />
        </div>
      );
    }
  }

export default App;