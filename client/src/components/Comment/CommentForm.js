import React from 'react';


const CommentForm = props => {

const {comment, handleChange, handleSubmit} = props;
        return (
            <div>
                <input
                    onChange={handleChange}
                    value={comment}
                    placeholder='Type your comment'
                />
                <button onClick={handleSubmit} >add comment</button>
            </div>
        )
    }

export default CommentForm;