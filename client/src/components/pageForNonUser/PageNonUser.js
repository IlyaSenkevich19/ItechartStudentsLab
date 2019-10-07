import React from 'react';
import { connect } from 'react-redux';

import { fetchDate } from '../../actions/actions';

import PaginationPage from '../mainPage/Pagination';
import Header from '../mainPage/Header';
import VotingList from '../mainPage/VotingList';



class PageNonUser extends React.PureComponent {

    state = {
        voteText: '',
        startDate: '',
        endDate: '',
        currentPage: 1,
        votesPerPage: 3,
        author: null
    }

    paginate = pageNumber => {
        this.setState({
            currentPage: pageNumber
        })
    }

    componentDidMount = () => {
        this.props.fetchData(`http://localhost:8000/api/vote`);
    }

    render() {
        const { votes } = this.props;
        console.log(votes)
        const countVotes = votes.length;
        const { currentPage, votesPerPage } = this.state;
        const indexOfLastVote = currentPage * votesPerPage;
        const indexOfFirstVote = indexOfLastVote - votesPerPage;
        const currentVotes = votes.slice(indexOfFirstVote, indexOfLastVote);
        return (
            <div>
                <Header />
                <div className='container-fluid main'>
                    <button type="button" className="btn btn-primary">Все Голосования</button>
                    <button type="button" className="btn btn-primary">Активные голосования</button>
                    <div>Всего голосований: {countVotes}</div>
                    <VotingList voteList={currentVotes} />
                    <PaginationPage votesPerPage={votesPerPage} paginate={this.paginate} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    votes: state.voteslist.items,
})

const mapDispatchToProps = dispatch => ({
    fetchData: data => dispatch(fetchDate(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PageNonUser);