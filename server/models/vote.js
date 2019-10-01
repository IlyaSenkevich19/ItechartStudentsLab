const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    text      : { type: String, required: true },
    date      : { type: Date, required: true, default: Date.now },
    startDate : { type: Date, required: true },
    status    : { type: Boolean, default: true },
    count     : { type: Number, default: 0 },
    author    : { type: String },
    comments  : [],
    endDate   : { type: Date, required: true },
});

module.exports = mongoose.model('Vote', voteSchema);