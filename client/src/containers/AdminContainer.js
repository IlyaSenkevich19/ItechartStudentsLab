import React from 'react';
import history from '../history/history';
import { authService } from '../components/services/authService';
import { connect } from 'react-redux';

import { getUsersToBlock, fetchDate } from '../actions/actions';
import io from "socket.io-client";
import AdminPage from '../components/adminPage/AdminPage'
import { host } from '../constants/constants'


class AdminContainer extends React.PureComponent {

    state = {
        users: null,
        moderators: null,
        userFromMod: null,

    }
    socket = io(`${host}`);



    componentDidMount = async () => {
        const users = await authService.getAllUsers();
        const moderators = await authService.getAllModerators();
        this.props.fetchData(`${host}/api/vote`);
        const res = await authService.getUsersFromModerator();
        this.setState({
            users: users,
            moderators: moderators,
            userFromMod: res
        })
        this.socket.on("RECEIVE_USERS", async () => {
            const res = await authService.getUsersFromModerator();
            this.setState({
                userFromMod: res
            })
        })

    }

    makeModerator = async userId => {
        const res = await authService.makeModerator(userId);
        console.log(res);
        const users = await authService.getAllUsers();
        const moderators = await authService.getAllModerators();
        this.setState({
            users: users,
            moderators: moderators,
        })
    }

    blockUser = async userId => {
        const res = await authService.blockUser(userId);
        console.log(res);
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

    render() {
        const { userToBlock } = this.props;
        const { users, moderators, userFromMod } = this.state;
        if (users === null && userFromMod === null) { return <div>loading</div> } else {
            const user = users.map(user => <div key={user._id}>{user.email} <button onClick={() => this.blockUser(user._id)}>blockUser</button> <button onClick={() => this.makeModerator(user._id)}>make moderator</button></div>);
            const moderator = moderators.map(user => <div key={user._id}>{user.email} <button onClick={() => this.blockUser(user._id)}>blockUser</button> <button onClick={() => this.makeModerator(user._id)}>make moderator</button></div>);
            const usersToBlocks = userFromMod.map(user => <div key={user._id}>{user.email} <button onClick={() => this.blockUser(user._id)}>blockUser</button></div>);
        return (
            <div>
                 <button onClick={this.logout} >log out</button>
                    <button onClick={this.toMainPage} >Main Page</button>
                    <h1>Admin</h1>
                <AdminPage
                    users={users}
                    moderator={moderator}
                    userFromMod={userFromMod}
                    usersToBlocks={usersToBlocks}
                    user={user}
                    usersToBlock={userToBlock} />
            </div>
        );
    }
}}




const mapStateToProps = state => ({
    userToBlock: state.users.usersToBlock,
    votes: state.voteslist.items,
})

const mapDispatchToProps = dispatch => ({
    fetchData: data => dispatch(fetchDate(data)),
    getUserToBlock: user => dispatch(getUsersToBlock(user))
})


export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer);