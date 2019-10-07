import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import votes from './votesReducer';

// import comment from './commentReducer';


const rootReducer = combineReducers({
    form: formReducer,
    voteslist: votes,
    // comments: comment
})

export default rootReducer;