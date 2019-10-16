import React from 'react';
import { connect } from "react-redux";

import { userService } from '../services/userService';
import { setComments, fetchDate } from '../../actions/actions';
import { authService } from '../services/authService';
import io from "socket.io-client";
import { Role } from '../role';
import { host } from '../../constants/constants'

class CommentForm extends React.Component {

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
                <input
                    onChange={this.handleChange}
                    value={this.state.comment}
                    placeholder='Type your comment'
                />
                <button onClick={this.handleSubmit} >add comment</button>
                </div>}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
   fetchData: data => dispatch(fetchDate(data))
})

export default connect(null, mapDispatchToProps)(CommentForm);