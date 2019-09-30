
const createVote = async (voteText, endDate, author) => {
    const token = localStorage.getItem('currentUser')
    const options = {
        method: 'POST',
        // mode: 'cors',
        headers: {
            'Accept': 'application/json',
            "auth-token": `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ voteText: voteText, endDate: endDate, author: author })
    } 
    try {
        const rawResponse = await fetch('http://localhost:8000/api/vote', options)
        const content = await rawResponse.json();
        return content;
    } catch (err) {
        console.log(err);
    }
}

const createComment = async (commentText, date, author, idVote) => {
    const token = localStorage.getItem('currentUser')
    const options = {
        method: 'POST',
        // mode: 'cors',
        headers: {
            'Accept': 'application/json',
            "auth-token": `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: commentText, date: date, author: author, nameVote: idVote  })
    } 
    try {
        const req = await fetch('http://localhost:8000/api/comment', options);
        const res = await req.json();
        return res;
    } catch(err) {
        console.log(err);
    }
}


export const userService = {
    createVote,
    createComment
}