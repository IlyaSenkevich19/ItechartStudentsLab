

const initialState = {
    items: [],
    newComments: [],
    pageSize: 5,
    totalVotesCount: 0,
    currentPage: 1,
    author: 'none',
}

const getDataSuccess = (state, type) => ({
    ...state,
    items: type     
});

const getNewItems = ( state, data) => {   
    state.items.unshift(data.content);  
   return {
       ...state
   }
}

const createComment = (state, data) => {
    const contentData = data.content;
    const vote = state.items.filter(item => item._id === contentData.voteId)[0];
    vote.comments.unshift(contentData);
    const newData = [];
    newData.unshift(contentData)
   
    return {
        ...state,
        newComments: newData
    }
}

const getVotedPosts = (state, posts) => ({
    ...state,
    posts
});

const setCurrentPage = (state, currentPage) => ({
    ...state,
    currentPage: currentPage

})

const votes = (state = initialState, action) => {
    switch (action.type) {
        case "SET_VOTE":
            return getNewItems(state, action)
        case 'GET_DATA_SUCCESS':
            return getDataSuccess(state, action.payload);
        case 'SET_CURRENT_PAGE': 
            return setCurrentPage(state,action.currentPage);
        case 'CREATE_COMMENT':
            return createComment(state, action); 
        case "VOTED_POSTS": 
            return getVotedPosts(state, action.payload); 
        default:
            return state
    }
}

export default votes;