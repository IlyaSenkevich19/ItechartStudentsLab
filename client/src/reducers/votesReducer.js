

const votes = (state = [], action) => {
    switch (action.type) {
        case "CREATE_VOTE":
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: action.isCompleted
                }
            ]
        case "TOGGLE_VOTE":
            return state.map(vote =>
                vote.id === action.id ? { ...vote, completed: !vote.completed } : vote
            )
        default:
            return state
    }
}

export default votes;