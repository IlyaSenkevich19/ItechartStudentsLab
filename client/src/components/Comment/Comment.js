import React from 'react'


class Comment extends React.PureComponent {
    state={
       commets: [],
       voteName: null,
       author: null
    }

    render() {
        return (
            <div>
                Comment
            </div>
        )
    }
}

export default Comment;