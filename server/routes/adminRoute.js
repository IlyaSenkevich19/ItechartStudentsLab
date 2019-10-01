const router = require('express').Router();
const User = require('../models/user');
const verify = require('./verifyToken');

router.get('/users',verify, async (req, res) => {
   const users = await User.find();
   const sortedUsers = users.filter((user) => user.role === 'user' ? true : false  );
   res.send(sortedUsers);
});

router.get('/moderators',verify, async (req, res) => {
   const users = await User.find();
   const sortedUsers = users.filter((user) => user.role === 'moderator' ? true : false  );
   res.send(sortedUsers);
});

router.patch('/users/:userId/:blockStatus',verify, async (req, res) => {
   try {
      const user = await User.updateOne({ _id: req.params.userId }, { $set: { blockStatus: req.params.blockStatus } });
      const currUser = await User.findOne({ _id: req.params.userId});
      if(currUser.blockStatus === true) {
         await User.updateOne({_id:req.params.userId}, {$set: {role: 'non-user'}});
         res.status(200).send(JSON.stringify(`${currUser.email} is blocked`));
      } else {
         await User.updateOne({_id:req.params.userId}, {$set: {role: 'user'}});
         res.status(200).send(JSON.stringify(`${currUser.email} is unblocked`))
      }
      if (!user) {
         res.status(401).send(JSON.stringify("There is no such user"))
      } else {
         console.log(currUser)
         res.status(200).send(currUser.blockStatus)
      }
   } catch (err) {
      res.status(404);
   }
})

router.patch('/user/:userId/:role',verify, async (req, res) => {
   try {
      const user = await User.updateOne({ _id: req.params.userId }, { $set: { role: req.params.role } });
      const currUser = await User.findOne({ _id: req.params.userId});
      if (!user) {
         res.status(401).send(JSON.stringify("There is no such user"))
      } else {
         res.status(200).send(JSON.stringify(currUser.role))
      }
   } catch (err) {
      res.status(404);
   }
})

module.exports = router;