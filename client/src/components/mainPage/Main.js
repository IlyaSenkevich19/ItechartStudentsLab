import React from 'react';

import CreateVoting from '../createVotingPage/CreateVoting';
import VotingList from './VotingList'

class Main extends React.PureComponent {


    render() {
        return (
            <div className='container-fluid main'>
                <CreateVoting />
                <VotingList />
            </div>
        )
    }
}

export default Main;