import React from 'react';

import history from '../../history/history';

import { authService } from '../services/authService';
import { connect } from 'react-redux';

import { setVote, fetchDate } from '../../actions/actions';
import VotingList from '../mainPage/VotingList'


class AdminPage extends React.PureComponent {

    state = {
        users: null,
        moderators: null,
    }

    logout = () => {
        localStorage.removeItem('currentUser');
        history.push('/log-in');
        window.location.reload();
    }

    toMainPage = () => {
        history.push('/main');
        window.location.reload();
    }

    componentDidMount = async () => {
        const users = await authService.getAllUsers();
        const moderators = await authService.getAllModerators();
        this.props.fetchData('http://localhost:8000/api/vote')
        this.setState({
            users: users,
            moderators: moderators,
        })

    }

    makeModerator = async userId => {
       const res = await authService.makeModerator(userId);
       console.log(res);
    }

    blockUser = async userId => {
       const res = await authService.blockUser(userId);
    console.log(res);
    }

    render() {
        const { users, moderators} = this.state;
        if (users === null) { return <div>loading</div> } else {
            const user = users.map(user => <div key={user._id}>{user.email} <button onClick={() => this.blockUser(user._id)}>blockUser</button> <button onClick={() => this.makeModerator(user._id)}>make moderator</button></div>);
            const moderator = moderators.map(user => <div key={user._id}>{user.email} <button onClick={() => this.blockUser(user._id)}>blockUser</button> <button onClick={() => this.makeModerator(user._id)}>make moderator</button></div>);
            return (
                <div>
                    <button onClick={this.logout} >log out</button>
                    <button onClick={this.toMainPage} >Main Page</button>
                    <h1>Admin</h1>
                    USERS:
                <div>
                        {users &&
                            <div>
                                {user}
                            </div>
                        }
                    </div>
                    Moderators:
                    {moderator &&
                        <div>
                            {moderator}
                        </div>
                    }
                    
                    {/* <VotingList voteList={this.props.votes} /> */}
                </div>
            );
        }
    }
}

const mapDispatchToProps = dispatch => ({
    fetchData: data => dispatch(fetchDate(data))
})

const mapStateToProps = state => ({
    votes: state.voteslist.items,
})




export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);