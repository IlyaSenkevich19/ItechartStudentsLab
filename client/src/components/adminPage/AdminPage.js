import React from 'react';

import history from '../../history/history';
import { getRole } from '../../actions/actions'

import { connect } from 'react-redux';
import { authService } from '../services/authService';


class AdminPage extends React.PureComponent {

    state = {
        users: null
    }

    logout = () => {
        localStorage.removeItem('currentUser');
        this.props.setRoles('non-user');
        history.push('/log-in');
    }

    componentDidMount = async () => {
        const users = await authService.getAllUsers();
        this.setState({
            users: users
        })
    }

    makeModerator = () => {

    }

    blockUser = async userId => {
        const options = {
            method: 'PATCH',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Methods ": "GET, POST, PATCH, PUT, DELETE"
            }
        };
        const blockStatus = true;
        try {
            console.log(fetch(`http://localhost:8000/api/admin/users/${userId}/${blockStatus}`, options))
            const req = await fetch(`http://localhost:8000/api/admin/users/${userId}/${blockStatus}`, options);
            const res = await req.json();
            console.log(res);
        } catch (err) {
            console.log(err)
        }

    }

    render() {
        const { users } = this.state;
        if (users === null) { return <div>loading</div> } else {
            const user = users.map(user => <div key={user._id}>{user.email} <button onClick={() => this.blockUser(user._id)}>blockUser</button> <button onClick={this.makeModerator}>make moderator</button></div>);
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
                    Moderator:
                </div>
            );
        }
    }
}
const mapDispatchToProps = dispatch => ({
    setRoles: role => dispatch(getRole(role))
})



export default connect(null, mapDispatchToProps)(AdminPage);