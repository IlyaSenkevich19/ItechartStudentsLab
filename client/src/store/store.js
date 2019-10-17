import { createStore, applyMiddleware } from "redux";
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import fetchMiddleware from 'redux-middleware-fetch';

const store = createStore(rootReducer, applyMiddleware(thunk, logger, fetchMiddleware));

export default store;

