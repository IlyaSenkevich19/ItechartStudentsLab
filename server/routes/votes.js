const express = require('express');
const router = express.Router();
const paginate = require('jw-paginate');
const verify = require('./verifyToken');
const jwt = require('jsonwebtoken');
const User = require('../models/user')

const Vote = require('../models/vote');

router.get('/vote', verify, async (req, res, next) => {
    try {
        jwt.verify(req.token, 'secretkey', async () => {
            const vote = await Vote.find().sort({ date: -1 });

            // const votes = await Vote.find().sort({date: -1}).map(i => ({ id: (i + 1), name: "Vote" + (i + 1) }));
            // const page = parseInt(req.query.page) || 1;
            // const pageSize = 5;
            // const pager = paginate(votes.length, page, pageSize);

            // const pageOfVotes = votes.slice(pager.startIndex, pager.endIndex + 1)


            res.send(vote);


            // return res.json({ pager, pageOfVotes });
        })
    } catch (err) {
        res.sendStatus(404);
    }
});

router.get('/:userId/votedPosts',  async (req, res) => {
    
         const user = await User.findOne({ _id: req.params.userId});
         const votedPost = user.votedPosts;
         res.status(400).send({ votedPost })
   
} )

router.patch('/:voteId/:user/toVote', verify, async (req, res) => {
    try {
        jwt.verify(req.token, 'secretkey', async () => {
          await Vote.updateOne({ _id: req.params.voteId }, { $push: { votedUsers: req.params.user }, $inc: { count: 1 }  });
          await User.updateOne({ _id: req.params.user }, { $push: { votedPosts: req.params.voteId } })
        //   const user = await User.findOne({ _id: req.params.user });
        //   const votedPosts = user.votedPosts;
          res.status(400).send({ status: true});
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