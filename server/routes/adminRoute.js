const router = require('express').Router();
const User = require('../models/user');
const verify = require('./verifyToken');

router.get('/users', async (req, res) => {
   const users = await User.find();
   const sortedUsers = users.filter((user) => user.role === 'user' ? true : false  );
   res.send(sortedUsers);
});

router.get('/moderators',async (req, res) => {
   const users = await User.find();
   const sortedUsers = users.filter((user) => user.role === 'moderator' ? true : false  );
   res.send(sortedUsers);
});

router.patch('/users/:userId/:blockStatus', async (req, res) => {

   try {
      const user = await User.updateOne({ _id: req.params.userId }, { $set: { blockStatus: req.params.blockStatus } });
      const currUser = await User.findOne({ _id: req.params.userId});
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

router.patch('/user/:userId/:role', async (req, res) => {

   try {
      const user = await User.updateOne({ _id: req.params.userId }, { $set: { role: req.params.role } });
      const currUser = await User.findOne({ _id: req.params.userId});
      console.log(currUser.role)
      if (!user) {
         res.status(401).send(JSON.stringify("There is no such user"))
      } else {
         res.status(200).send(currUser.role)
      }
   } catch (err) {
      res.status(404);
   }
})

module.exports = router;