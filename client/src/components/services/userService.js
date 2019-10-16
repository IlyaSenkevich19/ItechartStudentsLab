import { host } from '../../constants/constants'
const createVote = async (voteText, endDate, startDate, author) => {
    const token = localStorage.getItem('currentUser')
    const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            "auth-token": `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ voteText: voteText, endDate: endDate, startDate: startDate, author: author })
    } 
    try {
        const rawResponse = await fetch(`${host}/api/vote`, options)
        const content = await rawResponse.json();
        return content;
    } catch (err) {
        console.log(err);
    }
}

const createComment = async (commentText, date, author, voteId) => {
    const token = localStorage.getItem('currentUser')
    const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            "auth-token": `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: commentText, date: date, author: author, voteId: voteId  })
    } 
    try {
        const req = await fetch(`${host}/api/comment`, options);
        const res = await req.json();
        return res;
    } catch(err) {
        console.log(err);
    }
}

const toVote = async (currentUserId, currentVoteId) => {
    const token = localStorage.getItem('currentUser')
    const options = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "auth-token": `Bearer ${token}`,
        }
    }
    try {
        const req = await fetch(`${host}/api/${currentVoteId}/${currentUserId}/toVote`, options);
        const res = await req.json();
        return res;
    } catch (err) {
        console.log(err);
    }
}
const statusVoteChanged = async currentVoteId => {
    const options = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        }
    }
    try {
        const req = await fetch(`${host}/api/${currentVoteId}/statusChanged`, options);
        const res = await req.json();
        return res;
    } catch (err) {
        console.log(err);
    }
}
const getVotedPosts = async (currentUserId) => {
    const token = localStorage.getItem('currentUser')
    const options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "auth-token": `Bearer ${token}`,
        }
    }
    try {
        const req = await fetch(`${host}/api/${currentUserId}/votedPosts`, options);
        const res = await req.json();
        return res;
    } catch (err) {
        console.log(err);
    }
}

export const userService = {
    createVote,
    createComment,
    toVote,
    getVotedPosts,
    statusVoteChanged
}