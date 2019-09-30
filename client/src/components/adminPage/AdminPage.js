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
        role: 'moderator'
    }

    logout = () => {
        localStorage.removeItem('currentUser');
        this.props.setRoles('non-user');
        history.push('/log-in');
    }

    componentDidMount = async () => {
        const users = await authService.getAllUsers();
        const moderators = await authService.getAllModerators()
        this.setState({
            users: users,
            moderators: moderators
        })
    }

    makeModerator = async (userId) => {
         // const token = localStorage.getItem('currentUser');
        const options = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                // "auth-token": `Bearer ${token}`,  
            }
        };
        const { role } = this.state;
        try {
            console.log(role)

            const req = await fetch(`http://localhost:8000/api/admin/user/${userId}/${role}`, options);
            const res = await req.json();
            console.log(JSON.parse(res))
            if(res === 'user') {
                this.setState({
                    role: 'moderator'
                }) 
                console.log(this.state.role)
            } else {
                this.setState({
                    role: 'user'
                })

                console.log(this.state.role)
            } 
         
        } catch (err) {
            console.log(err)
        }
    }

    blockUser = async (userId) => {
        // const token = localStorage.getItem('currentUser');
        const options = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                // "auth-token": `Bearer ${token}`,  
            }
        };
        const { blockStatus} = this.state;
        try {
            const req = await fetch(`http://localhost:8000/api/admin/users/${userId}/${blockStatus}`, options);
            const res = await req.json();
            console.log(res);
            this.setState({
                blockStatus: !res
            })
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const { users, moderators } = this.state;
        if (users === null) { return <div>loading</div> } else {
            const user = users.map(user => <div key={user._id}>{user.email} <button onClick={() => this.blockUser(user._id)}>blockUser</button> <button onClick={() => this.makeModerator(user._id)}>make moderator</button></div>);
            const moderator = moderators.map(user => <div key={user._id}>{user.email} <button onClick={() => this.blockUser(user._id)}>blockUser</button> <button onClick={() => this.makeModerator(user._id)}>make moderator</button></div>);
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
                </div>
            );
        }
    }
}
const mapDispatchToProps = dispatch => ({
    setRoles: role => dispatch(getRole(role))
})



export default connect(null, mapDispatchToProps)(AdminPage);