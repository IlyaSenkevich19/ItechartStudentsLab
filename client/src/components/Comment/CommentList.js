import React from 'react';

import Comment from './Comment';
import { connect } from 'react-redux';
class CommentList extends React.PureComponent {
    render() {
        const comments = this.props.comments;

        // const newComments = this.props.newComments;
        // if (newComments === undefined) { return <div>Loading...</div> } else {
        //     const newComment = newComments.map(comment => <div key={comment.date} ><Comment newComments={comment} /></div>)
            const comment = comments.map(comment => <div key={comment._id}><Comment comments={comment} /></div>)
            return (
                <div className='comment-list'>
                    {/* {newComment} */}
                    {comment}
                </div>
            )
        }
    }

// const mapStateToProps = state => ({
//     newComment: state.comments.newDataComments
// })

export default CommentList;