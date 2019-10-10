import React from 'react';

import { Collapse, Button, CardBody, Card } from 'reactstrap';
import CommetArea from '../Comment/CommentArea';
import { userService } from '../services/userService';
import { authService } from '../services/authService';
import { Role } from '../role';
import { votedPosts } from '../../actions/actions';
import { connect } from 'react-redux'



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
        if (authService.currentUser.role === Role.NonUser) { return window.alert('у вас нет доступа для голосования') } else {
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
                <div>
                    <div className='row jumbotron '>
                        <div className='col-xs-9 col-sm-9 col-md-9 col-lg-9 col-xl-10'>
                            <div className='lead'> Author of the vote is {author}</div>
                            <div className='lead'> The vote: {text}</div>
                        </div>
                        {( (curUser.role === Role.User) && vote.blockStatus) ? <div>This post is blocked by admin</div> : <div>
                        <div className=' col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-2'>
                            {statusVote ? <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Info</Button> : <div>Голосование окончено</div>}
                        </div>
                        <Collapse isOpen={this.state.collapse}>
                            <Card>
                                <CardBody>
                                    <div>Дата начала голосования: {startDate}</div>
                                    <div> До конца голосования осталось: {daysToFinishVote} день</div>
                                    <div>Общее число голосов: {count}</div>
                                    {disablePost ? <div>Вы отдали свой голос!</div> : <button onClick={this.toVote}>Проголосовать</button>}
                                </CardBody>
                            </Card>
                        </Collapse>
                        <CommetArea comments={comments} voteId={_id} />
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
    setVotedPosts: posts => dispatch(votedPosts(posts))
})



export default connect(mapStateToProps, mapDispatchToProps)(Vote);