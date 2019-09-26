const router = require('express').Router();
const User = require('../models/user');
const verify = require('./verifyToken');

router.get('/users', async (req, res) => {
   const users = await User.find();
   res.send(users);
})

router.put('/:id', (req, res) => {
   
})

module.exports = router;