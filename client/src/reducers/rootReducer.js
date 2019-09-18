import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import votes from './votesReducer';
import FilterVotes from './fiterVotesReducer'


const rootReducer = combineReducers({
    form: formReducer,
    voteslist: votes,
    filterVotes: FilterVotes
})

export default rootReducer;