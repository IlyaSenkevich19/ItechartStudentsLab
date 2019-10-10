import React from 'react';

import history from '../../history/history';

import { authService } from '../services/authService';
import { connect } from 'react-redux';
import { Button, Accordion, Card } from 'react-bootstrap';

import { fetchDate, getUsersToBlock } from '../../actions/actions';
import io from "socket.io-client";


class AdminPage extends React.PureComponent {

    state = {
        users: null,
        moderators: null,
     
    }
    socket = io('http://localhost:8000');

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
        this.socket.on("RECEIVE_USERS", async data => {
            const user = await authService.getUserToBlock(data._id);
            this.props.getUserToBlock(user)
            // this.setState(state => { return {sendBlockUser: state.unshift(user) }})
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
        const { userToBlock } = this.props;
        console.log(userToBlock[0])
     
        if (users === null) { return <div>loading</div> } else {
            const user = users.map(user => <div key={user._id}>{user.email} <button onClick={() => this.blockUser(user._id)}>blockUser</button> <button onClick={() => this.makeModerator(user._id)}>make moderator</button></div>);
            const moderator = moderators.map(user => <div key={user._id}>{user.email} <button onClick={() => this.blockUser(user._id)}>blockUser</button> <button onClick={() => this.makeModerator(user._id)}>make moderator</button></div>);
            const usersToBlock = userToBlock.map(user => <div key={user._id}>{user.email} <button onClick={() => this.blockUser(user._id)}>blockUser</button></div>);
            return (
                <div>
                    <button onClick={this.logout} >log out</button>
                    <button onClick={this.toMainPage} >Main Page</button>
                    <h1>Admin</h1>
                    <Accordion>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                    USERS:
                              </Accordion.Toggle>
                            </Card.Header>

                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    {users &&
                                        <div>
                                            {user}
                                        </div>
                                    }
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                    MODERATORS:
                              </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    {moderator &&
                                        <div>
                                            {moderator}
                                        </div>
                                    }
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                    USERS TO BLOCK :
                              </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="2">
                                <Card.Body>
                                    {usersToBlock === [] ? <div>There is no users to block</div> :
                                        <div>
                                            {usersToBlock}
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
}

const mapDispatchToProps = dispatch => ({
    fetchData: data => dispatch(fetchDate(data)),
    getUserToBlock: user => dispatch(getUsersToBlock(user))
})

const mapStateToProps = state => ({
    votes: state.voteslist.items,
    userToBlock: state.users.usersToBlock
})




export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);