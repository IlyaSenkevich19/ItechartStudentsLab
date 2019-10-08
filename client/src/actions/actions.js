export const setVote = (text, startDate, endDate, id, author) => ({
    type: "SET_VOTE",
    text,
    startDate,
    endDate,
    id,
    author
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

export const setComments = (author, date, text, voteId) => ({
    type: "CREATE_COMMENT",
    author,
    date,
    text,
    voteId
});



export const fetchDate = url => dispatch => {
    const token = localStorage.getItem('currentUser')
    fetch(url, {
        mode: 'cors',
        headers: {
            'Content-Type': ["image/png", 'application/json'],
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


