const initialState = {
    role: 'none-user', 
}

const getRole = (state, role) => ({
   ...state,
   role: role,
});


const role = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ROLE":
            return getRole(state, action.role)
        default:
            return state
    }
}

export default role;