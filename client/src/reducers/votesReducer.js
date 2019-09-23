

const votes = (state = [], action) => {
    switch (action.type) {
        case "SET_VOTE":
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    endDate: action.endDate
                }
            ]
        default:
            return state
    }
}

export default votes;