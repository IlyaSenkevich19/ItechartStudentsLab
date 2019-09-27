const _ = require("lodash");
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require("express");
const bodyParser = require("body-parser");


const app = express();
app.use(cors());


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json())

const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const voteRoute = require('./routes/votes');
const adminRoute = require('./routes/adminRoute')
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('Connected to DB');
    }
);

app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/', voteRoute);
app.use('/api/admin/', adminRoute);


app.listen(8000, () => {
    console.log("Express running on the port 8000");
});





