import React from 'react';
import Title from './Title';
import CommentForm from './CommentForm';
import CommentList from './CommentList';



class CommentArea extends React.PureComponent {


    render() {
        return (
            <div>
              <Title />  
              <CommentList comments={this.props.comments} />
              <CommentForm comments={this.props.comments}  voteId={this.props.voteId} />
            </div>
        )
    }
}

export default CommentArea;