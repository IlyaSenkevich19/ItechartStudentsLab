const initialState = {
   
    usersToBlock: []
}



const getUsersToBlock = (state, user) => {
    state.usersToBlock.unshift(user);
    return {
        ...state
    }
}


const user = (state = initialState, action) => {
    switch (action.type) {
        case "GET_USERS_TO_BLOCK":
            return getUsersToBlock(state, action.user)
        default:
            return state
    }
}

export default user;