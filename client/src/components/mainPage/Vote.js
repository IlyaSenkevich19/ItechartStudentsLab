import React from 'react';

import { Collapse, Button, CardBody, Card } from 'reactstrap';
import CommetArea from '../Comment/CommentArea';

class Vote extends React.PureComponent {

    state = {
        collapse: false
    }

    toggle = () => {
        this.setState(state => ({ collapse: !state.collapse }))
    }

    timeToFinishVoting = () => {
        const currDate = new Date();
        console.log(currDate);
        const { endDate } = this.props.vote;
        const endDates = endDate;
        console.log(endDates);
        // const daysToFinish = endDates - currDate;
        // console.log(daysToFinish)
        // return daysToFinish;
    }

    giveVote = async () => {
        const options = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            }
        }
        try {
            const req = await fetch('', options);
            const res = await req.json();
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        if (this.props.vote === undefined) { return <div>loading</div> } else {
            const endDate = this.timeToFinishVoting();
            return (
                <div>
                    <div className='row jumbotron '>
                        <div className='col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-10'>
                            <div className='lead'> Author of the vote is {this.props.vote.author}</div>
                            <div className='lead'> The vote: {this.props.vote.text}</div>
                        </div>
                        <div className=' col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-2'>
                            <div></div>
                            <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Info</Button>
                        </div>
                        <Collapse isOpen={this.state.collapse}>
                            <Card>
                                <CardBody>
                                    <div>Дата начала голосования</div>
                                    <div>{endDate}</div>
                                    <div>Общее число голосов</div>
                                    <button onClick={this.giveVote}>Проголосовать</button>
                                </CardBody>
                            </Card>
                        </Collapse>
                        <CommetArea voteId={this.props.vote._id} />
                    </div>
                </div>
            );
        }
    }
}

export default Vote;