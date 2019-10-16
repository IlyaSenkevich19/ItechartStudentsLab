import React from 'react';

import VoteContainer from '../../containers/VoteContainer';

const VotingList = props => {

    const voteInfo = props.voteList;
    const searchVote = props.searchVote;

    const listVote = voteInfo.map(vote => <div key={vote._id} > <VoteContainer vote={vote} />   </div>);
    return (
        <div className='listDay'>
            {listVote ?
                <div className='main'>
                    {listVote}
                </div> : <p className='error'>ERROR</p>
            }
        </div>
    )
}



export default VotingList;