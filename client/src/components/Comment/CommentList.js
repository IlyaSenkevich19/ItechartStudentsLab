import React from 'react';

import Comment from './Comment';

class CommentList extends React.PureComponent {
    render() {
        const comments = this.props.comments;
   
        if(comments === undefined ) { return <div>Комментариев нет</div> } else {
          
            const comment = comments.map(comment => <div key={comment._id}><Comment vote={this.props.vote} comments={comment} /></div>)
   
            return (
                <div className='comment-list'>
                  
                    {comment}
                </div>
            )
        }
    }
}



export default CommentList;