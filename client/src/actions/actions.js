
export const createVote = (id, text, isCompleted) => ({
    type: "CREATE_VOTE",
    id,
    text,
    isCompleted
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