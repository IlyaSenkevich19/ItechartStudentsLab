const express = require('express');
const router = express.Router();
const paginate = require('jw-paginate');
const verify = require('./verifyToken');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();

const Vote = require('../models/vote');

router.get('/vote', verify, async (req, res, next) => {
    try {
        jwt.verify(req.token, process.env.TOKEN_SECRET, async () => {
            const vote = await Vote.find().sort({ date: -1 });
            res.send(vote);
        })
    } catch (err) {
        res.sendStatus(404);
    }
});

router.get('/:userId/votedPosts',  async (req, res) => {
         const user = await User.findOne({ _id: req.params.userId});
         const votedPost = user.votedPosts;
         res.status(200).send({ votedPost })
   
} )

router.patch('/:voteId/statusChanged',  async (req, res) => {
     await Vote.updateOne({_id: req.params.voteId}, { $set: { status: false } });
     res.status(200).send(JSON.stringify('status is changed'));
} )

router.patch('/:voteId/:user/toVote', verify, async (req, res) => {
    try {
        jwt.verify(req.token, process.env.TOKEN_SECRET, async () => {
          await Vote.updateOne({ _id: req.params.voteId }, { $push: { votedUsers: req.params.user }, $inc: { count: 1 }  });
          await User.updateOne({ _id: req.params.user }, { $push: { votedPosts: req.params.voteId } })
          res.status(200).send({ status: true});
        })
     } catch (err) {
        res.status(404);
     }
})

router.post('/vote',  async (req, res) => {
            const newVote = new Vote({
                text: req.body.voteText,
                endDate: req.body.endDate,
                startDate: req.body.startDate,
                author: req.body.author
            });
            const vote = await newVote.save();
            res.send(vote);
    })

module.exports = router;