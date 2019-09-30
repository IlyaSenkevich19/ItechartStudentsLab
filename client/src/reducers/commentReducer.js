

const initialState = {
    comments: [],
    newComments: []
}

const createComment = (state, comment) => ({

})

const getData = (state, data) => ({
    ...state,
    comment: data
})


 const comment = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_COMMENT':
            return createComment(state, action.payload);
        case "GET_DATA_SUCCESS":
            return getData(state, action.payload)
        default: return state;
    }
}


export default comment;