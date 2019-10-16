import React from 'react';
import { connect } from "react-redux";

import { userService } from '../components/services/userService';
import {  fetchDate } from '../actions/actions';
import { authService } from '../components/services/authService';
import io from "socket.io-client";
import { Role } from '../components/role';
import { host } from '../constants/constants';
import CommentForm from '../components/Comment/CommentForm'

class CommentFormContainer extends React.Component {

    state = {
        comment: ''
    }

    socket = io(`${host}`);

    handleChange = e => {
        this.setState({
            comment: e.target.value
        })
    }

    handleSubmit = async () => {
        const date = Date.now();
        const author = authService.currentUser.email;
        const comment = await userService.createComment(this.state.comment, date, author, this.props.voteId)
        const setComment = comment.comment;
        
        this.socket.emit('SEND_MESSAGE', {
            setComment
        })
       this.setState({
           comment: ''
       })

    }

    componentDidMount = () => {
        this.socket.on("RECEIVE_MESSAGE", () => {
            this.props.fetchData(`${host}/api/vote`);
        })
    }

    render() {
        return (
          
            <div>
                  {authService.currentUser.role === Role.NonUser ? <div>Log in to comment</div> : <div>
                    <CommentForm 
                    handleChange={this.handleChange}
                    comment={this.state.comment}
                    handleSubmit={this.handleSubmit}
                    />
                </div>}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
   fetchData: data => dispatch(fetchDate(data))
})

export default connect(null, mapDispatchToProps)(CommentFormContainer);