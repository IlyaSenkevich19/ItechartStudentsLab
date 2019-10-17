import React from 'react';

import history from '../history/history';
import { connect } from 'react-redux';

import { fetchDate } from '../actions/actions';
import ModeratorPage from '../components/moderator/moderatorPage'

import io from "socket.io-client";

import { authService } from '../components/services/authService';
import { moderatorService } from '../components/services/moderatorService.js.js';
import { host } from '../constants/constants'


class ModeratorPageContainer extends React.PureComponent {

    state = {
        users: null,
        toConfirm: null
    }
    socket = io(`${host}`);

    logout = () => {
        localStorage.removeItem('currentUser');
        history.push('/log-in');
        window.location.reload();
    }
    
    toMainPage = () => {
        history.push('/main');
    }

    componentDidMount = async () => {
        const users = await authService.getAllUsers();
        const votesToConfirm = await moderatorService.getConfirmVote()
        this.setState({
            users: users,
            toConfirm: votesToConfirm
        })
    }
    
    sendUserToAdmin = async userId => {
        await moderatorService.sendUserToAdmin(userId);
      this.socket.emit('SEND_USER_TO_BLOCK', {
            _id: userId, 
        })

    //   await  window.alert('ready');
    }

    confirmVote = async voteId => {
        const vote = await moderatorService.confirmVote(voteId);
        console.log(vote);
    }

    blockVote = async voteId => {
        const vote = await moderatorService.blockVote(voteId);
        console.log(vote);
    }
  
    render() {
        const { users, toConfirm } = this.state;
        return (
            <div>
                <button onClick={this.logout} >log out</button>
                <button onClick={this.toMainPage} >toMainPage</button>
                <h1>Moderator</h1>
               <ModeratorPage 
                  users={users}
                  toConfirm={toConfirm}
                  sendUserToAdmin={this.sendUserToAdmin}
                  confirmVote={this.confirmVote}
                  blockVote={this.blockVote}
               />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchData: data => dispatch(fetchDate(data))
});

const mapStateToProps = state => ({
    vote: state.voteslist.items
});


export default connect(mapStateToProps, mapDispatchToProps)(ModeratorPageContainer);