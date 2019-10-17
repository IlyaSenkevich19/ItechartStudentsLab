import React from 'react';

import { userService } from '../components/services/userService';
import { authService } from '../components/services/authService';
import { Role } from '../components/role';
import { votedPosts, chosenVote } from '../actions/actions';
import { connect } from 'react-redux';
import Vote from '../components/mainPage/Vote'

import history from '../history/history'

class VoteContainer extends React.PureComponent {

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
            const finishDate = new Date(vote.endDate);
            const daysToFinishVote = Math.round((finishDate - startDate) / (1000 * 60 * 60 * 24));
            if (daysToFinishVote <= 0) {
                this.setState({
                    statusVote: false
                });
                userService.statusVoteChanged(this.props.vote._id);
            }
            return daysToFinishVote;
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
            const daysToFinishVote = dateInfo;
            const { comments, _id, author, text, count } = vote;
            return (
                <div >
                        <Vote
                            curUser={curUser}
                            disablePost={disablePost}
                            statusVote={statusVote}
                            daysToFinishVote={daysToFinishVote}
                            comments={comments}
                            _id={_id}
                            author={author}
                            text={text}
                            count={count}
                            vote={vote}
                            toggle={this.toggle}
                            collapse={this.state.collapse}
                            toVote={this.toVote}
                        />
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



export default connect(mapStateToProps, mapDispatchToProps)(VoteContainer);