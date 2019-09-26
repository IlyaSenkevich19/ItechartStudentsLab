import React from 'react';
import { connect } from 'react-redux';

import { setVote, fetchDate } from '../../actions/actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';
// import { Link } from 'react-router-dom';

// import CreateVoting from '../createVotingPage/CreateVoting';
import PaginationPage from './Pagination'
import VotingList from './VotingList'



class Main extends React.PureComponent {

    state = {
        voteText: '',
        modal: false,
        startDate: '',
        endDate: '',
        currentPage: 1,
        votesPerPage: 3
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

    createVoting = async () => {
        const { voteText, endDate } = this.state;
        try {
            const rawResponse = await fetch('http://localhost:8000/api/vote', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ voteText: voteText, endDate: endDate })
            });
            const content = await rawResponse.json();
            this.props.setVote(content.text, content.endDate, content._id)
        } catch (err) {
            console.log(err);
        }
    }

    componentDidMount = () => {
        this.props.fetchDataVotes(`http://localhost:8000/api/vote`);
    }



    render() {
        const { votes, dataVotes, getAuthor } = this.props;
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
                    <VotingList dataVotes={dataVotes} author={getAuthor} voteList={currentVotes} />
                    <PaginationPage votesPerPage={votesPerPage} paginate={this.paginate}  />

                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    votes: state.voteslist.items,
    dataVotes: state.voteslist.newItems,
    getAuthor: state.voteslist.author
})

const mapDispatchToProps = dispatch => ({
    setVote: (text, endDate, id) => dispatch(setVote(text, endDate, id)),
    fetchDataVotes: data => dispatch(fetchDate(data)),

})

export default connect(mapStateToProps, mapDispatchToProps)(Main);