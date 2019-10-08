
const confirmVote = async () => {
    const token = localStorage.getItem('currentUser');
    const options = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "auth-token": `Bearer ${token}`,  
        }
    };
    try {
        const req = await fetch(`http://localhost:8000/api/moderator/vote/toConfirm`, options);
        const res = await req.json();
        return res;
    } catch (err) {
        console.log(err)
    }
}


export const moderatorService = {
    confirmVote
}