import React from 'react';
import { connect } from 'react-redux';

import { fetchDate } from '../../actions/actions';

import PaginationPage from '../mainPage/Pagination';
import history from '../../history/history';
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

    onLoginPage = () => {
        localStorage.removeItem('currentUser');
        history.push('/log-in');
        window.location.reload();
    }

    onSignupPage = () => {
        localStorage.removeItem('currentUser');
        history.push('/sign-up');
        window.location.reload();
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
                <div>
                    <nav className='navbar navbar-expand-md navbar-light bg-light sticky-top'>
                        <div className='container-fluid'>
                            <div href='#' className='navbar-brad'>Online Voting System</div>
                            <div className='ml-auto buttons'>
                                <button onClick={this.onSignupPage} type="button" className="btn btn-primary">Sign Up</button>
                                <button onClick={this.onLoginPage} type="button" className="btn btn-primary">Log In</button>
                            </div>
                        </div>
                    </nav>
                </div>
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