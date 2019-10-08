import React from 'react';
import { connect } from "react-redux";

import { userService } from '../services/userService';
import { setComments } from '../../actions/actions';
import { authService } from '../services/authService';
import io from "socket.io-client";

class CommentForm extends React.PureComponent {

    state = {
        comment: ''
    }

    socket = io('http://localhost:8000');



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
            author: setComment.author,
            text: setComment.text,
            voteId: setComment.voteId,
            date: setComment.date,
            _id: setComment._id
        })

       this.setState({
           comment: ''
       })

    }

    componentDidMount =() => {
        this.socket.on("RECEIVE_MESSAGE", data => {
            this.props.setComment(data.author, data.date, data.text, data.voteId, data._id );
        })
    }


    render() {



        return (
            <div>
                <input
                    onChange={this.handleChange}
                    value={this.state.comment}
                    placeholder='Type your comment'
                />

                <button onClick={this.handleSubmit} >add comment</button>
            </div>
        )
    }
}



const mapDispatchToProps = dispatch => ({
   setComment: (author, date, text, voteId) => dispatch(setComments(author, date, text, voteId))
})

export default connect(null, mapDispatchToProps)(CommentForm);