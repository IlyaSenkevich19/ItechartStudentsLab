import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import votes from './votesReducer';
import FilterVotes from './fiterVotesReducer';
import role from './identifyRoleReducer';


const rootReducer = combineReducers({
    form: formReducer,
    voteslist: votes,
    filterVotes: FilterVotes,
    roles: role
})

export default rootReducer;