import React from 'react';

import Vote from './Vote'


class VotingList extends React.PureComponent {

    

    render() {
       const voteInfo = this.props.voteList;

   
            return (
                <div>
                    <Vote vote={voteInfo} />
                
                </div>
            )
        }
    }






export default VotingList;