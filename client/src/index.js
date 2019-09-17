import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
// import App from './components/mainPage/App';
import './App.css'
import * as serviceWorker from './serviceWorker';
import LoginPage from './components/loginPage/LoginPage'

ReactDOM.render(<LoginPage />, document.getElementById('root'));


serviceWorker.unregister();
