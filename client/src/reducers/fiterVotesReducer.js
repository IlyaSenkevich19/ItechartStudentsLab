import { filterVotes } from '../actions/actions'

const FilterVotes = (state = filterVotes.SHOW_ALL, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter
    default:
      return state
  }
}

export default FilterVotes;