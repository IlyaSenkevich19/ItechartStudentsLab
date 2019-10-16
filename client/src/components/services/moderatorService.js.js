import { host } from '../../constants/constants'
const getConfirmVote = async () => {
    const token = localStorage.getItem('currentUser');
    const options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "auth-token": `Bearer ${token}`,  
        }
    };
    try {
        const req = await fetch(`${host}/api/moderator/vote/toConfirm`, options);
        const res = await req.json();
        return res;
    } catch (err) {
        console.log(err)
    }
}

const confirmVote = async (voteId) => {
    const token = localStorage.getItem('currentUser');
    const options = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "auth-token": `Bearer ${token}`,  
        }
    };
    try {
        const req = await fetch(`${host}/api/moderator/${voteId}/toConfirm`, options);
        const res = await req.json();
        return res;
    } catch (err) {
        console.log(err)
    }
}

const blockVote = async (voteId) => {
    const token = localStorage.getItem('currentUser');
    const options = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "auth-token": `Bearer ${token}`,  
        }
    };
    try {
        const req = await fetch(`${host}/api/moderator/${voteId}/blockVote`, options);
        const res = await req.json();
        return res;
    } catch (err) {
        console.log(err)
    }
}
const sendUserToAdmin = async userId => {
    const token = localStorage.getItem('currentUser');
    const options = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "auth-token": `Bearer ${token}`,  
        }
    };
    try {
        const req = await fetch(`${host}/api/moderator/${userId}/sendToAdmin`, options);
        const res = await req.json();
        return res;
    } catch (err) {
        console.log(err)
    }
}


export const moderatorService = {
    confirmVote,
    getConfirmVote,
    blockVote,
    sendUserToAdmin
}