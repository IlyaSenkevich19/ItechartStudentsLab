import React from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';

class CreateVoting extends React.PureComponent {
    
    state = {
        modal: false
    }


    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
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
                        <Input placeholder='Your vote' />
                        <Label>Voting start date</Label>
                        <Input placeholder='date' type='date' />
                        <Label>Voting end date</Label>
                        <Input placeholder='date' type='date' />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Create</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default CreateVoting;