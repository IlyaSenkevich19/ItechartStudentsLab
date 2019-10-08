import React from 'react';
import { connect } from 'react-redux';

import { setVote, fetchDate} from '../../actions/actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';
import io from "socket.io-client";


// import CreateVoting from '../createVotingPage/CreateVoting';
import PaginationPage from './Pagination'
import VotingList from './VotingList';
import {userService} from '../services/userService'
import {authService} from '../services/authService';



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
    }
    socket = io('http://localhost:8000');

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
            author: content.author,
            text: content.text,
            endDate: content.endDate,
            startDate: content.startDate,
            _id: content._id
        })
    }

    componentDidMount = () => {
        this.props.fetchData(`http://localhost:8000/api/vote`);
        this.socket.on("RECEIVE_VOTE", data => {
            console.log(data);
            this.props.setVote(data.text,  data.startDate, data.endDate, data._id, data.author);
        })
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
                    <div>Всего голосований: {countVotes}</div>
                    <Button color="danger" onClick={this.toggle}>Create Voting</Button>
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
                    <VotingList  voteList={currentVotes} />
                    <PaginationPage votesPerPage={votesPerPage} paginate={this.paginate}  />
                </div>
            )
        }
    }



const mapDispatchToProps = dispatch => ({
    setVote: (text, startDate, endDate, id, author) => dispatch(setVote(text, startDate, endDate, id, author)),
    fetchData: data => dispatch(fetchDate(data))
})

export default connect(null, mapDispatchToProps)(Main);