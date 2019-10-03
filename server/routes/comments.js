const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');

const Comment = require('../models/comment');
const jwt = require('jsonwebtoken');
const Vote = require('../models/vote')

router.post('/comment', verify, async (req, res) => {
    try {
        jwt.verify(req.token, 'secretkey', async () => {
            const newComment = new Comment({
                voteId: req.body.voteId,
                author: req.body.author,
                text: req.body.text,
                date: req.body.date,
            })
            const comment = await newComment.save();

            await Vote.updateOne({ _id: req.body.voteId }, { $push: { comments: comment } })
            res.status(200).send(JSON.stringify('Comment is ready'))
        })
    } catch (err) {
        res.sendStatus(404);
    }
})

module.exports = router;