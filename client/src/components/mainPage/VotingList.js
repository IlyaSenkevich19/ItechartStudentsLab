import React from 'react';

import Vote from './Vote';


class VotingList extends React.PureComponent {
    render() {
        const voteInfo = this.props.voteList;
        const dataVotes = this.props.dataVotes;       
        if (dataVotes === undefined) { return (<div>Loading</div>) } else {
            const dataVotesList = dataVotes.map(vote => <div key={vote._id} > <Vote   vote={vote} /> </div> );
            const listVote = voteInfo.map(vote =>  <div key={vote._id} > <Vote   vote={vote} />   </div> );
            return (
                <div className='listDay'>
                { dataVotesList ?
                    <div className='main'>
                        {dataVotesList}
                        {listVote}
                    </div> : <p className='error'>ERROR</p>
                }
            </div>
            )
        }
    }
}

export default VotingList;