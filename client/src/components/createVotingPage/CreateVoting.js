import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';

import {userService} from '../services/userService'
import {authService} from '../services/authService';
import { setVote} from '../../actions/actions';

class CreateVoting extends React.PureComponent {

    state = {
        modal: false,
        startDate: '',
        endDate: '',
        voteText: '',
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
        const content = await userService.createVote(voteText, endDate, this.state.startDate, authService.currentUser.email);
        this.props.setVote(content.text,  content.startDate, content.endDate, content._id, content.author);
    }


    render() {
        const closeBtn = <button className="close" onClick={this.toggle}></button>;
        return (
            <div>
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
                        <Button color="primary" onClick={this.props.createVoting}>Create</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}



const mapDispatchToProps = dispatch => ({
    setVote: (text, startDate, endDate, id, author) => dispatch(setVote(text, startDate, endDate, id, author)),
})

export default connect(null, mapDispatchToProps)(CreateVoting);