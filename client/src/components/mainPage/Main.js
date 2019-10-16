import React from 'react';
import { connect } from 'react-redux';

import { setVote, fetchDate, searchVote } from '../../actions/actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';
import io from "socket.io-client";
import Notifications from 'react-notify-toast';

import PaginationPageContainer from '../../containers/PaginationContainer'
import VotingList from './VotingList';
import { userService } from '../services/userService'
import { authService } from '../services/authService';
import { Role } from '../role';
import { host } from '../../constants/constants'



class Main extends React.PureComponent {

    state = {
        voteText: '',
        modal: false,
        startDate: '',
        endDate: '',
        currentPage: 1,
        votesPerPage: 3,
        author: null,
        votes: null,
        searchValue: ''
    }
    socket = io(`${host}`);

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    paginate = pageNumber => {
        this.setState({
            currentPage: pageNumber
        })
    }

    handleInputChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
            startDate: Date.now()
        })
    }

    createVoting = async () => {
        const { voteText, endDate } = this.state;
        const content = await userService.createVote(voteText, endDate, this.state.startDate, authService.currentUser.email);
        this.socket.emit('CREATE_VOTE', {
            content
        })
    }

    componentDidMount = () => {
        this.props.fetchData(`${host}/api/vote`);
        this.socket.on("RECEIVE_VOTE", data => {
            const content = data.content
            this.props.setVote(content);
        })
    }

    searchVote = () => {
        this.props.searchVote(this.state.searchValue)
    }

    render() {
        const { votes } = this.props;
        const countVotes = this.props.numberVotes;
        const { currentPage, votesPerPage } = this.state;
        const indexOfLastVote = currentPage * votesPerPage;
        const indexOfFirstVote = indexOfLastVote - votesPerPage;
        const currentVotes = votes.slice(indexOfFirstVote, indexOfLastVote);
        const closeBtn = <button className="close" onClick={this.toggle}></button>;
        return (
            <div className='container-fluid main'>
                <Notifications />
                <div className='main__info'>Total votes: {countVotes}</div>
                {authService.currentUser.role !== Role.NonUser ? <div className='creating-btn'><Button color="danger" className='creating-button' onClick={this.toggle}>Create Voting</Button></div> : <div></div>}
                {authService.currentUser.role === Role.Admin || authService.currentUser.role === Role.Moderator ? <div>
                    <Input placeholder='Your vote' name='searchValue' value={this.state.searchValue} onChange={this.handleInputChange} />
                    <button onClick={this.searchVote}>find vote</button>
                </div> : <div></div>}
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle} close={closeBtn}>Сreate your vote</ModalHeader>
                    <ModalBody>
                        <Label>Enter your vote</Label>
                        <Input placeholder='Your vote' name='voteText' onChange={this.handleInputChange} value={this.state.voteText} />
                        <Label>Voting end date</Label>
                        <Input placeholder='date' type='date' onChange={this.handleInputChange} name='endDate' value={this.state.endDate} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.createVoting}>Create</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <VotingList voteList={currentVotes} />
                <PaginationPageContainer votesPerPage={votesPerPage} paginate={this.paginate} />
            </div>
        )
    }
}




const mapDispatchToProps = dispatch => ({
    setVote: content => dispatch(setVote(content)),
    fetchData: data => dispatch(fetchDate(data)),
    searchVote: vote => dispatch(searchVote(vote))
})

export default connect(null, mapDispatchToProps)(Main);