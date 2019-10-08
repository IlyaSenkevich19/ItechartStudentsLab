const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    text      : { type: String, required: true },
    date      : { type: Date, required: true, default: Date.now },
    startDate : { type: Date, required: true },
    status    : { type: Boolean, default: true },
    count     : { type: Number, default: 0 },
    votedUsers: [],
    confirm   : { type: Boolean, default: false },
    author    : { type: String },
    comments  : [],
    endDate   : { type: Date, required: true },
});

module.exports = mongoose.model('Vote', voteSchema);