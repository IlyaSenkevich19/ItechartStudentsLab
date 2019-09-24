import React from 'react';
import { connect } from 'react-redux';

import { setVote, fetchDate } from '../../actions/actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';
// import { Link } from 'react-router-dom';

// import CreateVoting from '../createVotingPage/CreateVoting';
import VotingList from './VotingList'



class Main extends React.PureComponent {

    state = {
        voteText: '',
        modal: false,
        startDate: '',
        endDate: '',
        // pager: {},
        // pageOfVotes: []
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

    // loadPage = () => {
    //     const params = new URLSearchParams(location.search);
    //     const page = parseInt(params.get('page')) || 1;
    //     if (page !== this.state.pager.currentPage) {
    //         fetch(`http://localhost:8000/api/vote?page=${page}`, { method: 'GET' })
    //             .then(response => response.json())
    //             .then(({ pager, pageOfItems }) => {
    //                 this.setState({ pager, pageOfItems });
    //             }
    //             )
    //     }
    // }

    render() {
        const { votes, dataVotes } = this.props;
        // const { pager, pageOfVotes } = this.state;

        const closeBtn = <button className="close" onClick={this.toggle}></button>;
        if (dataVotes === undefined) { return <div>Loading</div> } else {
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
                    {/* {pageOfVotes.map(item =>
                        <div key={item.id}>{item.name}</div>
                    )}
                    <div>
                    {pager.pages && pager.pages.length &&
                        <ul className="pagination">
                            <li className={`page-item first-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                                <Link to={{ search: `?page=1` }} className="page-link">First</Link>
                            </li>
                            <li className={`page-item previous-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                                <Link to={{ search: `?page=${pager.currentPage - 1}` }} className="page-link">Previous</Link>
                            </li>
                            {pager.pages.map(page =>
                                <li key={page} className={`page-item number-item ${pager.currentPage === page ? 'active' : ''}`}>
                                    <Link to={{ search: `?page=${page}` }} className="page-link">{page}</Link>
                                </li>
                            )}
                            <li className={`page-item next-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                                <Link to={{ search: `?page=${pager.currentPage + 1}` }} className="page-link">Next</Link>
                            </li>
                            <li className={`page-item last-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                                <Link to={{ search: `?page=${pager.totalPages}` }} className="page-link">Last</Link>
                            </li>
                        </ul>
                    }        
                    </div> */}
                    <VotingList dataVotes={dataVotes} voteList={votes} />

                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    votes: state.voteslist.items,
    dataVotes: state.voteslist.newItems,


})

const mapDispatchToProps = dispatch => ({
    setVote: (text, endDate, id) => dispatch(setVote(text, endDate, id)),
    fetchDataVotes: data => dispatch(fetchDate(data)),

})

export default connect(mapStateToProps, mapDispatchToProps)(Main);