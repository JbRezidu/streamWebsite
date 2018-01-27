const mongoose = require('mongoose');
const Streamer = require('api/streamer/streamer.model');

const slotSchema = mongoose.Schema({
  startHour: Number,
  duration: {type: Number, default: 1},
  description: String,
  title: String,
  streamer: Streamer
});

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;
