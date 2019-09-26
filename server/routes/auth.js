const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const { registrationValidation, loginValidation } = require('../validation');




// const passport = require("passport");
// const passportJWT = require("passport-jwt");

// const ExtractJwt = passportJWT.ExtractJwt;
// const JwtStrategy = passportJWT.Strategy;

// const jwtOptions = {}
// jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// jwtOptions.secretOrKey = 'mySecretKey';

// const strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
    
//     // this would be a database call:
//     const user = users[_.findIndex(users, { id: jwt_payload.id })];
//     if (user) {
//         next(null, user);
//     } else {
//         next(null, false);
//     }
// });

// passport.use(strategy);





router.post('/register', async (req, res) => {

    const { error } = await registrationValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send(JSON.stringify("Email already exists"));

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        email: req.body.email,
        password: hashedPassword,
        date: req.body.date,
        role: 'user'
    })

    try {
        const saveUser = await user.save();
        res.send({ user: user._id });
    } catch (err) {
        res.status(400).send(err);
    }

});

router.post('/login', async (req, res) => {
    const { error } = await loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send(JSON.stringify("Email is not found"));

    // const validPassword = await bcrypt.compare(req.boby.password, user.password);
    // if(!validPassword) return res.status(400).send('Invalid password');

    const admin = await User.findOne({ email: 'ilya@gmail.com' });
    const moderator = await User.findOne({ email: 'sluka@gmail.com' });
    
    if( req.body.email === admin.email) {
        const token = jwt.sign({ _id: user._id, role: 'admin' }, 'secretkey');
        res.header('auth-token', token).send(JSON.stringify(token)); 
    } else if(req.body.email === moderator.email) {
        const token = jwt.sign({ _id: user._id, role: 'moderator' }, 'secretkey');
        res.header('auth-token', token).send(JSON.stringify(token)); 
    } else {
        const token = jwt.sign({ _id: user._id, role: 'user' }, 'secretkey');
        res.header('auth-token', token).send(JSON.stringify(token)); 
    } 
})


module.exports = router;