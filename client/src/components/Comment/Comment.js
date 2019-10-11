import React from 'react';
import { Alert } from 'reactstrap';
import { authService } from '../services/authService';
import { Role } from '../role';


class Comment extends React.PureComponent {
    state = {
        visible: true
    }

    onDismiss = async (voteId, commentId) => {
        const res = await authService.deleteComment(voteId, commentId);
        console.log(res);
    }

    render() {
        const comment = this.props.comments;
        const curRole = authService.currentUser.role;
        const { vote } = this.props;
        return (
            <div>
                {comment ?
                    <div>
                        {curRole === Role.Admin || curRole === Role.Moderator ? <Alert color="info" isOpen={this.state.visible} toggle={() => this.onDismiss(vote._id, comment._id)}>
                            <div>{comment.author}</div><div>Comment: {comment.text}</div>
                        </Alert> : <Alert color="info">
                                <div>{comment.author}</div><div>Comment: {comment.text}</div>
                            </Alert>}
                    </div> : <p className='error'>There is no comments for that voting</p>
                }
            </div>
        )
    }
}



export default Comment;