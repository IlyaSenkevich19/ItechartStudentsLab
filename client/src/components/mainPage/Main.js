import React from 'react';
import { connect } from 'react-redux';

import { createVote } from '../../actions/actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';

// import CreateVoting from '../createVotingPage/CreateVoting';
import VotingList from './VotingList'



class Main extends React.PureComponent {

    state = {
        voteText: '',
        modal: false,
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }


    handleInputChange = ({ target: { value } }) => {
        this.setState({
            voteText: value
        })
    }

    createVoting = () => {
        const { voteText } = this.state;
        const { createVote } = this.props;
        createVote((new Date()).getTime(), voteText, false);
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
                        <Input placeholder='Your vote' onChange={this.handleInputChange} value={this.state.voteText} />
                        <Label>Voting start date</Label>
                        <Input placeholder='date' type='date' />
                        <Label>Voting end date</Label>
                        <Input placeholder='date' type='date' />
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
    createVote: (id, text, bool) => dispatch(createVote(id, text, bool))
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);