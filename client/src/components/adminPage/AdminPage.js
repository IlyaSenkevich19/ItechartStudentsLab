import React from 'react';

import history from '../../history/history';
import { getRole } from '../../actions/actions'

import { connect } from 'react-redux';
import { authService } from '../services/authService';


class AdminPage extends React.PureComponent {

    state = {
        users: null,
        moderators: null,
        blockStatus: true,
        role: 'user',
    }

    logout = () => {
        localStorage.removeItem('currentUser');
        history.push('/log-in');
        window.location.reload();
    }

    componentDidMount = async () => {
        const users = await authService.getAllUsers();
        const moderators = await authService.getAllModerators()
        this.setState({
            users: users,
            moderators: moderators,
        })
        console.log(this.state.moderators, this.state.users)
    }

    makeModerator = async (userId, role) => {
        const res = await authService.makeModerator(userId, role);
        if (res === 'user') {
            this.setState({
                role: 'moderator'
            })
        } else {
            this.setState({
                role: 'user'
            })
        }
    }

    blockUser = async (userId, blockStatus) => {
        const blockStatusRes = await authService.blockUser(userId, blockStatus);
        this.setState({
            blockStatus: !blockStatusRes
        })
    }

    render() {
        const { users, moderators, blockStatus, role } = this.state;
        if (users === null) { return <div>loading</div> } else {
            const user = users.map(user => <div key={user._id}>{user.email} <button onClick={() => this.blockUser(user._id, blockStatus)}>blockUser</button> <button onClick={() => this.makeModerator(user._id, role)}>make moderator</button></div>);
            const moderator = moderators.map(user => <div key={user._id}>{user.email} <button onClick={() => this.blockUser(user._id, blockStatus)}>blockUser</button> <button onClick={() => this.makeModerator(user._id, role)}>make moderator</button></div>);
            return (
                <div>
                    <button onClick={this.logout} >log out</button>
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
                    Votes:
                </div>
            );
        }
    }
}

// const mapDispatchToProps = dispatch => ({
//     setRoles: role => dispatch(getRole(role))
// })



export default AdminPage;