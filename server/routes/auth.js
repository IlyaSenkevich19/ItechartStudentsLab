const router = require('express').Router();
const User   = require('../models/user');



//Validation
const Joi = require('@hapi/joi');

// const schema = {
//     email: Joi.string().min(6).required().email(),
//     password: Joi.string().min(6).required(),
//     date: Joi.date()
// }

router.post('/register', async (req, res) => {
    const user = new User({
        email    : req.body.email,
        password : req.body.password,
        date     : req.body.date
    })
try {
    const { error } = await Joi.validate(req.body, {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        date: Joi.date()
    });
    if (error) {
        return res.status(400).send(error.details[0].message);
    } else {
        const saveUser = await user.save();
        res.send(saveUser);
    }
} catch(err) {
    res.status(400).send(err);
}
   
 
    // try {
    //     

    //     res.send(saveUser);
    // } catch (err) {
    //     res.status(400).send(err);
    // }
})


module.exports = router;