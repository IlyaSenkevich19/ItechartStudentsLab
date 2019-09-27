const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    nameVote: { type: String, },
    author:   { type: String, },
    text:     { type: String, }
});

module.exports = mongoose.model('Comment', commentSchema);