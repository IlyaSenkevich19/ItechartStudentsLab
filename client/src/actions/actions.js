
export const setVote = (text, endDate) => ({
    type: "SET_VOTE",
    text,
    endDate
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
    payload: role
})