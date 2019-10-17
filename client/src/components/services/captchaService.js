import { host } from '../constants/constants';

const fetchEmail = async (email, voteId) => {
    const fetchEmail = await fetch(`${host}/api/user/email/captcha`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, voteId: voteId })
    });
    const res = await fetchEmail.json();
    return res;
}

export const captchaService = {
    fetchEmail
}