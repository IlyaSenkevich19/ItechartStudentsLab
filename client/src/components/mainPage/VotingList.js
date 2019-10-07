import React from 'react';

import Vote from './Vote';


class VotingList extends React.PureComponent {
    render() {
        const voteInfo = this.props.voteList;
            const listVote = voteInfo.map(vote =>  <div key={vote._id} > <Vote   vote={vote} />   </div> );
            return (
                <div className='listDay'>
                { listVote ?
                    <div className='main'> 
                        {listVote}
                    </div> : <p className='error'>ERROR</p>
                }
            </div>
            )
        }
    }


export default VotingList;