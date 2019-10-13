const _ = require("lodash");
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require("express");
const bodyParser = require("body-parser");

const socket = require('socket.io');



const app = express();
app.use(cors());


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    next();
});

const authRoute = require('./routes/auth');
// const postRoute = require('./routes/posts');
const voteRoute = require('./routes/votes');
const adminRoute = require('./routes/adminRoute');
const moderatorRoute = require('./routes/moderatorRoute');
const commentRoute = require('./routes/comments');
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('Connected to DB');
    }
);

app.use('/api/user', authRoute);
// app.use('/api/posts', postRoute);
app.use('/api/', voteRoute);
app.use('/api/admin/', adminRoute);
app.use('/api/moderator', moderatorRoute);
app.use('/api/', commentRoute);
app.use('/api/', commentRoute);


server = app.listen(8000, () => {
    console.log("Express running on the port 8000");
});

io = socket(server);

io.on('connection', socket => {

    socket.on("SEND_MESSAGE", data => {
        io.emit('RECEIVE_MESSAGE', data)
    })
    socket.on("CREATE_VOTE", data => {
        io.emit('RECEIVE_VOTE', data)
    })
    socket.on("SEND_USER_TO_BLOCK", data => {
        io.emit('RECEIVE_USERS', data)
    })

})





