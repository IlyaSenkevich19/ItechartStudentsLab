const express = require('express');
const router = express.Router();

const Comment = require('../models/comment');

router.post('/comment', async (req, res) => {
    const newComment = new Comment({
        nameVote: req.body.nameVote,
        author: req.body.author,
        text: req.body.text,
        date: req.body.date,
    })
    const comment = await newComment.save();
    res.send(comment);
})

router.get('/comments', async (req, res) => {
    const comments = await Comment.find();
    res.send(comments);
})

module.exports = router;