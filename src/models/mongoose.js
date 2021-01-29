const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

const User = mongoose.model('User', {
  email: String,
  password: String,
  token: String,
});

const Event = mongoose.model('Event', {
  userId: String,
  description: String,
  title: String,
  startDate: String,
  endDate: String,
});

module.exports = {
  User,
  Event,
}
