const express = require('express');
const router = express.Router();
const paginate = require('jw-paginate');

const Vote = require('../models/vote');

router.get('/vote', async (req, res, next) => {
    const vote = await Vote.find().sort({ date: -1 });

    // const votes = await Vote.find().sort({date: -1}).map(i => ({ id: (i + 1), name: "Vote" + (i + 1) }));
    // const page = parseInt(req.query.page) || 1;
    // const pageSize = 5;
    // const pager = paginate(votes.length, page, pageSize);

    // const pageOfVotes = votes.slice(pager.startIndex, pager.endIndex + 1)


res.send(vote);


    // return res.json({ pager, pageOfVotes });
});

router.post('/vote', async (req, res) => {
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