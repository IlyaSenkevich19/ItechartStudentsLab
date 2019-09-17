import React from 'react';

import Vote from './Vote'


class VotingList extends React.PureComponent {

    render() {
        return (
            <div>
              <Vote />
              <Vote />
              <Vote />
              <Vote />
            </div>
        );
    }
}

export default VotingList;