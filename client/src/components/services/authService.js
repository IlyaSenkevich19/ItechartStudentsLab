import jwt_decode from 'jwt-decode';
import { Role } from '../role'
const getAllUsers = async () => {
    const token = localStorage.getItem('currentUser');
    const requestOptions = {
        method: "GET",
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            "auth-token": `${token}`,
            'Content-Type': 'application/json',
        },
    }
    try {
        const content = await fetch('http://localhost:8000/api/admin/users', requestOptions);
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
            "auth-token": `${token}`,
            'Content-Type': 'application/json',
        },
    }
    try {
        const content = await fetch('http://localhost:8000/api/admin/moderators', requestOptions);
        const users = await content.json();
        return users;
    } catch (err) {
        console.log(err)
    }
}

const blockUser = async (userId, blockStatus) => {
    const token = localStorage.getItem('currentUser');
    const options = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "auth-token": `${token}`,  
        }
    };

    try {
        const req = await fetch(`http://localhost:8000/api/admin/users/${userId}/${blockStatus}`, options);
        const res = await req.json();
        return res;
    } catch (err) {
        console.log(err)
    }
}

const makeModerator = async (userId, role) => {
    const token = localStorage.getItem('currentUser');
    const options = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "auth-token": `${token}`,  
        }
    };
    try {
        const req = await fetch(`http://localhost:8000/api/admin/user/${userId}/${role}`, options);
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
        return decodeUser
    } else {
       return Role.NonUser;
    }
}

export const authService = {
    getAllUsers,
    getAllModerators,
    blockUser,
    makeModerator,
    currentUser: getRole()
};