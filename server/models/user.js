const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email       : { type: String, required: true, max: 255, min: 6},
  password    : { type: String, required: true, max: 1024, min: 6},
  date        : { type: Date, default: Date.now },
  role        : { type: String, default: 'non-user'},
  blockStatus : { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);