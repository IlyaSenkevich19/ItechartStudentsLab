import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import votes from './votesReducer';
import FilterVotes from './fiterVotesReducer';
import role from './identifyRoleReducer';
import comment from './commentReducer';


const rootReducer = combineReducers({
    form: formReducer,
    voteslist: votes,
    filterVotes: FilterVotes,
    roles: role,
    comments: comment
})

export default rootReducer;