const mongoose = require('mongoose');

const streamerSchema = mongoose.Schema({
  pseudo: {type: String, required: true},
  color: String,
  password: {type: String, required: true},
  token: String,
});

const Streamer = mongoose.model('Streamer', streamerSchema);

module.exports = Streamer;
