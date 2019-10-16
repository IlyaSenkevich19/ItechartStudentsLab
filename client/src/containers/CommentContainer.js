import React from 'react';

import { authService } from '../components/services/authService';

import { connect } from "react-redux";
import Comment from '../components/Comment/Comment'

import { fetchDate } from '../actions/actions';

import io from "socket.io-client";
import { host } from '../constants/constants'


class CommentContainer extends React.PureComponent {
    state = {
        visible: true
    }
    socket = io(`${host}`);

    onDismiss = async (voteId, commentId) => {
        const res = await authService.deleteComment(voteId, commentId);
        this.socket.emit('SEND_MESSAGE')
        console.log(res);
        this.props.fetchData(`${host}/api/vote`);   
    }

    render() {
        const comment = this.props.comments;
        const curRole = authService.currentUser.role;
        const { vote } = this.props;
        return (
            <div>
            <Comment 
               comment={comment}
               curRole={curRole}
               vote={vote}
               onDismiss={this.onDismiss}
               visible={this.state.visible}
            />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    fetchData: data => dispatch(fetchDate(data))
 })



export default connect(null, mapDispatchToProps)(CommentContainer);