const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json())

//Import Routes

const authRoute = require('./routes/auth');

dotenv.config();

const mongoose = require('mongoose');


const passport = require("passport");
const passportJWT = require("passport-jwt");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;



//Connect to db
// process.env.DB_CONNECT
mongoose.connect('mongodb+srv://ilya:mosavi111@cluster0-nwxra.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('Connected to DB');
    }
);



//Route middlewares
app.use('/api/user', authRoute);

const users = [
    {
        id: 1,
        email: '123',
        password: '123',
        role: 'admin'
    },
    {
        id: 2,
        email: 'test',
        password: 'test',
        role: 'user'
    }
];


// app.use(cors());

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'mySecretKey';

const strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
    console.log('payload received', jwt_payload);
    // this would be a database call:
    const user = users[_.findIndex(users, { id: jwt_payload.id })];
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});

passport.use(strategy);


app.use(passport.initialize());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.json({ message: "Express is up!" });
});

app.post("/login", (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    // this would be a database call:
    const user = users[_.findIndex(users, { email: email })];
    if (!user) {
        res.status(401).json({ message: "no such user found" });
    }

    if (user.password === password) {
        const payload = { id: user.id };
        const token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({ message: "ok", role: user.role, token: token });
    } else {
        res.status(401).json({ message: "passwords did not match" });
    }
});

app.get("/secret", passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: "Success! You can not see this without a token" });
});

app.get("/secretDebug",
    (req, res, next) => {
        console.log(req.get('Authorization'));
        next();
    }, (req, res) => {
        res.json("debugging");
    });

app.listen(8000, () => {
    console.log("Express running on the port 8000");
});





