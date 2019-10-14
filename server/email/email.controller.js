const User = require('../models/user');
const Vote = require('../models/vote');
const sendEmail = require('./email.send');
const msgs = require('./email.msgs');
const templates = require('./email.templates');

exports.collectEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const newUser = await User.create({ email });
      await sendEmail(newUser.email, templates.confirm(newUser._id));
      res.send({ msg: msgs.confirm });
    }
    else if (user && !user.confirmed) {
      await sendEmail(user.email, templates.confirm(user._id));
      res.send({ msg: msgs.confirm });
    }
    else {
      res.json({ msg: msgs.alreadyConfirmed })
    }

  } catch (err) {
    console.log(err);
  }
}

exports.confirmEmail = async (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then(user => {

      if (!user) {
        res.json({ msg: msgs.couldNotFind })
      }

      else if (user && !user.confirmed) {
        User.findByIdAndUpdate(id, { confirmed: true })
          .then(() => res.json({ msg: msgs.confirmed }))
          .catch(err => console.log(err))
      }

      else {
        res.json({ msg: msgs.alreadyConfirmed })
      }

    })
    .catch(err => console.log(err))
}

exports.collectEmailCaptcha = async (req, res) => {
  const { email, voteId } = req.body;
  await sendEmail(email, templates.confirmCaptchaEmail(voteId, email));
  res.send({ msg: msgs.confirm });
}

exports.confirmEmailCaptcha = async (req, res) => {
  const { voteId, email } = req.params;
  const vote = await Vote.findById(voteId);
  const votedUsers = vote.votedUsers;
  if (votedUsers.indexOf(email) !== -1) {
    res.send({ msg: 'You have already voted for this post, Sorry' });
  } else {
    await Vote.updateOne({ _id: voteId }, { $push: { votedUsers: email }, $inc: { count: 1 } });
    res.send({ msg: "OK" })
  }
}
