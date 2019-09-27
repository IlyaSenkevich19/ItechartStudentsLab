
const createVote = async (voteText, endDate, author) => {
    const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
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


export const userService = {
    createVote,
}