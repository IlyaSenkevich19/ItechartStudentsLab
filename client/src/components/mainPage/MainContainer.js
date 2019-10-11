import React from 'react';
import { connect } from 'react-redux';

import Main from './Main';

class MainContainer extends React.PureComponent {

    state = {
        votesList: [], 
    }

    filterVotes = e => {
        const { votes } = this.props;
        const btn = e.target.name;
        const active = "ACTIVE";
        const all = 'ALL';
        if (btn === active) {
            const actives = votes.filter(vote => vote.status === true);
            this.setState({ votesList: actives })
        } else if (btn === all) {
            this.setState({ votesList: votes })
        } else {
            const complete = votes.filter(vote => vote.status === false);
            this.setState({ votesList: complete })
        }
    }

    render() {
        const { votesList } = this.state;
        const { votes } = this.props;
        const numberVotes = votes.length;
        return (
            <div className='container-fluid main'>
                <button type="button" name='ALL' onClick={this.filterVotes} className="btn btn-primary">Все Голосования</button>
                <button type="button" name="ACTIVE" onClick={this.filterVotes} className="btn btn-primary">Активные голосования</button>
                <button type="button" name='COMPLETED' onClick={this.filterVotes} className="btn btn-primary">Законченные голосования</button>
                <Main  votes={votes} numberVotes={numberVotes} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    votes: state.voteslist.items,
  
})


export default connect(mapStateToProps, null)(MainContainer);