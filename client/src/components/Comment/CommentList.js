import React from 'react';

import Comment from './Comment';

class CommentList extends React.PureComponent {
    render() {
        const comments = this.props.comments;
            const comment = comments.map(comment => <div key={comment._id}><Comment comments={comment} /></div>)
            return (
                <div className='comment-list'>
                    {comment}
                </div>
            )
        }
    }



export default CommentList;