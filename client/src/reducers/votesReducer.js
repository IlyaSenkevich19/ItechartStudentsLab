const initialState = {
    items: [],
    pageSize: 5,
    totalVotesCount: 0,
    currentPage: 1,
    author: 'none'
}

const getDataSuccess = (state, type) => ({
    ...state,
    items: type     
});

const getNewItems = ( state, data) => {   
    state.items.unshift(data);  
   return {
       ...state
   }
}

const createComment = (state, data) => {
    
    const vote = state.items.filter(item => item._id === data.voteId)[0];
    vote.comments.unshift(data);
    

    return {
        ...state
    }
}

const getAuthor = (state, email) => ({
    ...state,
    author: email
})

const votes = (state = initialState, action) => {
    switch (action.type) {
        case "SET_VOTE":
            return getNewItems(state, action)
        case 'GET_DATA_SUCCESS':
            return getDataSuccess(state, action.payload);
        case 'SET_CURRENT_PAGE': {
            return {
                ...state, currentPage: action.currentPage
            }
        }   ;
        case 'CREATE_COMMENT':
            return createComment(state, action);
        case "GET_AUTHOR":
            return getAuthor(state, action.email) 
        default:
            return state
    }
}

export default votes;