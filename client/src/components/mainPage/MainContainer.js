import React from 'react';
import { connect } from 'react-redux';

import Main from './Main';
import io from "socket.io-client";
import { setVote, fetchDate, searchVote} from '../../actions/actions';

class MainContainer extends React.PureComponent {

    state = {
        votesList: [], 
    }
    socket = io('http://localhost:8000');

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
    componentDidMount = () => {
        this.socket.on("RECEIVE_MESSAGE", () => {
            this.props.fetchData(`http://localhost:8000/api/vote`);
        })
    }

    render() {
        let { votesList } = this.state;
        const { votes, searchVote } = this.props;
        const numberVotes = votes.length;
        const searchVotes = votesList.filter(vote => vote.text.includes(searchVote) )
        return (
            <div className='container-fluid main'>
                <div className='btns'>
                <button type="button" name='ALL' onClick={this.filterVotes} className="btn filter-btn btn-primary">All Votings</button>
                <button type="button" name="ACTIVE" onClick={this.filterVotes} className="btn filter-btn btn-primary">Active Votings</button>
                <button type="button" name='COMPLETED' onClick={this.filterVotes} className="btn filter-btn btn-primary">Finished Votings</button>
                </div>
                <Main  
                votes={votes} 
                numberVotes={numberVotes}
                 />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    votes: state.voteslist.items,
    searchVote: state.voteslist.searchVote
  
})
const mapDispatchToProps = dispatch => ({
    fetchData: data => dispatch(fetchDate(data)),
})


export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);