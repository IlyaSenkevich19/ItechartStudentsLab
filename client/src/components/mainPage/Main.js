import React from 'react';
import { connect } from 'react-redux';

import { setVote, fetchDate, fetchComments } from '../../actions/actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';
// import { Link } from 'react-router-dom';

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
        author: null
    }

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

    // timeToFinishVote = () => {
    //     const currDate = new Date();
    //     const currYear = currDate.getFullYear();
    //     console.log(this.props.votes);
        
    // }

    createVoting = async () => {
        const { voteText, endDate } = this.state;
        const content = await userService.createVote(voteText, endDate, this.state.startDate, this.props.setAuthor);
        this.props.setVote(content.text, content.endDate, content.startDate, content._id);
    }

    componentDidMount = () => {
        this.props.fetchData(`http://localhost:8000/api/vote`);
        // this.props.fetchComments(`http://localhost:8000/api/comments`);
    }

    render() {
        const { votes, dataVotes} = this.props;
        const { currentPage, votesPerPage } = this.state;
        const indexOfLastVote = currentPage * votesPerPage;
        const indexOfFirstVote = indexOfLastVote - votesPerPage;
        const currentVotes = votes.slice(indexOfFirstVote, indexOfLastVote);
        const closeBtn = <button className="close" onClick={this.toggle}></button>;
        
        if (dataVotes === undefined) { return <div>Loading</div> } else {
            return (
                <div className='container-fluid main'>
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
                    <VotingList dataVotes={dataVotes}  voteList={currentVotes} />
                    <PaginationPage votesPerPage={votesPerPage} paginate={this.paginate}  />
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    votes: state.voteslist.items,
    dataVotes: state.voteslist.newItems,
    setAuthor: state.voteslist.author,
})

const mapDispatchToProps = dispatch => ({
    setVote: (text, endDate, id) => dispatch(setVote(text, endDate, id)),
    fetchData: data => dispatch(fetchDate(data)),
    fetchComments: data => dispatch(fetchComments(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);