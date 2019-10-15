import React from 'react';
import { Alert } from 'reactstrap';
import { authService } from '../services/authService';
import { Role } from '../role';
import { connect } from "react-redux";

import { fetchDate } from '../../actions/actions';

import io from "socket.io-client";


class Comment extends React.PureComponent {
    state = {
        visible: true
    }
    socket = io('http://localhost:8000');

    onDismiss = async (voteId, commentId) => {
        const res = await authService.deleteComment(voteId, commentId);
        this.socket.emit('SEND_MESSAGE')
        console.log(res);
        this.props.fetchData(`http://localhost:8000/api/vote`);   
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

const mapDispatchToProps = dispatch => ({
    fetchData: data => dispatch(fetchDate(data))
 })



export default connect(null, mapDispatchToProps)(Comment);