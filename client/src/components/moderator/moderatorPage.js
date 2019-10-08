import React from 'react';

import history from '../../history/history';
import { connect } from 'react-redux';

import { setVote, fetchDate} from '../../actions/actions';

import { authService } from '../services/authService';
import { moderatorService } from '../services/moderatorService.js';


class ModeratorPage extends React.PureComponent {

    state = {
        users: null,
        toConfirm: null
    }

    logout = () => {
        localStorage.removeItem('currentUser');
        history.push('/log-in');
    }

    componentDidMount = async () => {
        const users = await authService.getAllUsers();
        this.props.fetchData(`http://localhost:8000/api/vote`);
        const votesToConfirm = await moderatorService.confirmVote()
        this.setState({
            users: users,
            toConfirm: votesToConfirm
        }) 
    }

    render() {
        const { users, toConfirm } = this.state;
        console.log(toConfirm)
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

            
                Votes To Confirm:
                {toConfirm &&
                        <div>
                            {toConfirm.map(toConfirm =>
                                <div key={toConfirm._id}>{toConfirm.text}</div>
                            )}
                        </div>
                    }
                
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchData: data => dispatch(fetchDate(data))
})
const mapStateToProps = state => ({
    vote: state.voteslist.items
})




export default connect(mapStateToProps, mapDispatchToProps)(ModeratorPage);