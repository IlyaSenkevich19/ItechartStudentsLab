import { API_REQUEST } from 'redux-middleware-fetch';
import * as types from '../constants/ActionTypes';


export const fetchProducts = () => ({
    [API_REQUEST]: {
      types: [
        types.GET_DATA_SUCCESS,
      ],
      entrypoint: '/products',
      auth: true,
      method: 'GET',
    },
  });