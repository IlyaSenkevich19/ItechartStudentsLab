import React from 'react';

import { Collapse, Button, CardBody, Card } from 'reactstrap';
import CommetArea from '../Comment/CommentArea';

import { Role } from '../role';

const Vote = props => {
    const { author,
        text,
        curUser,
        vote,
        statusVote,
        toggle,
        collapse,
        daysToFinishVote,
        count,
        disablePost,
        toVote,
        comments,
        _id
    } = props;
    return (
        <div >
            <div className='row jumbotron '>
                <div className='author-block '>
                    <div className='lead'> Author of the vote is {author}</div>
                    <div className='lead'> The vote: {text}</div>
                </div>
                {((curUser.role === Role.User || curUser.role === Role.NonUser) && vote.blockStatus) ? <div>This post is blocked by admin</div> : <div>
                    <div className=' col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-2'>
                        {statusVote ? <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>Info</Button> : <div>Voting is over</div>}
                    </div>
                    <Collapse isOpen={collapse}>
                        <Card className='card'>
                            <CardBody>
                                <div>Until the end of the vote, there are: {daysToFinishVote} day</div>
                                <div>Total number of votes: {count}</div>
                                {disablePost ? <div>You cast your vote!</div> : <Button color="danger" className='creating-button' onClick={toVote}>to vote</Button>}
                            </CardBody>
                        </Card>
                    </Collapse>
                    <CommetArea vote={vote} comments={comments} voteId={_id} />
                </div>}
            </div>
        </div>
    );
}






export default Vote;