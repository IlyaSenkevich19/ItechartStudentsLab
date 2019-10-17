const router = require('express').Router();
const User = require('../models/user');
const Vote = require('../models/vote');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');
const dotenv = require('dotenv');
dotenv.config();


router.get('/vote/toConfirm', verify, async (req, res) => {
    try {
       jwt.verify(req.token, process.env.TOKEN_SECRET, async () => {
          const vote = await Vote.find({ confirm: false });
          
          res.send(vote);
       })
    } catch (err) {
       res.sendStatus(404);
    }
 });
 
router.patch('/:voteId/toConfirm', verify, async (req, res) => {
    try {
       jwt.verify(req.token, process.env.TOKEN_SECRET, async () => {
           await Vote.updateOne({ _id: req.params.voteId }, { $set: { confirm: true } })
          res.send(JSON.stringify(`THis vote is confirmed`));
       })
    } catch (err) {
       res.sendStatus(404);
    }
 });

router.patch('/:voteId/blockVote', verify, async (req, res) => {
    try {
       jwt.verify(req.token, process.env.TOKEN_SECRET, async () => {
           await Vote.updateOne({ _id: req.params.voteId }, { $set: { blockStatus: true  } })
          res.Status(200).send(JSON.stringify(`This vote is blocked`));
       })
    } catch (err) {
       res.sendStatus(404);
    }
 });

router.patch('/:userId/sendToAdmin', verify, async (req, res) => {
    try {
       jwt.verify(req.token, process.env.TOKEN_SECRET, async () => {
         await User.updateOne({ _id: req.params.userId }, { $set: { sendBlockStatus: true  } })
          res.Status(200).send(JSON.stringify(`Ready`));
       })
    } catch (err) {
       res.sendStatus(404);
    }
 });



 
module.exports = router;