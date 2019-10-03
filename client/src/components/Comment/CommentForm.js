import React from 'react';
import { connect } from "react-redux";

import { userService } from '../services/userService';
import { setComments } from '../../actions/actions';
import { authService } from '../services/authService'

class CommentForm extends React.PureComponent {

    state = {
        comment: ''
    }

    handleChange = e => {
        this.setState({
            comment: e.target.value
        })
    }

    handleSubmit = async () => {
        const date = Date.now();
        const author = authService.currentUser.email;
        const comment = await userService.createComment(this.state.comment, date, author, this.props.voteId)
        this.props.setComment(comment.author, comment.date, comment.text);

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
   setComment: (author, date, text) => dispatch(setComments(author, date, text))
})

export default connect(mapDispatchToProps, null)(CommentForm);