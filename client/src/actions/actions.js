
export const setVote = (text, endDate, id) => ({
    type: "SET_VOTE",
    text,
    endDate,
    id
})

export const setFilter = filter => ({
    type: "SET_FILTER",
    payload: filter
})

export const toggleVote = toggle => ({
    type: 'TOGGLE_VOTE',
    payload: toggle
})

export const filterVotes = {
    SHOW_COMPLETED: "SHOW_COMPLETED",
    SHOW_ACTIVE: "SHOW_ACTIVE",
    SHOW_ALL: "SHOW_ALL"
}

export const getRole = role => ({
    type: "GET_ROLE",
    role,
})

export const setAuthor = email => ({
    type: "GET_AUTHOR",
    email
})

export const getDataSuccess = type => ({
    type: "GET_DATA_SUCCESS",
    payload: type
})

export const currentPage = currentPage => ({
    type: "SET_CURRENT_PAGE",
    currentPage
})

export const setComments = (author, date, text) => ({
    type: "SET_COMMENT",
    author,
    date,
    text
})

export const fetchDate = url => dispatch => {
    fetch(url, {
        mode: 'cors',
        headers: {
            'Content-Type': ["image/png", 'application/json'],
            'Accept': 'application/json',
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

export const fetchComments = url => dispatch => {
    fetch(url, {
        mode: 'cors',
        headers: {
            'Content-Type': ["image/png", 'application/json'],
            'Accept': 'application/json',
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
