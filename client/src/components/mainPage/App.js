import React from 'react';

import Header from './Header';
import MainContainer from './MainContainer';





class App extends React.PureComponent {
  render() {
      return (
        <div>
          <Header />
          <MainContainer />
        </div>
      );
    }
  }

export default App;