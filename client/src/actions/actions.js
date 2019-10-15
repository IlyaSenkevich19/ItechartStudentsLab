export const setVote = content => ({
    type: "SET_VOTE",
    content
})


export const votedPosts = posts => ({
    type: "VOTED_POSTS",
    payload: posts
})

export const toggleVote = toggle => ({
    type: 'TOGGLE_VOTE',
    payload: toggle
})


export const getDataSuccess = type => ({
    type: "GET_DATA_SUCCESS",
    payload: type
})

export const currentPage = currentPage => ({
    type: "SET_CURRENT_PAGE",
    currentPage
})

export const setComments = content => ({
    type: "CREATE_COMMENT",
    content
});

export const getUsersToBlock = user => ({
    type: 'GET_USERS_TO_BLOCK',
    user
})
export const chosenVote = id => ({
    type: 'CHOSEN_VOTE',
    id
})

export const searchVote = vote => ({
    type: "SEARCH_VOTE",
    vote
})





export const fetchDate = url => dispatch => {
    const token = localStorage.getItem('currentUser')
    fetch(url, {
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "auth-token": `Bearer ${token}`,
        }
    }).then(response => {
        if (!response.ok) {
            throw Error(response.statusText)
        }
        return response;
    }).then(response => response.json())
        .then(data => dispatch(getDataSuccess(data)))
        .catch(err => console.log(err))
}


