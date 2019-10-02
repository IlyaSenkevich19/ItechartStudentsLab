const auth = (req, res, next) => {
    const token = req.headers['auth-token'];
    if (!token) return res.status(401).send("Access Denied");
    try {
        const bearerToken = token.split(' ')[1];
        req.token = bearerToken;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token')
    }
}

module.exports = auth;