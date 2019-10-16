import React from 'react';

import history from '../../history/history';
import { connect } from 'react-redux';

import { fetchDate } from '../../actions/actions';
import { Button, Accordion, Card   } from 'react-bootstrap';
import io from "socket.io-client";

import { authService } from '../services/authService';
import { moderatorService } from '../services/moderatorService.js';
import { host } from '../../constants/constants'


class ModeratorPage extends React.PureComponent {

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
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                Users
                              </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                {users &&
                                    <div>
                                        {users.map(user =>
                                            <div>
                                                <div key={user._id}>{user.email}</div> <button onClick={() => this.sendUserToAdmin(user._id)} >Send to block</button>
                                            </div>
                                        )}
                                    </div>
                                }
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                Votes to confirm
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                {toConfirm &&
                                    <div>
                                        {toConfirm.map(toConfirm =>
                                            <div>
                                                <div key={toConfirm._id}>{toConfirm.text}</div>
                                                <button onClick={() => this.confirmVote(toConfirm._id)} >confirm vote</button>
                                                <button onClick={() => this.blockVote(toConfirm._id)} >block vote</button>
                                            </div>
                                        )}
                                    </div>
                                }
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
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