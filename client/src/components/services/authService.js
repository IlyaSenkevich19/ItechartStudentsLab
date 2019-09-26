const getAllUsers = async () => {
    const requestOptions = {
        method: "GET",
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
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



export const authService = {
    getAllUsers,
    // getAllModerators,
};