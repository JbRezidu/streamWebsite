const mongoose = require('mongoose');

const streamerSchema = mongoose.Schema({
  pseudo: {type: String, required: true},
  color: String,
  password: {type: String, required: true},
});

const Streamer = mongoose.model('Streamer', streamerSchema);

module.exports = Streamer;
