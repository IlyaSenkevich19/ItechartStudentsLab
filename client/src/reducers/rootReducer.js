import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import votes from './votesReducer';
import FilterVotes from './fiterVotesReducer';
import comment from './commentReducer';


const rootReducer = combineReducers({
    form: formReducer,
    voteslist: votes,
    filterVotes: FilterVotes,
    comments: comment
})

export default rootReducer;