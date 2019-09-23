const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    text: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    status: { type: Boolean, },
    count: { type: Number, },
    author: { type: String },
    comments: [],
    endDate: { type: Date, required: true },
});

module.exports = mongoose.model('Vote', voteSchema);