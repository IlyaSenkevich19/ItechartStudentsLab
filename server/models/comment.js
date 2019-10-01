const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    nameVote : { type: String, },
    author   : { type: String, },
    text     : { type: String, },
    date     : { type: Date, default: Date.now() },
    status   : { type: Boolean, default: false }
});

module.exports = mongoose.model('Comment', commentSchema);