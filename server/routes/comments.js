const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');
const dotenv = require('dotenv');
dotenv.config();

const Comment = require('../models/comment');
const jwt = require('jsonwebtoken');
const Vote = require('../models/vote')

router.post('/comment', verify, async (req, res) => {
    try {
        jwt.verify(req.token, process.env.TOKEN_SECRET, async () => {
            const newComment = new Comment({
                voteId: req.body.voteId,
                author: req.body.author,
                text: req.body.text,
                date: req.body.date,
            })
            const comment = await newComment.save();

            await Vote.updateOne({ _id: req.body.voteId }, { $push: { comments: comment } });
          
            res.status(200).send({  comment  })
        })
    } catch (err) {
        res.sendStatus(404);
    }
})

module.exports = router;