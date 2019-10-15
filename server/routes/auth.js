const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const Role = require('../roles');
const emailController = require('../email/email.controller');


const jwt = require('jsonwebtoken');
const { registrationValidation, loginValidation } = require('../validation');

router.post('/register', async (req, res) => {
    try {
        await registrationValidation(req.body);
        const emailExist = await User.findOne({ email: req.body.email });
        if (emailExist) return res.status(400).send(JSON.stringify("Email already exists"));
    } catch (err) {
        res.status(400).send({ error: err.details[0].message })
    }


    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const user = new User({
            email: req.body.email,
            password: hashedPassword,
            date: req.body.date,
            role: 'user'
        })
        await user.save();
        res.send({ user: user._id });
    } catch (err) {
        res.status(400).send(err);
    }

});

router.post('/login', async (req, res) => {

    const { error } = await loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0]);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send(JSON.stringify("Email is not found"));

    // const validPassword = await bcrypt.compare(req.boby.password, user.password);
    // if (!validPassword) { return res.status(400).send('Invalid password'); } else {


    const userRole = user.role;
    if (userRole === Role.Admin) {
        const token = jwt.sign({ _id: user._id, role: 'admin' }, 'secretkey');
        res.header('auth-token', token).send(JSON.stringify(token));
    } else if (userRole === Role.Moderator) {
        const token = jwt.sign({ _id: user._id, role: 'moderator' }, 'secretkey');
        res.header('auth-token', token).send(JSON.stringify(token));
    } else if (user.confirmed === false) {
        const token = jwt.sign({ error }, 'secretkey');
        res.header('auth-token', token).send(JSON.stringify(token));
    }
    else {
        const token = jwt.sign({ _id: user._id, role: 'user', email: user.email, blockStatus: user.blockStatus }, 'secretkey');
        res.header('auth-token', token).send(JSON.stringify(token));
    }
}
)

router.get('/email/confirm/:id', emailController.confirmEmail);
router.post('/email', emailController.collectEmail)
router.get('/email/confirm/captcha/:voteId/:userId', emailController.confirmEmailCaptcha);
router.post('/email/captcha', emailController.collectEmailCaptcha)



module.exports = router;