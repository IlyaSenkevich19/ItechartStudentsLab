import React from 'react';
import { Alert } from 'reactstrap';


class Comment extends React.PureComponent {
    state = {
        visible: true
    }
    
    onDismiss = () => {
        this.setState({ visible: false });
    }

    render() {
        const comment = this.props.comments;
        return (
            <div>
                {comment ?
                    <div>
                        <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
                            <div>{comment.author}</div><div>Comment: {comment.text}</div>
                        </Alert>
                    </div> : <p className='error'>There is no comments for that voting</p>
                }
            </div>
        )
    }
}



export default Comment;