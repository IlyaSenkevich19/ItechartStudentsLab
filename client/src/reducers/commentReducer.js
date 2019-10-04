

const initialState = {
    comments: [],
    newComments: []
}

const createComment = (state, text, date, author) => {
    const comment = {};
    comment.text = text;
    comment.date = date;
    comment.author = author;
    state.comments.unshift(comment);
    return {
        ...state
    }
}




const comment = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_COMMENT':
            return createComment(state, action.text, action.date, action.author);
  
        default: return state;
    }
}


export default comment;