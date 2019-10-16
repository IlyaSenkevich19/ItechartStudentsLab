import * as types from '../constants/ActionTypes';

export const setVote = content => ({ type: types.SET_VOTE, content});
export const votedPosts = posts => ({ type: types.VOTED_POSTS,  payload: posts});
export const toggleVote = toggle => ({type: types.TOGGLE_VOTE, payload: toggle});
export const getDataSuccess = type => ({type: types.GET_DATA_SUCCESS, payload: type});
export const currentPage = currentPage => ({type: types.SET_CURRENT_PAGE, currentPage});
export const setComments = content => ({type: types.CREATE_COMMENT, content});
export const getUsersToBlock = user => ({type: types.GET_USERS_TO_BLOCK, user});
export const chosenVote = id => ({type: types.CHOSEN_VOTE, id});
export const searchVote = vote => ({type: types.SEARCH_VOTE, vote});

export const fetchDate = url => dispatch => {
    const token = localStorage.getItem('currentUser')
    fetch(url, {
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "auth-token": `Bearer ${token}`,
        }
    }).then(response => response.json())
        .then(data => dispatch(getDataSuccess(data)))
        .catch(err => console.log(err))
}


