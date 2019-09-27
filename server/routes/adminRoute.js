const router = require('express').Router();
const User = require('../models/user');
const verify = require('./verifyToken');

router.get('/users', async (req, res) => {
   const users = await User.find();
   res.send(users);
})

router.patch('/users/:userId/:blockStatus', async (req, res) => {
   try {
      const user = await User.updateOne({ _id: req.params.userId }, { $pull: { blockStatus: req.params.blockStatus } });
      if (!user) {
         res.status(401).send(JSON.stringify("There is no such user"))
      } else {
         res.status(200).header('Access-Control-Allow-Origin', '*').send(JSON.stringify("User is blocked"))
      }
   } catch (err) {
      res.status(404);
   }
})

module.exports = router;