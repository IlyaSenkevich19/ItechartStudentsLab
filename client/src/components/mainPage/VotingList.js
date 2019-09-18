import React from 'react';

import Vote from './Vote'


class VotingList extends React.PureComponent {

    

    render() {
        const { votes } = this.props.voteList;
        if (votes === undefined) {
            return (<div>LOADING</div>)
        } else {

            console.log(votes[0])
            return (
                <div>
                    <Vote vote={votes[0]} />
                </div>
            )
        }
    }
}





export default VotingList;