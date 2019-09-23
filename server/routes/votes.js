const express = require('express');
const router = express.Router();

const Vote = require('../models/vote');

router.get('/vote', async (req, res) => {
    const vote = await Vote.find().sort({date: -1});
    res.send(vote);
});

router.post('/vote', async (req, res) => {
    const newVote = new Vote({
        text: req.body.voteText,
        endDate: req.body.endDate
    });
   
        const vote = await newVote.save();
        res.send(vote);
    
   
    
    
})

module.exports = router;