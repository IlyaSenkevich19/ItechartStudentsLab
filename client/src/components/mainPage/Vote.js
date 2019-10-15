import React from 'react';

import { Collapse, Button, CardBody, Card } from 'reactstrap';
import CommetArea from '../Comment/CommentArea';
import { userService } from '../services/userService';
import { authService } from '../services/authService';
import { Role } from '../role';
import { votedPosts, chosenVote } from '../../actions/actions';
import { connect } from 'react-redux';

import history from '../../history/history'



class Vote extends React.PureComponent {

    state = {
        collapse: false,
        countVotes: null,
        disablePost: false,
        statusVote: true
    }

    toggle = () => {
        this.setState(state => ({ collapse: !state.collapse }))
    }

    timeToFinishVote = () => {
        const { vote } = this.props;
        if (vote === undefined) { return <div>wait</div> } else {
            const startDate = new Date();
            const convertStartDate = startDate.toLocaleString();
            const finishDate = new Date(vote.endDate);
            const daysToFinishVote = Math.round((finishDate - startDate) / (1000 * 60 * 60 * 24));
            if (daysToFinishVote <= 0) {
                this.setState({
                    statusVote: false
                });
                userService.statusVoteChanged(this.props.vote._id);
            }
            return [daysToFinishVote, convertStartDate];
        }
    }

    componentDidMount = async () => {
        if (authService.currentUser.role === Role.User) {
            const votedPosts = await userService.getVotedPosts(authService.currentUser._id);
            const posts = votedPosts.votedPost;
            this.props.setVotedPosts(posts)
            if (this.props.posts.indexOf(this.props.vote._id) !== -1) {
                this.setState({ disablePost: true })
            }
        }
    }

    toVote = async () => {
        if (authService.currentUser.role === Role.NonUser) { 
            history.replace('/captcha'); 
            this.props.chosenVote(this.props.vote._id);
    } else {
            const toVote = await userService.toVote(authService.currentUser._id, this.props.vote._id);
            if (toVote.status === true) {
                this.setState({ countVotes: this.props.vote.count++, disablePost: true })
            }
        }
    }


    render() {
        const { vote } = this.props;
        const { disablePost, statusVote } = this.state;
        const curUser = authService.currentUser;
        if (vote === undefined) { return <div>loading</div> } else {
            const dateInfo = this.timeToFinishVote();
            const startDate = dateInfo[1];
            const daysToFinishVote = dateInfo[0];
            const { comments, _id, author, text, count } = vote;
            return (
                <div >
                    <div className='row jumbotron '>
                        <div className='author-block '>
                            <div className='lead'> Author of the vote is {author}</div>
                            <div className='lead'> The vote: {text}</div>
                        </div>
                        {( (curUser.role === Role.User) && vote.blockStatus) ? <div>This post is blocked by admin</div> : <div>
                        <div className=' col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-2'>
                            {statusVote ? <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Info</Button> : <div>Voting is over</div>}
                        </div>
                        <Collapse isOpen={this.state.collapse}>
                            <Card className='card'>
                                <CardBody>
                                    <div>Until the end of the vote, there are: {daysToFinishVote} day</div>
                                    <div>Total number of votes: {count}</div>
                                    {disablePost ? <div>You cast your vote!</div> : <Button  color="danger" className='creating-button' onClick={this.toVote}>to vote</Button>}
                                </CardBody>
                            </Card>
                        </Collapse>
                        <CommetArea vote={vote} comments={comments} voteId={_id} />
                        </div>}
                    </div> 
                </div>
            );
        }
    }
}

const mapStateToProps = state => ({
    posts: state.voteslist.posts,
})

const mapDispatchToProps = dispatch => ({
    setVotedPosts: posts => dispatch(votedPosts(posts)),
    chosenVote: id => dispatch(chosenVote(id))
})



export default connect(mapStateToProps, mapDispatchToProps)(Vote);