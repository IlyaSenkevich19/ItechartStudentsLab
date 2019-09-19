const initialState = {
    role: 'user'
}

const getRole = (state, role) => ({
   ...state,
   role: role
});


const role = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ROLE":
            return getRole(state, action.payload)
        default:
            return state
    }
}

export default role;