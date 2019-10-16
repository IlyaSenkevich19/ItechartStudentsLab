import React from 'react';
import Title from './Title';
import CommentFormContainer from '../../containers/CommentFormContainer';
import CommentList from './CommentList';



const CommentArea = props => {

        return (
            <div>
              <Title />  
              <CommentList vote={props.vote}  comments={props.comments} />
              <CommentFormContainer comments={props.comments}  voteId={props.voteId} />
            </div>
        )
    }


export default CommentArea;