import jwt_decode from 'jwt-decode';
import { host, tokenReqOptions, reqOptions  } from '../../constants/constants';

const getAllUsers = async () => {
    const requestOptions = tokenReqOptions("GET");
    try {
        const content = await fetch(`${host}/api/admin/users`, requestOptions);
        const users = await content.json();
        return users;
    } catch (err) {
        console.log(err)
    }
}

const getAllModerators = async () => {
    const requestOptions = tokenReqOptions("GET");
    try {
        const content = await fetch(`${host}/api/admin/moderators`, requestOptions);
        const users = await content.json();
        return users;
    } catch (err) {
        console.log(err)
    }
}

const blockUser = async userId => {
    const requestOptions = tokenReqOptions("PATCH");
    try {
        const req = await fetch(`${host}/api/admin/users/${userId}/block`, requestOptions);
        const res = await req.json();
        return res;
    } catch (err) {
        console.log(err)
    }
}

const makeModerator = async userId => {
    const requestOptions = tokenReqOptions("PATCH");
    try {
        const req = await fetch(`${host}/api/admin/user/${userId}/role`, requestOptions);
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
    const requestOptions = tokenReqOptions("GET");
    try {
        const content = await fetch(`${host}/api/admin/${userId}/user`, requestOptions);
        const users = await content.json();
        return users;
    } catch (err) {
        console.log(err)
    }
}

const deleteComment = async (voteId, commentId) => {
    const requestOptions = reqOptions("GET");
    try {
        const content = await fetch(`${host}/api/admin/${voteId}/${commentId}/deleteComment`, requestOptions);
        const res = await content.json();
        return res;
    } catch (err) {
        console.log(err)
    }
}

const getUsersFromModerator = async () => {
    const requestOptions = reqOptions("GET");
    try {
        const content = await fetch(`${host}/api/admin/usersToBlock`, requestOptions);
        const res = await content.json();
        return res;
    } catch (err) {
        console.log(err)
    }
}

const login = async (userEmail, userPass) => {
    const rawResponse = await fetch(`${host}/api/user/login`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail, password: userPass })
    });
    const content = await rawResponse.json();
    localStorage.setItem('currentUser', JSON.stringify(content));
}

const register = async values => {
    const rawResponse = await fetch(`${host}/api/user/register`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: values.email, password: values.password, date: values.date })
    });
    const content = await rawResponse.json();
    return content
}

const fetchEmail = async email => {
    const fetchEmail = await fetch(`${host}/api/user/email`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
    })
    const res = await fetchEmail.json();
    return res;
}



export const authService = {
    getAllUsers,
    getAllModerators,
    blockUser,
    makeModerator,
    currentUser: getRole(),
    getUserToBlock,
    deleteComment,
    getUsersFromModerator,
    login,
    register,
    fetchEmail
};