import React from 'react';
import { Alert } from 'reactstrap';

import { Role } from '../role';

const Comment = props => {

 const { curRole, vote, comment, onDismiss, visible } = props;
        return (
            <div>
                {comment ?
                    <div>
                        {curRole === Role.Admin || curRole === Role.Moderator ? <Alert color="info" isOpen={visible} toggle={() => onDismiss(vote._id, comment._id)}>
                            <div>{comment.author}</div><div>Comment: {comment.text}</div>
                        </Alert> : <Alert color="info">
                                <div>{comment.author}</div><div>Comment: {comment.text}</div>
                            </Alert>}
                    </div> : <p className='error'>There is no comments for that voting</p>
                }
            </div>
        )
    }





export default Comment;