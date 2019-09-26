import React from 'react';

import history from '../../history/history';
import {getRole} from '../../actions/actions'

import { connect } from 'react-redux'; 
import { authService } from '../services/authService';


class ModeratorPage extends React.PureComponent {

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

    render() {
        const { users } = this.state;
        return (
            <div>
               <button onClick={this.logout} >log out</button>
               <h1>Moderator</h1>
               USERS:
                <div>
                    {users &&
                        <div>
                            {users.map(user =>
                                <div key={user._id}>{user.email}</div>
                            )}
                        </div>
                    }
                </div>
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => ({
    setRoles: role => dispatch(getRole(role))
})



export default connect(null, mapDispatchToProps)(ModeratorPage);