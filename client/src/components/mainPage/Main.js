import React from 'react';
import { connect } from 'react-redux';

import { setVote } from '../../actions/actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';

// import CreateVoting from '../createVotingPage/CreateVoting';
import VotingList from './VotingList'



class Main extends React.PureComponent {

    state = {
        voteText: '',
        modal: false,
        startDate: '',
        endDate: ''
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
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
        try{
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
            this.props.setVote(content.text, content.endDate)
        } catch(err) {
            console.log(err);
        }
       
        
    }

    render() {
        const { votes } = this.props;

        const closeBtn = <button className="close" onClick={this.toggle}></button>;
        return (
            <div className='container-fluid main'>
                {/* <CreateVoting handleChange={this.handleInputChange} creating={this.createVoting} /> */}
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
                <VotingList voteList={votes} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    votes: state.voteslist,
})

const mapDispatchToProps = dispatch => ({
    setVote: (text, endDate) => dispatch(setVote(text, endDate))
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);