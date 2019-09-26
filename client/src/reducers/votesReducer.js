const initialState = {
    items: [],
    newItems: [],
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
   const { text, endDate, id } = data;
   const item = {}
    item.text = text;
    item.endDate = endDate;
    item.id = id;
    const  newData = state.newItems.push(item);  
   return {
       ...state,
       newData
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
        }   
        case "GET_AUTHOR":
            return getAuthor(state, action.email) 
        default:
            return state
    }
}

export default votes;