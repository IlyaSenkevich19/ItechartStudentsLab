const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { registrationValidation, loginValidation } = require('../validation')


router.post('/register', async (req, res) => {

    const { error } = await registrationValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send(JSON.stringify("Email already exists"));

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        email: req.body.email,
        password: hashedPassword,
        date: req.body.date
    })

    try {
        const saveUser = await user.save();
        res.send({ user: user._id });
    } catch (err) {
        res.status(400).send(err);
    }

});

router.post('/login', async (req, res) => {
    const { error } = await loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send(JSON.stringify("Email is not found"));

    const validPassword = await bcrypt.compare(req.boby.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid password');

})


module.exports = router;