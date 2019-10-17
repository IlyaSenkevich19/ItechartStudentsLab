export const host = 'http://localhost:8000';

export const tokenReqOptions = type => {
    const token = localStorage.getItem('currentUser');
    const requestOptions = {
        method: type,
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            "auth-token": `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    }
    return requestOptions;
}
export const reqOptions = type => {
    const requestOptions = {
        method: type,
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }
    return requestOptions;
}