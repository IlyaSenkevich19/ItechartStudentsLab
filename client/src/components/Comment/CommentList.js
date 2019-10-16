import React from 'react';

import CommentContainer from '../../containers/CommentContainer';

const CommentList = props => {
        const comments = props.comments;
        if(comments === undefined ) { return <div>Комментариев нет</div> } else {
            const comment = comments.map(comment => <div key={comment._id}><CommentContainer vote={props.vote} comments={comment} /></div>)
            return (
                <div className='comment-list'>
                    {comment}
                </div>
            )
        }
    }

export default CommentList;