const router = require('express').Router();
const User = require('../models/user');
const Vote = require('../models/vote');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');

router.get('/users', verify, async (req, res) => {
   try {
      jwt.verify(req.token, 'secretkey', async () => {
         const users = await User.find();
         const sortedUsers = users.filter((user) => user.role === 'user' ? true : false);
         res.send(sortedUsers);
      })
   } catch (err) {
      res.sendStatus(404);
   }
});

router.get('/:userId/user', verify, async (req, res) => {
   try {
      jwt.verify(req.token, 'secretkey', async () => {
         const user = await User.findOne({_id: req.params.userId});
        
         res.send(user);
      })
   } catch (err) {
      res.sendStatus(404);
   }
});

router.get('/moderators', verify, (req, res) => {
   try {
      jwt.verify(req.token, 'secretkey', async () => {
         const users = await User.find();
         const sortedUsers = users.filter((user) => user.role === 'moderator' ? true : false);
         res.send(sortedUsers);
      });
   } catch (err) {
      res.sendStatus(404);
   }
});

router.patch('/users/:userId/block', async (req, res) => {
   try {
      const currUser = await User.findOne({ _id: req.params.userId });
      if (currUser.blockStatus === true) {
         await User.updateOne({ _id: req.params.userId }, { $set: { blockStatus: false  } });
         res.status(200).send(JSON.stringify(`${currUser.email} is unblocked`));
      } else {
         await User.updateOne({ _id: req.params.userId }, { $set: { blockStatus: true } });
         res.status(200).send(JSON.stringify(`${currUser.email} is blocked`))
      }
   } catch (err) {
      res.status(404);
   }
})

router.patch('/user/:userId/role', async (req, res) => {
   try {
      const currUser = await User.findOne({ _id: req.params.userId });
      if(currUser.role === 'moderator') {
         await User.updateOne({ _id: req.params.userId }, { $set: { role: 'user' } });
         res.status(200).send(JSON.stringify(`${currUser.email} is user`));
      } else if(currUser.role === 'user') {
         await User.updateOne({ _id: req.params.userId }, { $set: { role: 'moderator' } });
         res.status(200).send(JSON.stringify(`${currUser.email} is moderator`));
      }
   } catch (err) {
      res.status(404);
   }
})

router.get('/:voteId/:commentId/deleteComment', async (req, res) => {
   try {
      const vote = await Vote.updateOne({ _id: req.params.voteId }, { $unset: { comments: req.params.commentId }  });
      // const comment = vote.comments;
      // const comm= comment.filter(com => com._id === req.params.commentId );
      console.log(vote);
   } catch (err) {
      res.status(404);
   }
})

module.exports = router;