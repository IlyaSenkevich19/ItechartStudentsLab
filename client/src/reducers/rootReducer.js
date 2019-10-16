import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import votes from './votesReducer';
import user from './identifyRoleReducer'

const rootReducer = combineReducers({
    form: formReducer,
    voteslist: votes,
    users: user
})

export default rootReducer;