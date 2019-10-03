

const initialState = {
    comments: [],
    newComments: []
}

const createComment = (state, text, date, author) => {
    const comment = {};
    comment.text = text;
    comment.date = date;
    comment.author = author;
    const newDataComments = state.newComments.push(comment);
    return {
        ...state,
        newDataComments
    }
}

const getData = (state, data) => ({
    ...state,
    comment: data
})


const comment = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_COMMENT':
            return createComment(state, action.text, action.date, action.author);
        case "GET_DATA_SUCCESS":
            return getData(state, action.payload)
        default: return state;
    }
}


export default comment;