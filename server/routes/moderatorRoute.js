const router = require('express').Router();
const User = require('../models/user');
const Vote = require('../models/vote');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');


router.get('/vote/toConfirm', verify, async (req, res) => {
    try {
       jwt.verify(req.token, 'secretkey', async () => {
          const vote = await Vote.find({ confirm: false });
          
          res.send(vote);
       })
    } catch (err) {
       res.sendStatus(404);
    }
 });

 
module.exports = router;