import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import votes from './votesReducer';
import user from './identifyRoleReducer'

// import comment from './commentReducer';


const rootReducer = combineReducers({
    form: formReducer,
    voteslist: votes,
    // comments: comment
    users: user
})

export default rootReducer;