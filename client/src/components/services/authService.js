import jwt_decode from 'jwt-decode';
import { host } from '../../constants/constants'

const getAllUsers = async () => {
    const token = localStorage.getItem('currentUser');
    const requestOptions = {
        method: "GET",
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            "auth-token": `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    }
    try {
        const content = await fetch(`${host}/api/admin/users`, requestOptions);
        const users = await content.json();
        return users;
    } catch (err) {
        console.log(err)
    }
}

const getAllModerators = async () => {
    const token = localStorage.getItem('currentUser');
    const requestOptions = {
        method: "GET",
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            "auth-token": `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    }
    try {
        const content = await fetch(`${host}/api/admin/moderators`, requestOptions);
        const users = await content.json();
        return users;
    } catch (err) {
        console.log(err)
    }
}

const blockUser = async userId => {
    const token = localStorage.getItem('currentUser');
    const options = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "auth-token": `Bearer ${token}`,  
        }
    };

    try {
        const req = await fetch(`${host}/api/admin/users/${userId}/block`, options);
        const res = await req.json();
        return res;
    } catch (err) {
        console.log(err)
    }
}

const makeModerator = async userId => {
    const token = localStorage.getItem('currentUser');
    const options = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "auth-token": `Bearer ${token}`,  
        }
    };
    try {
        const req = await fetch(`${host}/api/admin/user/${userId}/role`, options);
        const res = await req.json();
        return res;
    } catch (err) {
        console.log(err)
    }
}

const getRole = () => {
    const currUserSubj = localStorage.getItem('currentUser');
    if (currUserSubj) {
        const decodeUser = jwt_decode(currUserSubj);
        return decodeUser;
    } else {
       return { role: 'non-user' };
    }
}

const getUserToBlock = async userId => {
    const token = localStorage.getItem('currentUser');
    const requestOptions = {
        method: "GET",
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            "auth-token": `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    }
    try {
        const content = await fetch(`${host}/api/admin/${userId}/user`, requestOptions);
        const users = await content.json();
        return users;
    } catch (err) {
        console.log(err)
    }
}

const deleteComment = async (voteId, commentId) => {
    const requestOptions = {
        method: "GET",
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }
    try {
        const content = await fetch(`${host}/api/admin/${voteId}/${commentId}/deleteComment`, requestOptions);
        const res = await content.json();
        return res;
    } catch (err) {
        console.log(err)
    }
}

const getUsersFromModerator = async () => {
    const requestOptions = {
        method: "GET",
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }
    try {
        const content = await fetch(`${host}/api/admin/usersToBlock`, requestOptions);
        const res = await content.json();
        return res;
    } catch (err) {
        console.log(err)
    }
}



export const authService = {
    getAllUsers,
    getAllModerators,
    blockUser,
    makeModerator,
    currentUser: getRole(),
    getUserToBlock,
    deleteComment,
    getUsersFromModerator
};